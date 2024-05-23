# This is a sample Python script.

# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.
import asyncio
import argparse
import copy
import os
import json
import time
import re
import aiofiles
from bs4 import BeautifulSoup
from markdownify import markdownify as md
from openai import AsyncOpenAI
import dirtyjson

OPENAI_KEY = os.environ['OPENAI_KEY']

open_ai_conf = {
    "API_BASE":"https://api.openai.com/v1/",
    "model": "gpt-3.5-turbo-16k",
    "API_KEY":OPENAI_KEY,
    "max_tokens":2000,
    "temperature":0.5,
    "top_p":1,
    "timeout":150,
    "max_retries":0
}
prompt_json = [
    {
      "role": "system",
      "content": "{{instruction_msg}}\n--------------------------------------------------"
                  "----------------------------------------------------------------------\n\nContent:-{{content}}"
    }
  ]
instruction_msg = "Given an markdown for a possible table of content for a document, understand the text and identify table of contents with correct heading and subheadings.  Please note that there may be some extra info in the input text, which may not be needed for the index, use you knowledge to decide what to include in the index.\nFigure out add the parents of each subheading and return a lookup table map, which maps a heading to its hierarchical heading with all the parents appended as prefix.  \nCHILD HEADING SHOULD BE PRESENT IN THE VALUE ALWAYS.\nMap should be like:-\n{\n\"Child heading 1\": \"prefix1 prefix2 Child heading 1\",\n\"Child heading 2\": \" \"<prefix1 prefix2 Child heading 2\",\n...\n}"
openai_client = AsyncOpenAI(
            base_url= open_ai_conf.get("API_BASE", ""),
            api_key= open_ai_conf.get("API_KEY", ""),
            max_retries=open_ai_conf.get("MAX_RETRIES", 0),
        )
common_index_tag = "a"


async def parse_html(file_path):
    # Opening the html file
    HTMLFile = open(file_path, "r")
    # Reading the file
    index = HTMLFile.read()
    return index

def replace_backslashes(input_string):
    pattern = r'\\\\{2,}'
    # Define the replacement string
    replacement = r'\\\\'
    return re.sub(pattern, replacement, input_string)
def clean_json(json_str):
    data = dict(dirtyjson.loads(json_str))
    json_string = data.get("raw_data", "")
    json_string = json_string.replace("\n","").replace("\t","")
    json_string = re.sub(r'(?<!\\)\\(?!["\\/bfnrt]|u[0-9a-fA-F]{4})', r'', json_string)
    json_string = replace_backslashes(json_string)
    # raw_data = json_string.replace("\\\\\\\\","\\\\")
    # raw_data = raw_data.replace("\\\\\\","\\\\")
    data['raw_data'] = json.loads(json_string)
    return data


# # Example JSON string with backslashes
# json_str = '{"key": "value\\with\\backslashes"}'
#
# # Remove backslashes using regex
# json_str_without_backslashes = re.sub(r'\\', '', json_str)
#
# # Convert the modified JSON string back to a dictionary
# json_dict = json.loads(json_str_without_backslashes)
# Clean the JSON string





async def parse_json(file_path):
    # Opening the html file
    with open(file_path, 'r') as file:
        data = file.read()
        cleaned_json = clean_json(data)
        raw_data = cleaned_json.get("raw_data", {})
        layout_items = raw_data.get("layoutItems",[])
        html_string = ""
        for item in layout_items:
            if item.get("type","") in ["RICH_TEXT_AREA","TEXT"] :
                if item.get("value", ""):
                    html_string += item.get("value")
    return html_string
async def extract_toc (soup_obj):
    index_tags = ['ul']
    toc_html = list()
    for tag in index_tags:
        toc_html.append(soup_obj.find(tag))
    return toc_html

class OpenaiResponseHandler:
    def __init__(self, response):
        self.response = response

    def get_raw_format(self):
        return self.response

    def get_json_format(self):
        chat_id = self.response.id
        completion_usage_dict = self.response.usage.__dict__
        json_str = json.dumps(completion_usage_dict)
        choices = []
        completion_usage_dict = self.response.usage.__dict__
        json_str = json.dumps(completion_usage_dict)
        if self.response.choices:
            for choice in self.response.choices:
                choice_data = {
                    'message': {
                        'content': choice.message.content,
                        'role': choice.message.role,
                    }
                }
                choices.append(choice_data)
        output = {
            'chat_id': chat_id,
            'choices': choices,
            'usage': json_str
            # Include other fields attributes as needed
        }
        return output


