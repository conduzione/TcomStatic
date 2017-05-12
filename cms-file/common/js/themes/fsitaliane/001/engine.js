/*
 * engine.js
 * last mod: 10-04-2015#9:00
 * notes: 
 * - sitecatalyst mediaItem reports
 * - mediagallery support
 * - mobile webRadio fix HomePage
 * - compatibile con bxSlider v4.0(e NON con 3.0)
 */
// preamble
var isIe6 = ((!window.XMLHttpRequest) ? true : false), isIe7 = (($.browser.msie && parseInt($.browser.version, 10) === 7) ? true : false);
var isIE = $.browser.msie;
var isIosDevice = (( typeof (DetectIos) != "undefined") && (DetectIos()));
var isAndroidDevice = (( typeof (DetectAndroid) != "undefined") && (DetectAndroid()));
if (document.getElementById('noScriptCss')) {
	var cssNoScript = document.getElementById('noScriptCss');
	cssNoScript.parentNode.removeChild(cssNoScript);
}
var ieEmbedSize = '';
var notIeEmbedSize = '';
var AUDIO_SRC_IOS = "http://itvmsfsas.alice.cdn.interbusiness.it/liveas/portalefs/1002/1002.m3u8";
var AUDIO_SRC_DESKTOP = "http://www.fsnews.it/cms-file/audio/fsnews/radio_fs.asx";
var BASE_FILEPATH = "/cms-file/common/css/themes/fsitaliane/001/i/";
var ieEmbedSrc = '';
var notIeEmbedSrc = '';

document.write('<style type="text/css">' + '	.newsSlider,.emotional{visibility:hidden;position:absolute;z-index:-1;}' + '</style>');
document.write('<style type="text/css">' + ' .newsSlider ul li{height:21px;}' + '</style>');

