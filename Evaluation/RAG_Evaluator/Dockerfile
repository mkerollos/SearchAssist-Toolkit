# Use the official Python image from the Docker Hub
FROM python:3.12-slim

# Set the working directory in the container
WORKDIR /app

# Create a requirements.txt file from the pyproject.toml dependencies
COPY pyproject.toml poetry.lock /app/

ENV POETRY_HOME=/opt/poetry
RUN python3 -m venv $POETRY_HOME && \
$POETRY_HOME/bin/pip install poetry==2.0.1 poetry-plugin-export && \
$POETRY_HOME/bin/poetry --version

RUN $POETRY_HOME/bin/poetry export -f requirements.txt --output requirements.txt

# Install the dependencies
RUN pip install -r requirements.txt

# Copy the rest of the application code to the container
COPY . /app
RUN pip install -e .

# Set the entrypoint for the container
# CMD ["python", "main.py"]