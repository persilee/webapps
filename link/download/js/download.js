//判断终端类型
		var mobileOs,branchCode;
		$(function(){
			var u = navigator.userAgent;
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
			if(isAndroid){
				mobileOs = 'Android';
			}else if(isiOS){
				mobileOs = 'iOS';
			}else{
				mobileOs = 'web';
			}
			branchCode = $.getUrlParam('branchCode');
            branchCode = '20000026'
//			console.log('branchCode',branchCode);
			getAppVersion();
			
		});
		
		//判断是否为微信浏览器
		function is_weixin(){ 
		    var ua = window.navigator.userAgent.toLowerCase(); 
		    if(ua.match(/MicroMessenger/i) == 'micromessenger'){ 
//		      	console.log('是微信');
		       	$('.loadBox').show();
		    }else{ 
//		       	console.log('不是微信');
		       	if(mobileOs == 'iOS'){
		       		window.location.href = iOSData.linkUrl;
//		       		$('#iOSLink').attr('href',iOSData.linkUrl);
		       	}else if(mobileOs == 'Android'){
		       		window.location.href = AndroidData.linkUrl;
		       		$('#AndroidLink').attr('download',AndroidData.linkUrl);
		       	}
		    } 
		    
		}
		//获取下载apk
		var AndroidData,iOSData;
		function getAppVersion(){
			console.log('branchCode11',branchCode)
			var url = urlpath+'merch/getAppVersion.do';
			$.ajax({
				type:"post",
				url:url,
				data:{
					branchCode:'20000026'
				},
				success:function(data){
					console.log('getAppVersion',data);
					
					if(data.code==200){
						console.log(data.data.length)
						$('.con').show()
						if(data.data.length>0){
							$('.title').html('更新说明');
							/*-------iOS-------*/
							$('.iOSName').html('iOS');
							iOSData = data.data[1].iOS;
	//						console.log('2',iOSData);
							$('#iOSLink').attr('download',iOSData.linkUrl);
							var iOSTimeDet = iOSData.updateTime;
							var iOSUpdateTime = iOSTimeDet.substring(0,4) + '-'+ iOSTimeDet.substring(4,6) + '-'+ iOSTimeDet.substring(6,8);
							$('.iosUpdateTime').html('更新：'+iOSUpdateTime);
							$('.iosVersion').html('版本：V'+iOSData.appVersion);
							$('.iosSize').html('大小：'+iOSData.add1);
							
							/*-----Android-----*/
							$('.AndName').html('Android');
							AndroidData = data.data[0].Android;
	//						console.log('1',AndroidData);
							$('#AndLink').attr('download',AndroidData.linkUrl);
							var AndTimeDet = AndroidData.updateTime;
							var AndUpdateTime = AndTimeDet.substring(0,4) + '-'+ AndTimeDet.substring(4,6) + '-'+ AndTimeDet.substring(6,8);
	//						console.log(AndUpdateTime)
							$('.andUpdateTime').html('更新：'+AndUpdateTime);
							$('.andVersion').html('版本：V'+AndroidData.appVersion);
							$('.andSize').html('大小：'+AndroidData.add1);
							/*---name----logo--------*/
							$('.appName').html(AndroidData.appName);
							$('#iconUrl').html('<img src="'+AndroidData.iconUrl+'"/>');
						}else{
							$('body').html('<img src="img/nothing.png"/>');
						}
					}else{
						$('body').html('<img src="img/nothing.png"/>');
					}
				}
			});
		}
		
		//点击下载
		$('.AndBtn').on('click',function(e){
			if(mobileOs == 'iOS'){
	       		mui.alert('请选择下载iOS版');
	       	}else{
	       		is_weixin();
	       	}
		})
		
		$('.iOSBtn').on('click',function(e){
			if(mobileOs == 'iOS'){
				is_weixin();
	       	}else{
	       		mui.alert('请选择下载Android版');
	       	}
			
		})
		
		
		/*----------隐藏遮罩----------*/
	    $('.loadPop').on('click',function(e){
			$('.loadBox').hide();
		})