var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');
var Template = require('./lib//Template');
var mysql = require('mysql');
var db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '111111',
    database : 'woori',
    port : '3307'
});
db.connect();

var app = http.createServer(function (request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true);
    var pathname = url.parse(_url, true).pathname;
    if (pathname === '/') {
        var html = Template.html('','');
        response.writeHead(200);
        response.end(html);
    }
    else if (pathname === '/income') {
        var form = Template.form_income();
        var html = Template.html('수입', form);
        response.writeHead(200);
        response.end(html);
    }
    else if (pathname === '/income_process') {
        var body = '';
        request.on('data', function (data) {
            body += data;
        });
        request.on('end', function () {
            var post = qs.parse(body);
            var date = new Date(post.date);
            console.log(date.toLocaleDateString());
            db.query('INSERT INTO income(title, price, calen) VALUES(?, ?, ?)',[post.title, post.price, date.toLocaleDateString()], function(error, result) {
                console.log(result);
                response.writeHead(302, {Location: '/'});
                response.end();
            });
        });
    }
    else if (pathname === '/outcome') {
        var form = Template.form_outcome();
        var html = Template.html('지출', form);
        response.writeHead(200);
        response.end(html);
    }
    else if (pathname === '/outcome_process') {
        var body = '';
        request.on('data', function(data) {
            body += data;
        });
        request.on('end', function() {
            var post = qs.parse(body);
            var date = new Date(post.date);
            db.query('INSERT INTO outcome(title, target, price, calen) VALUES (?, ?, ?, ?)', [post.title, post.target, post.price, date.toLocaleDateString()], function(error, result) {
                console.log(result);
                response.writeHead(302, {Location: '/'});
                response.end();
            });
        });
    }
    else if (pathname === '/list') {
        
    }
    else {
        response.writeHead(404);
        response.end('Not Found');
    }
});
app.listen(3000);