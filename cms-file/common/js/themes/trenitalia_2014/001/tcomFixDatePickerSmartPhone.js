/* 22-10-2015#16:46 */
	try{
		var isTouchDev=(('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
		isTouchDev=true; 
		if(isTouchDev && ($(window).width()<700)){
			$('fieldset.biglietti_data_ora').eq(0).after('<div id=\"biglietti_data_p_mobile_calendar\" style=\"display:none; width:100%;\"></div>');
			$('fieldset.biglietti_data_ora').eq(1).after('<div id=\"biglietti_data_a_mobile_calendar\" style=\"display:none; width:100%;\"></div>');
			
			if( $('#biglietti_data_p_mobile_calendar, #biglietti_data_a_mobile_calendar').length==2 ){
			
				$('#biglietti_data_a').datepicker('destroy'); 
				$('#biglietti_data_p').datepicker('destroy');
				
				// rimossi con nuovo form acquisto 22-03-2016
				// $('#biglietti_data_a').after('<img class=\"ui-datepicker-trigger\" src=\"'+_cfg.calImg+'\" alt=\"\" title=\"\" id=\"biglietti_data_a_btn\" />');
				// $('#biglietti_data_p').after('<img class=\"ui-datepicker-trigger\" src=\"'+_cfg.calImg+'\" alt=\"\" title=\"\" id=\"biglietti_data_p_btn\" />');
				
				if ($('#formcruscottoEN').size()!=0){
					_labelsMobile = _labels.en;
				}else{
					_labelsMobile = _labels.it;			
				}
				
				$("#biglietti_data_p_mobile_calendar" ).datepicker({
					firstDay:			_cfg.firstDayCalendar,
					monthNames: 		_labelsMobile.monthNames,
					dayNamesMin: 		_labelsMobile.dayNamesMin,
					dayNames: 			_labelsMobile.dayNames,
					buttonText: 		_labelsMobile.buttonCal,
					dateFormat: 		"dd-mm-yy",
					minDate: 			0,
					changeMonth: 		false,
					numberOfMonths: 	1,
					altField: "#biglietti_data_p",
					altFormat: "dd-mm-yy",
					onSelect: function( selectedDate ){
						if(tcom14._roundTripInternal == "true"){
							$('#biglietti_data_a_mobile_calendar').datepicker("option", "minDate", selectedDate);
							var dataP = new Date(selectedDate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")).getTime();
							var dataR = new Date($("#biglietti_data_a" ).val().replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")).getTime();
							if(dataR<dataP) $("#biglietti_data_a" ).val($("#biglietti_data_p").val());
							//console.log('dataP='+dataP+' --- dataR='+dataR+' selectedDate='+selectedDate);
						}
						datePart = selectedDate;
						$(this).hide();
						$('.emotional').css('overflow', 'hidden');
					}
				});
				$('#biglietti_data_p, #biglietti_data_p_btn').bind('touchstart click', function(){ $('.emotional').css('overflow', 'visible'); $("#biglietti_data_p_mobile_calendar" ).show(); $('#biglietti_data_p').blur();}); 
				
				$("#biglietti_data_a_mobile_calendar").datepicker({
					firstDay:			_cfg.firstDayCalendar,
					monthNames: 		_labelsMobile.monthNames,
					dayNamesMin: 		_labelsMobile.dayNamesMin,
					dayNames: 			_labelsMobile.dayNames,
					buttonText: 		_labelsMobile.buttonCal,
					dateFormat: 		"dd-mm-yy",
					minDate: 			0,
					changeMonth: 		false,
					numberOfMonths: 	1,
					altField: "#biglietti_data_a",
					altFormat: "dd-mm-yy",				
					onSelect: function( selectedDate ){ $(this).hide(); $('.emotional').css('overflow', 'hidden'); }
				});
				
				$("#biglietti_data_a, #biglietti_ora_a").attr('disabled', 'true');
				$('#biglietti_data_a, #biglietti_data_a_btn').unbind('touchstart click');
				
				$('#biglietti_ar').unbind('click');			
				$('#biglietti_ar').click(function(event){
					tcom14._roundTripInternal = 'true';
					$('#biglietti_data_a_mobile_calendar').datepicker("option", "minDate", $("#biglietti_data_p" ).val());			
					$("#biglietti_data_a, #biglietti_ora_a").removeAttr('disabled');
					$("#biglietti_data_a" ).val($("#biglietti_data_p").val());
					$('#biglietti_data_a, #biglietti_data_a_btn').bind('touchstart click', function(){ $('.emotional').css('overflow', 'visible'); $("#biglietti_data_a_mobile_calendar" ).show(); $('#biglietti_data_a').blur(); });				
				});
				
				$('#biglietti_a').unbind('click');
				$('#biglietti_a').click(function(event){
					tcom14._roundTripInternal = 'false';
					$("#biglietti_data_a, #biglietti_ora_a").attr('disabled', 'true');
					$('#biglietti_data_a, #biglietti_data_a_btn').unbind('touchstart click');
					$("#biglietti_data_a_mobile_calendar").hide();			
				});			
				
				$('head').append('<style>@media (max-width:700px){ .ui-datepicker{ left: 0 !important; width: 100%; margin-top: 5px !important; } } </style>');
				$('head').append('<style>@media (max-width:700px){ .emotional .cruscotto{ height: 510px; }  } </style>');
				$('head').append('<style>@media (max-width:700px){ .ui-datepicker{ left: 0 !important; width: 100% !important; margin-top: 5px !important; } } </style>');
				$('head').append('<style>@media (max-width:700px){ .biglietti_data_ora{ margin-top: 0.9em; } } </style>');
				
				$("#biglietti_fromNew" ).on("autocompleteselect", function(event, ui){ $("#biglietti_toNew").focus(); });
				/* $('head').append('<style>@media (max-width:700px){ input#biglietti_fromNew:focus,#biglietti_toNew:focus { box-shadow: 0px 0px 3px red; } } </style>'); */
			}
		}
	}catch(e){} 