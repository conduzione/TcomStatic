var meteoList = new Array();
meteoList[1] = 'meteo_1.gif';
meteoList[2] = 'meteo_2.gif';
meteoList[3] = 'meteo_3.gif';
meteoList[4] = 'meteo_4.gif';
meteoList[5] = 'meteo_5.gif';
meteoList[6] = 'meteo_6.gif';
meteoList[7] = 'meteo_7.gif';
meteoList[8] = 'meteo_8.gif';
meteoList[9] = 'meteo_9.gif';



function changeEmotional(Sbutton){
	if (Sbutton.className!='Sbutton on'){
		var buttons = Sbutton.parentNode;
		elenco_buttons = buttons.getElementsByTagName('div');
		for (var i=0;i<elenco_buttons.length;i++){
			if(elenco_buttons[i].className=='Sbutton on'){
				elenco_buttons[i].className='Sbutton';
			}
			else{
				if(elenco_buttons[i]==Sbutton){
					
					elenco_buttons[i].className='Sbutton on';
					var divInScroll = document.getElementById('scroll').getElementsByTagName('DIV');
					
					for (var j=0;j<divInScroll.length;j++){
						divInScroll[j].style.display='none';
						divInScroll[j].style.left='0px';
						if(j==i){
							divInScroll[j].style.display='block';
							
						}
					}
				
				}
			}
		}
	}
	clearTimeout(time);
}

var time='';
var attuale=0;
var accendi=1;
var delay=5000;
function rotateEmotional(){
	var emotional = document.getElementById('emotional');
	buttonsemotional = emotional.getElementsByTagName('div');
	for (k=0;k<buttonsemotional.length;k++){
		if(buttonsemotional[k].className=='buttons'){
			buttons=buttonsemotional[k];
		}
	}
	

	
	elenco_buttons = buttons.getElementsByTagName('div');
	for (var i=0;i<elenco_buttons.length;i++){
		if(elenco_buttons[i].className=='Sbutton on') attuale=i
	}
	
	accendi=attuale+1;
	if(accendi==elenco_buttons.length)accendi=0;
	/*if(accendi==3)accendi=0;*/
	attuale=accendi
	
	changeEmotional(elenco_buttons[accendi])

	timeEmotional();
}
function timeEmotional(){
	if (document.getElementById("emotional"))	time = setTimeout('rotateEmotional()',delay);
}


function accessibility(){
	if($('emotional')){
		 	$('emotional').style.overflow='hidden';
	}
	
}




function onload_function(){
	accessibility();	

	meteo.init();
	timeEmotional();
	mediagallery.init();
}


