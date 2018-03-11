const moment = require('moment');
const r = require('rethinkdbdash')({
    db: 'hackathon',
    servers: [
        {host: 'localhost', port: 28015}
    ],
    // ssl: { rejectUnauthorized: false }
});

//ssh -L28015:databases-internal.hackathon.venom360.com:28015 neat-donkey.hackathon.venom360.com
/*const r = require('rethinkdb');
const conn = r.connect({
    db: 'hackathon',
    host: 'localhost',
    port: 28015
}, function(err, conn) {

});*/

const Apis = function () {
};

Apis.prototype.getLogs = function (request, callback) { //'/api/v1.1/application' //'/api/v1.1/collection', property
    const params = request.query;
    console.log(params);
    /*const min = moment.utc(params.min, moment.ISO_8601);
    const max = moment.utc(params.max, moment.ISO_8601);
    console.log(min, max);*/
    r.table('logs')
    // .get('b78835b8-1807-400c-9495-7621ff90bf81')
    // .getAll('contentLength')
    // .filter({level: 30,region: "us-west-2"})
    // .skip(3)
    // .pluck('req')
    // .limit(2)
        .run()
        .then(function (response) {
            // console.log(response);
            callback(response);
        })
        .error(function (err) {
            console.log(err);
            callback(err);
        })
};

Apis.prototype.getLogsCount = function (request, callback) { //'/api/v1.1/application' //'/api/v1.1/collection', property
    const params = request.query;
    const filer = {req: {method: 'GET'}};
    const searchString = params.searchString;
    console.log('params 1', params);
    r.table('logs')
        .between(params.min, params.max, {index: 'time'})
        .pluck({res: {statusCode: true}, req: {url: true, method: true}, time: true})
        .filter(filer)
        .filter(function (doc) {
            return doc('req').pluck('url').values().contains(function (v) {
                return v.match("i?" + searchString)
            })
        })
        .run()
        .then(function (response) {
            const retObj = {
                status: true,
                count: response.length,
            };
                callback(retObj);
        })
        .error(function (err) {
            console.log(err);
            callback({status: false});
        })
};

Apis.prototype.getLogsData = function (request, callback) { //'/api/v1.1/application' //'/api/v1.1/collection', property
    const params = request.query;
    const filer = {req: {method: 'GET'}};
    const searchString = params.searchString;
    console.log('params 2', params);
    r.table('logs')
        .between(params.min, params.max, {index: 'time'})
        .pluck({res: {statusCode: true}, req: {url: true, method: true}, time: true})
        .filter(filer)
        .filter(function (doc) {
            return doc('req').pluck('url').values().contains(function (v) {
                return v.match("i?" + searchString)
            })
        })
        // .group(function (item) {
        //     return item.pluck('')
        // })
        .skip(Number(params.page))
        .limit(Number(params.size))
        .run()
        .then(function (response) {
            // console.log(response);
            /* const analytics = {};
             const urls = [];
             for(let i = 0;i<response.length;i++) {
                 console.log(response[i].req.url);
                 // if(urls[response[i]])
             }*/
            var retObj = {
                status: true,
                count: response.length,
                data: response
            };
            callback(retObj);
        })
        .error(function (err) {
            console.log(err);
            callback({status: false});
        })
};

Apis.prototype.insert = function (callback) {
    r.table("logs")
        .insert([{}])
        .run()
        .then(function (response) {
            console.log('Success ', response);
            callback(response);
        })
        .error(function (err) {
            console.log('error occurred ', err);
            callback(err);
        })
};

module.exports = new Apis();