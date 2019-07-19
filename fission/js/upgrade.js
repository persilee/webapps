var merchId,price,topBranchNo,term_type,levl;
		$(function(){
			 $.getUrlParam = function(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
//				console.log(reg, r);
	}
	//得到url参数  
	merchId = $.getUrlParam('merchId');
	typename = $.getUrlParam('typename');
	console.log('typename',typename)
	term_type = $.getUrlParam('term_type');
	topBranchNo = $.getUrlParam('topBranchNo');
	openacct = $.getUrlParam('openacct');
	console.log('term_type==',term_type,'topBranchNo==',topBranchNo)
	if(typename == 1){
		$('.superLi').show();
	}else if(typename == 2){
		$('.superLi').show();
		$('.oneLi').show();
	}else if(typename == 3){
		$('.superLi').show();
		$('.oneLi').show();
		$('.twoLi').show();
	}
	
});

//显示等级,价格页面信息
$(function(){
	getUpgradeAmt();
	getProfitInfo();
})
var levelName;
function getUpgradeAmt(){
	console.log(merchId,topBranchNo)
	var url = urlpath+'merch/getUpgradeAmt.do';
	console.log(url)
	$.ajax({
		type:"post",
		url:url,
		async:false,
		data:{
			merchId:merchId,
			topBranchNo:topBranchNo,
			version:version
		},
		success:function(data){
			console.log('getUpgradeAmt==',data);
			console.log(data.data.length);
			if(data.code == 200 && data.data.length != 0){
				
				for(var i = 0;i<data.data.length;i++){
					console.log('data.data[i].levl',data.data[i].levl)
					//data.data[i].busCode == '8701'
					levelName = data.data[i].levlName;
					if(data.data[i].levl == '0'){
						$('.topVipName').html(levelName);
						$('.topVipPrice').html('￥ ' + data.data[i].fee + '.00');
						$('.topVipName').attr('data-levl','0');
					}else if(data.data[i].levl == '1'){
						$('.oneVipName').html(levelName);
						$('.oneVipPrice').html('￥ ' + data.data[i].fee + '.00');
						$('.oneVipName').attr('data-levl','1');
					}else if(data.data[i].levl == '2'){
						$('.twoVipName').html(levelName);
						$('.twoVipPrice').html('￥ '+data.data[i].fee+'.00');
						$('.twoVipName').attr('data-levl','2');
					}
				}
			}else{
//						mui.toast(data.message);
			}
		}
	});
}

//返佣金额数据
function getProfitInfo(){
	console.log(merchId,topBranchNo)
	var url = urlpath+'merch/getProfitInfo.do';
	console.log(url)
	$.ajax({
		type:"post",
		url:url,
		async:false,
		data:{
			merchId:merchId,
			topBranchNo:topBranchNo,
			version:version
		},
		success:function(data){
			
			console.log('getProfitInfo==',data);
			console.log(data.data.length)
			if(data.code == 200 && data.data.length != 0){
				for(var i = 0;i<data.data.length;i++){
					if(data.data[i].serviceName.substring(0,2) == 70){
						if(data.data[i].levl == 0){
							console.log(parseFloat(data.data[i].profitFee),parseFloat(data.data[i].profitFee*100).toFixed(2))
							$('.superFee').html(parseFloat(data.data[i].profitFee*100).toFixed(2)+'%');
						}else if(data.data[i].levl == 1){
							$('.firstFee').html(parseFloat(data.data[i].profitFee*100).toFixed(2)+'%');
						}else if(data.data[i].levl == 2){
							$('.secondFee').html(parseFloat(data.data[i].profitFee*100).toFixed(2)+'%');
						}
					}else if(data.data[i].serviceName.substring(0,2) == 83){
						if(data.data[i].levl == 0){
							$('.superReturn').html(data.data[i].extFee);
						}else if(data.data[i].levl == 1){
							$('.firstReturn').html(data.data[i].extFee);
						}else if(data.data[i].levl == 2){
							$('.secondReturn').html(data.data[i].extFee);
						}
					}
				}
			}else{
//						mui.toast(data.message);
			}
		}
	});
}

//判断平台下载apkmerch/getDownlandUrl.do

function getDownlandUrl(){
	var url = urlpath + 'merch/getDownlandUrl.do';
	$.ajax({
		type:"post",
		url:url,
		async:false,
		data:{
			merchId:merchId,
			topBranchNo:topBranchNo,
			version:version
		},
		success:function(data){
			console.log('获取apk===',data);
			if(data.code == 200){
				mui.confirm('下载并登录app进行操作',function(e){
					if (e.index == 1) {
						window.parent.location.href = data.data;
					} 
				})
			}else{
				mui.alert(data.message);
			}
		}
	});
}
//点击升级

var levelname;
$('.topVip').on('click',function(type){
	price = $('.topVipPrice').html().substring(2,8);
	levl = $('.topVipName').attr('data-levl')
	console.log('levl = ',levl)
	levelname = $('.topVipName').html();
	console.log('levelName',levelname)
//			if(term_type == 0){
//				getDownlandUrl();
//			}else{
		if($('.topVipPrice').html()==null||$('.topVipPrice').html()==''){
			mui.alert('升级套餐价格为空');
		}else{
			window.location.href = 'toPay.html?merchId='+merchId+'&price='+price+'&levelName='+levelname+'&term_type='+term_type+'&openacct='+openacct+'&topBranchNo='+topBranchNo+'&levl='+levl+'&typename='+typename;
		}
//			}
});


$('.oneVip').on('click',function(type){
	price = $('.oneVipPrice').html().substring(2,8);
	levl = $('.oneVipName').attr('data-levl');
	console.log('levl = ',levl)
	levelname = $('.oneVipName').html();
	console.log('levelName',levelname)
//			if(term_type == 0){
////				mui.alert('下载并登录app进行操作');
//				getDownlandUrl();
//			}else{
		if($('.oneVipPrice').html()==null||$('.oneVipPrice').html()==''){
			mui.alert('升级套餐价格为空');
		}else{
			window.location.href = 'toPay.html?merchId='+merchId+'&price='+price+'&levelName='+levelname+'&term_type='+term_type+'&openacct='+openacct+'&topBranchNo='+topBranchNo+'&levl='+levl+'&typename='+typename;
		}
//				
//			}
})
$('.twoVip').on('click',function(type){
	price = $('.twoVipPrice').html().substring(2,8);
	levl = $('.twoVipName').attr('data-levl');
	console.log('levl = ',levl)
	levelname = $('.twoVipName').html();
	console.log('levelName',levelname)
//	if(term_type == 0){
//		mui.alert('下载并登录app进行操作');
//		getDownlandUrl();
//	}else{
		if($('.twoVipPrice').html()==null||$('.twoVipPrice').html()==''){
			mui.alert('升级套餐价格为空');
		}else{
			window.location.href = 'toPay.html?merchId='+merchId+'&price='+price+'&levelName='+levelname+'&term_type='+term_type+'&openacct='+openacct+'&topBranchNo='+topBranchNo+'&levl='+levl+'&typename='+typename;
		}
//	}
})