var meteo = {
 	init : function(){ 
 		if($('banner_meteo')){
			var xmlDoc = new Ajax.Request('/xml/meteo.xml', {
										  method: 'get',
										  onSuccess: function(ajax){
										  	this.xmlDoc = ajax.responseXML;
											var meteo_oggi = $('meteo_inner').getElementsByClassName('oggi')[0];
											var meteo_domani = $('meteo_inner').getElementsByClassName('domani')[0];  
											
										
											var meteo_oggi_xml=this.xmlDoc.getElementsByTagName('oggi')[0].getElementsByTagName('citta');
											var meteo_domani_xml=this.xmlDoc.getElementsByTagName('domani')[0].getElementsByTagName('citta');
											
											var max_width = (Math.ceil(meteo_oggi_xml.length/4))*145;
											$$('.meteo_inner_contenit')[0].style.width=max_width+'px';
											
											meteo_oggi.innerHTML='';
											meteo_domani.innerHTML='';
											
											
											meteo_oggi_inner='<div class="boxM">';
											
											for (var i=0;i<meteo_oggi_xml.length;i++){
												img_meteo = meteoList[meteo_oggi_xml[i].getElementsByTagName('simbolo')[0].firstChild.nodeValue];
												
												meteo_oggi_inner+='<div class="nome_citta">'+meteo_oggi_xml[i].getElementsByTagName('nome')[0].firstChild.nodeValue+'</div>'+
												'<div class="temperatura">'+meteo_oggi_xml[i].getElementsByTagName('temp')[0].firstChild.nodeValue+'&deg;</div>'+
												'<div class="icona"><img src="/cms-file/common/img/'+img_meteo+'" /></div>'+
												'<div class="clear"><br class="clear" /></div>';
												cont = i+1;
												if	((cont%4)==0){
													meteo_oggi_inner+='</div>'+
													'<div class="boxM">';
												}	
											}
											meteo_oggi_inner+='</div><div class="clear"><br class="clear" /></div>';
											meteo_oggi.innerHTML=meteo_oggi_inner;
											
											
											meteo_domani_inner='<div class="boxM">';
											
											for (var i=0;i<meteo_domani_xml.length;i++){
												img_meteo = meteoList[meteo_domani_xml[i].getElementsByTagName('simbolo')[0].firstChild.nodeValue];
												
												meteo_domani_inner+='<div class="nome_citta">'+meteo_domani_xml[i].getElementsByTagName('nome')[0].firstChild.nodeValue+'</div>'+
												'<div class="temperatura">'+meteo_domani_xml[i].getElementsByTagName('temp')[0].firstChild.nodeValue+'&deg;</div>'+
												'<div class="icona"><img src="/cms-file/common/img/'+img_meteo+'" /></div>'+
												'<div class="clear"><br class="clear" /></div>';
												cont = i+1;
												if	((cont%4)==0){
													meteo_domani_inner+='</div>'+
													'<div class="boxM">';
												}	
											}
											meteo_domani_inner+='<div class="clear"><br class="clear" /></div>';
											
											meteo_domani.innerHTML=meteo_domani_inner;
											
			}});
		}
 	},

	switchTab: function(el_li,direction){
		var el_li=el_li.parentNode;
		if(el_li.className.indexOf('on')==-1){
			var tabs = $('banner_meteo').getElementsByClassName('tabs')[0].getElementsByTagName('LI');
			for (var i=0;i<tabs.length;i++){
				if(tabs[i].className.indexOf('small')!=-1){
					tabs[i].className='small';
				}
				else{
					tabs[i].className='';	
				}
				
				if(tabs[i]==el_li){
					tabs[i].className+=' on';						
				}
			}
		}
		if(direction=='down'){
			$$('.meteo_inner_contenit')[0].style.top='-150px';
		}
		else{
			$$('.meteo_inner_contenit')[0].style.top='0px';
		}
	},
	
	showWeather: function(direction){
		var x_move = '-';
		if(direction=='left') var x_move = '+';
		
		var max_width = Number($$('.meteo_inner_contenit')[0].style.width.replace('px',''));
		var right_dist = Number($$('.meteo_inner_contenit')[0].style.left.replace('px',''))+290;
		
		var limite = (0-max_width)+290;
		
		if(	($$('.meteo_inner_contenit')[0].style.left=='' || $$('.meteo_inner_contenit')[0].style.left=='0px') && direction=='left'){
			//nothing
		}
		else if(direction=='right' && $$('.meteo_inner_contenit')[0].style.left.replace('px','')<limite){
			//nothing
		}
		else{
			new Effect.Move(
							$$('.meteo_inner_contenit')[0],{
							x:x_move+145,
							y:0,
							mode:'relative',
							duration:0.8,
							transition:Effect.Transitions.sinoidal
											}
						)
		}
	}
}


var mediagallery = {
 init : function(){ 
	if($$('.mediagallery')!=''){
		$$('.mediagallery')[0].style.overflow='hidden';
		
		this.numThumb = $('mediagallery_scroll').getElementsByClassName('thumb').length;
		this.mediagallery_scroll_width = this.numThumb*$('mediagallery_scroll').getElementsByClassName('thumb')[0].getWidth()+this.numThumb*5;
		$('mediagallery_scroll').style.width=this.mediagallery_scroll_width+'px';
	}
 },
 
 scrollMedia :function(direction){
		var x_move = '-';
		if(direction=='left') var x_move = '+';
		
	
		var max_width = this.mediagallery_scroll_width;
		var limite = (0-max_width)+260;
		
		
		if(	($('mediagallery_scroll').style.left=='' || $('mediagallery_scroll').style.left=='0px') && direction=='left'){
			//nothing
		}
		else if(direction=='right' && $('mediagallery_scroll').style.left.replace('px','')<limite){
			//nothing
		}
		else{
			new Effect.Move(
							$('mediagallery_scroll'),{
							x:x_move+130,
							y:0,
							mode:'relative',
							duration:0.8,
							transition:Effect.Transitions.sinoidal
											}
						)
		}
	}
}