/*
Copyright (c) 2008-2011, www.redips.net  All rights reserved.
Code licensed under the BSD License: http://www.redips.net/license/
http://www.redips.net/javascript/dialog-box/
Version 1.6.0
May 4, 2012.
*/	
"use strict";var REDIPS=REDIPS||{};REDIPS.dialog=(function(){var init,show,hide,image_tag,position,fade,input_html,dialog_html,initXMLHttpClient,normalize,request,op_high=60,op_low=0,fade_speed=10,shown=false,close_button='<strong> X </strong>',youtube='<object width="640" height="390">'+'<param name="movie" value="http://_youtube_?&version=2&fs=0&rel=0&iv_load_policy=3&color2=0xB30002"></param>'+'<param name="allowFullScreen" value="true"></param>'+'<param name="allowScriptAccess" value="always"></param>'+'<embed src="http://_youtube_?&version=2&fs=0&rel=0&iv_load_policy=3&color2=0xB30002" '+'type="application/x-shockwave-flash" '+'allowfullscreen="true" '+'allowscriptaccess="always" '+'width="640" height="390">'+'</embed>'+'</object>',shade,dialog_box,dialog_width=0,dialog_height=0,function_call,function_param,dialog_id='redips_dialog';init=function(){dialog_box=document.createElement('div');dialog_box.setAttribute('id',dialog_id);shade=document.createElement('div');shade.setAttribute('id','redips_dialog_shade');var body=document.getElementsByTagName('body')[0];body.appendChild(shade);body.appendChild(dialog_box);REDIPS.event.add(window,'resize',position);REDIPS.event.add(window,'scroll',position);request=initXMLHttpClient();};initXMLHttpClient=function(){var XMLHTTP_IDS,xmlhttp,success=false,i;try{xmlhttp=new XMLHttpRequest();}
catch(e1){XMLHTTP_IDS=['MSXML2.XMLHTTP.5.0','MSXML2.XMLHTTP.4.0','MSXML2.XMLHTTP.3.0','MSXML2.XMLHTTP','Microsoft.XMLHTTP'];for(i=0;i<XMLHTTP_IDS.length&&!success;i++){try{success=true;xmlhttp=new ActiveXObject(XMLHTTP_IDS[i]);}
catch(e2){}}
if(!success){throw new Error('Unable to create XMLHttpRequest!');}}
return xmlhttp;};show=function(width,height,text,button1,button2){var input1='',input2='',param='',img_extensions,page_extensions,youtube_url,youtube_html='',div_img='',div_text='',img_text='';REDIPS.dialog.shown=true;dialog_width=width;dialog_height=height;position();img_extensions=/(\.jpg|\.jpeg|\.gif|\.png)$/i;page_extensions=/(\.php|\.aspx)/i;youtube_url=/www\.youtube\.com/i;if(button1!==undefined){input1=input_html(button1);}
if(button2!==undefined){input2=input_html(button2);}
if(img_extensions.test(text)){img_text=text.split('|');if(img_text.length===1){div_img=image_tag(img_text[0]);}
else{div_img=image_tag(img_text[1]);div_text='<div>'+img_text[0]+'</div>';}
dialog_html(div_img+div_text,input1,input2);}
else if(page_extensions.test(text)){request.open('GET',text,true);request.onreadystatechange=function(){if(request.readyState===4){if(request.status===200){dialog_html(request.responseText);}
else{show.dialog_html('Error: ['+request.status+'] '+request.statusText);}}};request.send(null);}
else if(youtube_url.test(text)){youtube_html=REDIPS.dialog.youtube.replace(/_youtube_/g,text);dialog_html(youtube_html);}
else{div_text='<div>'+text+'</div>';dialog_html(div_img+div_text,input1,input2);}
REDIPS.dialog.myhandler_displayed();};dialog_html=function(html,input1,input2){if(input1===undefined){input1='';}
if(input2===undefined){input2='';}
dialog_box.innerHTML='<div class="redips_dialog_titlebar"><span title="Close" onclick="REDIPS.dialog.hide(\'undefined\')">'+REDIPS.dialog.close_button+'</span></div>'+'<table class="redips_dialog_tbl" cellpadding="0" cellspacing="0"><tr><td valign="center" height="'+dialog_height+'" width="'+dialog_width+'">'+
html+'<div class="redips_dialog_buttons">'+input1+input2+'</div>'+'</td></tr></table>';shade.style.display=dialog_box.style.display='block';fade(REDIPS.dialog.op_low,5);};hide=function(fnc,param){if(REDIPS.dialog.shown===true){REDIPS.dialog.shown=false;function_call=fnc;function_param=param;fade(REDIPS.dialog.op_high,-10);dialog_box.style.display='none';REDIPS.dialog.myhandler_closed();}};input_html=function(button){var param,html;button=button.split('|');param=button[2];if(param!==undefined){param='\',\''+param;}
else{param='';}
html='<input type="button" onclick="REDIPS.dialog.hide(\''+normalize(button[1])+normalize(param)+'\');" value="'+normalize(button[0])+'"/>';return html;};image_tag=function(image){var img,images,i;images=image.split(',');if(images.length===1){img='<div class="redips_dialog_imgc"><img src="'+images[0]+'" height="'+(dialog_height-40)+'"/></div>';}
else{img='<div class="redips_dialog_imgc" style="width:'+(dialog_width-8)+'px"><table><tr>';for(i=0;i<images.length;i++){img+='<td><img src="'+images[i]+'" height="'+(dialog_height-40)+'"/></td>';}
img+='</tr></table></div>';}
return img;};position=function(){var window_width,window_height,scrollX,scrollY;if(typeof(window.innerWidth)==='number'){window_width=window.innerWidth;window_height=window.innerHeight;scrollX=window.pageXOffset;scrollY=window.pageYOffset;}
else if(document.documentElement&&(document.documentElement.clientWidth||document.documentElement.clientHeight)){window_width=document.documentElement.clientWidth;window_height=document.documentElement.clientHeight;scrollX=document.documentElement.scrollLeft;scrollY=document.documentElement.scrollTop;shade.style.width=window_width+'px';shade.style.height=window_height+'px';}
else if(document.body&&(document.body.clientWidth||document.body.clientHeight)){window_width=document.body.clientWidth;window_height=document.body.clientHeight;scrollX=document.body.scrollLeft;scrollY=document.body.scrollTop;}
dialog_box.style.left=((window_width-dialog_width)/2)+'px';dialog_box.style.top=((window_height-dialog_height)/2)+'px';shade.style.top=scrollY+'px';shade.style.left=scrollX+'px';};fade=function(opacity,step){shade.style.opacity=opacity/100;shade.style.filter='alpha(opacity='+opacity+')';opacity+=step;if(REDIPS.dialog.op_low<=opacity&&opacity<=REDIPS.dialog.op_high){setTimeout(function(){fade(opacity,step);},REDIPS.dialog.fade_speed);}
else if(REDIPS.dialog.op_low>opacity){shade.style.display='none';if(function_call!=='undefined'){window[function_call](function_param);}}};normalize=function(str){if(str!==undefined){str=str.replace(/^\s+|\s+$/g,'').replace(/\s{2,}/g,' ');}
return str;};return{op_high:op_high,op_low:op_low,fade_speed:fade_speed,youtube:youtube,shown:shown,close_button:close_button,init:init,show:show,hide:hide,myhandler_displayed:function(){},myhandler_closed:function(){}};}());if(!REDIPS.event){REDIPS.event=(function(){var add,remove;add=function(obj,eventName,handler){if(obj.addEventListener){obj.addEventListener(eventName,handler,false);}
else if(obj.attachEvent){obj.attachEvent('on'+eventName,handler);}
else{obj['on'+eventName]=handler;}};remove=function(obj,eventName,handler){if(obj.removeEventListener){obj.removeEventListener(eventName,handler,false);}
else if(obj.detachEvent){obj.detachEvent('on'+eventName,handler);}
else{obj['on'+eventName]=null;}};return{add:add,remove:remove};}());}

