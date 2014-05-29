/*jslint node:true*/
module.exports = function (req, res, next) {
    'use strict';
    return req.isAuthenticated() ? next() : res.send(401);
};
