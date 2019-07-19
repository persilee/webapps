		
/*宜人贷*/
$('.yiRenDai').click(function() {
	type = 'yiRenDai';
	toApply(type);
});
/*招手贷*/
$('.zhaoShouDai').click(function() {
	type = 'zhaoShouDai';
	toApply(type);
});
/*点融金融*/
$('.rongDian').click(function() {
	type = 'rongDian';
	toApply(type);
});

/*智能贷款*/
$('.autoLoans').click(function() {
	type = 'autoLoans';
	toApply(type);
});


/*变量声明*/
var merchId, topBranchNo, orderId, transAmt, transTime, fee, clientIdentify, systemModel, systemPhone, lng, lat, platformCode, userId, phone, soureCode;
/* 获取时间*/
var d = new Date();
var times = d.getFullYear() + '' + (d.getMonth() + 1) + '' + d.getDate() + '' + d.getHours() + '' + d.getMinutes() + '' + d.getSeconds();
var href;

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
//	platformCode = $.getUrlParam('platformCode');
	userId = $.getUrlParam('userId');
	phone = $.getUrlParam('phone');
//	soureCode = $.getUrlParam('soureCode');
	console.log(times);
	
	console.log('merchId=',merchId)
	console.log('topBranchNo=',topBranchNo);
	
	/*控制显示隐藏内容--主要控制友禾*/
	if(topBranchNo == '20000004'||topBranchNo == '20000006'||topBranchNo == '20000013'||topBranchNo == '20000022'){
		$('.yiRenDai').hide();
//		$('.zhaoShouDai').show();
	}else if(topBranchNo == '20000005'||topBranchNo == '20000011'||topBranchNo == '20000012'||topBranchNo == '20000015'||topBranchNo == '20000017'||topBranchNo == '20000024'||topBranchNo == '20000028'||topBranchNo == '20000030'){
		$('.recommend').hide();
		$('.yiRenDai').show();
	}else{
		$('.recommend').show();
		$('.yiRenDai').show();
//		$('.zhaoShouDai').show();
	}
	
})(jQuery);

function toApply(type) {
	
	//获取参数
	//渠道特殊参数定义  特殊化控制
	var random = Math.floor(Math.random()*9000+1000);
	console.log('random===',random);
	if(type == 'yiRenDai') {
		var platformCode = 'qianmApp';
		orderId = orderId.substring(0,2)+times+random;
		console.log('2222',orderId);
		if(orderId.substring(0, 2).toUpperCase() == 'AN') {
			var soureCode = 'An' + 'YF' + topBranchNo + times;
			href = 'https://html5-v-fastmode.yirendai.com/?clientIdentify=' + clientIdentify + '&systemModel=' + systemModel + '&systemPhone=' + systemPhone + '&lng=' + lng +
				'&lat=' + lat + '&platformCode=' + platformCode + '&userId=' + userId + '&phone=' + phone + '&soureCode=' + soureCode;
		} else if(orderId.substring(0, 2).toUpperCase() == 'IO') {
			var soureCode = 'iOS' + 'YF' + topBranchNo + times;
			href = 'https://html5-v-fastmode.yirendai.com/?clientIdentify=' + clientIdentify + '&systemModel=' + systemModel + '&systemPhone=' + systemPhone + '&lng=' + lng +
				'&lat=' + lat + '&platformCode=' + platformCode + '&userId=' + userId + '&phone=' + phone + '&soureCode=' + soureCode;
		} else if(orderId.substring(0, 2).toUpperCase() == 'WX') {
			var soureCode = 'WX' + 'YF' + topBranchNo + times;
			href = 'https://weixin-v-fastmode.yirendai.com/?platformCode=' + platformCode + '&userId=' + userId + '&phone=' + phone + '&soureCode=' + soureCode;
		}
	} else if(type == 'zhaoShouDai') {
		var platformCode = '015700000000';
//		href = 'http://real.izhongyin.com/wxportal/loans/loansList?org_id=015700000000';
	}else if(type == 'rongDian'){
		var platformCode = 'DRDK1001';
		orderId = orderId.substring(0,2)+times+random;
		if(orderId.substring(0, 2).toUpperCase() == 'AN') {
			var soureCode = 'An' + 'YF' + topBranchNo + times;
			href = 'https://www.dianrong.com/mkt/bor_mojie/index.html?clientsourcetype=BD&referredBy=d_dix01';
		} else if(orderId.substring(0, 2).toUpperCase() == 'IO') {
			var soureCode = 'iOS' + 'YF' + topBranchNo + times;
			href = 'https://www.dianrong.com/mkt/bor_mojie/index.html?clientsourcetype=BD&referredBy=d_dix01';
		} else if(orderId.substring(0, 2).toUpperCase() == 'WX') {
			var soureCode = 'WX' + 'YF' + topBranchNo + times;
			href = 'https://www.dianrong.com/mkt/bor_mojie/index.html?clientsourcetype=BD&referredBy=d_dix01';
		}
	}else if(type == 'autoLoans'){
		//智能贷款
		href = 'http://h5.weiyifu123.com/loans_project/html/loansIndex.html?topBranchNo='+topBranchNo+'&merchId='+userId;
	}
	
	console.log(platformCode,soureCode,orderId);
	//调用 /addRecord.do 通知 后台
	//生产http://appsys.yiyoupay.net/appservice/
	//测试http://121.201.20.239:9710/appservice/
	//最新生产http://apisvr.yiyoupay.net/appservice/
	var url = 'http://api.weiyifu123.com/appservice/merch/addRecord.do';
	$.ajax({
		type: "post",
		url: url,
		data: {
			merchId: merchId,
			topBranchNo: topBranchNo,
			orderId: orderId,
			transAmt: transAmt,
			transTime: transTime,
			fee: fee,
			clientIdentify: clientIdentify,
			systemModel: systemModel,
			systemPhone: systemPhone,
			lng: lng,
			lat: lat,
			platformCode: platformCode,
			userId: userId,
			soureCode: soureCode,
			phone: phone
		},
		success: function(data) {
			console.log(data)
		},
		error: function(data) {

		}
	});
	//跳转渠道链接  http:www.baidu.com?orederid=uyy&
	window.location.href = href;
	console.log('跳转链接==',href)
}

//点融金融
//https://www.dianrong.com/mkt/bor_mojie/index.html?clientsourcetype=BD&referredBy=d_dix01