async def get_llm_response(content, instruction_msg):
    curr_prompt = copy.deepcopy(prompt_json)
    content_template = curr_prompt[0].get("content","")
    content_template =content_template.replace("{{instruction_msg}}",instruction_msg).replace("{{content}}",content)
    curr_prompt[0]["content"] = content_template
    model = open_ai_conf.get("model")
    timeout = open_ai_conf.get("timeout")
    max_tokens = open_ai_conf.get("max_tokens")
    temperature = open_ai_conf.get("temperature")
    top_p = open_ai_conf.get("top_p")
    request_payload = dict(model=model,
                           messages=curr_prompt,
                           temperature=temperature,
                           max_tokens=max_tokens,
                           top_p=top_p,
                           frequency_penalty=open_ai_conf.get('frequency_penalty', 0),
                           presence_penalty=open_ai_conf.get('presence_penalty', 0),
                           timeout=timeout)
    print('**Open AI Request {}'.format(request_payload))
    start_time = time.time()
    completion = await openai_client.chat.completions.create(**request_payload)
    openai_response_handler = OpenaiResponseHandler(completion)

    completion_json_format = openai_response_handler.get_json_format()
    print("Time taken in one OpenAI call {}".format(time.time()-start_time))
    print('**Open Ai Response** {}'.format(completion_json_format))
    return completion_json_format

def find_first_leaf_by_text(soup, text):
    # Find all elements containing the text
    matching_elements = soup.find_all(text=lambda t: text in t)
    for element in matching_elements:
        # Check if the element is a leaf node
        if not element.find_parents():
            return element
        parent = element.parent
        # Ensure it has no child tags (leaf node)
        if parent and not parent.find(True):
            return parent
    return None
async def fetch_lookup_from_llm_response(llm_response,toc_html):
    lookup_string = llm_response.get("choices",[])[0].get("message",{}).get("content","")
    lookup_json = json.loads(lookup_string)
    lookup_with_id = dict()
    heading_ids = dict()
    #list of tocs, usually single
    for key, value in lookup_json.items():
        if lookup_with_id.get(key) is None:
            for toc in toc_html:
                anchor_tag = toc.find(common_index_tag, string=key)
                if anchor_tag:
                    heading_id =anchor_tag['href']
                    lookup_with_id[key] = dict(value = lookup_json[key], heading_id = heading_id)
                    heading_ids[heading_id] = True
    # stripped_lowercased_lookup = {key.strip().lower(): value for key, value in lookup_json.items()}
    return lookup_with_id, heading_ids

# Define a condition for text replacement
def replace_heading_conditionally(current_text, index_lookup_table, heading_start, heading_end ):
    if current_text.lower() in index_lookup_table:
        print(current_text)
        return heading_start + " " + index_lookup_table[current_text.lower()]+ " " + heading_end
    return current_text
def enrich_page_html(soup_object, index_lookup_table, heading_start, heading_end):
    heading_tags = ["h1","h2","h3","table"]
    # "div -> b"
    # Find all h1, h2, h3, and table elements with border="0"
    elements = soup_object.find_all(heading_tags)

    # Filter tables to include only those with border="0"
    filtered_elements = []
    for element in elements:
        if element.name == 'table' and element.get('border') == '0':
            filtered_elements.append(element)
        elif element.name in ['h1', 'h2', 'h3']:
            filtered_elements.append(element)

    # Extract and print text from the filtered elements
    for element in filtered_elements:
        if element.name == 'table':
            for child in element.find_all(text=True):
                current_text = child.strip()
                new_text = replace_heading_conditionally(current_text, index_lookup_table, heading_start, heading_end)
                child.replace_with(new_text)
        else:
            current_text = element.get_text(strip=True)
            new_text = replace_heading_conditionally(current_text, index_lookup_table, heading_start, heading_end)
            element.string = new_text
    return soup_object


def check_tag(tag, heading_ids):
    if tag.name == "a" and heading_ids.get("#" + str(tag.get("id", ""))):
        return True

    for child in tag.children:
        if hasattr(child, 'children'):  # Ensure the child is a tag and not a string or comment
            if(check_tag(child, heading_ids)):
                print(f"Found a match inside : {tag}")
                return check_tag(child, heading_ids)
    return False
