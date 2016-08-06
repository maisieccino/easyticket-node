/*jshint esversion: 6 */
/*jshint node: true */
"use strict";

function throwNotFound (noun) {
    throw new Error(noun + " not found");
}

module.exports = {
    throwNotFound: throwNotFound
};
