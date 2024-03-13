# import libraries
import os
from azure.ai.formrecognizer import DocumentAnalysisClient
from azure.core.credentials import AzureKeyCredential
import json
import requests
import pandas as pd
import urllib.parse
# set `<your-endpoint>` and `<your-key>` variables with the values from the Azure portal
endpoint = "https://testress.cognitiveservices.azure.com/"
credential = AzureKeyCredential("2238144d02184d09b2498e8981157f5a")
# SearchAssist data ingestion URL and authKey
ingest_url = "https://searchassist-qa.kore.ai/searchassistapi/external/stream/st-b55eed48-d045-51e0-bc92-486f29306aed/ingest?contentSource=manual&extractionType=data&index=true"
authKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6ImNzLWRiOWRkZWNlLTQwNDgtNTAxYS04ZWYyLTJiZWJkYTNhYTNjYyJ9.rrVw6UDDMXQEv4z4sWFy5hS_emE-ACVu7TSKkxYAkSg'
#from google.colab import files

uploaded = files.upload()

for fn in uploaded.keys():
  print('User uploaded file "{name}" with length {length} bytes'.format(
      name=fn, length=len(uploaded[fn])))
  client = DocumentAnalysisClient(endpoint, credential)

#Path of file you need to extract
with open('/content/CED Policy Backgrounder_Curbs on Chips Exports to China_FINAL.pdf', "rb") as fd:
    document = fd.read()

poller = client.begin_analyze_document("prebuilt-document", document)
result = poller.result()

resultJson = [result.to_dict()]
file_path = "/content/result.json"

# Write the JSON data to the file
with open(file_path, 'w') as file:
    json.dump(resultJson, file)
client.close()
snippets = []
snippet = {'title': '', 'content': '', 'docType': 'paragraph'}

for paragraph in resultJson[0]['paragraphs']:
    if paragraph['role'] == 'title' or paragraph['role'] == 'sectionHeading':
        if snippet['title'] != '' and snippet['content'] != '':
            snippets.append(snippet)
        snippet = {'title': paragraph['content'], 'content': ''}
    elif paragraph['role'] != 'pageNumber' and paragraph['role'] != 'pageFooter':
        snippet['content'] += paragraph['content']

if snippet['title'] != '':
    snippets.append(snippet)

print(snippets)
tableSnippets = []
tableSnippet = {'title': '', 'content': {}, 'html':'', 'docType': 'table'}

for table in resultJson[0]['tables']:
    columnHeader = []
    data = {}
    for cell in table['cells']:
        if cell['kind'] == "columnHeader":
            columnHeader.append(cell['content'])
        else:
            if not columnHeader:
                break
            if columnHeader[cell['column_index']] not in data:
                data[columnHeader[cell['column_index']]] = []
            data[columnHeader[cell['column_index']]].append(cell['content'])
    if columnHeader:
        df = pd.DataFrame(data);
        tableSnippet['title'] = columnHeader[0]
        tableSnippet['content'] = df.to_string()
        tableSnippet['html'] = urllib.parse.quote(df.to_html())
        tableSnippets.append(tableSnippet)

print(tableSnippets)
# Ingesting documents to searchAssist through ingest api
payload = json.dumps({
  "documents": snippets + tableSnippets,
  "name": "documentAi"
})
headers = {
  'accept': 'application/json',
  'Content-Type': 'application/json',
  'auth': authKey
}

response = requests.request("POST", ingest_url, headers=headers, data=payload)

print(response.text)