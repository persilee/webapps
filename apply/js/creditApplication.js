//点击银行
//推荐工商
$('.pro_ICBC').click(function() {
	console.log('点击', this)
	if(type = 'pro_ICBC') toApply(type);
});

//中信com_CCB
$('.com_CCB').click(function() {
	console.log('点击', this)
	if(type = 'com_CCB') toApply(type);
});
//光大com_CEB
$('.com_CEB').click(function() {
	console.log('点击', this)
	if(type = 'com_CEB') toApply(type);
});
//交通com_BOCOM
$('.com_BOCOM').click(function() {
	console.log('点击', this)
	if(type = 'com_BOCOM') toApply(type);
});
//浦发com_SPDB
$('.com_SPDB').click(function() {
	console.log('点击', this)
	if(type = 'com_SPDB') toApply(type);
});
//兴业com_CIB
$('.com_CIB').click(function() {
	console.log('点击', this)
	if(type = 'com_CIB') toApply(type);
});
//民生com_CMBC
$('.com_CMBC').click(function() {
	console.log('点击', this)
	if(type = 'com_CMBC') toApply(type);
});
//平安com_PAB
$('.com_PAB').click(function() {
	console.log('点击', this)
	if(type = 'com_PAB') toApply(type);
});
//更多com_More
$('.com_More').click(function() {
	console.log('点击', this)
	if(type = 'com_More') toApply(type);
});

//友禾入口
$('.youHe').click(function() {
	console.log('点击', this)
	if(type = 'youHe') toApply(type);
});

//智还--兴业银行入口
$('.youZh_CIB').click(function() {
	console.log('点击', this)
	if(type = 'youZh_CIB') toApply(type);
});

var merchId, topBranchNo, orderId, transAmt, transTime, fee, clientIdentify, systemModel, systemPhone, lng, lat, platformCode, userId, phone, soureCode;
/* 获取时间*/
var d = new Date();
var times = d.getFullYear() + '' + (d.getMonth() + 1) + '' + d.getDate() + '' + d.getHours() + '' + d.getMinutes() + '' + d.getSeconds();
var href;
//console.log(times);

/*获取url参数*/
(function($) {
	//扩展方法获取url参数  
	$.getUrlParam = function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
		console.log(reg, r);
	}
	//得到url参数  
	merchId = $.getUrlParam('merchId');
	topBranchNo = $.getUrlParam('topBranchNo');
	orderId = $.getUrlParam('orderId');
	transAmt = $.getUrlParam('transAmt');
	transTime = $.getUrlParam('transTime');
	fee = $.getUrlParam('fee');
	clientIdentify = $.getUrlParam('clientIdentify');
	systemModel = $.getUrlParam('systemModel');
	systemPhone = $.getUrlParam('systemPhone');
	lng = $.getUrlParam('lng');
	lat = $.getUrlParam('lat');
	platformCode = $.getUrlParam('platformCode');
	userId = $.getUrlParam('userId');
	phone = $.getUrlParam('phone');
	soureCode = $.getUrlParam('soureCode');
	/*控制显示隐藏内容--主要控制友禾显示*/
	if(topBranchNo == '20000004' || topBranchNo == '20000013' || topBranchNo == '20000022') {
		$('.youheList').show();
	}else if(topBranchNo=='20000006'){
		$('.zhihuanList').show();
	}else {
		$('.commonList').show();
	}
})(jQuery);

