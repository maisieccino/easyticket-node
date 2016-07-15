// EasyTicket Config File.

var development = {
    'db': {
        'host': '127.0.0.1',
        'user': 'postgres',
        'pass': 'hunter2',
        'dbname': 'easyticket'
    }
};

var production = {
    'db': {
        'host': '127.0.0.1',   // The host where the db is located.
        'user': 'postgres',    // The username to connect to the db.
        'pass': 'hunter2',     // The user's password.
        'dbname': 'easyticket' // The name of the db.
    }
}; // for now.

module.exports = (process.env.NODE_ENV === 'development')? development : production;
