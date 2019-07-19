function andAction() {
    if (window.android != null && typeof(window.android) != "undefined") {
        var finalInfo = new Object();//将对象转换为json格式
        var finalInfoStr = JSON.stringify(finalInfo);
        window.android.finshCallBack(finalInfoStr);
    } else {
        //            alert(typeof(window.android));
    }
}
function toIOS() {
    window.webkit.messageHandlers.APP.postMessage({})
}