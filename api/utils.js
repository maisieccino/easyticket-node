function throwNotFound() {
    const error = new Error();
    error.statusCode = 404;
    throw error;
}

module.exports = {
    throwNotFound: throwNotFound
};
