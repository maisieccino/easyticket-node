// EasyTicket Config File.

var development = {
    "db": {
        "host": '127.0.0.1',
        "user": "postgres",
        "pass": "hunter2",
        "dbname": "easyticket"
    }
};

var production = {}; // for now.

module.exports = (process.env.NODE_ENV === 'development')? development : production;
