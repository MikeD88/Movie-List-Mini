/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
 const connectionString = process.env.DB_CONNECTION_STRING
 console.log('ENVIRONMENT VARIABLES!!!!!!!!!!!!!!', process.env)

module.exports = {

  development: {
    // client: 'postgresql',
    // connection: connectionString,
    client: 'postgresql',
    connection: {
      host: '127.0.0.1',
      port: 5432,
      // port: 49155,
      user: 'postgres',
      password: 'docker',
      database : 'movies_list',
      idleTimeoutMillis: 0,
      connectionTimeoutMillis: 0,
      // charset: 'utf8'
    },
    migrations: {
      directory: __dirname + '/knex/migrations',
    },
    seeds: {
      directory: __dirname + '/knex/seeds'
    }
  }

};
