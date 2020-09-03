var qs = require('querystring');
var Template = require('./Template');
var db = require('./db');

exports.home = function (request, response) {
    db.query('SELECT (SELECT SUM(price) FROM income) - (SELECT SUM(price) FROM outcome) as balance', function(error, balance) {
        var html = Template.html('', '',balance[0].balance);
        response.writeHead(200);
        response.end(html);
    });
}

exports.income = function (request, response) {
    db.query('SELECT (SELECT SUM(price) FROM income) - (SELECT SUM(price) FROM outcome) as balance', function(error, balance) {
        var form = Template.form_income();
        var html = Template.html('수입', form,balance[0].balance);
        response.writeHead(200);
        response.end(html);
    });
}

exports.income_process = function (request, response) {
    var body = '';
    request.on('data', function (data) {
        body += data;
    });
    request.on('end', function () {
        var post = qs.parse(body);
        var date = new Date(post.date);
        db.query('INSERT INTO income(title, price, calen) VALUES(?, ?, ?)', [post.title, post.price, date.toLocaleDateString()], function (error, result) {
            console.log(result);
            response.writeHead(302, { Location: '/' });
            response.end();
        });
    });
}

exports.outcome = function (request, response) {
    db.query('SELECT (SELECT SUM(price) FROM income) - (SELECT SUM(price) FROM outcome) as balance', function(error, balance) {
        var form = Template.form_outcome();
        var html = Template.html('지출', form,balance[0].balance);
        response.writeHead(200);
        response.end(html);
    });
}

exports.outcome_process = function (request, response) {
    var body = '';
    request.on('data', function (data) {
        body += data;
    });
    request.on('end', function () {
        var post = qs.parse(body);
        var date = new Date(post.date);
        db.query('INSERT INTO outcome(title, target, price, calen) VALUES (?, ?, ?, ?)', [post.title, post.target, post.price, date.toLocaleDateString()], function (error, result) {
            console.log(result);
            response.writeHead(302, { Location: '/' });
            response.end();
        });
    });
}

exports.list = function(request, response) {
    db.query('SELECT (SELECT SUM(price) FROM income) - (SELECT SUM(price) FROM outcome) as balance', function(error, balance) {
        db.query(`(SELECT id,1 AS type,DATE_FORMAT(calen,'%Y-%m-%d') AS calen, title, price FROM income) UNION (SELECT id,2 AS type,DATE_FORMAT(calen,'%Y-%m-%d') AS calen, title, price FROM outcome) order by calen`, function(error2, columns) {
            var table = Template.table(columns);
            var html = Template.html('거래내역', table, balance[0].balance);
            response.writeHead(200);
            response.end(html);
        });
    });
}