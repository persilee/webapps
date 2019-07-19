var merchId;
$(function(){
	$.getUrlParam = function(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
	//console.log(reg, r);
	}
	//得到url参数  
	merchId = $.getUrlParam('merchId');
	term_type = $.getUrlParam('term_type');
	topBranchNo = $.getUrlParam('topBranchNo');
	console.log(term_type,topBranchNo)
});


//显示二维码
//merch/getShareUrl.do
$(function(){
	showQrcode();
})
function showQrcode(){
	var url = urlpath + 'merch/getShareUrl.do';
	console.log('topBranchNo===',topBranchNo);
	$.ajax({
		type:"post",
		url:url,
		async:false,
		data:{
			merchId:merchId,
			topBranchNo:topBranchNo
		},
		success:function(data){
			console.log(data);
			console.log(data.data);
			if(data.code == 200){
				var qrcode = new QRCode(document.getElementById("qrcode"), {
					width : 135,
					height : 135,
					correctLevel : QRCode.CorrectLevel.H
				});
				//		console.log(qrcode);
				function makeCode () {		
					qrcode.clear();
					qrcode.makeCode(data.data);
				}
				makeCode();
			}
		}
	});
}

//保存图片
$('.saveBtn').on('click',function(){
//			mui.alert('图片已保存至')
//			downloadImg();
//截图单击事件  
ctx.drawImage(video, 0, 0, width, height);  // 将video中的数据绘制到canvas里  
saveImage(canvas, 'screen_' + new Date().getTime() + '.png');  // 存储图片到本地 
})

//变量声明  
var video = document.getElementById('video_1');  
var canvas = document.getElementById('canvas_1');  
var ctx = canvas.getContext('2d');  
var width = 800;  
var height = 600;  
  
canvas.width = width;  
canvas.height = height;  

function saveImage (canvas, filename) {  
  //alert(canvas.toDataURL());  
var image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');  
  
    saveFile(image, filename || 'file_' + new Date().getTime() + '.png');  
}
function saveFile(data, filename) {  
    var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');  
    save_link.href = data;  
    save_link.download = filename;  
  
    var event = document.createEvent('MouseEvents');  
event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);  
    save_link.dispatchEvent(event);  
}  





/*function downloadImg(filename,con){
//			var myCanvas = $('.qrcodeBox').find('canvas')[0].toDataURL('image/png').replace("image/png", "image/octet-stream");
//			console.log(myCanvas);
//			window.location.href=myCanvas;
			var myCanvas = $('.qrcodeBox').find('canvas')[0];
			var type = 'png';
			var imgData = myCanvas.toDataURL(myCanvas);
			var _fixType = function(type) {
			    type = type.toLowerCase().replace(/png/i, 'png');
			    var r = type.match(/png|jpeg|bmp|gif/)[0];
			    return 'image/' + r;
			};
   
			// 加工image data，替换mime type
			imgData = imgData.replace(_fixType(type),'image/octet-stream');
			
			var saveFile = function(data, filename){
			    var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
			    save_link.href = data;
			    save_link.download = filename;
			   
			    var event = document.createEvent('MouseEvents');
			    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			    save_link.dispatchEvent(event);
			};
			   
			// 下载后的问题名
			var filename = 'qrcode_' + (new Date()).getTime() + '.' + type;
			// download
			saveFile(imgData,filename);
		}*/