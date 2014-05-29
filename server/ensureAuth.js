/*jslint node:true*/
'use strict';

module.exports = function (req, res, next) {
    return req.isAuthenticated() ? next() : res.send(401);
};
