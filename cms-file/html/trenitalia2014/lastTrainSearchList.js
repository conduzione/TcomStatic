/*
 * lastTrainSearchList.j
 *
 * last mod: 25-02-2016#14:00
 *
 */
var MLSIZE=5, MAXCOOKIELEN=200;
var trainSearchListCookie="trainSearchList", splt="||";

/* gets, sets, removes the value of a cookie */
function getCookie(sName){
    sName = sName.toLowerCase();
    var oCrumbles = document.cookie.split(';');
    for(var i=0; i<oCrumbles.length;i++){
        var oPair= oCrumbles[i].split('=');
        var sKey = decodeURIComponent(oPair[0].trim().toLowerCase());
        var sValue = oPair.length>1?oPair[1]:'';
        if(sKey == sName){ return decodeURIComponent(sValue); }
    }
    return '';
}
function setCookie(sName,sValue,eDate){
    var oDate = new Date();
	if(eDate){
		oDate = eDate;
	}else{
		oDate.setYear(oDate.getFullYear()+5);
	}
    var sCookie = encodeURIComponent(sName) + '=' + encodeURIComponent(sValue) + ';expires=' + oDate.toGMTString() + ';path=/';
    document.cookie= sCookie;
}
function clearCookie(sName){
    setCookie(sName,'');
}
function removeOldSearch(){
	var tsllen=trainSearchList.length;
	if(tsllen > MLSIZE){
		var itemsToRemove = tsllen-MLSIZE;
		for(var i=tsllen-1;i>=(tsllen-itemsToRemove);i--){
			removeTrainSearchItem(i);
		}
	}
}
function getCheckSearchCookieStr(){
	var tmpStr=getCookie(trainSearchListCookie);
	if(tmpStr.length>MAXCOOKIELEN){
		var idx=tmpStr.lastIndexOf(splt);
		tmpStr=tmpStr.substring(0, idx);
	}
	setCookie(trainSearchListCookie, tmpStr, null);
	return tmpStr;
}
function addToLastTrainSearchList(){
	trainSearchListStr=getCookie(trainSearchListCookie);
	var curSearch = $('#biglietti_fromNew').val()+"$"+$('#biglietti_toNew').val();
	if(trainSearchListStr.indexOf(curSearch)<0){
		if(trainSearchListStr.length>0){
			trainSearchListStr = splt+trainSearchListStr; 
		}
		trainSearchListStr = curSearch+trainSearchListStr;
		setCookie(trainSearchListCookie, trainSearchListStr, null);
		trainSearchList.push(curSearch);
	}
}
function chooseTrainSearchItem(){
	var itemIndex = $(this).parent().index();
	console.log("click on: "+ itemIndex + " - " + $(this).text() + " CHOOSE, arrList: ["+trainSearchList[itemIndex] + "]");  
	var stationsSel=(trainSearchList[itemIndex]).split('$');
	if(stationsSel.length==2){
		$('#biglietti_fromNew').val(stationsSel[0]);
		$('#biglietti_toNew').val(stationsSel[1]);
	}
	$("#trainSearchListSelBox").toggle();
	return false;
}
function removeTrainSearchListItem(){
	var itemIndex = $(this).parent().index();
	console.log("click on: "+ itemIndex + " - " + $(this).text() + " REMOVE, arrList: ["+trainSearchList[itemIndex] + "]");
	$(this).parent().remove();
	if($("#trainSearchListSel li").length==0){
		$("#trainSearchListSelBox").hide();
		//rimuovo anche il link "Ultime ricerche" dal cruscotto.
		$(".buttonsLastTrainSearchList").hide();
		$('.inputHidden').after("<div class='boxUltimeRicerche' style='height:35px'></div>")
		
	}
	removeTrainSearchItem(itemIndex);
	return false;
}
function removeTrainSearchItem(index){
	if((index==0) &&(trainSearchList.length==1)){
		trainSearchListStr = trainSearchListStr.replace(trainSearchList[index], '');
	}else{
		trainSearchListStr = trainSearchListStr.replace(splt+trainSearchList[index], '');
	}
	trainSearchList.splice(index, 1);
	if(trainSearchList.length==0){ trainSearchListStr=''; }
	setCookie(trainSearchListCookie, trainSearchListStr, null);	
}
function toggleLastTrainSearchList(){
	if( ($("#trainSearchListSelBox").css('display')=='none') ){
		if(trainSearchList.length>0){
			$("#trainSearchListSel").empty();
			for (var j = 0; j < trainSearchList.length; j++){
				$("#trainSearchListSel").append("<li><a href='#' class='chooseTrainSearchItem'>"+ trainSearchList[j].replace('$',' <label id="deskS">-</label><label id="mobS"><br></label> ') +"</a><a href='#' class='removeTrainSearchListItem'><img src='cms-file/immagini/trenitalia2014/Homepage/x_close.png'></a><div class='cl'></div></li>");
			}
			$(".removeTrainSearchListItem" ).on("click", removeTrainSearchListItem);
			$(".chooseTrainSearchItem" ).on("click", chooseTrainSearchItem);
			$("#trainSearchListSelBox").show();
		}
	}else{
		$("#trainSearchListSelBox").hide();
		$("#trainSearchListSel").empty();
	}
	return false;
}
function clearFromTo(){
	$('#biglietti_fromNew').val('');
	$('#biglietti_toNew').val('');
	return false;
}
/*Distinzione Browser*/
var getBrowser = function() {
    var userAgent = navigator.userAgent.toLowerCase(),
        browser = '',
        version = 0;

    $.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase());

    // IE?
    if ($.browser.msie) {
        userAgent = $.browser.version;
        userAgent = userAgent.substring(0, userAgent.indexOf('.'));
        version = userAgent;
        browser = "Internet Explorer";
    }

    // Chrome?
    if ($.browser.chrome) {
        userAgent = userAgent.substring(userAgent.indexOf('chrome/') + 7);
        userAgent = userAgent.substring(0, userAgent.indexOf('.'));
        version = userAgent;
        // Non è Safari!
        $.browser.safari = false;
        browser = "Chrome";
    }

    // Safari?
    if ($.browser.safari) {
        userAgent = userAgent.substring(userAgent.indexOf('safari/') + 7);
        userAgent = userAgent.substring(0, userAgent.indexOf('.'));
        version = userAgent;
        browser = "Safari";
    }

    // Mozilla?
    if ($.browser.mozilla) {
        // Firefox?
        if (navigator.userAgent.toLowerCase().indexOf('firefox') != -1) {
            userAgent = userAgent.substring(userAgent.indexOf('firefox/') + 8);
            userAgent = userAgent.substring(0, userAgent.indexOf('.'));
            version = userAgent;
            browser = "Firefox"
        }
        // Un altro browser basato su Gecko
        else {
            browser = "Mozilla (not Firefox)"
        }
    }

    // Opera?
    if ($.browser.opera) {
        userAgent = userAgent.substring(userAgent.indexOf('version/') + 8);
        userAgent = userAgent.substring(0, userAgent.indexOf('.'));
        version = userAgent;
        browser = "Opera";
    }

    return {
        ua: browser,
        ver: version
    }
};
/**
 *	
 * Cookie-String: "Stazione01a$Stazione01A||Stazione02Da$Stazione02A||..." <===> JS-Array: ["Stazione01a$Stazione01A", "Stazione02Da$Stazione02A", ... ]
 *
 * STRINGHE STAZIONI + LUNGHE: "San Martino V.C.-M.Sarchio-Pannarano" , "Sluderno-Glorenza Schluderns-Glurns"
 */
