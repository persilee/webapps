var cardNo,merchId,price,topBranchNo,payTotal,levl,typename,openacct,term_type,phoneNo,CODE,payType,payBank,levelName;
		var userType;
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
	price = $.getUrlParam('price');
	openacct = $.getUrlParam('openacct');
	term_type = $.getUrlParam('term_type');
	typename = $.getUrlParam('typename');
	levl = $.getUrlParam('levl');
	topBranchNo = $.getUrlParam('topBranchNo');
	payType = $.getUrlParam('payType');
	payBank = $.getUrlParam('payBank');
	levelName= $.getUrlParam('levelName');
	cardNo = $.getUrlParam('cardNo');
	console.log('cardNo=',cardNo);
	userType = $.getUrlParam('userType');
	console.log('userType',userType);
	if(levelName == 'null'){
		$('.levelName').html('支付开通业务');
	}else{
		$('.levelName').html('购买'+levelName);
	}
	$('.payNum').html(price);
	getCardInfo();
	
})

//显示支付银行
var datalist,phone;
function getCardInfo(){
	var url = urlpath + 'merch/getCardInfo.do'
	$.ajax({
		type:"post",
		url:url,
		async:false,
		data:{
			merchId:merchId
		},
		success:function(data){
			console.log('merch/getCardInfo.do',data);
			if(data.code == 200){
				datalist = data.data;
				if(data.data.length>0){
					console.log('cardNo00000000000',cardNo,typeof(cardNo));
					for(var i = 0;i<data.data.length;i++){
//								if(payBank == data.data[i].cardDesc){
//									var logoImg = '<img src="../img/bankLogo/'+data.data[i].cardInst+'.png" />';
//									var acctNum = data.data[i].acctNo;
//									$('.bankLogo').html(`${logoImg}`);
//									$('.cardDesc').html(`${data.data[i].cardDesc}`);
//									$('.PHONE_NO').html(`${data.data[i].phone}`);
//									$('.acctNo').html(`（${acctNum.slice(12)}）`);
//									CARD_NO = data.data[i].acctNo;
//									CVN2 = data.data[i].add1;
//									EXPDATE = data.data[i].add2;
//									PHONE_NO = data.data[i].phone;
//									ID_NO = data.data[i].idNo;
//									NAME = data.data[i].name;
//									console.log('NAME0==',NAME);
//								}
						//根据卡号判断
						if(cardNo == data.data[i].acctNo){
							console.log('1111111111111111',data.data[i].cardDesc);
							var logoImg = '<img src="../img/bankLogo/'+data.data[i].cardInst+'.png" />';
							var acctNum = data.data[i].acctNo;
							phone = data.data[i].phone;
							var phone1 = phone.slice(0,3)+'****'+phone.slice(7);
							$('.bankLogo').html(logoImg);
							$('.cardDesc').html(data.data[i].cardDesc);
							$('.PHONE_NO').html(phone1);
							$('.acctNo').html('（'+acctNum.slice(12)+'）');
							CARD_NO = data.data[i].acctNo;
							CVN2 = data.data[i].add1;
							EXPDATE = data.data[i].add2;
							PHONE_NO = data.data[i].phone;
							ID_NO = data.data[i].idNo;
							NAME = data.data[i].name;
							console.log('PHONE_NO0==',PHONE_NO);
							
						}
					}
				}                      
			}else{
				mui.alert(data.message);
			}
		}
	});
}

var index ;

//提交支付btn
$('#submitBtn').on('click',function(){
	console.log('flag========',flag);
	if(flag == 1){
		if(openacct==00){
			console.log('开通openacct00=',openacct);
			
			
			layer.confirm('是否确认开通业务？', function(index2){
			  flag=0;
			  layer.close(index2);
			  index= layer.load(2); //又换了种风格，并且设定最长等待10秒 
			  openTrans();
			});   
			/* var btnArray = ['否', '是'];
			 * mui.confirm('是否确认开通业务？',function(e){
				if (e.index == 1) {
					flag=0;
					$('.popCon').show();
					openTrans();
		        } else {
		            $('.popCon').hide();
		        }
			});*/
		}else if(openacct == 01){
			console.log('升级openacct01=',openacct);
			
			
			layer.confirm('是否确认升级会员？', function(index2){
			  flag=0;
			  layer.close(index2);
			  index= layer.load(2); //又换了种风格，并且设定最长等待10秒 
			  upGrade();
			});  
			
			/*mui.confirm('是否确认升级会员？',function(e){
						if (e.index == 1) {
							flag=0;
							$('.popCon').show();
//							upGrade();
				        } else {
				            $('.popCon').hide();
				        }
					});*/
		}
	}else{
		return 0;
	}
});


