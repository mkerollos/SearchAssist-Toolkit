import requests

def generate_accessToken():
    url = 'https://login.salesforce.com/services/oauth2/token'
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    payload = {
        'grant_type': 'authorization_code',
        'client_id': 'YOUR_CLIENT_ID',
        'client_secret': 'YOUR_CLIENT_SECRET',
        'redirect_uri': 'YOUR_REDIRECT_URI',
        'code': 'YOUR_AUTHORIZATION_CODE'
    }

    # Make the POST request
    response = requests.post(url, headers=headers, data=payload)

def refreshToken(R_token):
    url = 'https://login.salesforce.com/services/oauth2/token'
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
    payload = {
        'grant_type': 'refresh_token',
        'client_id': 'YOUR_CLIENT_ID',
        'client_secret': 'YOUR_CLIENT_SECRET',
        'refresh_token': 'refresh_token'
    }
    response = requests.post(url, headers=headers, data=payload)

def getKnowledgeList(access_Token):
    url = 'https://.my.salesforce.com/services/data/v57.0/support/'
    headers = {
        'Authorization': 'Bearer {access_Token}',
        'Accept-Language': 'en-US',
    }
    response = requests.get(url, headers=headers)

def KnowledgeArticlesDetailsAPI(access_Token):
    url = 'https://.salesforce.com/services/data/v57.0/sup'
    headers = {
        'Authorization': 'Bearer {access_token}',
        'Accept-Language': 'en-US',
    }
    response = requests.get(url, headers=headers)



accessToken=generate_accessToken()
if (accessToken):
    R_token=accessToken["refreshToken"]
    access_Token=accessToken["accessToken"]
    refreshedToken=refreshToken(R_token)
    knowledgeListData=getKnowledgeList(access_Token)