def collect_intermediate_tags(soup, start_tag, heading_ids):
    current_tag = start_tag
    intermediate_tags = ""
    if start_tag.name == 'h3' and start_tag.find('a', id="Researching_a_Transaction") is not None:
        print("found a parent")
    current_tag = current_tag.find_next()
    # Navigate through the document from start_tag to end_tag
    while current_tag:
        if check_tag(current_tag, heading_ids):
            break
        if current_tag.parent and current_tag.parent.get("added_as_content"):
            print("Content already added")
        else:
            intermediate_tags += str(current_tag)
        current_tag['added_as_content'] = True
        current_tag = current_tag.find_next()
    return intermediate_tags
def extract_chunks_using_heading_id(soup, lookup_table,  heading_ids):
    chunks = list()
    for key, item in lookup_table.items():
        if type(item)==dict:
            heading_id = item['heading_id'].lstrip('#')  # Remove the leading '#' for id lookup
            new_value = item['value']
            # Find the anchor tag with the specified id
            anchor_tag = soup.find('a', id=heading_id)
            if anchor_tag:
                parent = anchor_tag.parent
                if parent:
                    # Replace the entire text of the parent element with new value
                    content_html = collect_intermediate_tags(soup, anchor_tag,heading_ids)
                    # content_html = str(content) for content in content_html
                    # parent.string = new_value
                    chunks.append(dict(heading = new_value, content = content_html))
    return chunks

def extract_content_between_headings(soup, lookup_table):
    # List to store the extracted content
    extracted_content = []

    # Convert lookup table to a list of (heading_id, value) tuples
    headings = [(item['heading_id'].lstrip('#'), item['value']) for item in lookup_table.values()]

    # Iterate through the headings and extract content between them
    for i, (heading_id, heading_value) in enumerate(headings):
        # Find the current heading tag
        current_heading_tag = soup.find('a', id=heading_id)
        if current_heading_tag == None:
            continue
        # Determine the next heading tag if it exists
        next_heading_tag = None
        if i + 1 < len(headings):
            next_heading_id = headings[i + 1][0]
            next_heading_tag = soup.find('a', id=next_heading_id)

        # Extract content between the current heading and the next heading
        content = []
        sibling = current_heading_tag.find_next_sibling()
        while sibling and sibling != next_heading_tag:
            content.append(str(sibling))
            sibling = sibling.find_next_sibling()

        # Join the content and store it with the heading value
        content_str = ''.join(content).strip()
        extracted_content.append(dict(heading = heading_value, content =content_str))

    return extracted_content

def split_into_chunks(text, heading_start, heading_end):
    raw_chunks = text.split(heading_start)
    chunks = list()
    for raw_chunk in raw_chunks:
        splitted_chunk = raw_chunk.split(heading_end)
        heading = ""
        if len(splitted_chunk)==1:
            content = splitted_chunk[0]
        else:
            heading = splitted_chunk[0]
            content = splitted_chunk[1]
        chunks.append(dict(heading = heading, content = content))
    return chunks

async def convert_to_SA_format(chunks, **kwargs):
    data_list = list()
    for chunk in chunks:
        data = {
            "title" : chunk.get("heading", kwargs.get("filename","")),
            "content": chunk.get("content"),
            "url": kwargs.get("url",""),
            "meta_data":kwargs.get("meta_data",{}),
            "doc_name" : kwargs.get("filename","")
        }
        data_list.append(data)
    return data_list
def convert_chunks_to_markdown(chunks):
    for chunk in chunks:
        if chunk.get("content",""):
            chunk['content'] = md(chunk.get('content'))
    return chunks
