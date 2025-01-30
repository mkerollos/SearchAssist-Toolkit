from rag_evaluator.api.XOSearch import XOSearchAPI, get_bot_response
import csv

api = XOSearchAPI()
chunks = api.get_chunks()

# Open the CSV file for writing
with open('chunks.csv', 'w', newline='', encoding='utf-8') as csvfile:
    # Create a CSV writer object
    fieldnames = ['recordTitle', 'chunkText']  # Specify the column headers
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

    # Write the header row
    writer.writeheader()

    # Write the data rows
    writer.writerows(chunks)