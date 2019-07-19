$(function(){
	$.getUrlParam = function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
		console.log(reg, r);
	}
	//得到url参数  
	merchId = $.getUrlParam('merchId');
	term_type = $.getUrlParam('term_type');
	topBranchNo = $.getUrlParam('topBranchNo');
})

//获取商户银行名称merch/getMerchInfo.do
$(function(){
	getMerchInfo();
	getMerchAcct();
})
function getMerchInfo(){
	var  url = urlpath + 'merch/getMerchInfo.do';
	$.ajax({
		type:"post",
		url:url,
		async:false,
		data:{
			merchId:merchId,
			version:version
		},
		success:function(data){
			console.log('getMerchInfo',data);
			if(data.code == 200){
				$('.bankName').html(data.data.bankName);
			}else{
				mui.alert(data.message);
			}
		}
	});
}
//获取商户余额信息merch/getMerchAcct.do
function getMerchAcct(){
	var  url = urlpath + 'merch/getMerchAcct.do';
	$.ajax({
		type:"post",
		url:url,
		async:false,
		data:{
			merchId:merchId,
			version:version
		},
		success:function(data){
			console.log('getMerchAcct',data);
			if(data.code == 200){
				$('.valTotal').html(data.data.avlbBal);
			}
		}
	});
}

//校验金额格式
//		$('.acctNum').on('blur',function(){
//			regNUm();
//		})
function regNUm(){
	var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
	console.log("$('#acctNum').val()",$('#acctNum').val());
	var widthdrawNum = $('#acctNum').val();
	if(reg.test(widthdrawNum)){
		console.log('输入金额==',$('#acctNum').val());
		console.log('余额====',$('.valTotal').html());
		if($('#acctNum').val()>0 && $('#acctNum').val()<Number($('.valTotal').html())){
			console.log('正确')
		}else{
			mui.alert('您输入的金额不在您的可用余额范围内，请重新输入')
		}
	}else{
		mui.alert('您输入的金额格式不正确，请重新输入')
	}
}

//全部提现
$('.allTx').on('click',function(){
	if(Number($('.valTotal').html())<2){
		mui.alert('您当前的余额小于两元，不能提现')
	}else{
		var valTotal = Number($('.valTotal').html()-2);
		console.log($('.valTotal').html());
		$('.acctNum').val(valTotal);
	}
	
	
})


function withdraw(){
	//15999519806
	var d = new Date();
	var times = d.getFullYear() + '' + (d.getMonth() + 1) + '' + d.getDate() + '' + d.getHours() + '' + d.getMinutes() + '' + d.getSeconds();
	console.log(times);
	var ORDER_ID = 'I'+times+Math.floor(Math.random()*10000);
	console.log(ORDER_ID);
	var ORDER_AMT,ORDER_TIME,USER_TYPE,USER_ID,SIGN_TYPE,BUS_CODE,CCT;
	var data = {
		ORDER_ID:ORDER_ID,
		ORDER_AMT:$('#acctNum').val(),
		ORDER_TIME:times,
		USER_TYPE:'02',
		USER_ID:merchId,
		SIGN_TYPE:'03',
		BUS_CODE:'1009',
		CCT:'CNY',
		version:version
	}
	var url = urlpath + 'trade/withdraw.do';
	if($('#acctNum').val()>0 && $('#acctNum').val()<Number($('.valTotal').html())){
		$.ajax({
			type:"post",
			url:url,
			async:true,
			data:data,
			success:function(data){
				console.log('withdraw=====',data);
				
				if(data.code == 100){
					mui.alert(data.message,function(){
						window.location.href = 'newOperation.html?merchId='+merchId+'&topBranchNo='+topBranchNo+'&term_type='+term_type;
					});
				}else{
					mui.alert(data.message);
				}
			}
		});
	}else{
		regNUm();
	}
}

$('.confirmBtn').on('click',function(){
	withdraw();
})