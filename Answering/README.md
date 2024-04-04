# Node.js Public Utility API

This Node.js project provides a simple API for public utility tasks and includes functionality to interact with the OpenAI API for answering queries.

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

git clone <repository_url>
cd <project_folder>

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