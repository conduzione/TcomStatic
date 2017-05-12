
function hideAllMouseOverMenus(){	
	$('.header .mainmenu .nav ul.navigationTrenitalia li.submenu > ul').css('display','none');
	$('.header .mainmenu .nav ul.navigationTrenitalia li.submenu').css('background-color','transparent');
}

function onClickMouseOverMenuTablet(){
	if($(this).prop('tagName').toLowerCase()=='li'){
		moMenuToShowHide=$(this).children('ul:first');
	}else{
		moMenuToShowHide=$(this).next('ul');	
	}
	
	if(moMenuToShowHide.css('display')=='block'){
		hideAllMouseOverMenus();
		return false;
	}
	
	hideAllMouseOverMenus();
	setTimeout(function(){ moMenuToShowHide.parents('li.submenu').css('background-color','#D18E94'); moMenuToShowHide.css('display', 'block'); }, 100);
	
	return false;	
}

function fixTabletMenuElemsSizeMediaQueries(){
	$('head').append('<style>@media (min-width:701px) and (max-width: 800px){ .header .subheader .cont, .header .subheader .cont{ font-size:smaller; width:73%;} } </style>');
	
	$('head').append('<style>@media (min-width:701px) and (max-width: 800px){ .accendiAhover{ padding-right:7px; background-size:5px; } } </style>');
	$('head').append('<style>@media (min-width:701px) and (max-width: 800px){ .header .mainmenu .nav ul.navigationTrenitalia li.submenu{ margin-right:1px; padding-right:2px; } } </style>');
	
	$('head').append('<style>@media (min-width:701px) and (max-width: 800px){ .header .mainmenu .nav ul.navigationTrenitalia li.submenu.search{ padding-left:1px; } } </style>');
	$('head').append('<style>@media (min-width:701px) and (max-width: 800px){ .header .mainmenu .nav ul.navigationTrenitalia li.submenu.search div.input{  padding-left:1px; } } </style>');
	
	$('head').append('<style>@media (min-width:701px) and (max-width: 800px){ .header .mainmenu .nav ul.navigationTrenitalia li.submenu.search .input .cont input{ width:60%; } } </style>');
	$('head').append('<style>@media (min-width:701px) and (max-width: 800px){ .header .mainmenu .nav ul.navigationTrenitalia li.submenu.search .input .cont input{padding-right:0px;} } </style>');
	
	$('head').append('<style>@media (min-width:701px) and (max-width: 800px){ .header .mainmenu .nav ul.navigationTrenitalia li.submenu.submenu:hover a.accendiAhover{color : #fff;} } </style>');
	$('head').append('<style>@media (min-width:701px) and (max-width: 800px){ .header .mainmenu .nav ul.navigationTrenitalia li.submenu.search div.input div.cont{ width:75px;} } </style>');
	if(($(window).width()>700) && ($(window).width()<=800)){
		$('.header .mainmenu .nav ul.navigationTrenitalia li.submenu.search .input .cont input').css('width', '60%');
		$('.header .mainmenu .nav ul.navigationTrenitalia li.submenu.search div.input div.cont').css('width', '75px');
	}
}

function toggleApriChiudiMouseOverTablet(){
	fixTabletMenuElemsSizeMediaQueries();
	
	$('.header .mainmenu .nav ul.navigationTrenitalia li.submenu > ul').css('display','none');
	$('.header .mainmenu .nav ul.navigationTrenitalia li.submenu > ul').css('top','41px');
	
	$('head').append('<style>.header .mainmenu .nav ul.navigationTrenitalia li.submenu.submenu:hover{background-color : transparent;}</style>');
	$('head').append('<style>.header .mainmenu .nav ul.navigationTrenitalia li.submenu.submenu:hover a.accendiAhover{color : #fff;}</style>');
	
	$('a.accendiAhover').click(onClickMouseOverMenuTablet);
	$('ul.navigationTrenitalia li.submenu').click(onClickMouseOverMenuTablet);
	
	$('a.accendiAhover').each(function(){
		tmpSrcCode= $(this)[0].outerHTML.replace('accendiAhover', 'accendiAhover_iPadLINK');
		tmpSrcCode += '<div class=\'fr chiudiFooter\'> &nbsp; <a href=\'javascript:void(0);\' class=\'tabletMouseOverCloseButton\' style=\'font-size:larger;\'>Chiudi <b>X</b></a> &nbsp; </div>';
		$(this).next('ul').prepend(tmpSrcCode);
		$(this).next('ul').find('a.accendiAhover_iPadLINK').css('color','#ce142b').css('font-weight','bold').css('margin-left','5px').css('font-size','larger');
	});
	$('.header .mainmenu .nav ul.navigationTrenitalia li.submenu > ul a').click(function(){ if($(this).attr('href')!==undefined){ window.location=$(this).attr('href');}else{return false;} });	
	$('.header .mainmenu .nav ul.navigationTrenitalia li.submenu.search').unbind('click');
	
	$('.tabletMouseOverCloseButton a').click(function(){ hideAllMouseOverMenus(); return false; });
}

toggleApriChiudiMouseOverTablet();
