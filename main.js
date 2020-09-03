var http = require('http');
var fs = require('fs');
var app = http.createServer(function(request,response) {
    var url = request.url;
    if(request.url == '/') {
        url = '/home.html';
    }
    else if(request.url == '/income') {
        url = '/income.html'
    }
    else if(request.url == '/outcome') {
        url = '/outcome.html'
    }
    response.writeHead(200);
    response.end(fs.readFileSync(__dirname + url));
});
app.listen(3000);