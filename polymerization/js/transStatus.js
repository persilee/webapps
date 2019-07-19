var stateMsg,times;
var merchId,paytotal,stateCode,msg,ORDER_ID;
$(function(){
	 $.getUrlParam = function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return decodeURI(r[2]);
		return null;
//				console.log(reg, r);
	}
	//得到url参数  
	merchId = $.getUrlParam('merchId');
	paytotal = $.getUrlParam('paytotal');
	stateCode = $.getUrlParam('stateCode');
	msg = $.getUrlParam('msg');
	ORDER_ID = $.getUrlParam('ORDER_ID');
	times = $.getUrlParam('times');
	if(times != '' && times !=undefined){
		times = times.substring(0,8)
	}
	console.log('msg',msg,ORDER_ID,times);
	if(stateCode ==200){
		stateMsg = '支付成功';
		$('.stateType').html('<img src="../img/icon_jycg.png"/>');
	}else if(stateCode ==100){
		stateMsg = '交易处理中';
		$('.stateType').html('<img src="../img/icon_jyclz.png"/>');
	}else if(stateCode ==400){
		stateMsg = '交易失败';
		$('.stateType').html('<img src="../img/icon_jysb.png"/>');
	}
	$('.stateMsg').html(stateMsg);
	$('.paytotal').html(paytotal);
	$('.msg').html(msg);
	$('.ORDER_ID').html(ORDER_ID);
	$('.times').html(times);
	$('.types').html('开通业务');
	$('.states').html(stateMsg);
})