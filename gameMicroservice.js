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

const gameService = {
  getGame: (call, callback) => {

    const game = {
      id: call.request.game_id,
      title: 'Example Game',
      description: 'This is an example game.',
  
    };
    callback(null, {game});
  },
  searchGames: (call, callback) => {
    const { query } = call.request;

    const games = [
      {
        id: '1',
        title: 'Example Game 1',
        description: 'This is the first example game.',
      },
      {
        id: '2',
        title: 'Example Game 2',
        description: 'This is the second example game.',
      },

    ];
    callback(null, { games });
  },
  createGame: (call, callback) => {
    const { query } = call.request;
    const game = {
      id: call.request.game_id,
      title: call.request.title,
      description: call.request.description,

    };
    callback(null, {game});
  }

};


const server = new grpc.Server();
server.addService(gameProto.GameService.service, gameService);
const port = 50051;
server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      console.error('Failed to bind server:', err);
      return;
    }
  
    console.log(`Server is running on port ${port}`);
    server.start();
  });
console.log(`Game microservice running on port ${port}`);