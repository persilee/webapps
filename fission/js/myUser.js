mui.init();
var merchId,type;
//直推商户merch/getSubMerch.do
$(function(){
    $.getUrlParam = function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
		console.log(reg, r);
	}
	//得到url参数  
	type = $.getUrlParam('type');
	merchId = $.getUrlParam('merchId');
	console.log(type);
	//根据type不同显示tab选项
	if(type=='00'){
		console.log('切换0')
		$('#direct').remove('mui-active');
		$('#item2').remove('mui-active');
		$('#direct').addClass('mui-active');
		$('#item1').addClass('mui-active');
		directType(type);
	}else if(type=='01'){
		console.log('切换1')
		$('#direct').remove('mui-active');
		$('#item1').remove('mui-active');
		$('#indirect').addClass('mui-active');
		$('#item2').addClass('mui-active');
		directType(type);
	}
})
//直推点击事件
var dType;
$('#direct').on('tap',function(e){
	console.log('type1------',type)
	console.log('click00==',$(this).attr('data-type'));
	dType = $(this).attr('data-type')
	directType(dType);
})
//间推点击事件
$('#indirect').on('tap',function(e){
	console.log('type2------',type)
	console.log('click01==',$(this).attr('data-type'));
	dType = $(this).attr('data-type')
	directType(dType);
})

//列表数据渲染
var page1 = 1;
var page2 =1;
var pageSize = 10;
var flag =true;
var html = '';
var html1= '';
function directType(type){
	var url = urlpath+'merch/getSubMerch.do';
	var page;
	if(type=="00"){
		page = page1;
	}else{
		page = page2;
	}
	
	console.log('page==type==',page,type);
	$.ajax({
		type:"post",
		url:url,
		async:false,
		data:{
			merchId:merchId,
			type:type,
			page:page,
			pageSize:pageSize,
			version:version
		},
		success:function(data){
			console.log('获取直推商户信息',data);
			
			if(data.code == 200){
				console.log('data.data',data.data.list)
				//遍历生成列表
				console.log(data.data.list.length);
				
				if(data.data.list.length==10){
					//page++;
					if(type=="00"){
						page1++;
					}else{
						page2++;
					}
					listShow(type,data);
//							return true;
				}else{
					
					if(flag){
						flag=false;
						listShow(type,data);
					}else{
						return false;
					}
				}
			}else{
				mui.toast(data.message);
			}
			
		}
	});
	
}

function listShow(type,data){
	console.log(type);
	if(type == '00'){
		if(data.data.list.length>0){
			for(var i = 0;i < data.data.list.length;i++){
				html +='<li class="li_list_box">'+
					'<div class="user_list_box">'+data.data.list[i].merchId+'</div>'+
					'<div class="user_list_box" style="line-height: 1;position:relative;top:7px;">'+data.data.list[i].createTime+'</div>'+
					'<div class="user_list_box">'+data.data.list[i].isNetting+'</div>'+
					'<div class="user_list_box">'+data.data.list[i].merchLevel+'</div>'+
				'</li>';
			}
//					console.log(html);
			$('.userList').append(html);
			
		}else{
			/*$('.directTitle').hide();*/
			mui.alert('您还未有推荐商户,赶紧去推荐吧~');
		}
	}else if(type == '01'){
		if(data.data.list.length>0){
			for(var i = 0;i < data.data.list.length;i++){
				html1 += '<li class="li_list_box">'+
					'<div class="user_list_box">'+data.data.list[i].merchId+'</div>'+
					'<div class="user_list_box" style="line-height: 1;position:relative;top:7px;">'+data.data.list[i].createTime+'</div>'+
					'<div class="user_list_box">'+data.data.list[i].isNetting+'</div>'+
					'<div class="user_list_box">'+data.data.list[i].merchLevel+'</div>'+
				'</li>';
			}
			$('.indirectUserList').append(html1);
		}else{
			/*$('.indirectTitle').hide();*/
			mui.alert('您还未有推荐商户,赶紧去推荐吧~');
		}
	}
}

//计算滚动条滚动过的距离
$(window).scroll(function(){
    var scrollTop = $(this).scrollTop();//返回匹配元素的滚动条的垂直位置
    var scrollHeight = $(document).height();//代表了整个文档的高度
    var windowHeight = $(this).height();//代表了当前可见区域的大小
    if(scrollTop + windowHeight == scrollHeight){
    	if(dType){
    		directType(dType)
    	}else if(type){
    		directType(type)
    	}
//		    	console.log('page======',page)
	}else{
		
	}
});