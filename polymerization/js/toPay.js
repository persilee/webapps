var merchId,price,payTotal,levl,typename,levelName,cardNo;
var j,cardNo1,cardNo3,userType;
//var radio1=-1;
var radio1=-2;
console.log($("input[name='radio1']").val(),radio1)
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
	levelName = $.getUrlParam('levelName');
	userType = $.getUrlParam('userType');
	
	console.log('userType',userType);
	if(openacct == 01){
		payTotal= $('.payNum').html(price);
		$('.payTitle').html('在线升级');
	}else{
		//执行获取开通业务金额
		if(openacct == 00){
			openBus();
			$('.payTitle').html('开通业务')
		}
	}
	//选择
	var logoUrled,logoSrc;
	
	/*if($("input[name='radio1']").val()==-1){
		logoUrled = '<img src="../img/icon_weixin.png" />';
		$('.logoUrl').html(logoUrled);
		var defaultName = $('.selWxName').html();
		$('.checkName').html(defaultName);
		$('.checkName').attr('data-type','-1');
		$('.queRen').html('<img src="../img/icon_queren.png"/>')
	}*/
	if($("input[name='radio1']").val()==-2){
		logoUrled = '<img src="../img/icon_zhifubao.png" />';
		$('.logoUrl').html(logoUrled);
		var defaultName = $('.selNamefbName').html();
		$('.checkName').html(defaultName);
		$('.checkName').attr('data-type','-2');
		$('.queRen').html('<img src="../img/icon_queren.png"/>')
	}
	getCardInfo();
	
});

/*--------------选择支付方式----------------*/
//选择支付方式
$('.payType').on('click',function(){
	if(datalist.length>0){
		$('.popBOx').show();
	}
})
/*-----微信-支付宝-----*/
$('.comPay').on('click',function(e){
	$('.popBOx1').show();
})
$('.popBOx1').on('click',function(e){
	setTimeout(function(){
		$('.popBOx1').hide();
	},500);
	radio1 = $("input[name='radio1']:checked").val();
	j = radio1;
	console.log('j',j);
	if(j==-1){
		$('.checkName').html('微信支付');
		$('.logoUrl').html('<img src="../img/icon_weixin.png"/>');
		$('.checkName').attr('data-type',j);
		$('.queRen').html('<img src="../img/icon_queren.png"/>')
	}else if(j==-2){
		$('.checkName').html('支付宝支付');
		$('.logoUrl').html('<img src="../img/icon_zhifubao.png"/>');
		$('.checkName').attr('data-type',j);
		$('.queRen').html('<img src="../img/icon_queren.png"/>')
	}else if(j==-3){
		$('.checkName').html('微信正扫支付');
		$('.logoUrl').html('<img src="../img/icon_weixin.png"/>');
		$('.checkName').attr('data-type',j);
		$('.queRen').html('<img src="../img/icon_queren.png"/>')
	}else if(j==-4){
		$('.checkName').html('支付宝正扫支付');
		$('.logoUrl').html('<img src="../img/icon_zhifubao.png"/>');
		$('.checkName').attr('data-type',j);
		$('.queRen').html('<img src="../img/icon_queren.png"/>')
	}
})

/*-----银联快捷显示隐藏------*/
var j = radio1-1;
$('.popBOx').on('click',function(){
	setTimeout(function(){
		$('.popBOx').hide();
	},500);
	radio1 = $("input[name='radio1']:checked").val();
	j = radio1;
	if(datalist.length>0){
		cardNo = datalist[j].acctNo;
		cardNo1 = cardNo.slice(12);
		cardNo3 = datalist[j].acctNo;
		phone = datalist[j].phone;
		cardDesc = datalist[j].cardDesc;
		var logoUrl = '<img src="../img/bankLogo/'+datalist[j].cardInst+'.png" />';
		$('.logoUrl').html(logoUrl);
		$('.checkName').html(cardDesc+'('+cardNo1+')');
		$('.checkName').attr('data-type',j)
		$('.queRen').html('<img src="../img/icon_queren.png"/>')
		$('.l_con_box').html(cardDesc);
	}
})



