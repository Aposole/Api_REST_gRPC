# Project
# Microservices Project

This project implements a microservices architecture using gRPC, REST, and GraphQL. It consists of several microservices for managing games.

## Features

- gRPC service for game management
- REST API for game retrieval, creation, update, and deletion
- GraphQL API for game querying

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Aposole/microservices-project.git

cd microservices-project
npm install
node apiGateway.js

USAGE:
REST API
The REST API provides endpoints for game management:

Retrieve all games: Make a GET request to http://localhost:3000/games. 
  It returns a list of all games.

Retrieve a game by ID: Make a GET request to http://localhost:3000/games/:id,
  where :id is the ID of the game you want to retrieve. It returns the game details.

Create a new game: Make a POST request to http://localhost:3000/games 
  with the game data in the request body. It creates a new game and returns the created game object.

Update a game by ID: Make a PUT request to http://localhost:3000/games/:id, 
  where :id is the ID of the game you want to update. Include the updated game data in the request body. It updates the game and returns the updated game object.

Delete a game by ID: Make a DELETE request to http://localhost:3000/games/:id,
  where :id is the ID of the game you want to delete. It deletes the game and returns a success message.
query {
  games {
    id
    title
    description
  }
}

License :This project is licensed under the MIT License.

Feel free to modify the content and add more sections as needed to provide 
comprehensive information about your microservices project.