// ferrovie
var ferrovie = {

	// vars
	isMobile : false,
	isTablet : false,
	languageDefault : 'it',
	regional_lang : '',
	calendarImage : BASE_FILEPATH+'icoCalendar.gif',
	footerDiv : [],
	footerli : [],
	today : new Date(),
	agenda : '',
	actualAgenda : [],
	agendaDay : new Date(),
	changedwin : /* ('onorientationchange' in window) ? 'orientationchange' : */'resizestop',
	agendaEvents : typeof (agendaEvents) != 'undefined' ? agendaEvents : [],
	sliders : {
		emotional : {
			timeout : 16000,
			elem : '.emotional',
			displaySlideQty : 1,
			moveSlideQty : 1,
			controls : true,
			pager : true,
			init : null,
			html : '',
			ref : '.elements',
			children : '.element'
		},
		news : {
			timeout : 16000,
			elem : '.newsSlider',
			displaySlideQty : 1,
			moveSlideQty : 1,
			controls : false,
			pager : false,
			init : null,
			html : '',
			ref : '> ul',
			children : 'li'
		}
	} || {},
	subOpen : 1,
	pageWidth : 0,
	// methods
	init : function() {
		ferrovie.agendaDay = ferrovie.today;
		ferrovie.pageWidth = $('.content').innerWidth();

		/* inizializzo la media gallery */
		if($('#mediaGallery').size()!=0){
			fGallery.init('#mediaGallery');
		}
		
		$('.bxslider').bxSlider({
			pager : false,
			nextText:'',			
			prevText:''		
		});
		
		var newLanguage = $('html').attr('xml:lang');
		if (newLanguage != '') {
			this.languageDefault = newLanguage;
		}
		regional_lang = $.datepicker.regional[this.languageDefault];
		$.datepicker.setDefaults(regional_lang);
		this.checkDevice();

		// XXX start 26.06.2013
		$('.v80').each(function(){
			var thisText=$.trim($(this).text());
			if(thisText==''){
				var v20Text=$.trim($(this).prev('.v20').text());
				if(v20Text!=''){
					$(this).prev('.v20').addClass('smartVisible');
				} else {
					$(this).next('.v20').addClass('smartVisible');
				}
				$(this).addClass('smartHidden');
			}
		});
		// XXX end 26.06.2013
		
		// XXX start 31.01.2013
		// Modifica post-rilasico nuova grafica 19.01.2016
		$('.leafContent img, .mainColDx img.aleft, .mainColDx img.aright').not('.onlyImage').each(function() {
			var classDiv = 'imgCenter';
			if ($(this).hasClass('aleft')) {
				classDiv = 'imgLeft';
			} else {
				if ($(this).hasClass('aright')) {
					classDiv = 'imgRight';
				}
			}
			if ($(this).parent('.' + classDiv).size() == 0) {
				var imgContent = '<div class="' + classDiv + '"><img src="' + $(this).attr('src') + '" alt="' + $(this).attr('alt') + '"/><span class="imgDidasc">' + $(this).attr('alt') + '</span></div>';
				if ($(this).next('.imgDidasc').size() != 0) {
					imgContent = '<div class="' + classDiv + '"><img src="' + $(this).attr('src') + '" alt="' + $(this).attr('alt') + '"/></div>';
				}
				$(this).before(imgContent);
				$(this).remove();
			}
		});
		// end 31.01.2013

		$('.font a').click(function(e) {
			e.preventDefault();
			var quanto = $(this).attr('class').substring(1, $(this).attr('class').length)
			$('body > .content:eq(0)').css({
				'font-size' : quanto + '%'
			});
			ferrovie.resize();
		});

		$('a.print').click(function(e) {
			e.preventDefault();
			print();
		});

		$("a.send").each(function() {
			var bookmarkUrl = location.href;
			var bookmarkTitle = $('head title').text();
			var newUrl = 'mailto:&subject=' + escape(bookmarkTitle) + '?body=' + escape(bookmarkUrl);
			$(this).attr('href', newUrl)
		});

		$('.footerBanner li a').each(function(i, e) {
			$(e).children('.bannerHover').hide();
			if ($(e).children('.bannerHover').size() > 0) {
				$(e).hover(function() {
					$(this).children('.bannerHover').show();
					$(this).children('img').hide();
				}, function() {
					$(this).children('.bannerHover').hide();
					$(this).children('img').show();
				});
			}
		});

		$("a.favorite").click(function(e) {
			e.preventDefault();
			var bookmarkUrl = location.href;
			var bookmarkTitle = $('head title').text();
			if (window.sidebar) {// For Mozilla Firefox Bookmark
				window.sidebar.addPanel(bookmarkTitle, bookmarkUrl, "");
			} else if ($.browser.msie) {// For IE Favorite
				window.external.AddFavorite(bookmarkUrl, bookmarkTitle);
			} else if (window.opera) {// For Opera Browsers
				$("a.jQueryBookmark").attr("href", bookmarkUrl);
				$("a.jQueryBookmark").attr("title", bookmarkTitle);
				$("a.jQueryBookmark").attr("rel", "sidebar");
			} else if ($.browser.webkit) {
				alert('Press ctrl+D to bookmark (Command+D for macs) after you click Ok');
			} else {// for other browsers which does not support
				alert('Your browser does not support this bookmark action');
				return false;
			}
		});

		$('.espandi-acc').click(function() {
			if (!$(this).hasClass('clicked')) {
				$(this).parents('.mainColDx').animate({
					'width' : '99%'
				}, 'slow');
				$(this).parents('.mainColDx').prev('.mainColSx').css('overflow', 'hidden').animate({
					'width' : '0%'
				}, 'slow');
				$(this).addClass('clicked');
			} else {
				$(this).parents('.mainColDx').animate({
					'width' : '77%'
				}, 'slow', function() {
					$(this).removeAttr('style');
				})
				$(this).parents('.mainColDx').prev('.mainColSx').css('overflow', 'auto').animate({
					'width' : '20%'
				}, 'slow', function() {
					$(this).removeAttr('style');
				});
				$(this).removeClass('clicked');
			}
		});

		/* RiA storia demo */
		$('#stoRIA > img').click(function() {
			$(this).parent('#stoRIA').toggleClass('clicked');
		});

		/* organigramma */
		if ($('.organigramma').size() != 0) {
			$('.organigramma').append('<div class="modal"><div class="modalInt"><div class="modalClose"></div><div id="modal"></div></div></div>');
			$('.organigramma .modalClose').click(function() {
				$('.modal').hide();
			});

			$('.organigramma li a').each(function(i, el) {
				if (!($(this).hasClass('noinfo'))) {
					if ($(this).next('.dialogOrg').size() > 0) {
						$(this).append('<span class="info"></span>');
					}
				}
				if ($(this).parent('li').children('ul').size() > 0) {
					$(this).append('<span class="openInfo"></span>');
				}

				$('.info', el).click(function() {
					$('#modal').html($(this).parent('a').next('.dialogOrg').html());
					$('.modal').show();
					$('#modal .modalText').jScrollPane({});
				});

				$('.openInfo', el).click(function() {
					if ($(this).parent('a').parent('li').hasClass('open')) {
						$(this).removeClass('closeInfo');
						$(this).parent('a').parent('li').children('ul').slideUp('slow', function() {
							if ($(this).parents('.open').size() > 1) {
								$(this).parents('.open').eq(1).removeClass('openparent');
							}
							$(this).parent('li').removeClass('open');

						});

					} else {
						$(this).addClass('closeInfo');
						$(this).parent('a').parent('li').addClass('open').children('ul').slideDown();
						if ($(this).parents('.open').size() > 1) {
							$(this).parents('.open').eq(1).addClass('openparent')
						}
					}
				});

				$(this).click(function(e) {
					e.preventDefault();
				});
			});
		}

		$('.openRadioClick').click(function(e) {
			if (!isAndroidDevice) {
				e.preventDefault();
				if (!isIosDevice) {
					if (isIE) {
						if (($('#mediaPlayer').size() != 0) && mediaPlayer) {
							mediaPlayer.stop()
						}
					} else {
						if (($('#mediaPlayerE').size() != 0) && mediaPlayerE && mediaPlayerE.controls) {
							mediaPlayerE.controls.stop()
						}
					}
				} else {
					if (qTime)
						qTime.Stop();
				}
				window.open($(this).attr('href'), 'WebRadio', 'toolbar=0, scrollbars=0, location=0, statusbar=0, menubar=0, resizable=0, width=321, height=250,status=0');
			} else {
				$(this).attr('target', '_blank');
			}
		});
		this.footerDiv = $(".footerDiv");
		this.footerli = this.footerDiv.find("> li:not(.cloud)");
		this.setAgenda();
		this.setBiglietti();
		this.createMenu();
		this.resizeMenu();
		this.initSliders();
		this.setMediaBox();
		//this.resizeBoxHome();
		this.setChiudiFooter();
		this.setChiudiSubMenu();
		this.setAccordionEventi();
		this.resizeSilverlight();
		this.formControl();
		this.leafFormDatepickers('.leafColForm');
		this.setAccs('.accFilter-title', '.accFilter-content');
		this.setTabs('.tabFilters', false);
		this.setTabs('.tabSocial', false);
		this.setTabs('.resultBox .details', true);

		/* Pg_Ecopassenger Page */
		this.ecoPassengerPanel();

		$('.embedVideo').each(function(i, el) {
			$(el).parent().attr('id', 'videoPlay' + i);
			if (((isIosDevice || isAndroidDevice)) || !($(el).hasClass('autostart'))) {
				$(el).append('<div class="pulsPlay"></div>');
				if (isIosDevice || isAndroidDevice) {
					$(this).attr('target', '_blank');
					$(this).attr('href', $(this).attr('rel'));
				} else {
					$(el).click(function(e) {
						e.preventDefault();						
						var mediaUrlDesktop=$(el).attr('href');
						var mediaUrlMobile=$(el).attr('rel');
						//console.log('W='+$(this).parent().width() + " --- H="+$(this).parent().height());
						//embedVideoCodeForMediaGallery(el, mediaUrlDesktop, mediaUrlMobile);
						putAdHocMediaPlayer($(this).parent(), $(this).parent().width(), $(this).parent().height(), $(this).attr('href'), $(this).attr('rel'));
					});
				}
			} else {			
				if (ferrovie.sliders['emotional'].init) {
					ferrovie.sliders['emotional'].init.goToSlide($(this).parents('.element').prev('.element').size());
					stopTheSliderObj(ferrovie.sliders['emotional'].init);
				}
				putAdHocMediaPlayer($(this).parent(), $(this).parent().width(), $(this).parent().height(), $(this).attr('href'), $(this).attr('rel'));
			}
		});
		this.resizeBigVideo();
		this.resizeBoxHome();

		rsz.doResize();
	},
	resizeBigVideo : function() {
		$('.emotionalVideo').each(function(i,e) {
			if($(e).hasClass('gallery')){
				$(this).find('object').attr('width','100%');
				$(this).find('object').attr('height','300');
				$(this).find('.pulsPlay').width('100%');
				$(this).find('.pulsPlay').height('300px');
			}else{
				wCont = 975;
				hCont = 306;
				width = ferrovie.pageWidth;
				height = width * hCont / wCont;
				$(this).find('object').width(width).height(height);
				$(this).find('.pulsPlay').height(height);
				$(this).height(height);
			}

		});
	},
	resizeContentCarousel : function() {
		$('.elcontentContainer').each(function() {

			var parentHeight = (ferrovie.pageWidth * 306 / 975) - 45;
			if (ferrovie.isMobile) {
				parentHeight = (ferrovie.pageWidth * 600 / 975) - 45;

			}
			$(this).height(parentHeight);
			$(this).children('.v50,.v50video,.v80,.v20').each(function() {
				$(this).height(parentHeight);
			});
			$(this).find('.elvideo').each(function() {
				var width = $(this).width();
				var height = width * 244 / 406;
				var margin = 15;
				$(this).children('object').width(width).height(height);
				if (!ferrovie.isTablet) {
					margin = (parentHeight + 45 - height) / 2;
				}

				$(this).height(height).css({
					'margin' : margin + 'px auto'
				});
			});
		});

	},
	setAccordionEventi : function() {
		$('.accordionEventi').accordion()
	},
	setChiudiSubMenu : function() {
		if ($(".subMenuClose").length > 0) {
			$(".subMenuVoiceGrp").click(function() {
				ferrovie.subMenuGrp();
				return false;
			});
			$(".subMenuSites .subMenuClose a").click(function() {
				ferrovie.subMenuGrp();
				return false;
			});
			$(".subMenuVoiceScl").click(function() {
				ferrovie.subMenuScl();
				return false;
			});
			$(".subMenuSocial .subMenuClose a").click(function() {
				ferrovie.subMenuScl();
				return false;
			});
		}
	},

	subMenuGrp : function() {
		if (ferrovie.subOpen == 0) {
			if (!$(".subMenuSocial").is(':hidden')) {
				$(".subMenuSocial").slideUp('slow');
			}
			$(".subMenuVoiceScl").removeClass('active');
			ferrovie.subOpen = 1;
		} else {
			if (!$(".subMenuSocial").is(':hidden')) {
				$(".subMenuSocial").slideUp('slow');
			}
			$(".subMenuVoiceScl").removeClass('active');
			ferrovie.subOpen = 0;
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

	subMenuScl : function() {
		if (ferrovie.subOpen == 0) {
			if (!$(".subMenuSites").is(':hidden')) {
				$(".subMenuSites").slideUp('slow');
			}
			$(".subMenuVoiceGrp").removeClass('active');
			ferrovie.subOpen = 1;
		} else {
			if (!$(".subMenuSites").is(':hidden')) {
				$(".subMenuSites").slideUp('slow');
			}
			$(".subMenuVoiceGrp").removeClass('active');
			ferrovie.subOpen = 0;
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
	},

	setChiudiFooter : function() {
		var foot = 0;
		if ($(".titFooterMenuClose").length > 0) {
			$(".titFooterMenuClose").html("<a href=\"\" title=\"Chiudi Pannello Footer\">chiudi</a>");
			$(".titFooterMenuClose").click(function() {
				if (foot == 0) {
					$(".titFooterMenuClose").html("<a href=\"\" title=\"Apri Pannello Footer\">apri</a>");
					foot = 1;
				} else {
					$(".titFooterMenuClose").html("<a href=\"\" title=\"Chiudi Pannello Footer\">chiudi</a>");
					foot = 0;
				}
				//$(".footerDiv").toggle();
				(ferrovie.footerDiv.is(':visible') ? ferrovie.footerDiv.slideUp() : ferrovie.footerDiv.slideDown());
				return false;
			});
		}
		ferrovie.resizeFooter();
	},
	resizeSilverlight : function() {
		if (!isIosDevice && (!isAndroidDevice)) {
			if ($('#silverlightObj').size() > 0) {

			}
		} else {
			$('#silverlightObj').remove()
		}
	},
	resizeBoxHome : function() {
		$('.boxSpeciale,.specialeLeft,.specialeRight').height('auto');
		if (!(ferrovie.isMobile)) {
			var padding = 20;
			if (ferrovie.isTablet)
				padding = 10;
			if (($('.boxSpeciale').innerHeight() - padding) < $('.boxAgendaSocial').innerHeight()) {
				$('.boxSpeciale').height($('.boxAgendaSocial').innerHeight() - padding);
				if (!(ferrovie.isTablet)) {
					$('.specialeLeft,.specialeRight').height($('.boxAgendaSocial').innerHeight() - padding)
				}
			} else {
				if (!(ferrovie.isTablet)) {
					$('.specialeLeft,.specialeRight').height($('.boxSpeciale').innerHeight() - padding)
				}
			}
		}
	},

	returnDimAgenda : function() {
		var dimLabel = 0;
		var border = 0;
		$('.boxAgenda .label').each(function() {
			dimLabel += $(this).innerWidth();
			border += 4;
		})
		var dimActiveElement = $('.boxAgenda').innerWidth() - dimLabel - border;
		return dimActiveElement;
	},

	setDimAgenda : function() {
		var dimActiveElement = ferrovie.returnDimAgenda();
		$('.boxAgenda .accordionContent').each(function() {
			var bg = $(this).parent('li').css('background-color');
			$(this).parent('li').css({
				'border-color' : bg
			});
			$(this).prev('a.label').children('span').css({
				'background-color' : bg
			});
			if ($(this).attr('isVisible') == 'true') {
				$(this).width(dimActiveElement);
			}
		})
		$('.boxAgenda .accordionContent .fixedContent').width(dimActiveElement);
		if ($.browser.safari) {
			$('.boxAgenda .accordionContent').each(function() {
				if ($(this).attr('isVisible') != 'true') {
					var labelWidth = $(this).prev('a').width();
					$(this).parent().width(labelWidth);
				}
			})
		}
		var maxHeight = 0;
		$('.boxAgenda .fixedContent').each(function() {
			if ($(this).innerHeight() > maxHeight) {
				maxHeight = $(this).innerHeight()
			}
		})
		$('.boxAgenda .label').height(maxHeight - 40);
		$('.boxAgenda .accordionContent').height(maxHeight);
		$('.boxAgenda .label span').css({
			'filter' : 'flipv fliph',
			'-webkit-transform' : 'rotate(270deg) translate(-' + (maxHeight - 80) + 'px,0)',
			'-moz-transform' : 'rotate(270deg) translate(-' + (maxHeight - 80) + 'px,0)',
			'-o-transform' : 'rotate(270deg) translate(-' + (maxHeight - 80) + 'px,0)'
		})
		$('.boxAgenda > ul').height(maxHeight + 2);

		ferrovie.resizeBoxHome()
	},

	setAgenda : function() {
		$('.label').click(function(e) {
			e.preventDefault();
			var thisNext = $(this).next('.accordionContent');
			var thisParent = $(this).parent();
			var contentWidth = ferrovie.returnDimAgenda();
			if ($(this).next('.accordionContent[isVisible!=true]').size() != 0) {
				$('.boxAgenda .label').removeClass('active');
				$(this).addClass('active');
				$('.boxAgenda .accordionContent[isVisible=true]').animate({
					width : 0
				}, {
					step : function(now, fx) {
						$(fx.elem).width(now)
						if ($.browser.safari) {
							var labelWidth = $(fx.elem).prev().width();
							$(fx.elem).parent().width(now + labelWidth);
							$(thisParent).width(contentWidth - now + labelWidth);
						}
						$(thisNext).width(contentWidth - now);
						if (now == 0) {
							$(fx.elem).attr('isVisible', false);
							$(thisNext).attr('isVisible', true);
						}
					}
				});
			}
		});
		if ( typeof (agendaEvents) != 'undefined') {
			ferrovie.agendaEvents = agendaEvents;
			ferrovie.setAgendaCalendar(ferrovie.agendaEvents);
		}
		with ($('.boxAgenda')) {
			find('.accordionContent:not(:first)').width(0);
			find('.accordionContent:first').attr('isVisible', true);
			find('.label:first').addClass('active');
			$('#changeYear').prepend('<ul></ul>');
			for ( j = (ferrovie.today.getFullYear() - 3); j <= ferrovie.today.getFullYear(); j++) {
				$('#changeYear ul').append('<li><a href="#">' + j + '</a></li>');
			}
			if ($('.boxAgenda').find('img').size() > 0) {
				ferrovie.setDimAgenda();
				$('.boxAgenda').find('img:last').load(function() {
					ferrovie.setDimAgenda();
				});
				if (isIe6)
					ferrovie.setDimAgenda();
			} else {
				ferrovie.setDimAgenda();
			}
		}

		$('#changeYear li a').click(function(e) {
			e.preventDefault();
			var date = (ferrovie.agendaDay.getMonth() + 1) + "/" + ferrovie.agendaDay.getDate() + "/" + $(this).text();
			if (ferrovie.languageDefault == 'it') {
				date = (ferrovie.agendaDay.getDate()) + "/" + (ferrovie.agendaDay.getMonth() + 1) + "/" + $(this).text();
			}
			$("#agenda").datepicker("setDate", date);
			$('#openChangeYear a span').text($(this).text());
			$('#changeYear ul').slideUp();
			$('#changeYear').removeClass('active');
			ferrovie.setAgendaDay(ferrovie.agendaDay.getDate(), ferrovie.agendaDay.getMonth(), $(this).text());
			ferrovie.setDimAgenda();
		});

		$('#changeCalendar li a').click(function(e) {
			e.preventDefault();
			var newArray = [];
			if ($(this).attr('class') == 'all') {
				newArray = ferrovie.agendaEvents;
			} else {
				for ( j = 0; j < ferrovie.agendaEvents.length; j++) {
					if (ferrovie.agendaEvents[j].EventType == $(this).attr('class')) {
						newArray.push(ferrovie.agendaEvents[j]);
					}
				}
			}
			$('#openChange a').text($(this).text())
			ferrovie.agenda.datepicker("destroy");
			ferrovie.setAgendaCalendar(newArray);
			$('#changeCalendar').removeClass('active');
			$('#changeCalendar ul').slideUp();
			ferrovie.setDimAgenda();
		});
		$('#openChange a').click(function(e) {
			e.preventDefault();
			if ($('#changeCalendar').hasClass('active')) {
				$('#changeCalendar').removeClass('active');
				$('#changeCalendar ul').slideUp();
			} else {
				$('#changeCalendar').addClass('active');
				$('#changeCalendar ul').slideDown();
			}
		});
		$('#openChangeYear a').click(function(e) {
			e.preventDefault();
			if ($('#changeYear').hasClass('active')) {
				$('#changeYear').removeClass('active');
				$('#changeYear ul').slideUp();
			} else {
				$('#changeYear').addClass('active');
				$('#changeYear ul').slideDown();
			}
		});
	},
	setAgendaCalendar : function(array) {
		var defaultDate = Math.ceil((ferrovie.agendaDay - ferrovie.today) / 86400000);
		ferrovie.agenda = $("#agenda").datepicker({
			newArray : array,
			defaultDate : defaultDate,
			onChangeMonthYear : function() {
				setTimeout(ferrovie.setDimAgenda, 500)
			},
			/*
			beforeShowDay : function(date) {
			var result = [true, '', null];
			var matching = $.grep(array, function(event) {
				return event.Date.valueOf() === date.valueOf();
			});
			$('#openChangeYear a span').text(date.getFullYear());
			if (matching.length) {
				var classTd = matching[0].EventType + ' event';
				if (matching.length > 1) {
					classTd = 'mix event'
				}
				result = [true, classTd, null];
			}
			return result;
			},
			*/
			beforeShowDay : function(date) {
				var result = [true, '', null];
				var matching = $.grep(array, function(event) {
					return event.Date.valueOf() === date.valueOf();
				});
				$('#openChangeYear a span').text(date.getFullYear());
				if (matching.length) {
					var classTd="";
					/*
					var classTd = matching[0].EventType + ' event';
					if (matching.length > 1) {
							   classTd = 'mix event';
					}
					*/
					for (var x=0;x<matching.length;x++){
						var ty=matching[x].EventType+" ";
						if(classTd.indexOf(ty)===-1)
							classTd += ty;
					}
					classTd += "event";
					result = [true, classTd, null];
				}
				//console.log(result);
				return result;
			},
			onSelect : function(dateText, obj) {
				var newDateText = dateText;
				if (ferrovie.languageDefault == 'it') {
					newDateText = dateText.substring(3, 5) + '/' + dateText.substring(0, 2) + '/' + dateText.substring(6, 10);
				}
				var date, selectedDate = new Date(newDateText), i = 0, event = [];
				while (i < array.length) {
					date = array[i].Date;
					if (selectedDate.valueOf() === date.valueOf()) {
						event.push(array[i]);
					}
					i++;
				}
				ferrovie.agendaDay = selectedDate;
				if (event.length > 0) {
					var eventIndex = [];
					j = 0;
					while (j < event.length) {
						eventIndex.push(event[j]);
						j++;
					}
					ferrovie.setAgendaDay(obj.currentDay, obj.currentMonth, obj.currentYear, eventIndex);
				} else {
					ferrovie.setAgendaDay(obj.currentDay, obj.currentMonth, obj.currentYear);
				}
			}
		});
		ferrovie.actualAgenda = array;
		ferrovie.setAgendaDay(ferrovie.agendaDay.getDate(), ferrovie.agendaDay.getMonth(), ferrovie.agendaDay.getFullYear());
	},
	getAgendaToday : function() {
		stringDescr = regional_lang.currentText;
		var newArray = [];
		for ( j = 0; j < ferrovie.actualAgenda.length; j++) {
			if ((ferrovie.agendaDay.getDate() == ferrovie.actualAgenda[j].Date.getDate()) && (ferrovie.agendaDay.getMonth() == ferrovie.actualAgenda[j].Date.getMonth()) && (ferrovie.agendaDay.getFullYear() == ferrovie.actualAgenda[j].Date.getFullYear())) {
				newArray.push(ferrovie.actualAgenda[j]);
			}
		}
		return newArray;
	},
	setAgendaDay : function(g, m, a, objEvent) {
		$('#today .date .mese').text(regional_lang.monthNamesShort[m]);
		var zeroGiorno = '';
		if (g < 10) {
			zeroGiorno = '0';
		}
		var zeroMese = '';
		if (m < 9) {
			zeroMese = '0';
		}
		$('#today .date .giorno').text(zeroGiorno + g);
		if(this.languageDefault == "it") {
            stringDescr = zeroGiorno + g + '.' + zeroMese + (m + 1) + '.' + a;
        } else {
            stringDescr = zeroMese + (m + 1) + '.' + zeroGiorno + g + '.' + a;
        }
		if ((ferrovie.today.getDate() == g) && (ferrovie.today.getMonth() == m) && (ferrovie.today.getFullYear() == a)) {
			var newArray = [];
			newArray = ferrovie.getAgendaToday();
			if (newArray.length > 0) {
				objEvent = newArray;
			}
			stringDescr = regional_lang.currentText;
		}
		$('#today .description .dateString').text(stringDescr);
		var stringTitle = regional_lang.noEvents;
		$('#today .image').hide();
		$('#today .date').show();
		if (objEvent != null) {
			stringTitle = '';
			$('#today .description .eventString').html('');
			for ( j = 0; j < objEvent.length; j++) {
				stringTitle += '<a href="' + objEvent[j].Link + '" class="' + objEvent[j].EventType + '">' + objEvent[j].Title + '</a><br/>';
			}
			if ((objEvent.length == 1) && (objEvent[0].Img != null) && (objEvent[0].Img != '')) {
				$('#today .image').html('');
				$('#today .image').append('<img src="' + objEvent[0].Img + '">')
				$('#today .image').show();
				$('#today .date').hide();
			} else {
				$('#today .image').hide();
				$('#today .date').show();
			}
		}
		$('#today .description .eventString').html(stringTitle);
		ferrovie.setDimAgenda();
	},
	setMediaBox : function() {
		$('.boxMedia .mediaTab li:first').addClass('active');
		$('.boxMedia .mediaContent li:not(:first)').hide();
		$('.boxMedia .mediaTab li a').click(function(e) {
			e.preventDefault();
			$('.boxMedia .mediaTab li').removeClass('active');
			$(this).parent().addClass('active');
			$('.boxMedia .mediaContent li:visible').hide();
			$('.boxMedia .mediaContent li').eq($(this).parent().prevAll().size()).show();
		})
	},

	setBiglietti : function() {
		var startDate = new Date(1900, 0, 1);
		startDate.setTime(ferrovie.today.valueOf());
		$('.formBiglietti').hide();
		$('.contentNews').removeClass('closeContent');
		$('.titleNews').removeClass('closeContent');
		$('.openBiglietti').click(function(e) {
			e.preventDefault();
			if ($('.formBiglietti:visible').size() > 0) {
				$(this).removeClass('active');
				$('.formBiglietti').slideUp('slow', function() {
					$('.contentNews').removeClass('closeContent');
					$('.titleNews').removeClass('closeContent');
				});
			} else {
				$(this).addClass('active');

				$('.contentNews').addClass('closeContent');
				$('.titleNews').addClass('closeContent');
				if (isIe6) {
					$('.formBiglietti').show();
				} else {
					$('.formBiglietti').slideDown();
				}

			}
		})
		var term = '';
		$("#depart_input,#destinaz_input").autocomplete({
			source : function(request, response) {
				var term = $.ui.autocomplete.escapeRegex(request.term), startsWithMatcher = new RegExp("^" + term, "i"), startsWith = $.grep(elenco_citta, function(value) {
					return startsWithMatcher.test(value.label || value.value || value);
				}), containsMatcher = new RegExp(term, "i"), contains = $.grep(elenco_citta, function(value) {
					return $.inArray(value, startsWith) < 0 && containsMatcher.test(value.label || value.value || value);
				});
				response(startsWith.concat(contains));
			}
		});

		$.ui.autocomplete.prototype._renderItem = function(ul, item) {
			var term = this.term.split(' ').join('|');
			var re = new RegExp("(" + term + ")", "gi");
			var t = item.label.replace(re, "<b>$1</b>");
			return $("<li></li>").data("item.autocomplete", item).append("<a>" + t + "</a>").appendTo(ul);
		};

		$('.formBiglietti input.ora').each(function(i, E) {
			var ora = startDate.getHours();
			if ($(this).hasClass('conditioned')) {
				ora = ora + 1;
			}
			$(this).val(ora);
		});
		$('.formBiglietti input.data').each(function(i, E) {
			var disabled = false;
			if ($(this).hasClass('conditioned')) {
				disabled = true;
			}
			if ($(this).val() == '') {

				var zeroGiorno = '';
				if (ferrovie.today.getDate() < 10) {
					zeroGiorno = '0';
				}
				var zeroMese = '';
				if ((ferrovie.today.getMonth() + 1) < 10) {
					zeroMese = '0';
				}
				var dateStart = zeroGiorno + ferrovie.today.getDate() + '-' + zeroMese + (ferrovie.today.getMonth() + 1) + '-' + ferrovie.today.getFullYear();
				$(this).val(dateStart)

			}
			$(this).datepicker({
				showOn : 'button',
				minDate : new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()),
				disabled : disabled,
				dateFormat : "dd-mm-yy",
				buttonImageOnly : true,
				buttonImage : ferrovie.calendarImage,
				beforeShow : function(input) {
					$(input).addClass('focus');
				},
				onClose : function(input) {
					$(this).removeClass('focus');
					if ($(this).hasClass('today')) {
						if ($('.formBiglietti .data.conditioned').size() != 0) {
							var dataSelezionata = $(this).val();
							var elementiData = dataSelezionata.split('-');
							var nextStartDate = new Date(parseInt(elementiData[2], 10), parseInt(elementiData[1] - 1, 10), parseInt(elementiData[0], 10));

							var zeroGiorno = '';
							if (nextStartDate.getDate() < 10) {
								zeroGiorno = '0';
							}
							var zeroMese = '';
							if ((nextStartDate.getMonth() + 1) < 10) {
								zeroMese = '0';
							}
							var nextStartDateFormat = zeroGiorno + nextStartDate.getDate() + '/' + zeroMese + (nextStartDate.getMonth() + 1) + '/' + nextStartDate.getFullYear();
							if ($('.formBiglietti .data.conditioned').eq(0).val() == '') {
								$('.formBiglietti .data.conditioned').eq(0).val(nextStartDateFormat);
							}
							$('.formBiglietti .data.conditioned').eq(0).datepicker('option', 'minDate', nextStartDate);
						}
					}
				}
			})

		});
		$('#ar,#andata').click(function() {
			ferrovie.setEnableRitorno($(this).val());
		});
		ferrovie.setEnableRitorno(false);
	},

	setEnableRitorno : function(bool) {
		if (bool == 'true') {
			$('#ritorno').removeClass('disabled');
			$('#ritorno').find('input').each(function() {
				$(this).attr('disabled', false)
			});
			$('.formBiglietti .data.conditioned').eq(0).datepicker('enable');
			$('#cal_id_2').val($('#cal_id_1').val());
		} else {
			$('#ritorno').addClass('disabled');
			$('#ritorno').find('input').each(function() {
				$(this).attr('disabled', true)
			});
			$('.formBiglietti .data.conditioned').eq(0).datepicker('disable');
		}

	},

	checkDevice : function() {
		if ($('body').innerWidth() <= 500) {
			ferrovie.isMobile = true;
			ferrovie.isTablet = false;
		} else if (($('body').innerWidth() >= 500) && ($('body').innerWidth() <= 768)) {
			ferrovie.isMobile = false;
			ferrovie.isTablet = true;
		} else {
			ferrovie.isMobile = false;
			ferrovie.isTablet = false;
		}
	},

	resizeMenu : function() {
		var ulHeight = this.pageWidth * 306 / 975;
		var _menu = $('.menu > ul > li');
		var _menu_ul = $('.menu > ul > li > ul');
		var _menu_li = $('.menu > ul > li > ul > li');
		if (ferrovie.isMobile) {
			_menu.height('auto');
			_menu_li.height('auto');
		} else {
			var maxHeight = 0;
			_menu_li.each(function() {
				$(this).height('auto')
				if ($(this).innerHeight() > maxHeight) {
					maxHeight = $(this).innerHeight();
				}
			});
			var newHeight = parseInt(ulHeight - (.09 * ulHeight), 10);
			if (maxHeight > newHeight) {
				_menu_li.height(maxHeight);
				_menu_ul.height(maxHeight + (.09 * ulHeight));
			} else {
				_menu_ul.height(ulHeight);
				_menu_li.height(newHeight);
			}
		}
	},

	resizeFooter : function() {
		_max_footerli_h = 1;
		this.footerli.height('auto');
		this.footerli.each(function() {
			_max_footerli_h = ($(this).height() > _max_footerli_h ) ? $(this).height() : _max_footerli_h;
		}).height((document.width <= 500) ? 'auto' : _max_footerli_h);
		this.footerli.height((document.width <= 500) ? 'auto' : _max_footerli_h)
	},

	hoverMenu : function(obj) {
		if (!(ferrovie.isMobile)) {
			$(obj).addClass('hover').children('ul').show();
			if ($(obj).children('ul').size() > 0) {
				$('.elvideo').css({
					'visibility' : 'hidden'
				});
			}
			ferrovie.resizeMenu();
			$('.menu .active').addClass('remember').removeClass('active');
		}
	},

	outMenu : function(obj) {
		if (!(ferrovie.isMobile)) {
			$(obj).removeClass('hover').children('ul').hide();
			$('.menu .remember').addClass('active').removeClass('remember');
			if ($('.menu .hover').size() == 0) {
				$('.elvideo').css({
					'visibility' : 'visible'
				});
			}

		}
	},

	createMenu : function() {
		$('.menu > ul > li').mouseover(function() {
			ferrovie.hoverMenu(this)
		}).mouseleave(function() {
			ferrovie.outMenu(this)
		});
	},

	initSliders : function() {
		for (var s in this.sliders) {
			if (this.sliders[s].html == '') {
				this.sliders[s].elem = $(this.sliders[s].elem);
				this.sliders[s].html = this.sliders[s].elem.html();
			}
			this.sliders[s].elem.html(this.sliders[s].html).css({
				'visibility' : 'visible',
				'position' : 'static',
				'z-index' : ''
			});
			if ($(this.sliders[s].elem).size() > 0) {
				var prevText = '&nbsp;', nextText = '&nbsp;';
				if (this.sliders[s].prevText != undefined)
					prevText = this.sliders[s].prevText;
				if (this.sliders[s].nextText != undefined)
					nextText = this.sliders[s].nextText;
								
				this.sliders[s].init = $('' + this.sliders[s].ref + '', this.sliders[s].elem).bxSlider({
					childSelector : this.sliders[s].children,
					displaySlideQty : this.sliders[s].displaySlideQty,
					moveSlideQty : this.sliders[s].moveSlideQty,
					auto : true,
					pause : this.sliders[s].timeout,
					infiniteLoop : true,
					controls : this.sliders[s].controls,
					pager : this.sliders[s].pager,
					prevText : prevText,
					nextText : nextText,
					/*video: true,*/
					useCSS: false
				});

				if (this.sliders[s].elem.attr('class') == 'emotional') {
					//console.log(ferrovie.pageWidth)
					var ulHeight = ferrovie.pageWidth * 306 / 975;
					if (ferrovie.isMobile) {
						ulHeight = ferrovie.pageWidth * 600 / 975;
					}
					this.sliders[s].elem.find('.bx-window').height(ulHeight);
					ferrovie.resizeContentCarousel();

				}

			}
		}
	},

	setAccs : function(classTitle, classContent) {
		$(classTitle).addClass('close');
		$(classContent).css({
			'visibility' : 'visible',
			'position' : 'static',
			'z-index' : ''
		}).addClass('close').hide();
		$(classTitle).click(function(e) {
			e.preventDefault();
			if ($(this).hasClass('close')) {
				$(this).siblings(classTitle).removeClass('open').addClass('close');
				$(this).siblings(classContent).removeClass('open').addClass('close').each(function(i, el) {
					if ($(el).is(':visible'))
						$(el).slideUp('fast');
				});
				$(this).removeClass('close').addClass('open');
				$(this).next(classContent).removeClass('close').addClass('open').slideDown(200);
			} else if ($(this).hasClass('open')) {
				$(this).removeClass('open').addClass('close');
				$(this).next(classContent).removeClass('open').addClass('close').slideUp(200);
			}
		});
	},

	setTabs : function(classTabs, slide) {
		$(classTabs).each(function(ct, classTab) {
			$('>div', classTab).css({
				'visibility' : 'visible',
				'position' : 'static',
				'z-index' : ''
			}).hide();
			if (!slide) {
				$('>div:eq(0)', classTab).show();
				$('>ul li:eq(0)', classTab).addClass('active');
			}
			$('>ul li', classTab).click(function(e) {
				e.preventDefault();
				if (!$(this).hasClass('active')) {
					$(this).addClass('active').siblings().removeClass('active');
					if (slide) {
						$('>div', classTab).slideUp(200);
						$('>div *', classTab).css({
							'opacity' : '0'
						});
						$('>div:eq(' + $(this).index() + ')', classTab).slideDown(200, function() {
							$('>div:eq(' + $(this).index() + ') *', classTab).animate({
								'opacity' : '1'
							}, 200);
						});
					} else {
						$('>div', classTab).hide();
						$('>div:eq(' + $(this).index() + ')', classTab).show();
					}
				} else if ($(this).hasClass('active') && slide) {
					$(this).removeClass('active');
					$('>div:eq(' + $(this).index() + ')', classTab).slideUp(200);
				}
			});
		});
	},

	formControl : function() {
		$('input:text,textarea').not('*[readonly],.passwordcontrol *').each(function() {
			if ( typeof $(this).attr("title") !== 'undefined' && $(this).attr("title") !== false && $(this).attr("title") !== "")
				$(this).addClass('inactive').val($(this).attr('title'));
		});
		$('input:text,textarea').not('*[readonly],.passwordcontrol *').focus(function(e) {
			if ( typeof $(this).attr("title") !== 'undefined' && $(this).attr("title") !== false && $(this).val() == $(this).attr("title"))
				$(this).removeClass('inactive').val('');
		});
		$('input:text,textarea').not('*[readonly],.passwordcontrol *').blur(function(e) {
			if ( typeof $(this).attr("title") !== 'undefined' && $(this).attr("title") !== false && $(this).val() == "")
				$(this).addClass('inactive').val($(this).attr('title'));
		});
	},

	leafFormDatepickers : function(classContent) {
		$('.dal', classContent).datepicker({
			showOn : "button",
			buttonImage : BASE_FILEPATH+"icoCalendarDark.gif",
			buttonImageOnly : true,
			defaultDate : "+1w",
			changeMonth : true,
			numberOfMonths : 1,
			onSelect : function(selectedDate) {
				$('.al', classContent).datepicker("option", "minDate", selectedDate);
			}
		});
		$('.al', classContent).datepicker({
			showOn : "button",
			buttonImage : BASE_FILEPATH+"icoCalendarDark.gif",
			buttonImageOnly : true,
			defaultDate : "+1w",
			changeMonth : true,
			numberOfMonths : 1,
			onSelect : function(selectedDate) {
				$('.dal', classContent).datepicker("option", "maxDate", selectedDate);
			}
		});
	},

	/* Pg_Ecopassenger Page */
	ecoPassengerPanel : function() {
		var hiddP1 = false;
		var hiddP2 = true;
		var hiddcont = false;

		if (hiddP1) {
			$('a.showHideInterf img').attr("src", "img/btnNascondiInterfaccia.gif");
		}
		if (hiddP2) {
			$('a.showHideInterf img').attr("src", "img/btnNascondiInterfaccia.gif");
		}
		/*$('.hiddStep1').hide();*/
		$('.hiddStep2').hide();

		$('a.showHideInterf').click(function() {
			if (hiddP1) {
				$('.hiddStep1').slideDown();
				hiddP1 = false;
				hiddP2 = false;
				$('a.showHideInterf img').attr("src", "img/btnNascondiInterfaccia.gif");

				$('.ecoPassCont').show();
				hiddcont = false;
			} else {
				$('.hiddStep1').slideUp();
				$('.hiddStep2').slideUp();
				hiddP1 = true;
				hiddP2 = true;
				$('a.showHideInterf img').attr("src", "img/btnMostraInterfaccia.gif");

				$('.ecoPassCont').show();
				hiddcont = false;
			}
		});

		$('a.hiddStep1').click(function() {
			if (!hiddcont) {
				$('.hiddStep2').slideDown();
				$('.ecoPassCont').hide();
				hiddcont = true;
			} else {
				$('.hiddStep2').slideDown();
			}
		});
	},

	loadMore : function(elem, type) {
		switch(type) {
			case 'all':
				socialUrl = 'social-request.html?t=all';
				break;

			case 'twitter':
				socialUrl = 'social-request.html?t=twitter';
				break;

			case 'youtube':
				socialUrl = 'social-request.html?t=youtube';
				break;

			case 'flickr':
				socialUrl = 'social-request.html?t=flickr';
				break;

			case 'linkedin':
				socialUrl = 'social-request.html?t=linkedin';
				break;

			case 'small':
				socialUrl = 'social-request-small.html';
				break;

			default:
				socialUrl = 'social-request.html';
		}
		$.ajax({
			url : socialUrl,
			context : document.body
		}).done(function(data) {
			$(elem).prev('ul.posts').append(data);
			$(elem).hide().show();
		});

	},

	_resize_internal : function() {
		for (var s in ferrovie.sliders) {
			if (ferrovie.sliders[s].init != null) {
				//stopTheSliderObj(ferrovie.sliders['emotional'].init);
				//ferrovie.sliders[s].init.reloadShow()
				ferrovie.resizeContentCarousel();
			}

		}
		if (!isIe6) {
			this.checkDevice();
			this.resizeMenu();
			ferrovie.setDimAgenda();
			ferrovie.resizeBoxHome();
			ferrovie.resizeFooter();
			//ferrovie.initSliders();
			ferrovie.resizeSilverlight();
			ferrovie.resizeBigVideo();
		}
	},

	resize : function() {
		rsz.doResize();
	}
	
}

function stopTheSliderObj(sliderInitObj){
	if(sliderInitObj && sliderInitObj.stopAuto){
		//sliderInitObj.stopShow(); metodo 3.0 slider
		sliderInitObj.stopAuto();
		//sliderInitObj.reloadSlider();
	}
}

$(function() {

	if ($.browser.msie)// ???
		ferrovie.init();
	else
		setTimeout(function() {
			ferrovie.init();
		}, 50);

	$(window).bind('resize', function(e) {
		rsz.doResize(e);
		/*for (var s in ferrovie.sliders) {
			if(ferrovie.sliders[s].init!=null){
				stopTheSliderObj(ferrovie.sliders['emotional'].init);
			}
		 };*/
	});
	$(window).bind('resizestop', function(e) {
		rsz.doResize(e);
	});
	/*
	 $(window).bind(ferrovie.changedwin,50,function(e){

	 ferrovie.resize();
	 });
	 */
});

var rsz = {
	ctrl : false,
	doTime : 100,
	time : 200,
	intid : false,
	w : 0,
	h : 0,
	doResize : function(e) {
		ferrovie.pageWidth = $('.content').innerWidth();

		if (isVideoInPlayback) {
			$('.content').css({
				'width' : ferrovie.pageWidth
			});
			return;
		} else {
			$('.content').css({
				'width' : '98%'
			});
		}

		if (this.ctrl == false && ($(window).innerWidth() != this.w || $(window).innerHeight() != this.h)) {
			this.ctrl = true;
			setTimeout(function() {
				rsz.ctrl = false;
			}, rsz.time);
			setTimeout(function() {
				rsz.w = $(window).innerWidth();
				rsz.h = $(window).innerHeight();
				ferrovie._resize_internal();
			}, rsz.doTime);
		}
	}
}

function getRadio(width, height, autoplay) {
	autoplay=0;
	ieEmbedSrc = '<embed src=\"' + AUDIO_SRC_DESKTOP + '\" class=\"mediaPlayerE\" id=\"mediaPlayerE\" name=\"mediaPlayerE\" ' + 'width=\"' + (width) + '\" height=\"' + (height) + '\" hspace=\"0\" vspace=\"0\" align=\"center\" type=\"application/x-ms-wmp\" ' + 'pluginspage=\"http://www.microsoft.com/windows/mediaplayer/download/default.asp\" ' + 'AutoStart=\"' + autoplay + '\" DisplaySize=\"0\" Mute=\"0\" SelectionStart=\"0\" SelectionEnd=\"0\" ShowControls=\"1\" ShowAudioControls=\"1\" ShowDisplay=\"0\" ShowPositionControls=\"0\" ' + 'Volume=\"50\" AudioStream=\"0\" AutoSize=\"0\" AnimationAtStart=\"0\" AllowScan=\"0\"	AllowChangeDisplaySize=\"0\" BufferingTime=\"2\" ' + 'ClickToPlay=\"0\" CursorType=\"0\" DisplayMode=\"1\" TransparentAtStart=\"1\" captioningID=\"cc\" uiMode=\"mini\"> ' + '</embed>';
	notIeEmbedSrc = '<embed src=\"' + AUDIO_SRC_DESKTOP + '\" class=\"mediaPlayerE\" id=\"mediaPlayerE\" name=\"mediaPlayerE \" ' + 'width=\"' + (width) + '\" height=\"' + (height) + '\" hspace=\"0\" vspace=\"0\" align=\"center\" type=\"application/x-ms-wmp\" ' + 'pluginspage=\"http://www.interoperabilitybridges.com/windows-media-player-firefox-plugin-download \" ' + 'AutoStart=\"' + autoplay + '\" DisplaySize=\"0\" Mute=\"0\" SelectionStart=\"0\" SelectionEnd=\"0\" ShowControls=\"1\" ShowAudioControls=\"1\" ShowDisplay=\"0\" ShowPositionControls=\"0\" ' + 'Volume=\"50\" AudioStream=\"0\" AutoSize=\"0\" AnimationAtStart=\"0\" AllowScan=\"0\"	AllowChangeDisplaySize=\"0\" BufferingTime=\"2\" ClickToPlay=\"0\" CursorType=\"0\" ' + 'DisplayMode=\"1\" TransparentAtStart=\"1\" captioningID=\"cc\" uiMode=\"mini\"> ' + '</embed> ';

	ieEmbedSize = 'type=\"application/x-oleobject\" width=\"' + (width) + '\" height=\"' + (height) + '\"> ';
	notIeEmbedSize = 'type=\"application/x-oleobject\" width=\"' + (width) + '\" height=\"' + (height) + '\"> ';
	detectIfMobileClient(width, height, autoplay);

}

function addWMPlayerWebRadio(autoplay) {
	document.write('<div id="cc" class="topGrey"></div><object id=\"mediaPlayer\" name=\"mediaPlayer\" classid=\"CLSID:22D6f312-B0F6-11D0-94AB-0080C74C7E95\" ' + 'codebase=\"http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=6,4,5,715\" ' + ( isIE ? ieEmbedSize : notIeEmbedSize) + '<param name=\"AutoStart\" value=\"' + autoplay + '\" /> ' + '<param name=\"ShowControls\" value=\"True\" /> ' + '<param name=\"ControlType\" value=\"1\" /> ' + '<param name=\"DisplaySize\" value=\"True\" />' + '<param name=\"SelectionStart\" value=\"False\" />' + '<param name=\"SelectionEnd\" value=\"False\" />' + '<param name=\"ShowPositionControls\" value=\"False\" />' + '<param name=\"ShowDisplay\" value=\"False\" /> ' + '<param name=\"ShowAudioControls\" value=\"1\" /> ' + '<param name=\"ShowStatusBar\" value=\"False\" /> ' + '<param name=\"uimode\" value=\"mini\" /> ' + '<param name=\"captioningID\" value=\"cc\" /> ' + '<param name=\"Filename\" value=\"' + AUDIO_SRC_DESKTOP + '\" /> ' + ( isIE ? ieEmbedSrc : notIeEmbedSrc) + '</object>');
}

// XXX modificato in data 19-06-2013 X gestione webRadio iPhone-iPod con QuickTime
function detectIfMobileClient(width,height,autoplay){
	var autoplay =(autoplay=='1')? "True" : "False";
	var autoplay2 =(autoplay=='True')? "autoplay" : "";
	iosDeviceSrc = '<object classid=\"clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B\" codebase=\"http://www.apple.com/qtactivex/qtplugin.cab\" '
					+'width=\"'+width+'\" height=\"'+(height+20)+'\" align=\"center\" > '
					+'<param name=\"src\" value=\"'+AUDIO_SRC_IOS+'\" /> '
					+'<param name=\"controller\" value=\"true\" /> '
					+'<param name=\"autoplay\" value=\"'+autoplay+'\" /> '
					+'<param name=\"target\" value=\"QuickTimePlayer\" /> '
					+'<param name=\"href\" value=\"'+AUDIO_SRC_IOS+'\" /> '
					+'<embed name=\"qTime\" id=\"qTime\" type=\"video/quicktime\" pluginspage=\"http://www.apple.com/quicktime/download/\" width=\"'+width+'\" height=\"'+(height+20)+'\" '
					+'src=\"'+AUDIO_SRC_IOS+'\" controller=\"true\" target=\"QuickTimePlayer\" href=\"'+AUDIO_SRC_IOS+'\" align=\"center\" autoplay=\"'+autoplay+'\"/> </object> ';
	
	if (isIosDevice && DetectIpad()){
		document.write(iosDeviceSrc);				
	}else if (isAndroidDevice || DetectIphoneOrIpod()){
		$(document).ready(function(){
			// XXX Rimozione div precedente della radio anche per gli iPhone o iPod - //$('.fsPlayer').remove();
			webRadioSpot = '<span style=\"float:left;font-size:1.3em;margin:5px;\"><u><b>Clicca qui <br/> per ascoltare <br /> FSNews Radio<b/></u></span>';
			if(DetectIphoneOrIpod()){
				radioHtmlCode = webRadioSpot+iosDeviceSrc;
			}else{
				radioHtmlCode = $('.openRadio').html();
				radioHtmlCode = radioHtmlCode.replace('</a>',webRadioSpot+'</a>');
			}
			$('.logo .radio').remove();
			$('.footer').prepend(radioHtmlCode);
			//alert(radioHtmlCode+" [2]");
		});
	}else{
		addWMPlayerWebRadio(autoplay);
	}
	
	return;
}									

var isVideoInPlayback = false;

function stopWebRadio() {
	try {
		if (!isIosDevice) {
			if (isIE) {
				if (($('#mediaPlayer').size() != 0) && mediaPlayer) {
					mediaPlayer.stop()
				}
			} else {
				if (($('#mediaPlayerE').size() != 0) && mediaPlayerE && mediaPlayerE.controls) {
					mediaPlayerE.controls.stop()
				}
			}
		} else {
			if (qTime) {
				qTime.Stop();
			}
		}
	} catch(e) {
		if (console)
			console.log("Error: " + e);
		$("#mediaPlayer").html('');
		//rimuove player web-radio del tutto
	} finally {
	}
}

/* XXX putAdHocMediaPlayer modificato in data 9-04-2013 bug ultima slide */
function putAdHocMediaPlayer(where,w,h,mediaUrlDesktop,mediaUrlMobile){
	stopWebRadio();
	
	// ferma lo slider emotional quando il video e' in playback... 
	if(ferrovie.sliders['emotional'].init){
		stopTheSliderObj(ferrovie.sliders['emotional'].init);
		// ferrovie.sliders['emotional'].init.reloadSlider();
	}
	
 if(mediaUrlDesktop===mediaUrlMobile){
	var curTimeStampMillis = $.now();
	var embedFlashCodeStr = 
		"<div style=\"background:#E6E5E7; width:"+ w +"; height:"+ h +"px; padding-top:0px\">"
			+"<div style=\"margin:0 auto; width:99%; height:99%; border:2px solid #CCC;\">"
				+"<a href=\""+mediaUrlDesktop+"\" " 
				+"class=\"MMresize video\" id=\"player"+curTimeStampMillis+"\">"
					+"<img id=\"playerThumb\" src=\"/cms-file/common/img/playerImgAnsa.png\" alt=\"Play\" />"
				+"</a>"	
			+"</div>"
		+"</div>";
	
		$(where).html(embedFlashCodeStr);
		startPlayer("player"+curTimeStampMillis);

 }else{
 	var curEmbedObjID=$(where).attr('id');
	var embedCodeStr = 
	//  "<div style=\"border:5px solid green; position:absolute;top:0; left:0; z-index: "+ "1" +"; width:" + w + "px; height:" + h + "px; \" >"+
	"<object data=\"data:application/x-silverlight-2,\" type=\"application/x-silverlight-2\" " 
	+ "width=\"" + w + "\" height=\"" + h + "\"  id=\"player" + curEmbedObjID + "\">" 
	+"<param name=\"source\" value=\"http://www.fsnews.it/cms-file/common/xap/SmoothStreamingPlayer.xap\" />"
	+"<param name=\"onError\" value=\"onSilverlightError\" />"
	+"<param name=\"background\" value=\"black\" />"
	+"<param name=\"windowless\" value=\"true\" />"
	+"<param name=\"minRuntimeVersion\" value=\"4.0.50401.0\" />"
	+"<param name=\"autoUpgrade\" value=\"true\" />"
	+"<param name=\"enablehtmlaccess\" value=\"bool\"/>"
	+"<param name=\"InitParams\" value=\"mediaurl=" + mediaUrlDesktop + ", autoplay=true\" />"
	+"<a href=\"http://go.microsoft.com/fwlink/?LinkID=149156&amp;v=4.0.50401.0\" target=\"_blank\">" 
	+" <img src=\"http://go.microsoft.com/fwlink/?LinkId=161376\" alt=\"Get Microsoft Silverlight\"/>" 
	+"</a>"
	+"</object>";
	//  +"</div>";
	
	$(where).html(embedCodeStr);
 }
    
 if(!isIosDevice&&(!isAndroidDevice)) {
	isVideoInPlayback = true;
 }
 //console.log("#'putAdHocMediaPlayer'# ==> curEmbedObjID="+ curEmbedObjID + " *** isVideoInPlayback="+isVideoInPlayback+" --- focus" + " ***"); 
 return false;
}


(function($,sr){
  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
      var timeout;

      return function debounced () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null; 
          };

          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);

          timeout = setTimeout(delayed, threshold || 100); 
      };
  }
    // smartresize 
    jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');



