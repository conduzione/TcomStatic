
// crossbar
var crossbar = {

	subOpen: 1,

	// methods
	init: function ()
	{
		this.setChiudiSubMenu();
	
	},
	setChiudiSubMenu: function()
	{
		if($(".subMenuClose").length>0) {
			$(".subMenuVoiceGrp").click(function() {crossbar.subMenuGrp(); return false;});
			$(".subMenuSites .subMenuClose a").click(function() {crossbar.subMenuGrp(); return false;});
			$(".subMenuVoiceScl").click(function() {crossbar.subMenuScl(); return false;});
			$(".subMenuSocial .subMenuClose a").click(function() {crossbar.subMenuScl(); return false;});
		}
	},

	subMenuGrp: function() {
		if(crossbar.subOpen==0){ 
			if (!$(".subMenuSocial").is(':hidden')) { $(".subMenuSocial").slideUp('slow'); }	
			$(".subMenuVoiceScl").removeClass('active');
			crossbar.subOpen=1;
		} else {
			if (!$(".subMenuSocial").is(':hidden')) { $(".subMenuSocial").slideUp('slow'); }
			$(".subMenuVoiceScl").removeClass('active');
			crossbar.subOpen=0;
		}
		if ($(".subMenuSites").is(':hidden')) {
			$(".subMenuVoiceGrp").addClass('active');
			$(".subMenuSites").slideDown('slow');
			$(".logo").slideUp();
			$(".fsNews").slideUp();
		} else {
			$(".subMenuVoiceGrp").removeClass('active');
			$(".subMenuSites").slideUp('slow');
			$(".logo").slideDown();
			$(".fsNews").slideDown();
		}
	},

	subMenuScl: function() {
		if(crossbar.subOpen==0) { 
			if (!$(".subMenuSites").is(':hidden')) { $(".subMenuSites").slideUp('slow'); }
			$(".subMenuVoiceGrp").removeClass('active');
			crossbar.subOpen=1;
		} else {
			if (!$(".subMenuSites").is(':hidden')) { $(".subMenuSites").slideUp('slow'); }
			$(".subMenuVoiceGrp").removeClass('active');
			crossbar.subOpen=0;
		}
		if ($(".subMenuSocial").is(':hidden')) { 
			$(".subMenuVoiceScl").addClass('active');
			$(".subMenuSocial").slideDown('slow');
			$(".logo").slideUp();
			$(".fsNews").slideUp();
		} else {
			$(".subMenuVoiceScl").removeClass('active');
			$(".subMenuSocial").slideUp('slow');
			$(".logo").slideDown();
			$(".fsNews").slideDown();
		}
	}
}

$(function(){
	if($.browser.msie) // ???
		crossbar.init();
	else
		setTimeout ( function () {
			crossbar.init();
		}, 50);
});