//开通业务 CARD_NO,CVN2,EXPDATE,PHONE_NO,ID_NO,NAME,SMS_CODE;
var BUS_CODE1;
var CARD_NO,CVN2,EXPDATE,ID_NO,NAME,SMS_CODE;
var paytotal;
function openTrans(){
	if(userType ==0001){
		BUS_CODE1 ='8201';
	}else{
		BUS_CODE1 = '8301';
	}
	SMS_CODE = $('#CODE').val();
	var ORDER_ID,BUS_CODE;
	/*var d = new Date();
	var times = d.getFullYear() + '' + (d.getMonth() + 1) + '' + d.getDate() + '' + d.getHours() + '' + d.getMinutes() + '' + d.getSeconds();*/
	var d = new Date();
	var Y = d.getFullYear();
	var M = (d.getMonth() + 1)>=10?(d.getMonth() + 1):'0'+(d.getMonth() + 1);
	var D = d.getDate()>=10?d.getDate():'0'+d.getDate();
	var H = d.getHours()>=10?d.getHours():'0'+d.getHours();
	var Min = d.getMinutes()>=10?d.getMinutes():'0'+d.getMinutes();
	var S = d.getSeconds()>=10?d.getSeconds():'0'+d.getSeconds();
	var insertTime = Y + '' + M + '' + D + '' + H + '' + Min + '' + S;
	if(term_type == 0){
		ORDER_ID = 'WX'+insertTime+Math.floor(Math.random()*10000);
	}else if(term_type == 1){
		ORDER_ID = 'iOS'+insertTime+Math.floor(Math.random()*10000);
	}else if(term_type == 2){
		ORDER_ID = 'And'+insertTime+Math.floor(Math.random()*10000);
	}
	paytotal = $('.payNum').html();
	var data = {
		ORDER_ID:ORDER_ID,
		ORDER_AMT:paytotal,
		ORDER_TIME:insertTime,
		USER_TYPE:'02',
		USER_ID:merchId,
		SIGN_TYPE:'03',
		BUS_CODE:BUS_CODE1,
		PAY_TYPE:'1031',
		CCT:'CNY',
		GOODS_NAME:'业务开通',
		GOODS_DESC:'业务开通',
		CARD_NO:CARD_NO,
		CVN2:CVN2,
		EXPDATE:EXPDATE,
		PHONE_NO:PHONE_NO,
		ID_NO:ID_NO,
		NAME:NAME,
		SMS_CODE:SMS_CODE,
		version:''
	}
	var url = urlpath+'trade/openTrans.do';
	$.ajax({
		type:"post",
		url:url,
		async:true,
		data:data,
		success:function(data){
			console.log('kaitong',data);
			layer.close(index);
			
			if(data.code == 200 || data.code == 100 || data.code == 400){
//				$('.popCon').hide();
				if(userType ==0001){
					mui.alert(data.message,function(){
						window.location.href = 'transStatus.html?merchId='+merchId+'&stateCode='+data.code+'&term_type='+term_type+'&msg='+data.message+'&paytotal='+paytotal+'&ORDER_ID='+ORDER_ID+'&times='+insertTime;
					});
				}else{
					mui.alert(data.message,function(){
						window.location.href = 'newOperation.html?merchId='+merchId+'&topBranchNo='+topBranchNo+'&term_type='+term_type;
					});
				}
				
			}else{
				flag=1;
//						$('.popCon').hide();
				mui.alert(data.message);
			}
		}
	});
}