async def extract_chunks(input_html, **kwargs):
    soup =  BeautifulSoup(input_html, 'html.parser')

    # todo Clean the html before sending to LLM
    # for tag in soup(["script", "style", "header", "footer"]):
    #     tag.decompose()

    #todo Identify and Extract ToC for the index
    toc_html = await extract_toc(soup)
    index_html_as_string = [str(toc) for toc in toc_html]
    index_as_markdown = md("\n".join(index_html_as_string))
    #todo Make LLM call using the above html to get a lookup table of headings-> hierarchical heading - make this configurable to support any model with/without proxy
    llm_response = await get_llm_response(index_as_markdown, instruction_msg)
    # llm_response = {'chat_id': 'chatcmpl-9RNlfE9CwAq4aC4dPiJbNWcndBy8H', 'choices': [{'message': {'content': '{\n"Overview": "Overview",\n"When to submit a dispute using EDGE/Disputes Tool": "Overview When to submit a dispute using EDGE/Disputes Tool",\n"Researching a transaction": "Overview Researching a transaction",\n"Important tips before submitting a dispute": "Overview Important tips before submitting a dispute",\n"Timeframe for PNC to investigate and resolve customer debit/banking card disputes": "Overview Timeframe for PNC to investigate and resolve customer debit/banking card disputes",\n"About debit/banking card disputes": "Overview About debit/banking card disputes",\n"Disputing a higher number of transactions": "Overview About debit/banking card disputes Disputing a higher number of transactions",\n"Debit/banking card dispute resolution": "Overview Debit/banking card dispute resolution",\n"Assisting customers with questions or updates on existing disputes": "Overview Assisting customers with questions or updates on existing disputes",\n"How To": "How To",\n"Submit or research a dispute using the Disputes Tool": "How To Submit or research a dispute using the Disputes Tool",\n"ACH credit": "How To Submit or research a dispute using the Disputes Tool ACH credit",\n"ACH debit (electronic withdrawal, other than PNC Online Banking)": "How To Submit or research a dispute using the Disputes Tool ACH debit (electronic withdrawal, other than PNC Online Banking)",\n"CD credits and debits (transfers in to fund the account from an external account, transfers out for interest paid or funds withdrawn to an external account)": "How To Submit or research a dispute using the Disputes Tool CD credits and debits (transfers in to fund the account from an external account, transfers out for interest paid or funds withdrawn to an external account)",\n"Debit/banking card (ATM, PIN point-of-sale or non-PIN point-of-sale) or card-free (ATM)": "How To Submit or research a dispute using the Disputes Tool Debit/banking card (ATM, PIN point-of-sale or non-PIN point-of-sale) or card-free (ATM)",\n"Deposit, check or teller withdrawal": "How To Submit or research a dispute using the Disputes Tool Deposit, check or teller withdrawal",\n"Digital cards in a mobile wallet (for example, Apple Pay)": "How To Submit or research a dispute using the Disputes Tool Digital cards in a mobile wallet (for example, Apple Pay)",\n"Mobile deposit and PNC Remote Deposit": "How To Submit or research a dispute using the Disputes Tool Mobile deposit and PNC Remote Deposit",\n"Zelle®": "How To Submit or research a dispute using the Disputes Tool Zelle®",\n"Check due to fraud/endorsement issues": "How To Submit or research a dispute using the Disputes Tool Check due to fraud/endorsement issues",\n"Altered check": "How To Submit or research a dispute using the Disputes Tool Check due to fraud/endorsement issues Altered check",\n"Payee did not receive funds (forged endorsement)": "How To Submit or research a dispute using the Disputes Tool Check due to fraud/endorsement issues Payee did not receive funds (forged endorsement)",\n"Counterfeit check": "How To Submit or research a dispute using the Disputes Tool Check due to fraud/endorsement issues Counterfeit check",\n"Forged maker signature": "How To Submit or research a dispute using the Disputes Tool Check due to fraud/endorsement issues Forged maker signature",\n"Unauthorized signature": "How To Submit or research a dispute using the Disputes Tool Check due to fraud/endorsement issues Unauthorized signature",\n"Unauthorized remotely generated check": "How To Submit or research a dispute using the Disputes Tool Check due to fraud/endorsement issues Unauthorized remotely generated check",\n"None of the above": "How To Submit or research a dispute using the Disputes Tool Check due to fraud/endorsement issues None of the above",\n"Dispute and research video banking machine (VBM) transactions": "How To Dispute and research video banking machine (VBM) transactions",\n"Identify a VBM transaction": "How To Dispute and research video banking machine (VBM) transactions Identify a VBM transaction",\n"Research a VBM transaction": "How To Dispute and research video banking machine (VBM) transactions Research a VBM transaction",\n"File a dispute": "How To Dispute and research video banking machine (VBM) transactions File a dispute",\n"Submit a dispute": "How To Dispute and research video banking machine (VBM) transactions Submit a dispute",\n"Email templates": "How To Dispute and research video banking machine (VBM) transactions Email templates",\n"Submit a dispute on a purged account": "How To Submit a dispute on a purged account",\n"Submit a dispute for something not covered": "How To Submit a dispute for something not covered",\n"Other Considerations": "Other Considerations",\n"Assist customers with filing debit card disputes through Online Banking": "Other Considerations Assist customers with filing debit card disputes through Online Banking",\n"Customer requests assistance completing the debit/banking card dispute questionnaire": "Other Considerations Customer requests assistance completing the debit/banking card dispute questionnaire",\n"Customer requests assistance returning the debit/banking card dispute questionnaire or supplemental documents for their debit/banking card dispute": "Other Considerations Customer requests assistance returning the debit/banking card dispute questionnaire or supplemental documents for their debit/banking card dispute",\n"If the customer\'s transaction doesn\'t display in Transaction History": "Other Considerations If the customer\'s transaction doesn\'t display in Transaction History",\n"When to submit a dispute with Centralized Reconcilement Services for a Video Banking transaction": "Other Considerations When to submit a dispute with Centralized Reconcilement Services for a Video Banking transaction",\n"When immediate provisional credit isn\'t issued but the customer expresses a financial hardship": "Other Considerations When immediate provisional credit isn\'t issued but the customer expresses a financial hardship",\n"Interest adjustments for Reg E disputes": "Other Considerations Interest adjustments for Reg E disputes",\n"Supporting Resources": "Supporting Resources",\n"Attachment": "Attachment",\n"Adjustments email template": "Attachment Adjustments email template",\n"ATM Reconcilement and Adjustments email template": "Attachment ATM Reconcilement and Adjustments email template",\n"REG E email template": "Attachment REG E email template"\n}', 'role': 'assistant'}}], 'usage': '{"completion_tokens": 1347, "prompt_tokens": 1061, "total_tokens": 2408}'}
    index_lookup_table, heading_ids = await fetch_lookup_from_llm_response(llm_response, toc_html)
    print(index_lookup_table)
    #todo Enrich the page html using the lookup table from the LLM response and add marker for splitting
    heading_start = "^<<^"
    heading_end = "^>>^"
    extracted_chunks = extract_chunks_using_heading_id(soup,index_lookup_table,heading_ids)
    markdown_chunks = convert_chunks_to_markdown(extracted_chunks)
    # enriched_html = enrich_page_html(soup, index_lookup_table, heading_start, heading_end)
    # html_as_markdown = md(str(enriched_html))
    #todo Split the html into chunks based on the marker
    # chunks = split_into_chunks(html_as_markdown, heading_start, heading_end)
    # extracted_chunks = extract_content_between_headings(enriched_html, index_lookup_table)

    sa_structured_data = await convert_to_SA_format(markdown_chunks, **kwargs)
    return sa_structured_data

