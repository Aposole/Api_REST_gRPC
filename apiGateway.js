const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require ('@apollo/server/express4');
const bodyParser = require('body-parser');
const cors = require('cors');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');


const gameProtoPath = 'game.proto';

const resolvers = require('./resolvers');
const typeDefs = require('./schema');


const app = express();
app.use(bodyParser.json());

const gameProtoDefinition = protoLoader.loadSync(gameProtoPath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  });
  
  const gameProto = grpc.loadPackageDefinition(gameProtoDefinition).game;
 
  const clientGames = new gameProto.GameService('localhost:50051', grpc.credentials.createInsecure());
  

  


const server = new ApolloServer({ typeDefs, resolvers });

server.start().then(() => {
    app.use(
        cors(),
        bodyParser.json(),
        expressMiddleware(server),
      );
  });


app.get('/games', (req, res) => {
  clientGames.searchGames({}, (err, response) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(response.games);
      }
    });
  });

  app.post('/game', (req, res) => {
    const {id, title, description} = req.body;    
    clientGames.creategame({game_id: id, title: title, description: description}, (err, response) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(response.game);
      }
    });
  });
  app.get('/games/:id', (req, res) => {
    const id = req.params.id;
    clientGames.getGame({ gameId: id }, (err, response) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(response.game);
      }
    });
  });
  


const port = 3000;
app.listen(port, () => {
  console.log(`API Gateway running on port ${port}`);
});