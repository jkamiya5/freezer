var cbxId = '';

function popUpSelectDialog(type) {

    var titleval = "";
    switch (type) {
        case "maker": titleval = "メーカー"; cbxId = "makerCbx"; break;
        case "energySave": titleval = "省エネ評価"; cbxId = "energySaveCbx"; break;
        default: ; break;
    }

    // ダイアログを作成
    $("#show_dialog").dialog({
        title: titleval,
        modal: true,
        buttons: {
            "OK": function () {
                getSelectedValue(cbxId);
                $(this).dialog("close");
            },
        },
        open: function () {
            initAction(cbxId, this, type);
        }
    });
}

function getSelectedValue(cbxId) {


    var item = {};
    var items = [];
    item.name = 'makerCbx';
    item.index = '1';
    items.push(item);
    item = {};
    item.name = 'energySaveCbx';
    item.index = '4';
    items.push(item);

    for (var it in items) {
        filterAction(items[it].name, items[it].index);
    }

}

function isContains(seleted, target) {

    for (var s in seleted) {

        if (jQuery.trim(seleted[s]) == target.innerText) {

            return true;

        }
    }

}

function filterAction(target, index) {

    var obj = "[name='" + target + "']:checked";
    var selected = [];

    $(obj).each(function () {
        selected.push($(this).parent('li').text());
    });

    if (selected.length == 0) {
        return;
    }

    var hiddenVal = [];
    $('td:eq(' + index + ')', 'tbody tr').each(function () {
        if (isContains(selected, this) && $(this).parent().is(':visible')) {
            //if (isContains(selected, this)) {
            $(this).parent().show();
            hiddenVal.push($(this).text());
        } else {
            $(this).parent().hide();
        }
    })
    var hidden = "[name='" + target + "']:hidden";
    $(hidden).val(hiddenVal);
}


function initAction(cbxId, myObj, type) {

    // ダイアログのメッセージを設定
    if ($("#show_dialog").find('[name=' + type + 'Cbx]').length != 0) {
        return;
    }
    var html = $('<div>').load('../contents/dialog/' + type + 'Dialog.html');
    $("#show_dialog").html(html);
}


$(function () {
    $('td:contains(東芝)').click(function () {
        $('<p>Hello World!!!</p>').appendTo('body');
    });
});