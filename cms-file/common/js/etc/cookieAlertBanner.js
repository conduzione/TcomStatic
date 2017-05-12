
function addFsCookieBannerContainer(curCookieDomain){
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