/*jslint white: true, browser: true, undef: true, nomen: true, eqeqeq: true, plusplus: false, bitwise: true, regexp: true, strict: true, newcap: true, immed: true, maxerr: 14 */
/*global window: false, REDIPS: true */

/* enable strict mode */
"use strict";

// create redips container
var redips = {};

// dialog box initialization (called from onload event)
redips.init = function () {
	// reference to the REDIPS.dialog lib
	var rd = REDIPS.dialog;
	// initialization
	rd.init();
	// opacitiy
	rd.op_high = 60;
	// fade speed
	rd.fade_speed = 18;
	// define close button
	//rd.close_button = 'Z';
	// event handler called after dialog is displayed
	rd.myhandler_displayed = function () { /* */ };
	// event handler called after dialog is closed
	rd.myhandler_closed = function () { /* */ };
};
redips.init();

/*
function loadjscssfile(filename, filetype){
 if (filetype=="js"){ //if filename is a external JavaScript file
  var fileref=document.createElement('script')
  fileref.setAttribute("type","text/javascript")
  fileref.setAttribute("src", filename)
 }
 else if (filetype=="css"){ //if filename is an external CSS file
  var fileref=document.createElement("link")
  fileref.setAttribute("rel", "stylesheet")
  fileref.setAttribute("type", "text/css")
  fileref.setAttribute("href", filename)
 }
 if (typeof fileref!="undefined")
  document.getElementsByTagName("head")[0].appendChild(fileref)
}
*/
//loadjscssfile("http://gasp-server:8082/cms-file/common/css/redips-dialog.css", "css");