//发起请求服务器
function toApply(type) {
	//控制跳转
	//获取参数
	var bankCode = '';
	console.log('bankCode=',bankCode)
	var random = Math.floor(Math.random()*9000+1000)
	console.log('random===',random);
	console.log('orderId',orderId);
	if(orderId == null){
		orderId = times+random
	}else{
		orderId = orderId.substring(0,2)+times+random;
	}
	
	var userType = type.substring(4);
	console.log('userType==',userType);
	if(type.substring(0, 3) == 'com') {
		console.log('通用', type.substring(0, 3));
		
		var platformCode = 'CR010001';
		var soureCode = 'CR010001' + userType;
		//href = 'http://credit.uinpay.cn/yy1_11';
		
		if(type == 'com_CCB') {
			console.log(type)
			href = 'http://credit.uinpay.cn/yy1_11/index_29.html';
		} else if(type == 'com_CEB') {
			console.log(type)
			href = 'http://credit.uinpay.cn/yy1_11/index_23.html';
		} else if(type == 'com_BOCOM') {
			console.log(type)
			href = 'http://credit.uinpay.cn/yy1_11/index_26.html';
		} else if(type == 'com_SPDB') {
			console.log(type)
			href = 'http://credit.uinpay.cn/yy1_11/index_33.html';
		} else if(type == 'com_CIB') {
			console.log(type)
			href = 'http://credit.uinpay.cn/yy1_11/index_24.html';
		} else if(type == 'com_CMBC') {
			console.log(type)
			href = 'http://credit.uinpay.cn/yy1_11/index_25.html';
		} else if(type == 'com_PAB') {
			console.log(type)
			href = 'http://credit.uinpay.cn/yy1_11/index_65.html';
		} else if(type == 'com_More') {
			console.log(type)
			href = 'http://credit.uinpay.cn/yy1_11/more.html';
		}
	} else if(type.substring(0, 3) == 'you') {
		console.log('youhe', type.substring(0, 3));
		var platformCode = 'CR010002';
		var soureCode = type + userType;
		if(type == 'youHe') {
			console.log(type);
			href = 'http://credit.uinpay.cn/yy1_20/';
		}else if(type == 'youZh_CIB'){
			console.log('youZh_CIB',type);
			href = 'https://ccshop.cib.com.cn:8010/application/cardapp/newfast/ApplyCard/toSelectCard?id=6105c3bcc88546b9b72c756ab6f2bf19';
		}
	}else if(type.substring(0,3) == 'pro'){
		var platformCode = 'ICBC1001';
		var userType = type.substring(4)
		var soureCode = platformCode + userType;
		if(type == 'pro_ICBC'){
			console.log('pro_ICBC',type);
			//https://mims.icbc.com.cn/IMServiceServer/servlet/ICBCBaseReqNSServlet?dse_operationName=ApplyCreditCardOp&coreCode=HZDW000007461&paraPromoCode=EW0004600000000R020
			href = 'https://mims.icbc.com.cn/IMServiceServer/servlet/ICBCBaseReqNSServlet?dse_operationName=ApplyCreditCardOp&coreCode=HZDW000007461&paraPromoCode=EW0004600000000R020'
		}
		
	}
	console.log('orderId1',orderId);
	console.log('platformCode',platformCode);
	console.log('soureCode',soureCode);
	//调用 /addRecord.do 通知 后台   生产：http://appsys.yiyoupay.net/appservice/
	//测试 http://121.201.20.239:9710/appservice/
	var url = 'http://apisvr.yiyoupay.net/appservice/merch/addRecord.do'+'?platformCode='+platformCode+'&soureCode='+soureCode+'&orderId='+orderId;
	console.log('1',url);
	$.ajax({
		type: "post",
		url: url,
		data: {
			merchId: merchId,
			topBranchNo: topBranchNo,
//			orderId: orderId,
			transAmt: transAmt,
			transTime: transTime,
			fee: fee,
			clientIdentify: clientIdentify,
			systemModel: systemModel,
			systemPhone: systemPhone,
			lng: lng,
			lat: lat,
//			platformCode: platformCode,
			userId: userId,
//			soureCode: soureCode,
			phone: phone
		},
		success: function(data) {
			console.log(data)
			//console.log('2',url);
			//console.log(data);
		},
		error: function(data) {
			//console.log(data);
		}
	});
	//跳转渠道链接
	window.location.href = href;
	console.log(href);
}