var fGallery = {	
	
	init : function(elem){
		/* dichiaro elementi */
		nav = $('.nav', elem);
		totelem = $('.totelem', elem);
		numtot = $('li',nav).size();
		numTotPhoto = $('li:not(.video)',nav).size();
		totelem.html(numtot);
		nav.css({'position':'absolute'});
		thispage = $('.thispage', elem);
		slider = $('.slider', elem);
		container = $('.container', elem);		
		imgNav = $('img', nav);
		contBigImg = $('.imgContainer', elem);
		imgInsideContainer = $('img', contBigImg);
		nextArrow = $('<div class="next"><i></i></div>');
		prevArrow = $('<div class="prev"><i></i></div>');
		nav.before(prevArrow);
		nav.after(nextArrow);
		
		/* nasconde elementi anchor per gestione src StreamVideo */
		$('.details a.videoInfoToHide').each(function(){
			$(this).css('display', 'none');
			//alert("THISss: "+$(this).prop('tagName')+" HTML="+$(this).html());
		});
		
		/* easing per movimento fluido */
		jQuery.extend( jQuery.easing , { anbi: function (x, t, b, c, d) { return c*((t=t/d-1)*t*t*t*t + 1) + b; } });
		
		/* genero gallery */
		fGallery.build();
		nav.find('li.video > a:first-child').each(function(){
			$(this).append('<div class="pulsPlay"></div>');
		});
		
		/* esc */
		$(document).keyup(function(e) {
		  if (e.keyCode == 27) {
		 	$('#lightbox-overlay').remove();
            $('#lightbox-content').remove();
		  }
		  if (e.keyCode == 39) {
		 	fGallery.naviLightbox('next');
		  }
		  if (e.keyCode == 37) {
		 	fGallery.naviLightbox('prev');
		  }
		});
		
		
		$(window).smartresize(function(){  
			if($('#lightbox-content').size()!=0){
				fGallery.moveLightbox();				
				$('#lightbox-overlay').css({ 'height':$(document).height()+'px' })
			}
		});		
		if(window.location.hash==''){			
			firstElem  = $('li:eq(0)',nav);
			firstElemA  = $('a',firstElem);
			setTimeout(function(){
				fGallery.actionShow(firstElem,firstElemA,0);
			},500)
		}		
	},
	
	actionShow : function(el,em,i){
		
		det = $('.details:eq(0)',el);
		$('.text','#mediaGallery').html(det.html());
		nav.find('li').removeClass('active');
		nav.find('li').removeClass('selected');
		$(el).addClass('active');
		$(el).addClass('selected');
		thispage.html(i+1);
		contBigImg.html('<div style="background:#fff url('+BASE_FILEPATH+'lightbox-loader.gif) 10px 10px no-repeat; border-radius:4px; padding:10px 0 10px 30px;">Loading...</div>');
		
		if($(el).hasClass('video')){
			
			var aFirchildDet = det.children("a.videoInfoToHide:first");
			//alert("aFirchildDet: REL=" + aFirchildDet.attr('rel') + " - HREF="+aFirchildDet.attr('href'));
			var mediaUrlDesktop=aFirchildDet.attr('href');
			var mediaUrlMobile=aFirchildDet.attr('rel');
			aFirchildDet.css('display', 'none');
			
			hoverPlay = $('<a class="pulsPlay"></a>').hide();
			var imgSrcByRelAttrValue = $(em).attr('rel'); /* XXX 07-08-2013 */ 
			if(imgSrcByRelAttrValue===""){ imgSrcByRelAttrValue = "/cms-file/common/css/themes/fsitaliane/001/i/playButtonOverlay.png"; } 
			imgLoad = $('<img src="'+imgSrcByRelAttrValue+'" />').hide().load(function(){			
					contBigImg.html('');
					contBigImg.append(this);						
					contBigImg.append(hoverPlay);	
					$(this).fadeIn(); 	
					$(hoverPlay).fadeIn(); 	
			});
				
			if (isIosDevice || isAndroidDevice) {
				$(hoverPlay).attr('target', '_blank');
				$(hoverPlay).attr('href', mediaUrlDesktop);
			} else {
				$(hoverPlay).click(function(e) {
					e.preventDefault();
					putAdHocMediaPlayer($(this).parent(), $(this).parent().width(), $(this).parent().height(), mediaUrlDesktop, mediaUrlMobile);
				});
			}
			
		}else{
			// function for show the lightbox 
			linkImg = $('<a href="'+$(det).attr('title')+'"></a>').click(function(event){
				event.preventDefault();				
				myLI = $('li.selected',nav);
				posElem = $('li:not(.video)',nav).index(myLI)+1;
				contImage = $('<div id="lightbox-content"></div>').hide();

				overlay = $('<div id="lightbox-overlay"></div>')
					.css({ 'height':$(document).height()+'px' })
						.click(function(){ $(this).remove(); contImage.remove(); });

				textTitle = $('li.selected',nav).find('h3').html();
				contTitle = $('<div id="lightbox-title"><span>'+textTitle+'</span></div>');
				contClose = $('<div id="lightbox-close">'+posElem+' di '+numTotPhoto+'</div>').click(function(){ contImage.remove(); overlay.remove(); });
				arrowNext = $('<div id="lightbox-next"></div>').click(function(){
					fGallery.naviLightbox('next');
				});
				arrowPrev = $('<div id="lightbox-prev"></div>').click(function(){
					fGallery.naviLightbox('prev');
				});
				
				myimg = $('<img id="imgLoadedBig" />').one("load",function(){
					
				}).attr("src", $(this).attr('href'));

				$(contTitle).append(contClose);
				$(contImage).append(contTitle);
				$(contImage).append(myimg);
				$(contImage).append(arrowNext);
				$(contImage).append(arrowPrev);
				$('body').append(overlay);
				$('body').append(contImage);
				
				setTimeout(function(){
					fGallery.moveLightbox();
				},500);				
				
			});	
			imgLoad = $('<img src="'+$(em).attr('rel')+'" />').hide().load(function(){			
				contBigImg.html('');
				linkImg.append(this);
				contBigImg.append(linkImg);
				$(this).fadeIn();
			}); 
		}
		
		// XXX SiteCatalyst Context-Sub-Page
		sendSiteCatalystInfos(i);
		// XXX 
		/* window.location.hash = $(em).attr('rev'); */
	},
	
	naviLightbox : function(typeAction){
		
		if($('li.selected',nav).size()==0){
			$('li.active',nav).addClass('selected');
		}
		loaderImg = $('<div class="loaderImg"></div>');
		if(typeAction=='next'){			
			newLI = $('li.selected',nav).nextAll('li:not(.video):first');
			newpos = $('li:not(.video)',nav).index(newLI)+1;	
			if(newpos<=numTotPhoto && newpos!=0){
				$('#lightbox-content').append(loaderImg);		
				$('li',nav).removeClass('selected');
				newLI.addClass('selected');			
				newSrc = newLI.find('.details').attr('title');
				newTitle = newLI.find('h3').html();
				$("#imgLoadedBig").hide()
			        .one('load', function() {
			          $(this).fadeIn();
			          loaderImg.fadeOut(400).remove();
			          fGallery.moveLightbox();
			        })
			        .attr('src', newSrc)
			        .each(function() {
			          if(this.complete) $(this).trigger('load');
			        });
				$('#lightbox-title > span').html(newTitle);		
				$('#lightbox-close').html(newpos+' di '+numTotPhoto);		
			}
		}
		
		if(typeAction=='prev'){		
			newLI = $('li.selected',nav).prevAll('li:not(.video):first');
			newpos = $('li:not(.video)',nav).index(newLI)+1;				
			if(newpos<=numTotPhoto && newpos!=0){	
				$('#lightbox-content').append(loaderImg);	
				$('li',nav).removeClass('selected');
				newLI.addClass('selected');			
				newSrc = newLI.find('.details').attr('title');
				newTitle = newLI.find('h3').html();
				$("#imgLoadedBig").hide()
			        .one('load', function() {
			          $(this).fadeIn();
			          loaderImg.fadeOut(400).remove();
			          fGallery.moveLightbox();
			        })
			        .attr('src', newSrc)
			        .each(function() {
			          if(this.complete) $(this).trigger('load');
			        });
				$('#lightbox-title > span').html(newTitle);		
				$('#lightbox-close').html(newpos+' di '+numTotPhoto);
			}
		}
		
	},
	
	moveLightbox : function(){
		contImage = $('#lightbox-content');
		myimg = $('img',contImage);
		pic_real_width = 0;
		pic_real_height = 0;
		if($('#IMGtempForSize').size()!=0){ $('#IMGtempForSize').remove(); }
		$('body').append('<img src="'+$(myimg).attr("src")+'" id="IMGtempForSize" style="position:absolute; top:-30000px; left:-30000px;" />');		
	    pic_real_width = $('#IMGtempForSize').width();
	    pic_real_height = $('#IMGtempForSize').height();     
		coeffProp = pic_real_width/pic_real_height;					
		if(pic_real_height>($(window).height()-100)){
			myHeight = ($(window).height()-100);
			myWidth = (myHeight*coeffProp);
		}else{
			myHeight = pic_real_height;
			myWidth = pic_real_width;
		}
		if(myWidth>($(window).width()-100)){
			myWidth = ($(window).width()-100);
			myHeight = (myWidth/coeffProp);
		}				
		mytop = ($(window).height()-(myHeight+42))/2;	
		myleft = ($(window).width()-myWidth)/2;						
		newTop = $(window).scrollTop()+mytop;		
		
		if(contImage.is(':visible')){
			contImage.animate({'top': newTop, 'left': myleft+'px', 'width': myWidth+'px', 'height': (myHeight+42)+'px'},500,"anbi");
		}else{
			contImage.css({'top': newTop, 'left': myleft+'px', 'width': myWidth+'px', 'height': (myHeight+42)+'px'}).fadeIn();
		}

	},
	
	build : function() {
		
		imgInsideContainer.hide();
		nav.hide();
		nav.css('overflow','hidden');
		wTot = 0;
		gonogo = true;
		
		$.when( imgInsideContainer.load() ).then( imgInsideContainer.fadeIn('slow') );	
		$.when( imgNav.load() )
			.done(function(){
				$.when(
					nav.find('li').each(function(i,e){
						$(e).css({'margin':'0 10px 10px 0'});
						$('a', e).click(function(ev){
							ev.preventDefault();							
							fGallery.actionShow(e,this,i);							
							window.location.hash = $(this).attr('rev');
						});						
						wTot += $(e).outerWidth(true);
					})
				).then(
					function(){

						container.width(wTot);
						wSingle = Number(wTot)/Number(nav.find('li').size());
						
						if(window.location.hash!=''){
							hst = window.location.hash;
							mythis = $('a[rev='+hst+']',slider);
							mye = mythis.parent('li');
							myi = mye.index();
							
							//console.log("#hst="+hst+" --- mythis="+mythis.prop('tagName')+" --- CLASS="+mythis.attr('class')+"#");
							//console.log("#hst="+hst+" --- mye.CLASS="+mye.attr('class')+" --- myi="+myi+"#");
							if((myi!=-1)&&(myi>=0)){
								//console.log("showing elem "+myi+" !");
								fGallery.actionShow(mye,mythis,myi);
							}else{
								//console.log("showing First elem...");
								window.location.hash = '';
								firstElem  = $('li:eq(0)',nav);
								firstElemA  = $('a',firstElem);
								setTimeout(function(){
									fGallery.actionShow(firstElem,firstElemA,0);
								},500);
							}
							
							nElem = 0;
							$('a',slider).each(function(ind,elem){
								if($(elem).attr('rev')==hst){ nElem = ind; }
							});														
							
							diffSing = container.width()-nav.width();
							olol = nElem*wSingle;
							
							if(-(olol-wSingle)>-diffSing){
								nextArrow.css('opacity','1'); 
								prevArrow.css('opacity','1');
								if(gonogo){
									gonogo=false; 
									container.animate({ left: '-='+olol }, 'slow', 'anbi', function(){ 
										if(container.position().left==0) { prevArrow.css('opacity','.5'); }
										gonogo=true; 
									});
								}
							}else{
								nextArrow.css('opacity','.5'); 
								prevArrow.css('opacity','1');
								if(gonogo){
									gonogo=false;
									container.animate({ left: '-'+diffSing },  'slow', 'anbi', function(){
										if(container.position().left==0) { prevArrow.css('opacity','.5'); }
										gonogo=true; 
									});
								}
							};
						}else{
							prevArrow.css('opacity','.5');
						}
						
						if(wTot<nav.width()){
							nextArrow.hide();
							prevArrow.hide();
						}else{			
							nextArrow.click(function(){
								diff = container.width()-nav.width();
								ol = container.position().left-wSingle;
								if(ol>-diff){
									nextArrow.css('opacity','1'); 
									prevArrow.css('opacity','1');
									if(gonogo){
										gonogo=false;
										container.animate({ left: '-='+wSingle }, 'slow', 'anbi', function(){
											if(container.position().left==0) { prevArrow.css('opacity','.5'); }
											gonogo=true;
										});
									}
								}else{
									nextArrow.css('opacity','.5'); 
									prevArrow.css('opacity','1');
									if(gonogo){ 
										gonogo=false; 
										container.animate({ left: '-'+diff },  'slow', 'anbi', function(){ 
											if(container.position().left==0) { prevArrow.css('opacity','.5'); }
											gonogo=true;
										}); 
									}
								};
							});
							prevArrow.click(function(){
								ol = container.position().left;
								if(ol<0){
									prevArrow.css('opacity','1');
									nextArrow.css('opacity','1');	
									if(gonogo){
										gonogo=false; 
										container.animate({ left: '+='+wSingle },  'slow', 'anbi', function(){
											if(container.position().left==0) { prevArrow.css('opacity','.5'); }
											gonogo=true; 
										}); 										
									}									
								}else{									 
									prevArrow.css('opacity','.5');
									nextArrow.css('opacity','1');
									if(gonogo){ 
										gonogo=false; 
										container.animate({ left: '0' },  'slow', 'anbi', function(){
											if(container.position().left==0) { prevArrow.css('opacity','.5'); }
											gonogo=true; 
										});											
									}									
								}
							});					
						}
					}		
				)
			}).then( nav.fadeIn('slow') );
	}
}

function sendSiteCatalystInfos(itemIndex){
	try{
		if((typeof siteCatalystPropsList!=="undefined") && (typeof s !=="undefined")){
			var curItemSiteCatalystProps = siteCatalystPropsList[itemIndex];
			s["eVar39"] = curItemSiteCatalystProps["eVar39"]; // trasmette solo il titolo per report mediaItem, le altre info sono le stesse della pagina!
			//console.log("<<< s["+ "eVar39" +"] = " + s["eVar39"] + " >>> ");				
			/*for(var k in curItemSiteCatalystProps){
				s[k] = curItemSiteCatalystProps[k];
				console.log("<<< s["+ k +"] = " + s[k] + " >>> ");				
			}*/
			var resSiteCatalystCall = s.t();
			//console.log("<<< mediaIndex=["+itemIndex+"], s.t() =[" + resSiteCatalystCall + "] >>>");
		}
	}catch(e){}
}
