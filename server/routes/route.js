const express = require('express');
const api = require('../apis/logsApis');

const router = express.Router();

router.get('/logs/rethinkdb', function (request, result) {
    api.getLogs(request, function (succcess) {
    // api.insert(function (succcess) {
        result.send(succcess);
    });
});

router.get('/logs/count', function (request, result) {
    api.getLogsCount(request, function (succcess) {
        // api.insert(function (succcess) {
        result.send(succcess);
    });
});

router.get('/logs/data', function (request, result) {
    api.getLogsData(request, function (succcess) {
        // api.insert(function (succcess) {
        result.send(succcess);
    });
});

module.exports = {
    OpenRouter: router
};