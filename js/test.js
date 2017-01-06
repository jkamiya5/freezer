$(window).load(function() {
    var val = $("#div:first").value;
});

// 警告ダイアログの表示（JQuery）
function ShowJQueryAlertDialog() {

    // ダイアログのメッセージを設定
    var html = $('<div>').load('../contents/dialog.html');
    $("#show_dialog").html(html);

    // ダイアログを作成
    $("#show_dialog").dialog({
        title: "メーカー",
        modal: true,
        buttons: {
            "OK": function() {
                $(this).dialog("close");
            },
        }
    });
}
