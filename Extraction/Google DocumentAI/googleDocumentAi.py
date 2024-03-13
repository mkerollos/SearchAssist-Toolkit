
# Import Libraries
from google.cloud import documentai_v1beta3 as documentai
from google.cloud import storage
from prettytable import PrettyTable
from google.colab import auth

import re
import os
import pandas as pd
import requests
import json
# Set the credentials
project_id = "PROJECT_ID"
processor_id = "PROCESS_ID"
bucket_name = "PROJECT_ID"
ingest_url = "{HOST_URL}/searchassistapi/external/stream/{STREAM_ID}/ingest?contentSource=manual&extractionType=data&index=true"
authKey = '{JWT_TOKEN}'
location = 'us' # Replace with 'eu' if processor does not use 'us' location
#Authenticate to google cloud
auth.authenticate_user(project_id=project_id)
# Set your variables
gcs_input_bucket  = bucket_name   # Bucket name only, no gs:// prefix
gcs_input_prefix  = "input/"     # Input bucket folder e.g. input/
gcs_output_bucket = bucket_name   # Bucket name only, no gs:// prefix
gcs_output_prefix = "output/"    # Input bucket folder e.g. output/
timeout = 300
# Define Google Cloud client objects
client_options = {"api_endpoint": "{}-documentai.googleapis.com".format(location)}
client = documentai.DocumentProcessorServiceClient(client_options=client_options)
storage_client = storage.Client()
# Create input configuration
blobs = storage_client.list_blobs(gcs_input_bucket, prefix=gcs_input_prefix)
print(blobs)
input_configs = []
print("Input Files:")
for blob in blobs:
    if ".pdf" in blob.name:
        source = "gs://{bucket}/{name}".format(bucket = gcs_input_bucket, name = blob.name)
        print(source)
        input_config = documentai.types.document_processor_service.BatchProcessRequest.BatchInputConfig(
            gcs_source=source, mime_type="application/pdf"
        )
        input_configs.append(input_config)
# Create output configuration
destination_uri = f"gs://{gcs_output_bucket}/{gcs_output_prefix}"
output_config = documentai.types.document_processor_service.BatchProcessRequest.BatchOutputConfig(
    gcs_destination=destination_uri
)
# Create the Document AI API request
name = f"projects/{project_id}/locations/{location}/processors/{processor_id}"
request = documentai.types.document_processor_service.BatchProcessRequest(
    name=name,
    input_configs=input_configs,
    output_config=output_config,
)
# Start the batch (asynchronous) API operation
operation = client.batch_process_documents(request)
# Wait for the operation to finish
operation.result(timeout=timeout)
print ("Batch process  completed.")
# Fetch list of output files
match = re.match(r"gs://([^/]+)/(.+)", destination_uri)
output_bucket = match.group(1)
prefix = match.group(2)
bucket = storage_client.get_bucket(output_bucket)
blob_list = list(bucket.list_blobs(prefix=prefix))
print(blob_list)
# Format JSON for ingestion in searchAssist
documents = []
for i, blob in enumerate(blob_list):
    # If JSON file, download the contents of this blob as a bytes object.
    if ".json" in blob.name:
        blob_as_bytes = blob.download_as_bytes()
        document = documentai.types.Document.from_json(blob_as_bytes)
        print(f"Fetched file {i + 1}:{blob.name}")
        # print the text data output from the processor
        # print(f"Text Data:\n {document.text}")
        documentList = document.entities
        for doc in documentList:
            snippet = {}
            for prop in doc.properties:
                if prop.type_ == 'paragraph':
                  prop.type_ = 'content'
                snippet[prop.type_] = prop.mention_text
            documents.append(snippet)
    else:
        print(f"Skipping non-supported file type {blob.name}")
        # Ingesting documents to searchAssist through ingest api
payload = json.dumps({
  "documents": documents,
  "name": "documentAi"
})
headers = {
  'accept': 'application/json',
  'Content-Type': 'application/json',
  'auth': authKey
}

response = requests.request("POST", ingest_url, headers=headers, data=payload)

print(response.text)
