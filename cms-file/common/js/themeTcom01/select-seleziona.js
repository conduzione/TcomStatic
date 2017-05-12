$(function(){
		
		$( ".selector" ).slider({ 
			value: 100,
			orientation: 'vertical',
			animate: 'true',
			change: handleSliderChange,
    		slide: handleSliderSlide
		});
		
		function handleSliderChange(e, ui)
		{	
			
			vall = -ui.value+100;
		  var maxScroll = $("#content-scroll > ul.select").outerHeight() - $("#content-scroll").height();
		  $("#content-scroll > ul.select").css({top: -vall * (maxScroll / 100)});
		}
		
		function handleSliderSlide(e, ui)
		{
			vall = -ui.value+100;
		  var maxScroll = $("#content-scroll > ul.select").outerHeight() - $("#content-scroll").height();
		  
			//console.log(vall*(maxScroll / 100));
		  $("#content-scroll > ul.select").css({top: -vall * (maxScroll / 100) });
		}
	
	});