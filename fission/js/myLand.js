var merchId,topBranchNo,term_type;
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
	term_type = $.getUrlParam('term_type');
	topBranchNo = $.getUrlParam('topBranchNo');
	console.log('term_type==',term_type)
	getProfitInfo();
//			getUpgradeInfo();
});
//获取等级分润信息merch/getProfitInfo.do
function getProfitInfo(){
	var url = urlpath + 'merch/getProfitInfo.do';
	$.ajax({
		type:"post",
		url:url,
		async:false,
		data:{
			merchId:merchId,
			topBranchNo:topBranchNo,
			version:'1.1'
		},
		success:function(data){
			console.log('getProfitInfo=========',data)
			if(data.code == 200 && data.data.length != 0){
				for(var i = 0;i<data.data.length;i++){
					if(data.data[i].levels == 0){
						$('.levelName0').html(data.data[i].levelName);
						$('.condition0').html(data.data[i].condition);
						$('.shareFee0').html(data.data[i].shareFee);
						$('.tradeFee0').html(data.data[i].tradeFee);
					}else if(data.data[i].levels == 1){
						$('.levelName1').html(data.data[i].levelName);
						$('.condition1').html(data.data[i].condition);
						$('.shareFee1').html(data.data[i].shareFee);
						$('.tradeFee1').html(data.data[i].tradeFee);
					}else if(data.data[i].levels == 2){
						$('.levelName2').html(data.data[i].levelName);
						$('.condition2').html(data.data[i].condition);
						$('.shareFee2').html(data.data[i].shareFee);
						$('.tradeFee2').html(data.data[i].tradeFee);
					}else if(data.data[i].levels == 3){
						$('.levelName3').html(data.data[i].levelName);
						$('.condition3').html(data.data[i].condition);
						$('.shareFee3').html(data.data[i].shareFee);
						$('.tradeFee3').html(data.data[i].tradeFee);
					}else if(data.data[i].levels == 4){
						$('.levelName4').html(data.data[i].levelName);
						$('.condition4').html(data.data[i].condition);
						$('.shareFee4').html(data.data[i].shareFee);
						$('.tradeFee4').html(data.data[i].tradeFee);
					}
				}
			}else{
//						mui.alert(data.message);
			}
		}
	});
}
//		//显示等级个数
//		function getUpgradeInfo(){
//			var url = urlpath +'merch/getUpgradeInfo.do';
//			$.ajax({
//				type:"post",
//				url:url,
//				async:false,
//				data:{
//					topBranchNo:topBranchNo,
//					merchId:merchId,
//					version:'1.1'
//				},
//				success:function(data){
//					console.log('getUpgradeInfo==',data);
//					if(data.code == 200){
//						$('.num0').html(`${data.data.firstLevel}`);
//						$('.num1').html(`${data.data.secondLevel}`);
//						$('.num2').html(`${data.data.thirdLevel}`);
//					}else{
////						mui.alert(data.message);
//					}
//				}
//			});
//		}