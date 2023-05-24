

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');


const gameProtoPath = 'game.proto';

const gameProtoDefinition = protoLoader.loadSync(gameProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const gameProto = grpc.loadPackageDefinition(gameProtoDefinition).game;
const clientGames = new gameProto.GameService('localhost:50051', grpc.credentials.createInsecure());



const resolvers = {
  Query: {
    game: (_, { id }) => {

      return new Promise((resolve, reject) => {
        clientGames.getGame({ gameId: id }, (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(response.game);
          }
        });
      });
    },
    games: () => {


      return new Promise((resolve, reject) => {
        clientGames.searchGames({}, (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(response.games);
          }
        });
      });
    },
   
  },
  Mutation: {
    createGame: (_, {id, title, description} ) => {
      return new Promise((resolve, reject) => {
        clientGames.createGame({game_id: id, title: title, description: description}, (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(response.game);
          }
        });
      });
    },
    deleteGame: (_, { id }, __) => {
      return new Promise((resolve, reject) => {
        client.deleteGame({ gameId: id }, (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(true);
          }
        });
      });
    },
    updateGame: (_, { game }, __) => {
      return new Promise((resolve, reject) => {
        client.updateGame({ game }, (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(response.game);
          }
        });
      });
    },
  },
  };

module.exports = resolvers;