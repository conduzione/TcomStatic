/*
 * tcom-engine.js
 * last mod: 07-06-2016#10:52
 * add Leonardo-retargeting 
 * emotional timer 7 secs.
 * addLastTrainSearchListBox [NO su siti en, de, fr]
 * add fixDatePickerSmartPhone
 * add msite URL
 * fix lang _label init setting
 * added fixElemLeftOuterHeight
 * added setChangeTicketUrlMobile
 */

jQuery.extend( jQuery.easing,{ cool: function (x, t, b, c, d) { return c*((t=t/d-1)*t*t*t*t + 1) + b; } });

var tcom14 = {
    lang : ($('html').attr('lang')=='en')?'en':'it',
    mSize : (Modernizr.touch)? 700 : 683,
    /* _label : (this.lang=='en') ?_labels.en : _labels.it, */
    _label : ((($('html').attr('lang')=='en')?'en':'it')=='en') ?_labels.en : _labels.it, 
    frecce : [],
    allTrain: [],
    init : function(){
		try{
			tcom14.menu();
			tcom14.suggestion();
			tcom14.emotional.init();
			tcom14.fontChanger();
			tcom14.sliderBox.init();
			tcom14.tabHeadCruscotto();
			tcom14.tabHeadNews();
			tcom14.calendari();
			tcom14.start();
			tcom14.validate();
			tcom14.tabHeadFrecceTreni();
			tcom14.setChiudiFooter();
			tcom14.login();
			tcom14.wall.init();
			tcom14.setSearch();
			//tcom14.captions();
		}catch(e){}
				
		try{
			tcom14.posCruscotto();
		}catch(e){}
		try{
			tcom14.accordion();
		}catch(e){}
		
		try{
			tcom14.openAreaRis();
			tcom14.addPlaceHolder();
			tcom14.chooseLang();
			tcom14.setDateCarnet();
			tcom14.setActionRicAv();
			tcom14.setChangeTicketUrlMobile();
		}catch(e){}
		try{
			tcom14.heightSpallaDx();
		}catch(e){}
		
		try{
			if(!Modernizr.mq('only all')){ $('html').addClass('no-mq'); }
		}catch(e){}
		try{
			if($('div.loader')){ $('div.loader:eq(0)').delay(500).fadeOut(500); }
		}catch(e){}	
		
		try{
			setTimeout(function(){ tcom14.fixElemLeftOuterHeight(); }, 5000);
		}catch(e){}
		
		tcom14.fixMouseOverMenuTablet();
		tcom14.fixDatePickerSmartPhone();
		tcom14.addLastTrainSearchListBox();
    },
	
    resize : function(){
        tcom14.emotional.resize();
        if(!$('html').hasClass('ie8') && !$('html').hasClass('ie7') && !$('html').hasClass('ie6')){
            if($(window).width() >= tcom14.mSize){
                $('.handler-menu:eq(0)').hide();
                $('.menu-mobile:eq(0)').hide();
                if($('.wrapper').hasClass('showed')){
                    $('body').css('overflow','auto');
                }
            }else{
                $('.handler-menu:eq(0)').show();
                if($('.menu-mobile.apertoM').size() > 0){
                    $('.menu-mobile:eq(0)').show();
                }
                $('.box-white').css("transform","");
                if($('.wrapper').hasClass('showed')){
                    $('body').css('overflow','hidden');
                }
            }
        }
        if($(window).width()>tcom14.mSize){
            $( "#biglietti_data_a" ).datepicker( "option", "numberOfMonths", 2 );
        }else{
            $( "#biglietti_data_a" ).datepicker( "option", "numberOfMonths", 1 );
        }
        tcom14.wall.resize();
        tcom14.setSearch();
        //tcom14.captions();
        tcom14.heightSpallaDx();
        tcom14.posCruscotto();
    },

    setSearch : function(){
        wTot = 0;
        $('ul.navigationTrenitalia > li').each(function(i,e){
            if(!$(e).hasClass('search')){
                wTot = wTot + $(e).outerWidth(true);
            }
        });
        wNew = Math.round(Number($('ul.navigationTrenitalia:eq(0)').width())-wTot-20);
        $('ul.navigationTrenitalia > li.search:eq(0) > .input > .cont').width(wNew);

        w2tot = 0;
        $('.subheader > .cont > ul.no-mobile > li').each(function(i,e){
            w2tot = w2tot + $(e).outerWidth(true);
                if(w2tot>$('.subheader > .cont > ul.no-mobile').width()){
                    $('.subheader > .cont > ul.no-mobile').addClass('double');
                }else{
                    $('.subheader > .cont > ul.no-mobile').removeClass('double');
                }
        });
    },

    menu :  function(){

        $('.top:eq(0)').find('a[rel]').each(function(i,e){

            $(e).bind('click', function(ev){
                ev.preventDefault();

                $('.top:eq(0) > ul > li > a').removeClass('open');

                elems = $('.menu','#submenu');
                $(elems).find('ul:last').addClass('last');
                myElem = $('.'+$(this).attr('rel'),'#submenu');
                if(myElem.hasClass('open')){
                    if(!Modernizr.csstransitions){
                        $(elems).animate({'height':'0px'},500,'cool',function(){
                            $(this).removeClass('open');
                        });
                    }else{
                        $(elems).removeClass('open');
                    }
                    $(e).removeClass('open');
                }else{
                    if(!Modernizr.csstransitions){
                        $(elems).animate({'height':'0px'},500,'cool',function(){
                            $(this).removeClass('open');
                        });
                        $(myElem).animate({'height':'115px'},500,'cool',function(){
                            $(this).addClass('open');
                        });
                    }else{
                        $(elems).not(myElem).removeClass('open');
                        $(myElem).addClass('open');
                    }

                    $(e).addClass('open')
                }
            });
        });

        $('.subMenuClose > a').bind('click', function(){
          $('a.open','.top').click();
        });

        $('.accendiAhover').hover(function(){
           $(this).parent('li').addClass('hover');
        },function(){
            $(this).parent('li').removeClass('hover');
        });

        $('.submenu').hover(function(){
           $(this).addClass('hover');
        },function(){
            $(this).removeClass('hover');
        });

        $('.menu-responsive > ul.first > li > a').hover(function(){
             $(this).parent('li').addClass('hover');
        },function(){
            //$(this).parent('li').removeClass('hover');
        });

        $('.menu-responsive > ul.first > li').hover(function(){
            $(this).addClass('hover');
        },function(){
            $(this).removeClass('hover');
        });

        $('ul.second').hover(function(){
            $(this).parent('li').addClass('hover');
        },function(){
            $(this).parent('li').removeClass('hover');
        });


        $('.handler-menu:eq(0)').bind('click',function(){
            btn = this;
            if($('.wrapper').hasClass('showed')){
                $('.wrapper').removeClass('showed');
                $(btn).hide().removeClass('showed').delay(600).fadeIn(500,function(){
                    $('.menu-mobile').hide();
                });
                $('body').css('overflow','auto');
            }else{
                $('.menu-mobile').show();
                $('.menu-mobile').addClass('apertoM');
                $('.wrapper').addClass('showed');
                $(btn).hide().addClass('showed').delay(600).fadeIn();
                $('body').css('overflow','hidden');
            }
        });

        $('a.opener').bind('click',function(ev){
            ev.preventDefault();
            thisBtn = this;
            $('a.opener',$(thisBtn).parents('ul:eq(0)')).not(thisBtn).each(function(i,e){
                if($(e).hasClass('open')){
                    $(e).parent('li').removeClass('open');
                    $(e).removeClass('open');
                }
            });

            $(thisBtn).toggleClass('open');
            $(thisBtn).parent('li').toggleClass('open');

        });

    },

    emotional : {
        timer : 7500,
        effect : 'slide', /* slide|fade */
        interval : function (){
            myint = setInterval(function(){ tcom14.emotional.next(); }, this.timer)
        },
        nItem : $('.emotional:eq(0) ul.slider li').size(),
        init : function(){
            $('ul.slider').hide();
            /* setto larghezza UL */
			/* configura effetto transizione slide indicato da cms XXX */
			if((typeof(emotionalHpTcomTransitionEffect) !== 'undefined') && (emotionalHpTcomTransitionEffect.length>0)){
				tcom14.emotional.effect = emotionalHpTcomTransitionEffect;	
			}
            if(tcom14.emotional.effect=='fade'){
                $('ul.slider').addClass('fade');
                $('ul.slider').children('li').css({'opacity':0, 'z-index':1});
                $('ul.slider').children('li:eq(0)').css({'opacity':1, 'z-index':2});
            }
            $('ul.slider').fadeIn(1000);
            this.resize();
            $('<div class="pager"><ul class="nav"></ul></div>').insertAfter('ul.slider');

            nWli = Math.floor(Number(100/Number(tcom14.emotional.nItem))*1000)/1000;

            /* imposto background immagini */
            $('li','.emotional:eq(0) > .slider').each(function(i,e){
                $(e).width(nWli+'%');

                /* nuovo SRC dell'immagine */
                $('img',e)
                    .attr({
                        "data-mobile": $('img',e).attr('src'),
                        "src": _cfg.blank
                    });
                var mySRC = ($(window).width()<tcom14.mSize)? $('img',e).attr('data-mobile') : $('img',e).attr('usemap');

                $('a',e).wrap('<div class="wrap-link"><div class="cont"></div></div>');
                if(tcom14.emotional.effect=='fade'){
                    if(!Modernizr.cssanimations){
                        if(i==0){
                            $(e).find('.wrap-link:eq(0)').fadeIn();
                        }else{
                            $(e).find('.wrap-link:eq(0)').fadeOut();
                        }
                    }
                }
                $('img',e).fadeOut(0,function(){
                    /* nuovo background dell'immagine */
                    $('img',e).css('background-image','url('+mySRC+')').fadeIn(1000);
                });



                newLi = $('<li></li>').css('width', nWli+'%');
                if(i==0){
                    newLi.addClass('active')
                }
                newLink = $('<a href="#promo_'+i+'">' + $('img',e).attr('alt') + '</a>')
                            .bind('click',function(ev){
                                ev.preventDefault();
                                nPer = i*100;

                                if(tcom14.emotional.effect=='slide'){
                                    /* * Check CSS3 transition support * */
                                    if(!Modernizr.cssanimations){
                                        $('ul.slider','.emotional:eq(0)').animate({'left':'-'+nPer+'%'},500,'cool');
                                    }else{
                                        nWli = Math.floor(Number(100/Number(tcom14.emotional.nItem))*1000)/1000;
                                        newPos = i*nWli;
                                        $('ul.slider','.emotional:eq(0)').css("transform","translateX(-"+newPos+"%)");
                                    }
                                }

                                if(tcom14.emotional.effect=='fade'){
                                    /* * Check CSS3 transition support * */
                                    if(!Modernizr.cssanimations){
                                        $('ul.slider','.emotional:eq(0)').find('li').each(function(j,f){
                                            if(j==i){
                                                $(f).animate({'opacity':1, 'z-index':2});
                                                $(f).find('.wrap-link:eq(0)').fadeIn();
                                            }else{
                                                $(f).animate({'opacity':0, 'z-index':1});
                                                $(f).find('.wrap-link:eq(0)').fadeOut();
                                            }
                                        });
                                    }else{
                                        $('ul.slider','.emotional:eq(0)').find('li').each(function(j,f){
                                            if(j==i){
                                                $(f).css({'opacity':1, 'z-index':2});
                                            }else{
                                                $(f).css({'opacity':0, 'z-index':1});
                                            }
                                        });
                                    }
                                }

                                $('.pager li').removeClass('active');
                                $(this).parent('li').addClass('active');
                            });
                newLi.append(newLink);
                $('.emotional:eq(0)').find('.pager:eq(0) > ul.nav').append(newLi);
            });
            this.resize();

            if($(window).width()>tcom14.mSize) {

                $('ul.nav:eq(0)','.pager:eq(0)').hover(function(){
                    if(myint) clearInterval(myint);
                },function(){
                    tcom14.emotional.interval();
                });
                tcom14.emotional.interval();
            }

        },

        setImages : function(){
            $('img','.emotional:eq(0) > .slider').each(function(i,e){
                var mySRC = ($(window).width()<=tcom14.mSize)? $(e).attr('data-mobile') : $(e).attr('usemap');
                $(e).css('background-image','url('+mySRC+')');
            });
        },

        next : function(){
            var nextLI = $('.pager:eq(0)').find('li.active:eq(0)').next('li');
            if(nextLI.size()!=0){
                nextLI.children('a').click();
            }else{
                $('.pager:eq(0)').find('li:eq(0)').children('a').click();
            }
        },

        resize :function(){
            wTot = 0;
            for(var i=0; i<tcom14.emotional.nItem;i++){
                wTot+=$('.emotional:eq(0)').width();
            }
            $('.emotional:eq(0) ul:eq(0)').width(wTot);
            if(!$('html').hasClass('no-mq')){
                /* non faccio reload img se non supporto MQ */
                tcom14.emotional.setImages();
            }
        }
    },

    fontChanger : function(){
        $('.changeFont').bind('click', function(ev){
            ev.preventDefault();
            if($('body').hasClass('big')){
                $('body').addClass('biggest');
                $('body').removeClass('big');
            }else{
                if($('body').hasClass('biggest')){
                    $('body').removeClass('biggest');
                }else{
                    $('body').addClass('big');
                }
            }
        })
    },

    sliderBox : {
        steps : 0,
        init:function(){
            if($('.slide-box').size()!=0){
                $('.slide-box').each(function(i,e){
                    tcom14.sliderBox.steps = $(e).find('.column').size();
                    prev = $('<div class="prev"></div>').css('opacity','.3');
                    text = $('<span class="this">1</span>/<span class="all">'+tcom14.sliderBox.steps+'</span>');
                    next = $('<div class="next"></div>');
                    navi = $('<div class="navi"></div>');

                    perCentStep = 100/tcom14.sliderBox.steps;

                    next.bind('click', function(){
                        thisStep = $(this).parent().children('.this');
                        nextN = Number(thisStep.html())+1;
                        //stepNext = (Number(thisStep.html()))*100;

                        stepNext = (Number(thisStep.html()))*perCentStep;
                        if(Number(thisStep.html())<tcom14.sliderBox.steps){
                            $(this).parent().prev('.box-white').css("transform","translateX(-"+stepNext+"%)");
                            thisStep.html(nextN)
                            if(nextN==tcom14.sliderBox.steps){
                                $(this).css('opacity','0.3');
                            }
                            prev.css('opacity','1');
                        }
                    });

                    prev.bind('click', function(){
                        thisStep = $(this).parent().children('.this');
                        stepPrev = (Number(thisStep.html())-2)*perCentStep;
                        prevN = Number(thisStep.html())-1;
                        if(Number(thisStep.html())>1){
                            $(this).parent().prev('.box-white').css("transform","translateX(-"+stepPrev+"%)");
                            thisStep.html(prevN);
                            if(prevN==1){
                                $(this).css('opacity','0.3');
                            }
                            next.css('opacity','1');
                        }
                    });

                    $(navi).append(prev);
                    $(navi).append(text);
                    $(navi).append(next);
                    $(e).children('.cont').append(navi);
                });
            }
        }

    },

    suggestion : function(){
        if($("#biglietti_fromNew").size()!=0 || $("#biglietti_toNew").size()!=0 || $('#AbdepartureStation').size()!= 0 || $('#AbarrivalStation').size()!= 0 || $('#departureStationCarnet').size()!= 0 || $('#arrivalStationCarnet').size()!= 0 || $('.suggestion').size!=0){

            $.getJSON( _cfg.stations, function(data){
                evidence = new Array();
                $.each(data, function(key, value){
                    $.each(value, function(key, value){
                        tcom14.allTrain.push(key);
                        if(value.isF==1){ tcom14.frecce.push(key); }
                        if(value.isE==1){ evidence.push(key); }
                    });
                });


                $("#biglietti_fromNew, #biglietti_toNew, #AbdepartureStation, #AbarrivalStation, #departureStationCarnet, #arrivalStationCarnet, .suggestion").each ( function (i,e) {

                    $(e).autocomplete({
                        autoFocus: true,
                        minLength: 2,
                        source: function(request, response){
                            /* seleziono lista treni frecce/tutti */
                            repItems = ($('input[name=selectedTrainType]').val()=="frecce")? tcom14.frecce : tcom14.allTrain;

                            /*
                             * Prima prendo quelli che cominciano con la query
                             * Poi aggiungo quelli che la contengono ma non all'inizio
                             */
                            var res_starts = $.map( repItems, function(tag) {
                                if ( tag.toUpperCase().indexOf(request.term.toUpperCase()) == 0 ) {
                                    return tag;
                                }
                            });
                            var res_contains = $.map( repItems, function(tag) {
                                if ( tag.toUpperCase().indexOf(request.term.toUpperCase()) > 0 ) {
                                    return tag;
                                }
                            });
                            var res = $.merge( res_starts, res_contains );
                            response( res );
                        }
                    }).data('ui-autocomplete')._renderItem = function( ul, item ) {

                            if($.inArray(item.label, evidence)!=-1){
                                return $('<li>').data('ui-autocomplete-item', item ).append( "<a class='evidence'>" + item.label + "</a>" ).appendTo( ul );
                            }else{
                                return $('<li>').data( "ui-autocomplete-item", item ).append( "<a>" + item.label + "</a>" ).appendTo( ul );
                            }

                    };

                });

            });

        }
    },
/*
    captions : function(){
        $('img','.thumb').each(function(i,e){
            if($(e).next('span').size()==0){
                $("<img/>")
                    .attr("src", $(e).attr("src"))
                    .load(function() {
                        if($(this).attr('alt')!=''){
                            imgw = this.width-10;
                            span = $('<span>' + $(e).attr('alt') + '</span>');
                            span.insertAfter(e);
                            span.css('width', imgw);
                        }
                    });
            }else{
                $(e).next('span').width($(e).width()-10);
            }

        });
    },
*/
    checkUrlForm : function(e){
        if($('input[name="url_mobile"]',e).size()>0 && $('input[name="url_desktop"]',e).size()>0 ){
            if($(window).width()<700){
                $(e).attr('action',$('input[name="url_mobile"]',e).val());
            }else{
                $(e).attr('action',$('input[name="url_desktop"]',e).val());
            }
        }
    },

    checkForm : function(e){
        tcom14.checkUrlForm(e);

        var stat_from = $('#biglietti_fromNew');
        var stat_to = $('#biglietti_toNew');

        // Se campo vuoto
        if(stat_from.val()=='' && stat_to.val()==''){
            alert(tcom14._label.msg1);
            return false;
        }else if(stat_from.val()==''){
            alert(tcom14._label.msg2);
            return false;
        }else if(stat_to.val()==''){
            alert(tcom14._label.msg3);
            return false;
        }
		
		//Controllo se la data di partenza Ã¨ inserita e se il formato Ã¨ corretto
		var delim1 = '-';
		var delim2 = '-';
		var expr = new RegExp("^(\\d{2})[" + delim1 + "](\\d{2})[" + delim2 + "](\\d{4})$");		
			
		
		if($('#biglietti_data_p').val() == ''){
		alert(tcom14._label.msg7);
		return false;
		torna = false;		
	}
	else{
		if(!expr.exec($('#biglietti_data_p').val())) {
			alert(tcom14._label.msg8);
			return false;
			torna=false;
		}
	}
	//Controllo che il campo data di ritorno si acompilato nel caso in cui ho fatto chek su andata e ritorno
	if ( $("[name=isRoundTrip]:checked").val () == "true" ){
		if($('#biglietti_data_a').val() == ''){
			alert(tcom14._label.msg9);
			return false;
			torna = false;	
		}
		else{
			if(!expr.exec($('#biglietti_data_a').val())){
				alert(tcom14._label.msg10);
				return false;
				torna=false;
			}
		}		
	}
	//Se andata e ritorno controllo che nello stesso giorno la data di ritorno dia maggiore di quella di partenza 
	if ( $("[name=isRoundTrip]:checked").val () == "true" ){	
		var partenza = $('#biglietti_data_p').val();		
		var ritorno = $('#biglietti_data_a').val();	
		var partenzaH = $('#biglietti_ora_p').val();	
		var ritornoH = $('#biglietti_ora_a').val();		
		 if (partenza==ritorno && ritornoH-partenzaH<=0) {
			 alert(tcom14._label.msg18);
						return false;
			}
	}		
	//controllo che data inserita per partenza non sia minore di data odierna (msg15)
	if($('#biglietti_data_p').length > 0){
		if($('#biglietti_data_p').val() != ''){
			var datainserimento= $('#biglietti_data_p').val();
			var dataritorno = $('#biglietti_data_a').val();
			var oggi = new Date();
			var giorno = oggi.getDate();
			var mese = oggi.getMonth() + 1;
			var anno = oggi.getFullYear();
			
			
			//controllo formato del mese
			if (mese < 10) {mese = "0" + mese;}
			// controllo il formato del giorno
			if (giorno < 10) {giorno = "0" + giorno;}
			
			var datacompleta = anno.toString() +  mese.toString() + giorno.toString();
			
			var giornoOggi = datainserimento.substring(0, 2);
			var meseOggi = datainserimento.substring(3, 5);
			var annoOggi = datainserimento.substring(6, 10);
			
			var giornoRitorno = dataritorno.substring(0, 2);
			var meseRitorno = dataritorno.substring(3, 5);
			var annoRitorno = dataritorno.substring(6, 10);
					
		var dataOdierna = annoOggi + meseOggi + giornoOggi ;
		var dataRitorno = annoRitorno + meseRitorno + giornoRitorno;
		var dataOdiernaES = giornoOggi +"/"+ meseOggi +"/"+  annoOggi;
		var dataRitornoES = giornoRitorno +"/"+ meseRitorno +"/"+  annoRitorno;
		 //Controllo che la data sia corretta cioÃ¨ il mese < 12 e il giono giusto
		  var espressione = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
	
		  if (!espressione.test(dataOdiernaES))  {
				alert(tcom14._label.msg13);
				return false;
				torna = false;	
		  } else {
			
			anno = parseInt(dataOdiernaES.substr(6),10);
			mese = parseInt(dataOdiernaES.substr(3, 2),10);
			giorno = parseInt(dataOdiernaES.substr(0, 2),10);
			var data=new Date(anno, mese-1, giorno);
		 
			if (data.getFullYear()==anno && 
				  data.getMonth()+1==mese && 
				  data.getDate()==giorno){
			 
			} else {
				alert(tcom14._label.msg13);
				return false;
				torna = false;	
			}
		  }
		  
		if ( $("[name=isRoundTrip]:checked").val () == "true" ){	
			 if (!espressione.test(dataRitornoES))  {
				alert(tcom14._label.msg13);
				return false;
				torna = false;	
		  } else {
			
			anno = parseInt(dataRitornoES.substr(6),10);
			mese = parseInt(dataRitornoES.substr(3, 2),10);
			giorno = parseInt(dataRitornoES.substr(0, 2),10);
			var data=new Date(anno, mese-1, giorno);
		 
			if (data.getFullYear()==anno && 
				  data.getMonth()+1==mese && 
				  data.getDate()==giorno){
				  
			} else {
				alert(tcom14._label.msg13);
				return false;
				torna = false;	
			}
		  }
			
		}
		if (dataOdierna-datacompleta<0) {
         	alert(tcom14._label.msg13);
			return false;
		torna = false;	
        }
		if ( $("[name=isRoundTrip]:checked").val () == "true" ){	
			 if (dataRitorno-dataOdierna<0) {
     		    	alert(tcom14._label.msg15);
					return false;
				torna = false;	
        }
		}
	}
}
		
		
		
		
		//Controllo sui passeggeri
		var numAdulti = Number ($('[name=noOfAdults]').val());
		var numRag = Number ($('[name=noOfChildren]').val());
		var totNum = numAdulti + numRag;
		
		if(totNum>5){
			alert(tcom14._label.msg6);
			return false;
		}else if(totNum == 0){
			alert(tcom14._label.msg12);
			return false;
		}
        /* eseguo replace input */
        newFrom = tcom14.replaceText(stat_from);
        newTo = tcom14.replaceText(stat_to);

        /* seleziono dove cercare le cittÃƒ  */
        if($('input[name=selectedTrainType]').val()=="frecce"){
            listTrain = tcom14.frecce;
        }else{
            listTrain = tcom14.allTrain;
        }

        /* converto l'array in UPPERCASE */
        listTrain = $.map(listTrain, function(item, index) {
         //  return item.toUpperCase();
			/*Ho tolto la funzione di UPPERCASE* 06/03/2015/*/
			return item;
        });

        if($.inArray(newFrom,listTrain) == -1 && $.inArray(newFrom, _cfg.frAllStaz) ==  -1){
			//XXX fix 12-02-2015 msg specifico in base al flag frecce o tutti i treni
			if($('input[name=selectedTrainType]').val()=="frecce"){
				alert(tcom14._label.msg16);
			}else{
				alert(tcom14._label.msg19);
			}
            return false;
        }else{
            stat_from.val(newFrom)
        }

        if($.inArray(newTo,listTrain) == -1 && $.inArray(newTo, _cfg.frAllStaz) ==  -1){
			//XXX fix 12-02-2015 msg specifico in base al flag frecce o tutti i treni
			if($('input[name=selectedTrainType]').val()=="frecce"){
				alert(tcom14._label.msg17);
			}else{
				alert(tcom14._label.msg20);
			}
            return false;
        }else{
            stat_to.val(newTo);
        }
		
		//Controllo i campi cartaFreccia
		var actioForm = document.forms['formcruscotto'].action;
		var numeroCartaFreccia = "cartafreccia=" + $('#cartafreccia').val();
		var acrtionFormCARTA = actioForm +"&"+numeroCartaFreccia
		
		if($('#NCartafreccia').val()=='on'){
			if($('#cartafreccia').val()==''){
				alert("Devi inserire il codice cartafreccia");
				return false;
			}else if(!Number($('#cartafreccia').val())){
				alert("Il codice cartafreccia deve essere numerico");
				return false;
			}else{
				$("#formcruscotto").attr("action", acrtionFormCARTA);
			return true;
			}
		}
		
		/* SiteCatalyst search-tracking */
		try{
			setSCVarsForm('biglietti');
		} catch(e) {}
		
		/* Leonardo retargeting */
		try{
			// var myExtraParams = "&citta_partenza="+$('#biglietti_fromNew').val()+"&citta_arrivo="+$('#biglietti_toNew').val();			
			var myExtraParams = "&citta_partenza="+newFrom+"&citta_arrivo="+newTo;
			mmConversionTag(816724, ($('#formcruscotto').find(':submit')).get(0), undefined, undefined, myExtraParams);
			// console.debug("*** mmConversionTag invocato, myExtraParams=["+myExtraParams+"] ***");
		} catch(e) {}
		
    },

    replaceText : function(e){
        n = $(e).val();
       
        if($.inArray(n,_cfg.notReplaceSAN)== -1){
     		if(n.split("",4)== 'S,a,n, '){ n = n.replace("San ","S. "); }
			/*Controllo che dopo s. non ci si a giÃ  lo spazio*/
			if(n.split("",3)!= 'S,., '){
				if(n.split("",2)== 'S,.'){ n = n.replace("S.","S. "); }
				if(n.split("",2)== 's,.'){ n = n.replace("S.","S. "); }
			}
		}
		if($.inArray(n,_cfg.notReplaceS) >= 0){
			if(n.split("",4)== 'S,a,n, '){ n = n.replace("San ","S."); }
			if(n.split("",3)== 'S,., '){ n = n.replace("S. ","S."); }
			if(n.split("",3)== 's,., '){ n = n.replace("S. ","S."); }
			
		}
        $.each(_cfg.repName, function(i,e){
            if(i==n){ n = e; }
        });
        return n;
    },


    tabHeadCruscotto : function(){
        $('.nav-tabs > li > a').click(function(e){
            e.preventDefault();

            //ottengo selettore che mostra contenuto di default
            var active_tab_selector = $('.nav-tabs > li.active > a').attr('href');

            //trova tab attivato  e rimuovi acitve
            var actived_nav = $('.nav-tabs > li.active');
            actived_nav.removeClass('active');

            //aggiungo acitve nell li attivato
            $(this).parents('li').addClass('active');

            //nascondi contenuto tab
            $(active_tab_selector).removeClass('active');
            $(active_tab_selector).addClass('hide');

            //mostra contenuto tab
            var target_tab_selector = $(this).attr('href');
            $(target_tab_selector).removeClass('hide');
            $(target_tab_selector).addClass('active');
        });
    },

    posCruscotto : function(){
        myelem = $('.cruscotto:eq(0)');
        if($(window).width()>700 && myelem.size()>0){
            if(myelem.parent().hasClass('right')){
                posLeft  =  ($('ul.nav').offset().left + $('ul.nav').width())+25 -  $('.wrapper').offset().left;
            }else{
                posLeft  = ($('ul.nav').offset().left - (350 + $('.wrapper').offset().left));
            }
            posLeft = (posLeft==0) ? '.5em': posLeft;
            myelem.css('left',posLeft);
        }else{
            myelem.css('left','0');
        }
    },

    tabHeadNews : function(){
        $('.resp-tabs-list > li > div.tabNews > div.tabNewsChild > div.testoNews > a').click(function(e){
            e.preventDefault();

            //ottengo selettore che mostra contenuto di default
            var active_tab_selector = $('.resp-tabs-list > li.active > div.tabNews > div.tabNewsChild > div.testoNews > a').attr('href');

            //trova tab attivato  e rimuovi acitve
            var actived_nav = $('.resp-tabs-list > li.active');
            actived_nav.removeClass('active');

            //aggiungo acitve nell li attivato
            $(this).parents().eq(3).addClass('active');

            //nascondi contenuto tab
            $(active_tab_selector).removeClass('active');
            $(active_tab_selector).addClass('hide');

            //mostra contenuto tab
            var target_tab_selector = $(this).attr('href');
            $(target_tab_selector).removeClass('hide');
            $(target_tab_selector).addClass('active');
        });
    },

    accordion : function(){
		$('ul#accordionGeneric .boxAcc').append('<div class="cl"></div>');
        $('ul#accordionGeneric a.heading').click(function(e) {
            e.preventDefault();
            if($(this).parent().hasClass('current')) {
                $(this).siblings('div').slideUp(400,function() {
                    $(this).parent().removeClass('current');
                });
            } else {
				/*
                $('ul#accordionGeneric li.current div').slideUp('slow', 'cool', function() {
                    $(this).parent().removeClass('current');
                });                
				*/
                $(this).siblings('div').find(':hidden').show();
                $(this).siblings('div').slideToggle(400, 'cool', function() {
                    $(this).parent().toggleClass('current');
                });
            }
			setTimeout("$('.wrapBody').css('height', $('.elemLeft').outerHeight()+160)", 500);
			setTimeout("$('.wrapBody').css('height', $('.elemLeft').outerHeight()+160)", 2100);
            return false;
        });
    },

		    openAreaRis : function(){
		if($(window).width()<=tcom14.mSize){
			
			$(".wrapBotAreaRis a").toggleClass('m');				
		
			$('#btnArea').click(function(e){ 
				e.preventDefault();							
				$(location).attr('href','https://www.lefrecce.it/msite/#login');						
			});
			$('#btnGestisci').click(function(e){ 
				e.preventDefault();							
				$(location).attr('href','Area gestisci per mobile');						
			});
		}else{
			$('#btnArea').click(function(e){
				e.preventDefault();
				$(':text').val('');
				tcom14.addPlaceHolder();
				if( $(".wrapBotGestBigl a.up").length > 0){
					$( "#GestisciArea" ).slideToggle(400, 'cool', function(){
					$(".wrapBotGestBigl a").toggleClass('up');
					$("#hoPNR").prop('checked', true);
					document.getElementById("contentArea1Big").style.display = "block";
					document.getElementById("contentArea2Big").style.display = "none";
				});
				}
				if( $(".wrapBotAreaRis a.up").length > 0){
					$("#loginArea").slideToggle(400, 'cool', function(){
					$(".wrapBotAreaRis a").toggleClass('up');
					$("#btnGestisci" ).height('3.7em');
				});
				}else{
					$( "#loginArea" ).slideToggle(400, 'cool');
					$(".wrapBotAreaRis a").toggleClass('up');
					$("#btnGestisci" ).height('3.6em');
				}
			 });	
			$('#btnGestisci').click(function(e){
				e.preventDefault();
				$(':text').val('');
				tcom14.addPlaceHolder();
				if( $(".wrapBotAreaRis a.up").length > 0){
					$("#loginArea").slideToggle(400, 'cool', function(){
					$(".wrapBotAreaRis a").toggleClass('up');
					
				});
				}
				if( $(".wrapBotGestBigl a.up").length > 0){
					$( "#GestisciArea" ).slideToggle(400, 'cool', function(){
					$(".wrapBotGestBigl a").toggleClass('up');
					$("#btnGestisci" ).height('3.7em');
					$("#hoPNR").prop('checked', true);
					document.getElementById("contentArea1Big").style.display = "block";
					document.getElementById("contentArea2Big").style.display = "none";
				
				});
				}else{
					$( "#GestisciArea" ).slideToggle(400, 'cool');
					$(".wrapBotGestBigl a").toggleClass('up');
					$("#btnGestisci" ).height('3.7em');
					$("#hoPNR").prop('checked', true);
					document.getElementById("contentArea1Big").style.display = "block";
					document.getElementById("contentArea2Big").style.display = "none";
				}
			 });				 
		}			
    },

   addPlaceHolder : function(){
        var active = document.activeElement;
        $(':text').focus(function () {
            if ($(this).attr('alt') != '' && $(this).val() == $(this).attr('alt')) {
            $(this).val('').removeClass('hasPlaceholder');
            }
        }).blur(function () {
            if ($(this).attr('alt') != '' && ($(this).val() == '' || $(this).val() == $(this).attr('alt'))) {
            $(this).val($(this).attr('alt')).addClass('hasPlaceholder');
            }
        });

        $(':password').focus(function () {
            if ($(this).attr('alt') != '' && $(this).val() == $(this).attr('alt')) {
                $(this).val('').removeClass('hasPlaceholder');
            }
        }).blur(function () {
            if ($(this).attr('alt') != '' && ($(this).val() == '' || $(this).val() == $(this).attr('alt'))) {
                $(this).val($(this).attr('alt')).addClass('hasPlaceholder');
            }
        });


        $(':text').blur();
        $(':password').blur();
        $(active).focus();
        $('form:eq(0)').submit(function () {
            $(':text.hasPlaceholder').val('');
        });
    },

    wall : {
        pos : 0,
        init : function(){
            $('.wall').each(function(i,e){

                var thispos = 0;

                var nItem = $('li', e).size();
                var wUL;
                var nToView;

                if( $(e).hasClass('full')){
                    wUL = Number(100*nItem)+'%';
                    nToView = 1;
                }
                if($(e).hasClass('two')){
                    wUL = Number(50*nItem)+'%';
                    nToView = 2;
                }
                if($(e).hasClass('three')){
                    wUL = Number(33.333333*nItem)+'%';
                    nToView = 3;
                }
                if($(e).hasClass('four')){
                    wUL = Number(25*nItem)+'%';
                    nToView = 4;
                }

                $('ul',e).width(wUL);

                var nWli = Math.floor(Number(100/Number(nItem))*10000)/10000;

                $('li',e).each(function(ii,ee){
                    $(ee).width(nWli+'%');
                    if(!$('html').hasClass('no-mq')){
                        $('img',ee).attr({ "data-mobile": $('img',ee).attr('src') });
                        var mySRC = ($(window).width()<=tcom14.mSize)? $('img',ee).attr('data-mobile') : $('img',ee).attr('usemap');
                        $('img',ee).attr('src',mySRC);
                    }else{
                        $('img',ee).attr({ "src": $('img',ee).attr('usemap') });
                    }

                    $(ee).find('button:eq(0)').click(function(ev){
                        ev.preventDefault();
                        window.location.href = $(this).parent('.text').prev('a.link').attr('href');
                    });

                });

                prevWall = $('<div class="prev"></div>').click(function(){
                    if(thispos>=1){
                        thispos = thispos-1;
                        var newPos = thispos*nWli;
                        var nPer = Number(thispos*100)/nToView;
                        if(!Modernizr.cssanimations){
                            $(this).parent('.cont').find('ul:eq(0)').animate({'left':'-'+nPer+'%'},500,'cool');
                        }else{
                            $(this).parent('.cont').find('ul:eq(0)').css("transform","translateX(-"+newPos+"%)");
                        }
                    }
                });

                nextWall = $('<div class="next"></div>').click(function(){
                    var maxPos = nItem-nToView;
                    if((thispos+1)<nItem && nItem>nToView && thispos<maxPos){
                        thispos = thispos+1;
                        var newPos = thispos*nWli;
                        var nPer = Number(thispos*100)/nToView;
                        if(!Modernizr.cssanimations){
                            $(this).parent('.cont').find('ul:eq(0)').animate({'left':'-'+nPer+'%'},500,'cool');
                        }else{
                            $(this).parent('.cont').find('ul:eq(0)').css("transform","translateX(-"+newPos+"%)");
                        }
                    }
                });

                $('.cont', e)
                    .append(prevWall)
                    .append(nextWall);
            });
        },
        resize : function(){
            if(!$('html').hasClass('no-mq')){
                /* non faccio reload img se non supporto MQ */
                $('img','.wall > .cont > ul > li').each(function(i,e){
                    var mySRC = ($(window).width()<=tcom14.mSize)? $(e).attr('data-mobile') : $(e).attr('usemap');
                    $(e).attr('src',mySRC);
                });
            }

        }
    },

    tabHeadFrecceTreni : function(){
        $('#boxFrecce').click(function(e){
            e.preventDefault();
            $('#boxTuttiTreni, #boxFrecce').removeClass('buttonTreniOn');
            $('#boxFrecce').addClass('buttonTreniOn');
            $('input[name=selectedTrainType]').val('frecce');
            $(".biglietti_prezzo").css('opacity',1);
            $('#biglietti_fromNew, #biglietti_toNew').val('');
        });

        $('#boxTuttiTreni').click(function(e){
            e.preventDefault();
            $('#boxFrecce, #boxTuttiTreni').removeClass('buttonTreniOn');
            $('#boxTuttiTreni').addClass('buttonTreniOn');
            $('input[name=selectedTrainType]').val('all');
            $('#biglietti_prezzo').removeAttr('checked');
            $('.biglietti_prezzo').css('opacity',0);
            $('#biglietti_fromNew, #biglietti_toNew').val('');
        });

        $('#boxAbb').click(function(e){
            e.preventDefault();
            $('input[name=selectedTrainType]').val('all');
        });

        $('#boxCarnet').click(function(e){
            e.preventDefault();
            $('input[name=selectedTrainType]').val('all');
        });

    },

    calendari : function(){

        if ($('#formcruscotto').size()!=0){

            $("#biglietti_data_p").datepicker({
                //buttonImage: 		_cfg.calImg,
                buttonImageOnly: 	false,
                firstDay:			_cfg.firstDayCalendar,
                monthNames: 		_labels.it.monthNames,
                dayNamesMin: 		_labels.it.dayNamesMin,
                dayNames: 			_labels.it.dayNames,
                showOn: 			"focus",
                buttonText: 		_labels.it.buttonCal,
                dateFormat: 		"dd-mm-yy",
                minDate: 			0,
                changeMonth: 		false,
                numberOfMonths: 	1,
                onClose: function(dateText, inst){ $(this).attr("disabled", false); },
                beforeShow: function(input, inst){ $(this).attr("disabled", true); },
                onSelect: function( selectedDate ) {
                    if( tcom14._roundTripInternal == "true"){
                        $('#biglietti_data_a').datepicker( "option", "minDate", selectedDate );
                    }
                    datePart = selectedDate;
                }
            }).css ("z-index", 10000000000000000);

        }
        //chiuso IF
        if ($('#formcruscottoEN').size()!=0){
            $("#biglietti_data_p" ).datepicker({
                buttonImage: 		_cfg.calImg,
                buttonImageOnly: 	true,
                firstDay:			_cfg.firstDayCalendar,
                monthNames: 		_labels.en.monthNames,
                dayNamesMin: 		_labels.en.dayNamesMin,
                dayNames: 			_labels.en.dayNames,
                showOn: 			"button",
                buttonText: 		_labels.en.buttonCal,
                dateFormat: 		"dd-mm-yy",
                minDate: 			0,
                changeMonth: 		false,
                numberOfMonths: 	1,
                onClose: function(dateText, inst){ $(this).attr("disabled", false); },
                beforeShow: function(input, inst){ $(this).attr("disabled", true); },
                onSelect: function( selectedDate ) {
                    if( tcom14._roundTripInternal == "true"){
                        $('#biglietti_data_a').datepicker( "option", "minDate", selectedDate );
                    }
                    datePart = selectedDate;
                }
            }).css ("z-index", 10000000000000000);

        }
        $('#biglietti_ar').click(function(){
            $('#biglietti_data_a').datepicker( "option", "minDate", $('#biglietti_data_p').val() );
            $("#biglietti_data_p" ).datepicker ("setDate", $("#biglietti_data_p" ).datepicker("getDate") )
            instance = $("#biglietti_data_a" ).data( "datepicker" ),
                date = $.datepicker.parseDate( instance.settings.dateFormat || $.datepicker._defaults.dateFormat, $("[name=departureDate]").val(), instance.settings );
        });


        if ($('#formcruscotto').size()!=0){
            $("#biglietti_data_a" ).datepicker({
               // buttonImage: 		_cfg.calImg,
                buttonImageOnly: 	false,
                firstDay:			_cfg.firstDayCalendar,
                monthNames: 		_labels.it.monthNames,
                dayNamesMin: 		_labels.it.dayNamesMin,
                dayNames: 			_labels.it.dayNames,
                showOn: 			"focus",
                buttonText: 		_labels.it.buttonCal,
                dateFormat: 		"dd-mm-yy",
                minDate: 			0,
                changeMonth: 		false,
                numberOfMonths: 	1,
                onClose: function(dateText, inst){ $(this).attr("disabled", false); },
                beforeShow: function(input, inst){ $(this).attr("disabled", true); }
            }).css ("z-index", 10000000000000000);
        }


        if ($('#formcruscottoEN').size()!=0){
            $("#biglietti_data_a" ).datepicker({
                buttonImage: 		_cfg.calImg,
                buttonImageOnly: 	true,
                firstDay:			_cfg.firstDayCalendar,
                monthNames: 		_labels.en.monthNames,
                dayNamesMin: 		_labels.en.dayNamesMin,
                dayNames: 			_labels.en.dayNames,
                showOn: 			"button",
                buttonText: 		_labels.en.buttonCal,
                dateFormat: 		"dd-mm-yy",
                minDate: 			0,
                changeMonth: 		false,
                numberOfMonths: 	1,
                onClose: function(dateText, inst){ $(this).attr("disabled", false); },
                beforeShow: function(input, inst){ $(this).attr("disabled", true); }
            }).css ("z-index", 10000000000000000);
        }

        if($(window).width()>tcom14.mSize){
            $( "#biglietti_data_a" ).datepicker( "option", "numberOfMonths", 2 );
        }else{
            $( "#biglietti_data_a" ).datepicker( "option", "numberOfMonths", 1 );
        }


        $("input,select,textarea,a").filter (".trigger").each ( function () {
            if ( $(this).hasClass ("empty-on-click") )
                $(this).click ( function () {
                    $(this).val ("");
                });
            if ( $(this).hasClass ("read-only") )
                $(this).attr ("readonly", "readonly");

            if ($(this).hasClass("calendar")) {
                if($(this).attr('id')!="biglietti_data_p" && $(this).attr('id')!="biglietti_data_a"){
                    $(this).datepicker({
                        //buttonImage: 		_cfg.calImg,
                        buttonImageOnly: 	false,
                        showOn: 			"focus",
                        buttonText: 		_labels.it.buttonCal,
                        firstDay:           _cfg.firstDayCalendar,
                        monthNames: 		_labels.it.monthNames,
                        dayNamesMin: 		_labels.it.dayNamesMin,
                        dayNames: 			_labels.it.dayNames,
                        dateFormat: 		"dd-mm-yy",
                        onClose: function(dateText, inst){ $(this).attr("disabled", false); },
                        beforeShow: function(input, inst){ $(this).attr("disabled", true); }
                    }).css("z-index", 10000000000000000);
                }
            }

            if ( $("[name=isRoundTrip]:checked").val() == "false" ){
                $("[name=returnDate]").val("").datepicker ("disable");
            }
        });

        $("form[name=biglietti]").submit ( function () {
            return tcom14.validate ();
        });

    },

    validate: function ()
    {
        var error = 0;
        if ( $("[name=departureStation]").val() == "" && $("[name=arrivalStation]").val() == "")
            error = 1;
        else if ( $("[name=departureStation]").val() == "")
            error = 2;
        else if ( $("[name=arrivalStation]").val() == "")
            error = 3;
        else if ( $("[name=departureDate]").datepicker ("getDate") > $("[name=returnDate]").datepicker ("getDate"))
            error = 13;

        if ( error > 0 ){
            //tcom14.messages ( error );
        }
        return (error > 0) ? false : true;
    },

    //imposto altezza MINIMA del wrapBody se ÃƒÂ¨ visibile la spalle ed ÃƒÂ¨ piÃƒÂ¹ lunga
    heightSpallaDx: function(){
        minH = ($('.wrapBody').height()<=$('#spallaDx').height() && $('#spallaDx').is(':visible')) ? $('#spallaDx').height() : '0' ;
        $('.wrapBody').css('min-height',minH);
    },

    start: function(){
        var thetime=new Date();
        var nhours=thetime.getHours();
        var gg = thetime.getDate();
        var mm = thetime.getMonth()
        mm++;
        if (String(nhours).length==1) nhours = '0'+nhours;
        if (String(gg).length==1) gg = '0'+gg;
        if (String(mm).length==1) mm = '0'+mm;
        var DataAttuale = gg+'-'+ mm +'-'+ thetime.getFullYear();

        $("#biglietti_ora_p").val(nhours);
        $("#biglietti_ora_a").val(nhours);
        $("#biglietti_data_p").val(DataAttuale);
        $("#biglietti_data_a").val(DataAttuale);


        $("#biglietti_ora_a").attr("disabled", "disabled");
		if ($("[name=returnDate]").datepicker().val()!=null){
			$("#biglietti_ora_a").removeAttr("disabled");
		}
        $("[name=isRoundTrip]").click ( function () {
            tcom14._roundTripInternal = $("[name=isRoundTrip]:checked").val ();
            if ( $("[name=isRoundTrip]:checked").val () == "true" ) {
                $("[name=returnDate]").datepicker ("enable");
                $("#biglietti_ora_a").removeAttr("disabled");

            }			else {
                $("[name=returnDate]").val("").datepicker ("disable");
                $("#biglietti_ora_a").removeAttr("enable");
                $("#biglietti_ora_a").attr("disabled", "disabled");
                $("#biglietti_data_a").val(DataAttuale);
            }
        });

        var torna = true;


        if($('#biglietti_from').val()=='' && $('#biglietti_to').val()==''){
            alert(tcom14._label.msg1);
            return false;
            torna=false;
        }else if($('#biglietti_from').val()==''){
            alert(tcom14._label.msg2);
            return false;
            torna=false;
        }else if($('#biglietti_to').val()==''){
            alert(tcom14._label.msg3);
            return false;
            torna=false;
        }else{
            torna=true;
        }
    },
    scambioDest : function(){
        if($('#biglietti_fromNew').val()!='' && $('#biglietti_toNew').val()!=''){
            var partenzaFR = $('#biglietti_fromNew').val();
            var destinazioneFR = $('#biglietti_toNew').val();
            $('#biglietti_fromNew').val(destinazioneFR);
            $('#biglietti_toNew').val(partenzaFR);
        }
    },

    scambioDestCarnet : function(){
        if($('#departureStationCarnet').val()!='' && $('#arrivalStationCarnet').val()!=''){
            var partenzaFR = $('#departureStationCarnet').val();
            var destinazioneFR = $('#arrivalStationCarnet').val();
            $('#departureStationCarnet').val(destinazioneFR);
            $('#arrivalStationCarnet').val(partenzaFR);
        }
    },

    SelCarnet : function(id){
		if (id=='acquistoCarnet'){
			$('#AcquistoCarnet').css("display","block")
			$('#PrenotaCarnet').css("display","none")
		}else{		
			$('#PrenotaCarnet').css("display","block")
			$('#AcquistoCarnet').css("display","none")
		}
	},

    InvioCarnet : function(e){
        tcom14.checkUrlForm(e);

        //Scelgo lingua
        _label = (tcom14.lang=='en') ?_labels.en : _labels.it;
        var departureStation  = $("#departureStationCarnet").val();
        var arrivalStation  = $("#arrivalStationCarnet").val();
        var typology  = $("#typology").val();
        var departureDate   = $("#cal_id_3").val();

        if(departureStation == null || departureStation == "" ){
            alert(tcom14._label.msg21);
            return false;
        }

        if(arrivalStation == null || arrivalStation == "" ){
            alert(tcom14._label.msg22);
            return false;
        }
    },

    setDateCarnet : function(){
        if($('#calenderId1').size() > 0){
            var oggi = new Date();
            oggi.setDate(oggi.getDate());
            var giorno = oggi.getDate();
            var mese = oggi.getMonth() + 1;
            var anno = oggi.getFullYear();

            if (giorno < 10){giorno = '0' + giorno;}
            if (mese < 10){mese = '0' + mese;}
            var DataOggi = giorno + '-' + mese + '-' + anno;

            $('#calenderId1').val(DataOggi);
        }
    },

    setActionRicAv : function(){
        $('#AbbRicAv').click(function(e){
            e.preventDefault();
            $('#createSubscriptionForm').attr('action',_cfg.advSearch);
            $('#createSubscriptionForm').submit();
        });
    },

	setChangeTicketUrlMobile : function(){
		if($(window).width()<=tcom14.mSize){
				if($('.ricercaAv').attr('href').indexOf('lang=it')>0){
					$("a#MODBIG").attr('href','https://www.lefrecce.it/msite/#modificaBiglietto');
					$('.ricercaAv').text("Ricerca desktop");
				}
				else if($('.ricercaAv').attr('href').indexOf('lang=en')>0){
					$("a#MODBIG-EN").attr('href','https://www.lefrecce.it/msite/?lang=en#modificaBiglietto');
					$('.ricercaAv').text("Desktop search");
				}
				else if($('.ricercaAv').attr('href').indexOf('lang=de')>0){
					//$("a#MODBIG-EN").attr('href','https://www.lefrecce.it/msite/?lang=de#modificaBiglietto');
					$('.ricercaAv').text("Desktop suchen");
				}
				else if($('.ricercaAv').attr('href').indexOf('lang=fr')>0){
					//$("a#MODBIG-EN").attr('href','https://www.lefrecce.it/msite/?lang=fr#modificaBiglietto');
					$('.ricercaAv').text("Desktop recherche");
				}
		}
    },
	
    setChiudiFooter : function() {

        $("a#alternatext").click(function(){
            $("div.contFooter").slideToggle(1000, 'cool');
            if($("a#alternatext").text() == tcom14._label.textLinkFooterClose+' X'){
                $("a#alternatext").fadeOut(400);
                setTimeout(function(){
                    $("a#alternatext").html(tcom14._label.textLinkFooterOpen+' <i class="ico-arrow-up"></i>');
                    $("a#alternatext").attr('title',tcom14._label.titleLinkFooterOpen);
                    $("a#alternatext").fadeIn(300);
				},400);
            } else {
                $("a#alternatext").fadeOut(400);
                setTimeout(function(){
                    $("a#alternatext").html(tcom14._label.textLinkFooterClose+' <b>X</b>');
                    $("a#alternatext").attr('title',tcom14._label.titleLinkFooterClose);
                    $("a#alternatext").fadeIn(300);
					//$('.footer').css('height', $('.boxFooterCont').css('height'));
				},400);
            }
        });
    },

    login : function(){
        $('#reserve-submit').click(function(){
            var NewVal = $("#pwd").val().toUpperCase();
            var NewPwd = $("#pwd").val(NewVal);
            $('#searchForm').submit();
        });
    },

    chooseLang : function(){
		/* menu selez lingua DESKTOP */
        $('#chooseLang').parent('li').css({'cursor':'pointer'}).bind('click',function(){
			 $('#langSet').slideToggle(300, 'cool'); $(this).toggleClass('up');
		});
		$('#chooseLang').click(function(e){ e.preventDefault(); });
		
		/* menu selez lingua SMARTPHONE */
		$('#chooseLangMobile').parent('div').css({'cursor':'pointer'}).bind('click',function(){
			$('#langSetMobile').slideToggle(300, 'cool'); $(this).toggleClass('up');
		});
		$('#chooseLangMobile').click(function(e){ e.preventDefault(); });
    },
	
    parseDate : function(){
        $("#dataInizio").val($("#dataInizio").val().replace(/-/g, "/"));
        $("#dataFine").val($("#dataFine").val().replace(/-/g, "/"));
    },

	/* fix spallaDx su Footer */
    fixElemLeftOuterHeight : function(){
		var eLeftH = $(".elemLeft").outerHeight();
		var eRightH = $(".elemRight").outerHeight();
		
		if((eLeftH!=null) && (eRightH!=null)){
			if(eLeftH<eRightH){
				$(".wrapBody").css("height", eRightH);
			}
		}
    },
	
	fixMouseOverMenuTablet : function(){
		try{
			var isTouchDev=(('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
			if(isTouchDev && ($(window).width()>700)){
				$.getScript('/cms-file/common/js/themes/trenitalia_2014/001/tcom-tablet-menufix.js');
			}
		}catch(e){}
	},
	
	fixDatePickerSmartPhone : function(){
		try{
			var isTouchDev=(('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)); 
			/* solo x test su dispositivi NON touch */ isTouchDev=true; /* poi commentare! */
			if(isTouchDev && ($(window).width()<700)){
				$.getScript('/cms-file/common/js/themes/trenitalia_2014/001/tcomFixDatePickerSmartPhone.js');
			}
		}catch(e){}
	},
	addLastTrainSearchListBox : function(){
		try{
			var pathSite=location.pathname;
			var isEnabled=( (pathSite.indexOf('/tcom-en')!=0) && (pathSite.indexOf('/tcom-de')!=0) && (pathSite.indexOf('/tcom-fr')!=0) );
			if(isEnabled && (navigator.cookieEnabled)){
				setTimeout(function(){ $.getScript('/cms-file/html/trenitalia2014/lastTrainSearchList.js'); }, 500);
			}
		}catch(e){}
	}
}

$(function(){
    tcom14.init();
});

$(window).resize(function(){
    tcom14.resize();
});
