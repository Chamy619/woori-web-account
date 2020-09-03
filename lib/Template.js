var db = require('./db');

module.exports = {
    html: function (title, body, balance) {
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Woori-Middle and High School Student-Church</title>
            <link rel="stylesheet" href="http://code.jquery.com/ui/1.8.18/themes/base/jquery-ui.css" type="text/css" />
            <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
            <script src="http://code.jquery.com/ui/1.8.18/jquery-ui.min.js"></script>
            <script>
                $(function () {
                    $("#datepicker").datepicker();
                });
            </script>
        </head>
        <body>
            <h1><a href="/">Woori-Middle and High School Student-Church</a></h1>
            <ol>
                <a href="/income"><li> 수입 </li></a>
                <a href="/outcome"><li> 지출 </li></a>
                <a href="list"><li> 거래 내역 </li></a>
            </ol>
            <p>
                <h3>${title}</h3>
                ${body}
            </p>
            <h3> 잔액 : ${balance}</h3>
        </body>
        </html>
        `
    },

    form_income: function () {
        return `
        <form action="/income_process" method="post">
            <p><input type="text" name="title" placeholder="title"></p>
            <p><input type="text" name="price" placeholder="price"></p>
            <p><input type="text" name="date" id="datepicker" placeholder="choose date"></p>
            <p><input type="submit"></p>
        </form>
        `
    },

    form_outcome: function () {
        return `
        <form action="/outcome_process" method="post">
            <p><input type="text" name="title" placeholder="title"></p>
            <p><input type="text" name="target" placeholder="target"></p>
            <p><input type="text" name="price" placeholder="price"></p>
            <p><input type="text" name="date" id="datepicker" placeholder="choose date"></p>
            <p><input type="submit"></p>
        </form>
        `
    },

    table: function(columns) {
        var table = `<table>
        <tr>
            <th>날짜</th><th>수입/지출</th><th>주제</th><th>금액</th><th>수정</th><th>삭제</th>
        </tr>`;
        for(column in columns) {
            var type='';
            if(columns[column].type == '1') {
                type += '수입';
            }
            else {
                type += '지출';
            }
            table += `<tr><td>${columns[column].calen}</td><td>${type}</td><td>${columns[column].title}</td><td>${columns[column].price}</td>
            <td><form action="/update" method="post"><input type="hidden" name="type" value="${columns[column].type}"><input type="hidden" name="id" value="${columns[column].id}"><input type="submit" value="수정"></from></td>
            <td><form action="/delete" method="post"><input type="hidden" name="type" value="${columns[column].type}"><input type="hidden" name="id" value="${columns[column].id}"><input type="submit" value="삭제"></from></td>
            </tr>`
        }

        table += '</table>'

        return table;
    }
}