//升级
function upGrade(){
	var ORDER_ID,BUS_CODE;
	/*var d = new Date();
	var times = d.getFullYear() + '' + (d.getMonth() + 1) + '' + d.getDate() + '' + d.getHours() + '' + d.getMinutes() + '' + d.getSeconds();*/
	var d = new Date();
	var Y = d.getFullYear();
	var M = (d.getMonth() + 1)>=10?(d.getMonth() + 1):'0'+(d.getMonth() + 1);
	var D = d.getDate()>=10?d.getDate():'0'+d.getDate();
	var H = d.getHours()>=10?d.getHours():'0'+d.getHours();
	var Min = d.getMinutes()>=10?d.getMinutes():'0'+d.getMinutes();
	var S = d.getSeconds()>=10?d.getSeconds():'0'+d.getSeconds();
	var insertTime = Y + '' + M + '' + D + '' + H + '' + Min + '' + S;
	if(term_type == 0){
		ORDER_ID = 'WX'+insertTime+Math.floor(Math.random()*10000);
	}else if(term_type == 1){
		ORDER_ID = 'iOS'+insertTime+Math.floor(Math.random()*10000);
	}else if(term_type == 2){
		ORDER_ID = 'And'+insertTime+Math.floor(Math.random()*10000);
	}
	/* if(typename == '3'){
		if(levl=='0'){
			BUS_CODE = '8701';
		}else if(levl=='1'){
			BUS_CODE = '8601';
		}else if(levl=='2'){
			BUS_CODE = '8501';
		}
	}else  */
    if(typename == '2'){
		if(levl=='0'){
			BUS_CODE = '8601';
		}else if(levl=='1'){
			BUS_CODE = '8501';
		}
	}else if(typename == '1'){
		if(levl=='0'){
			BUS_CODE = '8401';
		}
	}
	paytotal = $('.payNum').html();
	var data = {
		ORDER_ID:ORDER_ID,
		ORDER_AMT:paytotal,
		ORDER_TIME:insertTime,
		USER_TYPE:'02',
		USER_ID:merchId,
		SIGN_TYPE:'03',
		BUS_CODE:BUS_CODE,
		PAY_TYPE:'1031',
		ADD1:levl,
		CCT:'CNY',
		GOODS_NAME:'在线升级',
		GOODS_DESC:'在线升级',
		CARD_NO:CARD_NO,
		CVN2:CVN2,
		EXPDATE:EXPDATE,
		PHONE_NO:PHONE_NO,
		ID_NO:ID_NO,
		NAME:NAME,
		SMS_CODE:$('#CODE').val(),
		version:''
	}
	var url = urlpath+'trade/openTrans.do?merchId='+merchId;
	$.ajax({
		type:"post",
		url:url,
		async:true,
		data:data,
		success:function(data){
			console.log('data=',data);
			layer.close(index);
//					$('.popCon').show();
			if(data.code == 200 || data.code == 100 || data.code == 400){
//						$('.popCon').hide();
				mui.alert(data.message,function(){
					window.location.href = 'newOperation.html?merchId='+merchId+'&topBranchNo='+topBranchNo+'&term_type='+term_type+'&userType'+userType;
				})
			}else{
				flag=1;
//						$('.popCon').hide();
				mui.alert(data.message);
			}
		}
	});
	
}


/*-----------------获取验证码btn------------------*/
//监听输入框改变
$('input').on('keyup parste change',function(){
	flagChange();
})
var flag;
function flagChange(){
	flag = 0;
	CODE = $('#CODE').val();
	console.log(CODE);
	//获取验证码
	if(CODE!=''&&CODE!=null){
		if(CODE.length==6){
		    flag++;
	   }else {
        	return false;
	    }
	}
	if(flag==1){
    	$('#submitBtn').css('background-color','#D53C27');
    }else{
    	$('#submitBtn').css('background-color','#CECECE');
    }
}

//点击获取验证码
$('.getCodeBtn').on('click',function(){
	PHONE_NO = phone;
	console.log('PHONE_NO=',PHONE_NO)
	if(PHONE_NO.length==11){
		settime(this);
		var data={
			phoneNo:PHONE_NO
		}
		$.ajax({
			type:"post",
			url:urlpath+'regeist/getSmsCode.do?type=1',
			data:data,
			async:true,
			success:function(){
				console.log('success',data);
			}
		});
	}else{
		mui.alert('手机号不能为空');
		return false;
	}
})

//获取验证码
var countdown = 60;
function settime(val) {
	if(countdown == 0) {
		val.removeAttribute("disabled");
		val.value = "获取验证码";
		countdown = 60;
		return false;
	} else {
		val.setAttribute("disabled", true);
		val.value = "重新发送(" + countdown + ")";
		countdown--;
	}
	setTimeout(function() {
		settime(val);
	}, 1000);
}