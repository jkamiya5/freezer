$(window).load(function () {
    var val = $("#div:first").value;
});


function popUpSelectDialog(type) {

    // ダイアログのメッセージを設定
    var html = $('<div>').load('../contents/dialog/' + type + 'Dialog.html');
    $("#show_dialog").html(html);

    var makerName = "";
    switch (type) {
        case "maker": makerName = "メーカー"; break;
        case "energySave": makerName = "省エネ評価"; break;
        default: ; break;
    }

    // ダイアログを作成
    $("#show_dialog").dialog({
        title: makerName,
        modal: true,
        buttons: {
            "OK": function () {
                getSelectedValue(type);
                $(this).dialog("close");
            },
        }
    });
}

function getSelectedValue(type) {

    var cbxId = "";
    switch (type) {
        case "maker": cbxId = "makerCbx"; break;
        case "energySave": cbxId = "energySaveCbx"; break;
        default: ; break;
    }
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
    var seleted = [];

    $(obj).each(function () {
        seleted.push($(this).parent('li').text());
    });

    if (seleted.length == 0) {
        return;
    }

    var hiddenVal = [];
    $('td:eq(' + index + ')', 'tbody tr').each(function () {
        if (isContains(seleted, this) && $(this).parent().is(':visible')) {
            $(this).parent().show();
            hiddenVal.push($(this).text());
        } else {
            $(this).parent().hide();
        }
    })
    var hidden = "[name='" + target + "']:hidden";
    $(hidden).val(hiddenVal);
}