trainSearchListStr=getCheckSearchCookieStr();
if(trainSearchListStr.length>2){
	if(trainSearchListStr.substring(0, 2)==splt){ trainSearchListStr=trainSearchListStr.substring(2); }
	if(trainSearchListStr.substring((trainSearchListStr.length-2))==splt){ trainSearchListStr=trainSearchListStr.substring(0, trainSearchListStr.length-2); }
	trainSearchList=getCookie(trainSearchListCookie).split(splt); 
}else{
	trainSearchList = []; 
}
removeOldSearch();

//Adattare la finestra alla stringa di ricerca più lunga
mustLongString=function(){
	var strLong='';
	for(var i = 0; i < arguments.length; i++) {
	   if(typeof arguments[i]==='string'&&arguments[i].length>strLong.length){
			strLong=arguments[i];
	   };   
	};
	return strLong
};
var stringLong = mustLongString.apply(null,trainSearchList).length;
var widthPopUp = 0
if(stringLong<40){
	widthPopUp = (40*100)/12;
}else{
	widthPopUp = (stringLong*100)/12;
}
var UA = getBrowser();
var browserType = UA.ua;
var browserVersion = UA.ver;

/*Se il browser è IE9 e minore, non vengono vsualizzate le ultime ricerche*/
if (browserType == "Internet Explorer" && browserVersion <= 9){
	$(".buttonsLastTrainSearchList").hide();
}else{
	if(trainSearchList.length>0){
		/* style per gestione lista ultimi-treni per gli ID "trainSearchListSelBox" e "trainSearchListSel" */
		$('head').append('<style>#trainSearchListSelBox{ display: none; width:'+widthPopUp+'px; top: 5px; left: 5px; background: #ccff00; left: 524px; top: -1250px; z-index: 9999;}</style>');
		$('head').append('<style>#trainSearchListSelBox{ position:absolute; left:140px;  top:47px; z-index: 9999;}</style>');
		$('head').append('<style>#trainSearchListSelBox{ border-radius: 0 !important; background-color: #fff !important; border: 1px solid #bababa; }</style>');	
		
		$('head').append('<style>#trainSearchListSel li{ color: #000; /*float: left;*/ font-weight:bold; width: 97% !important;border-bottom:1px solid #bababa !important; margin-left:7px; line-height:25px !important;height:30px !important; min-height: 25px !important; text-align: left; }</style>');
		$('head').append('<style>#trainSearchListSel li a{ padding-top:2px !important;}</style>');
		$('head').append('<style>#trainSearchListSel{ width: 100%; min-height: 150px; }</style>');
		
		$('head').append('<style>.removeTrainSearchListItem, .chooseTrainSearchItem{padding-top: 0px !important;font-weight:normal !important;font-size:14px !important; color: #4c4c4c !important; text-decoration: none !important;}</style>');
		$('head').append('<style>.chooseTrainSearchItem{width:90% !important; float:left; margin-left: 5px;}</style>');
		$('head').append('<style>.removeTrainSearchListItem{width:3% !important; float:right; margin-left: 5px;}</style>');
			
		$('head').append('@media screen and (min-width:702px){<style>.buttonsLastTrainSearchList{ width: 450px; font-size: 12px; color: #4c4c4c; font-weight: bold; text-decoration: none; line-height: 1.8em; position: relative; left: 0px; top: 10px; }} </style>');
		$('head').append('@media screen and (max-width:701px){<style>.buttonsLastTrainSearchList{ width: 450px; font-size: 12px; color: #4c4c4c; font-weight: bold; text-decoration: none; line-height: 1.8em; position: relative; left: 0px; top: 0px; }} </style>');
		
		//$('head').append('<style>@media screen and (min-device-width: 320px) and (max-device-width:568px) {.buttonsLastTrainSearchList{top: -2px !important; }} </style>');
		//$('head').append('<style>.buttonsLastTrainSearchList{ margin-bottom: 10px; } </style>'); /* SU ATTUALE FORM! */
		$('head').append('<style>.buttonsLastTrainSearchList{ margin-bottom: 35px; } </style>'); /* SU NUOVO FORM CERT SOLO! */
		$('head').append('<!--[if lte IE 9]><style type="text/css">.buttonsLastTrainSearchList{ margin-bottom: 25px; }</style><![endif]-->'); 
		$('head').append('<style>@media screen and (min-width:702px){.linkCRUSLast{border:1px solid #dcdcdc;border-radius: 6px;padding: 0 4px 0 5px;position:relative;top:-10px;left:7px}}</style>'); /* SU NUOVO FORM CERT SOLO! */
		$('head').append('<style>@media screen and (max-width:701px){.linkCRUSLast{border:1px solid #dcdcdc;border-radius: 6px;padding: 0 4px 0 5px;position:relative;top:0px;left:7px}}</style>'); /* SU NUOVO FORM CERT SOLO! */
		$('head').append('<style> .linkCRUSLast img{position:relative;top:1px;left:7px}</style>'); /* SU NUOVO FORM CERT SOLO! */
		$('head').append('<style> .linkCRUSLast a{font-size:10px;color: #4c4c4c;font-weight: bold;text-decoration: none;}</style>'); /* SU NUOVO FORM CERT SOLO! */
		/*Titolo popup*/
		$('head').append('<style>#trainSearchTitle{ background-color: #c41329;line-height:40px;color:#fff;font-size:1.25em;font-weight:bold;padding-left:15px }</style>');
		$('head').append('<style>#trainSearchTitle a{color:#fff;font-size:0.75em;float:right;margin-right:4px;text-decoration: none !important;}</style>');
		$('head').append('<style>@media screen and (max-width:701px){#trainSearchListSelBox{width:96%;  position:absolute; left:2%;  top: 70px; z-index: 9999;}}</style>');
		$('head').append('<style>@media screen and (max-width:701px){#trainSearchListSel li{ color: #000; /*float: left;*/ font-weight:bold; width: 95% !important;border-bottom:1px solid #bababa !important; margin-left:7px; line-height:20px !important;height:45px !important; min-height: 25px !important; text-align: left; }}</style>');
		$('head').append('<style>@media screen and (max-width:701px){#mobS{display:inline;}#deskS{display:none;}}</style>');
		$('head').append('<style>@media screen and (min-width:702px){#mobS{display:none;}#deskS{display:inline;}}</style>');
		$('head').append('<style>@media screen and (max-width:701px){.removeTrainSearchListItem{margin-top: 10px;}}</style>');
		$('head').append('<style>@media screen and (min-width:702px){.imgUltimeRIC{position:relative;top:-3px;margin-left:7px}}</style>');
		$('head').append('<style>@media screen and (max-width:701px){.imgUltimeRIC{position:relative;top:-3px;margin-left:1px}}</style>');
		$('head').append('<!--[if lte IE 9]><style type="text/css">.imgUltimeRIC{position:relative;top:-3px;margin-left:15px}</style><![endif]-->'); 
		$('head').append('<!--[if lte IE 9]><style type="text/css">.buttonsLastTrainSearchList{ margin-bottom: 25px; }</style><![endif]-->'); 
		$('head').append('<!--[if lte IE 9]><style type="text/css">#trainSearchListSelBox{width:'+widthPopUp+'px;  position:absolute; left: 120px;  top: 120px; z-index: 9999;}</style><![endif]-->'); 
		$('head').append('<!--[if lte IE 9]><style type="text/css">#trainSearchListSel li{ color: #000; /*float: left;*/ font-weight:bold; width: 97% !important;border-bottom:1px solid #bababa !important; margin-left:7px; line-height:25px !important;height:30px !important; min-height: 25px !important; text-align: left; }</style><![endif]-->'); 
		$('head').append('<!--[if lte IE 9]><style type="text/css">#mobS{display:none;}#deskS{display:inline;}</style><![endif]-->'); 
		$('head').append('<!--[if lte IE 9]><style type="text/css">.removeTrainSearchListItem{margin-top:0px;}</style><![endif]-->'); 
		
		/* ### Rendering Box e Bottoni x per lista ultimi treni ###  */
		$('.boxUltimeRicerche').remove();
		$('.inputHidden').after("<div id='trainSearchListSelBox'><div id='trainSearchTitle'>ULTIME RICERCHE<a href='#' onclick='return toggleLastTrainSearchList();'><font style='text-decoration: underline !important;'>chiudi</font> <img src='cms-file/immagini/trenitalia2014/Homepage/x_close_red.png'></a></div><ul id='trainSearchListSel'></ul></div>");
		$('.inputHidden').after(
			"<div class='buttonsLastTrainSearchList' style=''>"+
			"<div class='linkCRUSLast fl' style='width:26%;'><a href='' id='trainSearchListSelButton' onclick='return toggleLastTrainSearchList();' title=''>"+
			"ULTIME RICERCHE<img src='cms-file/immagini/trenitalia2014/Homepage/arrow_right.png' class='imgUltimeRIC'></a></div>"+
			"<div class='fl' style=''><a href='' onclick='return clearFromTo();' title='' style='margin:0; margin-left:5px;background:transparent;border:0px' >"+ 
			//"Reset <img src='http://findicons.com/files/icons/2139/uidesign/16/delete.png' style='top:3px;margin-left:1px;height:15px;'></a></div>"+
			"</div>"
		);
		if( /iPhone/i.test(navigator.userAgent) ) {
		 $(".buttonsLastTrainSearchList").css("top", "-5px");
		  $(".buttonsLastTrainSearchList").css("margin-bottom", "0px");
		}
		

		$('.buttonsLastTrainSearchList').fadeIn('fast');
		//$('.buttonsLastTrainSearchList').fadeOut('fast').fadeIn('slow');
		//$('.buttonsLastTrainSearchList').fadeOut('slow').fadeIn('fast');
		/*$('.cruscottoBiglietti').css('height','425px'); /* SU NUOVO FORM CERT SOLO! */
		
		$(document).mouseup(function(e){
			/* console.log('< event target='+$(e.target).html().substring(0, 50)+' - test1='+test1+' - test2='+test2); */
			var test1= $(e.target).is('#trainSearchListSelBox *');
			var test2= $(e.target).is('#trainSearchListSelButton');
			if(test1 || test2){
				return;
			}else{
				$('#trainSearchListSelBox').hide();
			}
		});
	}

}



/* ############### DA aggiungere alla fine di tcom14.checkForm... POICHE' ABBIAMO LA VALIDAZIONE DELLE STAZIONI!!! */ 
tcom14.checkFormOLD = tcom14.checkForm;
tcom14.checkForm = function(e){
	var resCheck=tcom14.checkFormOLD(e);
	if(resCheck!=false){
		addToLastTrainSearchList();
	}
	return resCheck;
};
/* modalità di inclusione utilizzata in tcom_engine.js
if(navigator.cookieEnabled){
	setTimeout(function(){ 
		$.getScript('cms-file/html/trenitalia2014/lastTrainSearchList.js'); 		
	}, 1000);
}
*/