/*--------点击确认支付交易--------*/
//业务类型openacct
var payBank,checkNameShow;
$('.confirmBtn').on('click',function(){
	console.log('------------');
	if($('.checkName').attr('data-type') ==-1 || $('.checkName').attr('data-type') ==-2|| $('.checkName').attr('data-type') ==-3|| $('.checkName').attr('data-type') ==-4){
		if(openacct==00){
			console.log('开通openacct00=',openacct);
			console.log('checkName',$('.checkName').html());
			checkNameShow = $('.checkName').html();
			timeout = true;
//					window.clearInterval(interval);
			var btnArray = ['否', '是'];
			mui.confirm('是否确认选择此方式交易？',function(e){
				if (e.index == 1) {
					$('.loadBox').show();
					openTrans();
		        } else {
		            return 0; 
		           
		        }
			});
		}else if(openacct == 01){
			checkNameShow = $('.checkName').html();
			timeout = true;
			var btnArray = ['否', '是'];
			mui.confirm('是否确认选择此方式交易？',function(e){
				if (e.index == 1) {
					$('.loadBox').show();
					upGrade();
		        } else {
		            return 0;
		        }
			});
		}
	}else{
		//快捷支付
		payBank = $('.checkName').html();
		console.log('payBank==',payBank);
		console.log('cardNo',cardNo);
		if(datalist.length>0){
            if(cardNo3 == null || cardNo3 == ''){
                mui.alert('请您先选择支付卡');
            }else{
                window.location.href = 'toPayDetail.html?topBranchNo='+topBranchNo+'&merchId='+merchId+'&levelName='+levelName+'&price='+price+'&openacct='+openacct+'&levl='+levl+'&term_type='+term_type+'&typename='+typename+'&payType=api1'+'&cardNo='+cardNo3+'&userType='+userType;
            }
		}else{
			mui.alert('您尚未绑卡，请先绑卡');
		}
	     
	}
})

/*-------------获取信用卡列表信息方法------------------*/
//获取银行卡merch/getCardInfo.do
var html3 = '';
var html2 = '';
var cardNo2,datalist,phone,cardDesc;
function getCardInfo(){
	var url = urlpath + 'merch/getCardInfo.do'
	$.ajax({
		type:"post",
		url:url,
		async:false,
		data:{
			merchId:merchId,
			version:version
		},
		success:function(data){
			console.log('merch/getCardInfo.do',data);
			if(data.code == 200){
				datalist = data.data;
				if(data.data.length>0){
					for(var i = 0;i<data.data.length;i++){
						cardNo = data.data[i].acctNo;
						cardNo2 = data.data[i].acctNo.slice(12);
						bankLogo = '<img src="../img/bankLogo/'+data.data[i].cardInst+'.png" />'
						
						//api列表
						html3 += '<li class="mui-input-row mui-radio paytype_li_box">'+
							'<label style="padding:0px;">'+
								'<span class="icon_box selLogo">'+bankLogo+'</span>'+
								'<span class="type_name selName">'+data.data[i].cardDesc+'（<span class="">'+cardNo2+'）</span></span>'+
							'</label>'+
							'<input name="radio1" class="radio1 api1" id='+i+' type="radio" style="top: 10px;" value='+i+' />'+
						'</li>';
					}
					$('.payTypeList').html(html3);
				}else{
					mui.alert('您还未绑定信用卡');
				}
			}else{
				mui.alert(data.message);
			}
		}
	});
}



/*-----------获取开通业务的金额----------------*/
//获取开通业务的金额//trade/openTrans.do
function openBus(){
	if(userType==0001){
		var type1 = '82';
	}else{
		var type1 = '83';
	}
	var url = urlpath + 'merch/getOpenAmt.do';
	var data = {
		merchId:merchId,
		topBranchNo:topBranchNo,
		type:type1,
		version:''
	}
	console.log(url);
	$.ajax({
		type:"post",
		url:url,
		data:data,
		async:false,
		success:function(data){
			console.log('金额===',data)
			if(data.code == 200){
				payTotal =$('.payNum').html(price);
			}
		}
	});
}

/*-----------开通业务交易的方法----------------*/
//开通业务
var ORDER_ID,codeUrl;
var PAY_TYPE;
var interval;
var d = new Date();
var times = d.getFullYear() + '' + (d.getMonth() + 1) + '' + d.getDate() + '' + d.getHours() + '' + d.getMinutes() + '' + d.getSeconds();

