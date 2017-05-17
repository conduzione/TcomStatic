	
function appendDivAsFirstChildToNode(idDiv, toNode){
	var tmpElem=false;
	try{
		var tmpHtml = document.getElementById(idDiv).innerHTML;
		document.getElementById(idDiv).remove();
		tmpElem = document.createElement("DIV");
		tmpElem.id=idDiv;
		tmpElem.innerHTML = tmpHtml;
		toNode.insertBefore(tmpElem, toNode.childNodes[0]);
	}catch(e){
		tmpElem=false; 
	}
	return tmpElem;
}
/* con jquery
if($(window).width()<700){
	var tmpHtml= '<div id=\"cookie_banner_container\">' + $('#cookie_banner_container').html() + '</div>';
	$('#cookie_banner_container').remove();
	$('body').prepend(tmpHtml);
}
*/	
/* js standard */
var myWindowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
if(myWindowWidth<700){
	appendDivAsFirstChildToNode('cookie_banner_container', /* document.getElementsByClassName('header')[0] */ document.body );
}

function addFsCookieBannerContainer(curCookieDomain){
	curCookieDomain = ".";
	var cookie_banner = document.getElementById('cookie_banner_container'), close_btn_1 = document.getElementById('cookie_banner_close_01'), close_btn_2 = document.getElementById('cookie_banner_close_02'), cookie_name = 'FsBannerAcceptedCookiePolicy', closeBanner;	
	// display banner if no cookie found
	if(document.cookie.indexOf(cookie_name) === -1) {
		cookie_banner.style.display = 'block';
	}
	closeBanner = function(e){
		var date = new Date, time = date.getTime();
		if(e.preventDefault){
			e.preventDefault();
		}else {
			e.returnValue = false;
		}
		// hide banner & set cookie to expire in 10yrs
		cookie_banner.style.display = 'none';
		time += 3600 * 1000 * 24 * 365 * 10;
		date.setTime(time);
		document.cookie = cookie_name + '=true; expires=' + date.toGMTString() + ';domain='+curCookieDomain+'; path=/';
	}
	if(!close_btn_1.addEventListener) {
		close_btn_1.attachEvent('onclick', closeBanner);
	}else{
		close_btn_1.addEventListener('click', closeBanner, false);
	}
	if(!close_btn_2.addEventListener) {
		close_btn_2.attachEvent('onclick', closeBanner);
	}else{
		close_btn_2.addEventListener('click', closeBanner, false);
	}
}
