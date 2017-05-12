/* Fix 27 Feb 2015 */
$(document).ready(function() {
	
	$(".listaIndice li a").click(function(evt) {
		$("#accordionGeneric li.current div.boxAcc").css("display", "none");
		$("#accordionGeneric li.current").removeClass("current");
		var anchorIndex = evt.target.href.indexOf('#');
		var anchor = evt.target.href.substring(anchorIndex + 1);
		var index = $('div.headListaIndice a[name="' + anchor + '"]');
		index.parents("li").addClass("current");
		index.parents("li div.boxAcc").css("display", "block");
		//index.parent(".boxAcc").
		$('.wrapBody').css('height', $('.elemLeft').outerHeight()+160)
		setTimeout("$('.wrapBody').css('height', $('.elemLeft').outerHeight()+160)", 2100);
	});
	
	$("div.tornaSu a").click(function(evt) {
		$("#accordionGeneric li.current").removeClass("current");
		$(this).parents("div.boxAcc").css("display", "none");
	});
	
	if(window.location.hash) {
		var anchor = window.location.hash.substring(1);
		var index = $('div.headListaIndice a[name="' + anchor + '"]');
		index.parents("li div.boxAcc").css("display", "block");
		index.parents("li").addClass("current");
		index.focus();
		$('.wrapBody').css('height', $('.elemLeft').outerHeight()+160)
		setTimeout("$('.wrapBody').css('height', $('.elemLeft').outerHeight()+160)", 2100);
	}
	
});
