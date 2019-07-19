var merchId, term_type, topBranchNo, isReal;
var result;

$(function() {
	$.getUrlParam = function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
		//				console.log(reg, r);
	}
	//得到url参数  
	merchId = $.getUrlParam('merchId');
	term_type = $.getUrlParam('term_type');
	topBranchNo = $.getUrlParam('topBranchNo');
	isReal = $.getUrlParam('isReal');
	//需判空
	if(topBranchNo == '' || topBranchNo == null) {
		mui.alert('机构编号为空，请刷新重试');
	}
	var param1 = window.location.search;
	var reg1 = new RegExp("isReal");
	result = param1.match(reg1);
});

//总资产
//收益流水
$('.queryProfit').on('click', function() {
	window.location.href = 'queryProfit.html?merchId=' + merchId + '&topBranchNo=' + topBranchNo + '&term_type=' + term_type;
});

//提现
$('.withdraw').on('click', function() {
	window.location.href = 'withdraw.html?merchId=' + merchId + '&topBranchNo=' + topBranchNo + '&term_type=' + term_type;
});

//显示商户等级
$(function() {
	showGrade()
})

function showGrade() {
	setTimeout(function() {
		var url = urlpath + 'merch/getMerchAcct.do';
		$.ajax({
			type: "post",
			url: url,
			async: false,
			data: {
				merchId: merchId,
				version: version
			},
			success: function(data) {
				console.log('显示商户等级', data);
				if(data.code == 200) {
					if(merchId != '' && merchId != null) {
						$('.totalNum').html(data.data.sumAmt);
						$('.valAmt').html(data.data.avlbBal);
						$('.fznAmt').html(data.data.fznAmt);
                        //历史总分润
						$('.totalProfitAmt').html(data.data.totalProfitAmt);
						//商户类型统计
						$('.sumDirect').html(data.data.sumDirect);
						$('.aDirect').html(data.data.aDirect);
						$('.direct').html(data.data.direct);
						$('.sumIndirect').html(data.data.sumIndirect);
						$('.aIndirect').html(data.data.aIndirect);
						$('.indirect').html(data.data.indirect);
					} else {
						mui.toast('商户号为空');
					}

					//等级
					if(data.data.isNetting == 1) {
						$('.gradeImg').show();
						$('.grade').html(data.data.merchLevelName);
						if(data.data.merchLevel == 0) {
							$('.upperGrade').show();
							var addAttr = $('.grade').attr('typename', '0');
							console.log('======', addAttr);
							$('.gradeImg').html('<img src="../img/qy1.png"/>');
						} else if(data.data.merchLevel == 1) {
							$('.upperGrade').show();
							var addAttr = $('.grade').attr('typename', '1');
							console.log('======', addAttr);
							$('.gradeImg').html('<img src="../img/sj1.png"/>');
						} else if(data.data.merchLevel == 2) {
							$('.upperGrade').show();
							var addAttr = $('.grade').attr('typename', '2');
							console.log('======', addAttr);
							$('.gradeImg').html('<img src="../img/pt1.png"/>');
						} else if(data.data.merchLevel == 3) {
							$('.upperGrade').show();
							var addAttr = $('.grade').attr('typename', '3');
							console.log('======', addAttr);
							$('.gradeImg').html('<img src="../img/huiyuan_putong.png" />');
							//$('.open_btn1').hide();
						}
						} else {
							$('.grade').html(data.data.merchLevelName);
							$('.openTrans').show();
					}
				}
			}
		});
		$('.tipsCon').hide();
	}, 50);
}

//我要升级
$('.upperGrade').on('click', function() {
	console.log(topBranchNo);
	var typename = $('.grade').attr('typename');
	console.log('typename', typename);
	//升级openacct=01，开通openacct=00，等级typename（0，1，2，3），终端类型term_type，商户编号merchId，一级代理商编号topBranchNo
	window.location.href = 'upgrade.html?merchId=' + merchId + '&typename=' + typename + '&openacct=01&term_type=' + term_type + '&topBranchNo=' + topBranchNo;
});
//我要开通业务
$('.openBus').on('click', function() {
	if(result == null) {
		//默认开通
		window.location.href = 'openBusiness.html?merchId=' + merchId + '&openacct=00&term_type=' + term_type + '&topBranchNo=' + topBranchNo;
	} else {
		if(isReal == 00 || isReal == 30) {
			window.location.href = 'openBusiness.html?merchId=' + merchId + '&openacct=00&term_type=' + term_type + '&topBranchNo=' + topBranchNo;
		} else {
			mui.alert('您尚未实名认证通过，请实名')
		}
	}
})

//商户类型
$('.directType').on('click', function() {
	window.location.href = 'myUser.html?type=00&merchId=' + merchId + '&topBranchNo=' + topBranchNo + '&term_type=' + term_type;
})
$('.indirectType').on('click', function() {
	window.location.href = 'myUser1.html?type=01&merchId=' + merchId + '&topBranchNo=' + topBranchNo + '&term_type=' + term_type;
})
//我要分享
$('.toShare').on('click', function() {
	window.location.href = 'sharePage.html?merchId=' + merchId + '&topBranchNo=' + topBranchNo + '&term_type=' + term_type;
})
//我的地盘
$('.toMyLand').on('click', function() {
	//			mui.alert('正在努力挖掘中。。')
	window.location.href = 'myLand.html?merchId=' + merchId + '&topBranchNo=' + topBranchNo + '&term_type=' + term_type;
})
//查询直推人信息
$('.toPeople').on('click', function() {
	//			mui.alert('正在努力挖掘中。。')
	window.location.href = 'people.html?merchId=' + merchId + '&topBranchNo=' + topBranchNo + '&term_type=' + term_type;
})