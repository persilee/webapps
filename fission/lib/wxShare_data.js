var wxdata = {
    wx_account : new Array(4),
    wx_share : new Array(4),

    // 获取access_token
    get_access_token : function (topBranchNo,imgUrl){
        console.log(topBranchNo);
        $.ajax({
            type : "GET",
            url :  "http://new.iccm.yiyoupay.net/wxSer/getticket.do?topBranchNo="+topBranchNo,
            cache : false,
            async : false,
            success : function(msg) {
                console.log(msg);
                if(msg.respCode=="00"){

                    var timestamp = wxdata.create_timestamp();     // timestamp
                    var noncestr = wxdata.create_noncestr();       // noncestr
                    var url = window.location.href;

                    wxdata.wx_account[0] = msg.data.appid;         // appid
                    wxdata.wx_account[1] = timestamp;              // timestamp
                    wxdata.wx_account[2] = noncestr;               // noncestr
                    wxdata.wx_account[3] = wxdata.create_signature(noncestr, msg.data.ticket ,timestamp ,url);//signature

                    wxdata.wx_share[0] = "http://h5.weiyifu123.com/fission/img/share/bg_share1.png";  // share_img 分享缩略图图片
                    wxdata.wx_share[1] = imgUrl;     //   分享页面的url地址，如果地址无效，则分享失败
                    wxdata.wx_share[2] = "加入微创业，与好友一起赚钱";
                    wxdata.wx_share[3] = "微创业";
                }else{
                    alert(msg.data.respMsg);
                }
            },
            error : function(msg){
                alert("异常",msg);
            }
        });
    },


    // 数据签名
    create_signature : function(nocestr,ticket,timestamp,url){
        // 这里参数的顺序要按照 key 值 ASCII 码升序排序
        var s = "jsapi_ticket=" + ticket + "&noncestr=" + nocestr + "&timestamp=" + timestamp + "&url=" + url;
        return hex_sha1(s);
    },

    // 自定义创建随机串 自定义个数0 < ? < 32
    create_noncestr : function () {
        var str= "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        var val = "";
        for (var i = 0; i < 16; i++) {
            val += str.substr(Math.round((Math.random() * 10)), 1);
        }
        return val;
    },

    // 自定义创建时间戳
    create_timestamp : function () {
        return new Date().getTime().toString().substring(0,10);
    },

	// base64转blob
	dataURLtoBlob : function (dataurl) {
	    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
	        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
	    while(n--){
	        u8arr[n] = bstr.charCodeAt(n);
	    }
	    return new Blob([u8arr], {type:mime});
	}
};

// wxdata.get_access_token("20000029");  // 1