//清除延时器
var tOut;

var BUS_CODE1;
function openTrans(){
	timeout = true;
	clearTimeout(tOut);
	if(userType == 0001){
		BUS_CODE1 = '8201';
	}else{
		BUS_CODE1 = '8301';
	}
	console.log('开通BUS_CODE1==',BUS_CODE1);
	if(term_type == 0){
		ORDER_ID = 'WX'+times+Math.floor(Math.random()*10000);
	}else if(term_type == 1){
		ORDER_ID = 'iOS'+times+Math.floor(Math.random()*10000);
	}else if(term_type == 2){
		ORDER_ID = 'And'+times+Math.floor(Math.random()*10000);
	}else{
		ORDER_ID = times+Math.floor(Math.random()*10000);
	}
	console.log('ORDER_ID0',ORDER_ID)
	console.log('开通业务radio1',radio1);
	var paytotal = $('.payNum').html();
	if(radio1!=-1 && radio1!=-2&& radio1!=-3&& radio1!=-4){
		payBank = $('.checkName').html();
		console.log('payBank==',payBank);
	}else{
		if(radio1==-1){
			//微信
			PAY_TYPE = '3503';
		}else if(radio1 == -2){
			//支付宝
			PAY_TYPE = '3505';
		}else if(radio1 == -3){
			//微信正扫
			PAY_TYPE = '3101';
		}else if(radio1 == -4){
			//支付宝正扫
			PAY_TYPE = '3201';
		}
		
		var data = {
			ORDER_ID:ORDER_ID,
			ORDER_AMT:paytotal,
			ORDER_TIME:times,
			USER_TYPE:'02',
			USER_ID:merchId,
			SIGN_TYPE:'03',
			BUS_CODE:BUS_CODE1,
			PAY_TYPE:PAY_TYPE,
			CCT:'CNY',
			GOODS_NAME:'业务开通',
			GOODS_DESC:'业务开通',
			version:'',
		}
		var url = urlpath+'trade/openTrans.do?merchId='+merchId;
		$.ajax({
			type:"post",
			url:url,
			async:true,
			data:data,
			success:function(data){
				console.log('data=',data);
				if(data.code == 200){
					$('.loadBox').hide();
					window.clearInterval(interval);
					console.log('PAY_TYPE',PAY_TYPE);
					if(PAY_TYPE == '3101'){
						$('.seledName').html('微信');
					}else if(PAY_TYPE == '3201'){
						$('.seledName').html('支付宝');
					}
					if(PAY_TYPE == '3101'||PAY_TYPE == '3201'){
						$('.codeBox').show();
						codeUrl = data.data;
						console.log('codeUrl=====',codeUrl)
						//生成二维码
						makeCode();
						//定时器
						timeout = false;
						time();
						//延时器
						tOut =setTimeout(function(){
							console.log('3');
							timeout = true;
							mui.alert('支付超时，请重新支付');
						},180000)
					}else{
						$('.loadBox').hide();
						var html = data.data;
						console.log(html);
						$('body').html(html);
					}
				}else{
					$('.loadBox').hide();
					mui.alert(data.message);
				}
			}
		});
	}
}

