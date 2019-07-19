var merchId,term_type,topBranchNo,beginTime,endTime,pageSize,serviceId,result,orderId;
		var page = 1;
		var html2 = '';
$(function() {
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
	
	//显示列表
	mui.init({
		pullRefresh: {
			container: '#refreshContainer', //待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
			up: {
				height: 50, //可选,默认false.自动上拉加载一次
				contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
				auto:true,
				contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
				callback: pullRefreshFunction
			}
		}
	});
	
})

//查询所有
function pullRefreshFunction(){
	
	setTimeout(function(){
		mui('#refreshContainer').pullRefresh().endPullupToRefresh(false);
		
		console.log('merchId==', merchId)
		var url = urlpath + 'merch/queryProfit.do';
		$.ajax({
			type: "post",
			url: url,
			async: false,
			data: {
				merchId: merchId,
				page:page,
				pageSize:10,
				version: version
			},
			success: function(data) {
				console.log('showPage',page)
				console.log(data);
				if(data.code == 200) {
					console.log(data.data.list.length);
					if(data.data.isLastPage!=true){
						if(data.data.isFirstPage == true || data.data.isLastPage == false){
							for(var i = 0; i < data.data.list.length; i++) {
								html2 += '<li class="sy_li_box">'+
									'<div class="sy_top_box">'+
										'<span class="order_num">'+data.data.list[i].merNo+'</span>'+
										'<span class="type_name">'+data.data.list[i].serviceName+'</span>'+
										'<span class="shouyi_num">+<span>'+data.data.list[i].syAmt+'</span></span>'+
									'</div>'+
									'<div class="sy_bottom_box">'+
										'<span class="pay_time">'+data.data.list[i].insertTime+'</span>'+
										'<div class="r_box">'+
											'<span class="type_name1">'+data.data.list[i].procStatus+'</span>'+
											'<span class="jiaoyi_num">'+data.data.list[i].transAmt+'</span>'+
										'</div>'+
									'</div>'+
								'</li>';
							}
							$('.mui-table-view').html(html2);
						}
						page = data.data.nextPage;
					}else if(data.data.isLastPage==true){
						mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
						if(data.data.isFirstPage == true && data.data.isLastPage == true){
							for(var i = 0; i < data.data.list.length; i++) {
								html2 += '<li class="sy_li_box">'+
										'<div class="sy_top_box">'+
											'<span class="order_num">'+data.data.list[i].merNo+'</span>'+
											'<span class="type_name">'+data.data.list[i].serviceName+'</span>'+
											'<span class="shouyi_num">+<span>'+data.data.list[i].syAmt+'</span></span>'+
										'</div>'+
										'<div class="sy_bottom_box">'+
											'<span class="pay_time">'+data.data.list[i].insertTime+'</span>'+
											'<div class="r_box">'+
												'<span class="type_name1">'+data.data.list[i].procStatus+'</span>'+
												'<span class="jiaoyi_num">'+data.data.list[i].transAmt+'</span>'+
											'</div>'+
										'</div>'+
									'</li>';
							}
							$('.mui-table-view').html(html2);
						}
					}else{
						mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
					}               
				}else{
					mui.toast(data.message);
				}
			}
			
		});
		
	},1500);		
}

//全部按钮
$('.checkAll').on('click',function(){
	location.reload();
})


//筛选
$('.riliBtn').on('click',function(){
//			mui.alert('正在努力开发中。。')
	console.log('显示日历')
	var dtpicker = new mui.DtPicker({
	    type: "date",//设置日历初始视图模式 
	    beginDate: new Date(2014, 04, 25),//设置开始日期 
	    endDate: new Date(2050, 04, 25),//设置结束日期 
	    labels: ['Year', 'Mon', 'Day'],//设置默认标签区域提示语 
	    
	}) 
	dtpicker.show(function(e) {
	    console.log(e);
	    console.log(e.value);
	    var startTime = e.value+' 00:00:00';
	  	var endTime = e.value+' 23:59:59';
	  	console.log('时间',startTime,endTime);
	    
	    var url = urlpath + 'merch/queryProfit.do';
	    $.ajax({
	    	type:"post",
	    	url:url,
	    	async:false,
	    	data:{
	    		merchId: merchId,
	    		beginTime:startTime,
				endTime:endTime,
				page:page,
				version: version
	    	},
	    	success:function(data){
	    		var html1 = '';
	    		console.log('筛选查询queryProfit.do',data.data)
	    		if(data.code == 200) {
					console.log(data.data.list.length);
					if(data.data.list.length!=0){
						if(data.data.isLastPage==true || data.data.hasNextPage == false){
							console.log('lastFalse',data.data.isLastPage);
							mui('#refreshContainer').pullRefresh().endPullupToRefresh(false);
							if(data.data.isFirstPage == true || data.data.isLastPage == false){
								$('.mui-table-view').empty();
								for(var i = 0; i < data.data.list.length; i++) {
									html1 += '<li class="sy_li_box">'+
											'<div class="sy_top_box">'+
												'<span class="order_num">'+data.data.list[i].merNo+'</span>'+
												'<span class="type_name">'+data.data.list[i].serviceName+'</span>'+
												'<span class="shouyi_num">+<span>'+data.data.list[i].syAmt+'</span></span>'+
											'</div>'+
											'<div class="sy_bottom_box">'+
												'<span class="pay_time">'+data.data.list[i].insertTime+'</span>'+
												'<div class="r_box">'+
													'<span class="type_name1">'+data.data.list[i].procStatus+'</span>'+
													'<span class="jiaoyi_num">'+data.data.list[i].transAmt+'</span>'+
												'</div>'+
											'</div>'+
										'</li>';
								}
								$('.mui-table-view').html(html1);
							}
							page = data.data.nextPage;
						}else{
							mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
						}
					}else{
						mui.toast('您所查询的时间暂无交易');
						setTimeout(function(){
							location.reload();
						},2300)
					}		
				}else{
					mui.toast(data.message);
				}
	    	}
	    });
	}) ;
})