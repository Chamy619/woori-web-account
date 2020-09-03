var http = require('http');
var url = require('url');
var play = require('./lib/play');
var Template = require('./lib/Template');

var app = http.createServer(function (request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true);
    var pathname = url.parse(_url, true).pathname;
    if (pathname === '/') {
        play.home(request, response);
    }
    else if (pathname === '/income') {
        play.income(request, response);
    }
    else if (pathname === '/income_process') {
        play.income_process(request, response);
    }
    else if (pathname === '/outcome') {
        play.outcome(request, response);
    }
    else if (pathname === '/outcome_process') {
        play.outcome_process(request, response);
    }
    else if (pathname === '/list') {
        play.list(request, response);
    }
    else {
        response.writeHead(404);
        response.end('Not Found');
    }
});
app.listen(3000);