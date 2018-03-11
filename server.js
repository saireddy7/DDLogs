const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
const app = express();

const apis = require('./server/routes/route');

app.set('port', 3000);
// app.use(morgan('dev'));
app.use(express.static('client', {index: "/views/index.html"}));
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
// app.use(cookieParser());

app.use(function (req, res, next) {
    if (/^\/api\//.test(req.url)) {
        next();
    } else {
        res.sendFile(__dirname + '/client/views/index.html');
    }
});
app.use('/api', apis.OpenRouter);

const server = app.listen(app.get('port'), function () {
    console.log('Listening on port ' + server.address().port);
});