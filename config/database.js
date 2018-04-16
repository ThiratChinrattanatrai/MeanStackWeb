module.exports = {
    // database: 'mongodb://<admin>:<password>@ds135179.mlab.com:35179/meandb',
    database: process.env.DB_CONNECTION,
    secret: 'abc123-'
}