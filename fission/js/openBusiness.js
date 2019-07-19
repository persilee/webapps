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
	openacct = $.getUrlParam('openacct');
})
//merch/getOpenAmt.do
$(function(){
	getOpenAmt();
})
function getOpenAmt(){
	var url = urlpath + 'merch/getOpenAmt.do';
	$.ajax({
		type:"post",
		url:url,
		async:false,
		data:{
			merchId:merchId,
			topBranchNo:topBranchNo,
			type:'83',
			version:version
		},
		success:function(data){
			console.log('getOpenAmt==',data);
			if(data.code == 200){
				$('.openVipPrice').html('￥ '+data.data[0].externFee+'.00');
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
//点击开通
$('.openBtn').on('click',function(type){
	price = $('.openVipPrice').html().substring(2,8);
//			console.log('price===',price);
	window.location.href = 'toPay.html?merchId='+merchId+'&price='+price+'&term_type='+term_type+'&openacct='+openacct+'&topBranchNo='+topBranchNo;
	/*if(term_type == 0){
		getDownlandUrl();
	}else{
		window.location.href = 'toPay.html?merchId='+merchId+'&price='+price+'&term_type='+term_type+'&openacct='+openacct+'&topBranchNo='+topBranchNo;
	}*/
});