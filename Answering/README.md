# Node.js Public Utility API

This Node.js public utility provides the capability to interact with any custom LLM for answering of your choice. Here we are integrating OpenAI for answering.

## Project Structure

- Answering
    - base.js
    - config/
        - answer.json
    - src/
        - routes/
            - utilityRoutes.js
        - controllers/
            - utilityController.js
    - constants/
        - answerRequest.js
    - server.js
    - package.json

## Getting Started

### 1. Clone the Repository

git clone git@github.com:Koredotcom/SearchAssist-Toolkit.git

cd Answering

### 2. Install Dependencies

npm install

### 3. Run the Server
node server.js

The server will be running on http://localhost:3000.

## API Endpoints

### Answer Endpoint
POST /searchassistapi/answer

Accepts a request payload and queries OpenAI for an answer.

## Example Payload:

json
{
  "prompt": "Tell me about",
  "max_tokens": 100
}

## Configuration

Update OpenAI API endpoint and key in config/answer.json.

## Usage Examples

### Answer Endpoint:

curl -X POST -H "Content-Type: application/json" -d '{"prompt": "Tell me about", "max_tokens": 100}' http://localhost:3000/searchassistapi/answer

## Contributing
Feel free to contribute to this project. Create a fork, make your changes, and submit a pull request.