async def save_json(output_file_path, json_output):
    async with aiofiles.open(output_file_path, 'w') as json_file:
        await json_file.write(json.dumps(json_output, indent=4))

async def helper(input_directory_path, output_directory_path):
    os.makedirs(output_directory_path, exist_ok=True)
    input_html_directory_path = os.path.join(input_directory_path, "html")
    # Create a list of tasks for processing and saving files
    tasks = []
    # Loop through all files in the directory
    for filename in os.listdir(input_directory_path):
        file_path = os.path.join(input_directory_path, filename)
        input_html = ""
        if os.path.isfile(file_path) and file_path.endswith('.json'):
            html_input_file_path = os.path.join(input_html_directory_path, f"{os.path.splitext(filename)[0]}_html.html")
            if os.path.exists(html_input_file_path):
                print(f"The file '{html_input_file_path}' already exists.")

            else:
                # Open the file in write mode
                parsed_html = await parse_json(file_path)
                with open(html_input_file_path, 'w') as file:
                    # Write the HTML string to the file
                    file.write(parsed_html)
                print(f"HTML content has been written to '{html_input_file_path}'.")

    for filename in os.listdir(input_html_directory_path):
        html_input_file_path = os.path.join(input_html_directory_path, filename)
        input_html = await parse_html(html_input_file_path)
        if input_html:
            kwargs = dict()
            kwargs['filename'] = filename.rstrip(".html")
            json_output = await extract_chunks(input_html,**kwargs)
            output_file_path = os.path.join(output_directory_path, f"{os.path.splitext(filename)[0]}_chunks.json")
            # Save the JSON output asynchronously
            await save_json(output_file_path, json_output)
            print(f'Finished processing for {filename}')

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
if __name__ == "__main__":
    # Use argparse to handle command-line arguments
    parser = argparse.ArgumentParser(description="Process HTML files and output JSON files.")
    parser.add_argument("input_directory_path", nargs = '?', type=str, default= "./data/input/", help="Path to the input directory containing HTML files.")
    parser.add_argument("output_directory_path", nargs = '?', type=str, default= "./data/output/",help="Path to the output directory for JSON files.")

    args = parser.parse_args()

    # Run the main function with the parsed arguments
    asyncio.run(helper(args.input_directory_path, args.output_directory_path))