/*-----------升级业务的交易方法----------------*/
//升级
var BUS_CODE;
function upGrade(){
	timeout = true;
	clearTimeout(tOut);
	if(term_type == 0){
		ORDER_ID = 'WX'+times+Math.floor(Math.random()*10000);
	}else if(term_type == 1){
		ORDER_ID = 'iOS'+times+Math.floor(Math.random()*10000);
	}else if(term_type == 2){
		ORDER_ID = 'And'+times+Math.floor(Math.random()*10000);
	}else{
		ORDER_ID = times+Math.floor(Math.random()*10000);
	}
	if(typename == '3'){
		if(levl=='0'){
			BUS_CODE = '8701';
		}else if(levl=='1'){
			BUS_CODE = '8601';
		}else if(levl=='2'){
			BUS_CODE = '8501';
		}
	}else if(typename == '2'){
		if(levl=='0'){
			BUS_CODE = '8901';
		}else if(levl=='1'){
			BUS_CODE = '8801';
		}
	}else if(typename == '1'){
		if(levl=='0'){
			BUS_CODE = '8401';
		}
	}
	console.log('ORDER_ID0',ORDER_ID)
	var radio1 = $('.checkName').attr('data-type');
	console.log( '升级radio1',radio1);
	var paytotal = $('.payNum').html();
	console.log('paytotal====',paytotal);
	if(radio1!=-1 && radio1!=-2&& radio1!=-3&& radio1!=-4){
		payBank = $('.checkName').html();
		console.log('payBank==',payBank);
	}else{
		if(radio1==-1){
			//微信
			PAY_TYPE = '3503';
		}else if(radio1 == -2){
			//支付宝
			PAY_TYPE = '3505';
		}else if(radio1 == -3){
			//微信正扫
			PAY_TYPE = '3101';
		}else if(radio1 == -4){
			//支付宝正扫
			PAY_TYPE = '3201';
		}
		
		var data = {
			ORDER_ID:ORDER_ID,
			ORDER_AMT:paytotal,
			ORDER_TIME:times,
			USER_TYPE:'02',
			USER_ID:merchId,
			SIGN_TYPE:'03',
			BUS_CODE:BUS_CODE,
			PAY_TYPE:PAY_TYPE,
			ADD1:levl,
			CCT:'CNY',
			GOODS_NAME:'在线升级',
			GOODS_DESC:'在线升级',
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
				if(data.code == 200){
					$('.loadBox').hide();
					window.clearInterval(interval);
					console.log('PAY_TYPE',PAY_TYPE);
					if(PAY_TYPE == '3101'){
						$('.seledName').html('微信');
					}else if(PAY_TYPE == '3201'){
						$('.seledName').html('支付宝');
					}
					if(PAY_TYPE == '3101'||PAY_TYPE == '3201'){
						$('.codeBox').show();
						codeUrl = data.data;
						console.log('codeUrl=====',codeUrl)
						//生成二维码
						makeCode();
						//定时器
						timeout = false;
						time();
						//延时器
						tOut =setTimeout(function(){
							console.log('3');
							timeout = true;
							mui.alert('支付超时，请重新支付');
						},180000)
					}else{
						$('.loadBox').hide();
						var html = data.data;
						console.log(html);
						$('body').html(html);
					}
				}else{
					$('.loadBox').hide();
					mui.alert(data.message);
				}
			}
		});
	}
}

/*-------------定时器-----------*/
var timeout = false;
var timeNum  = 5000;
var timeO;
function time(){
	if(timeout)return;
	queryTrans();
	setTimeout(time,timeNum);
}


//生成二维码
var qrcode = new QRCode(document.getElementById("codeCon"), {
	width : 270,
	height : 270
});
var elText;//保存二维码url
function makeCode() {		
	elText = codeUrl;
	console.log('elText',elText)
	qrcode.makeCode(elText);
}

/*-------------查询交易结果--------------*/
//查询交易结果 /merch/queryTrans.do
var queryStatus;
function queryTrans(){
	var url = urlpath+'merch/queryTrans.do';
	var ajaxTimeOut = $.ajax({
		type:"post",
		url:url,
		data:{
			merchId:merchId,
			orderId:ORDER_ID,
			version:version
		},
		success:function(data){
			console.log('queryTrans.do',data)
			if(data.code == 200){
				if(data.data.list.length>0){
					for(var i=0;i<data.data.list.length;i++){
						queryStatus = data.data.list[i].procStatus;
						if(queryStatus != '00'){
							timeout = true;
							clearTimeout(tOut);
							$('.codeBox').hide();
							mui.alert(data.data.list[i].respDesc,function(){
								window.location.href = 'newOperation.html?merchId='+merchId+'&topBranchNo='+topBranchNo+'&term_type='+term_type;
							})
						}
					}
				}
			}else{
				mui.toast(data.message)
			}
		}
	});
}

/*------------二维码隐藏---------------*/
$('.clickHide').on('click',function(){
	mui.confirm('是否确定取消支付？',function(e){
		if (e.index == 1) {
			clearTimeout(tOut);
			timeout=true;
			$('.codeBox').hide();
        } else {
            return 0;
        }
	})
})