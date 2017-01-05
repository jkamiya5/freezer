$(function() {
    var tbody = $('<tbody>');
    for (var p = 1; p < 100; p++) {
        var uri = 'http://kakaku.com/kaden/freezer/ranking_2120/?page=' + p;
        $.get(uri, function(data) {
            readPage(tbody, data);
        });
        $("#myTable").append(tbody);
    }
});


function getMakerName(val) {

    var makers = ['シャープ', '三菱電機', 'パナソニック', 'AQUA', '東芝', '日立', 'ハイアール', 'ハイセンス',
        'ユーイング', 'アビテラックス', 'エスキュービズム通商', 'ツインバード',
        '無印良品', 'エレクトロラックス', 'maxzen', '三ツ星貿易', '澤藤電機', 'ノーフロスト',
        'DAEWOO', 'ドメティック', 'フィフティ', 'ダイレイ', 'Whirlpool', 'Sun Ruck', 'ダイキン',
        'mabe', 'RAMASU', 'ベルソス', 'リープヘル', 'SKジャパン', 'モリタ', 'シェルパ', 'ASKO'
    ];

    for (var m in makers) {
        if (val.innerText.indexOf(makers[m]) != -1) {
            return makers[m];
        }
    }
}

function getZeroPadding(number, decimals) {
    var number = String(number);
    if (number.length > decimals) {
        return number;
    }
    return (Math.pow(10, decimals) + number).slice(decimals * -1);
}

function readPage(tbody, data) {

    var domObject = $(data.responseText);
    var rkgBoxName = domObject.find('.rkgBoxName');
    var price = domObject.find('.price');
    var note = domObject.find('.rowDetail');
    var releaseDate = domObject.find('.rkgDate');
    var rankList = domObject.find('.rkgBoxNo').find('.num');
    var info = [];

    for (var i = 0; i < rkgBoxName.length; i++) {

        var rank = rankList[i].innerText;
        var energySave = note[i].innerText.match(/★+/);
        if (energySave == null) {
            energySave = "";
        }

        var size = note[i].innerText.match(/定格内容積：[0-9]+L/);
        if (size == null || size[0] == null) {
            size = "";
        } else {
            size = size[0].replace("定格内容積：", "").replace("L", "");
        }

        var date = releaseDate[i].innerText.replace("発売日：", "").replace("登録日：", "").replace(" ", "");
        date = date.replace("年", "/").replace("月", "/");
        date = date.replace("春", "4");
        date = date.replace("日", "").replace("上旬", "1").replace("中旬", "10").replace("下旬", "20");
        if (date.slice(-1) == "/") {
            date = date + "1";
        }

        var obj = {
            'rkgBoxName': rkgBoxName[i],
            'price': price[i],
            'energySave': energySave,
            'size': size,
            'releaseDate': date,
            'rank': rank
        };
        info.push(obj);
    }

    for (var v in info) {
        var makerName = getMakerName(info[v].rkgBoxName);
        var td = $('<tr />');
        td.append('<td>' + info[v].rank + '</td>');
        td.append('<td>' + makerName + '</td>');
        td.append('<td>' + info[v].rkgBoxName.innerText.replace(makerName, "") + '</td>');
        var pVal = info[v].price.innerText.replace("¥", "").replace(",", "");
        td.append('<td>' + pVal + '</td>');
        td.append('<td>' + info[v].energySave + '</td>');
        td.append('<td>' + info[v].size + '</td>');
        td.append('<td>' + info[v].releaseDate + '</td>');
        tbody.append(td);
    }
}

$(window).load(function() {
    $("#myTable").tablesorter();
});
