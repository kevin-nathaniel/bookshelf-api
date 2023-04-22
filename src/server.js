/* eslint-disable eol-last */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
const Hapi = require('@hapi/hapi');
const routes = require('./routes')

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*']
      }
    }
  });

  // eslint-disable-next-line no-undef
  server.route(routes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
}

init();