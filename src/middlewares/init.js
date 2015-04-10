/**
 * Created by OS on 3/21/15.
 */
var express = require('express');

module.exports = function (app) {
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.multipart());
};