function createCSSClassJit(selector, declaration) {
	// test for IE
	var ua = navigator.userAgent.toLowerCase();
	var isIE = (/msie/.test(ua)) && !(/opera/.test(ua)) && (/win/.test(ua));

	// create the style node for all browsers
	var style_node = document.createElement("style");
	style_node.setAttribute("type", "text/css");
	style_node.setAttribute("media", "screen"); 

	// append a rule for good browsers
	if (!isIE) style_node.appendChild(document.createTextNode(selector + " {" + declaration + "}"));

	// append the style node
	document.getElementsByTagName("head")[0].appendChild(style_node);

	// use alternative methods for IE
	if (isIE && document.styleSheets && document.styleSheets.length > 0) {
		var last_style_node = document.styleSheets[document.styleSheets.length - 1];
		if (typeof(last_style_node.addRule) == "object") last_style_node.addRule(selector, declaration);
	}
};


// BLU di default: #6A93D4  -  ROSSO FS: #B30002
createCSSClassJit(
	"#redips_dialog", "display: none; z-index: 999; position: fixed; overflow: hidden; -moz-border-radius: 5px 5px 5px 5px; -webkit-border-radius: 5px  5px 5px 5px; padding: 1px;"
	+"background-color: #B30002; border-top-left-radius: 5px 5px; border-top-right-radius: 5px 5px; border-bottom-right-radius: 5px 5px; border-bottom-left-radius: 5px 5px;");
createCSSClassJit(".redips_dialog_titlebar", "text-align: right;	font-size: 10px; background-color: #B30002; padding: 2px;");
createCSSClassJit(".redips_dialog_titlebar span", "padding: 0px 2px; /*background-color:#92B4EA;*/ color: white; cursor: pointer; font-size: 16px;");
createCSSClassJit(".redips_dialog_tbl", "background-color: #eee; border-width: 0px 2px 2px 2px; border-color: #B30002; border-style: solid; text-align: center;");
createCSSClassJit(".redips_dialog_tbl td", "padding: 0px;");
createCSSClassJit(".redips_dialog_imgc", "overflow-y: hidden; overflow-x: auto; margin: 5px auto 5px auto;");	
createCSSClassJit(".redips_dialog_imgc table", "margin: auto;");
createCSSClassJit(".redips_dialog_buttons input", "color: white; background-color: #B30002; border: 1px #ccc solid; width: 65px; height: 20px; margin: 18px 5px 10px 0px; font-size: 10px;");
createCSSClassJit("#redips_dialog_shade", "z-index: 998; display: none; position: absolute; background-color: black; width: 100%; height: 100%; ");
