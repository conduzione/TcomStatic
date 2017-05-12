var emotional = {
 	init : function(){ 
		this.time='';
		this.attuale=0;
		this.accendi=1;
		this.delay=5000;
		this.action = true;
		this.timeEmotional();
		this.altezza = Element.select($$('.em_scroll')[0],'DIV')[0].getHeight();
		if($$('.em_all')[0]) $$('.em_all')[0].style.overflow='hidden';
	},
	changeEmotional : function(Sbutton){		
		if (Sbutton.className!='buttons_el on'){
			var buttons = Sbutton.parentNode;
			elenco_buttons = Element.select(buttons,'.buttons_el');
			
			for (var i=0;i<elenco_buttons.length;i++){
				if (elenco_buttons[i].className=='buttons_el on'){
					elenco_buttons[i].className='buttons_el';
					Element.select(elenco_buttons[i],'.img')[0].firstChild.src = Element.select(elenco_buttons[i],'.img')[0].firstChild.src.replace('_on.gif','_off.gif');
				}
				else{
					if(elenco_buttons[i]==Sbutton){
						elenco_buttons[i].className='buttons_el on';
						Element.select(elenco_buttons[i],'.img')[0].firstChild.src = Element.select(elenco_buttons[i],'.img')[0].firstChild.src.replace('_off.gif','_on.gif');
						var top = 0 - this.altezza * i;
						$$('.em_scroll')[0].style.top = top+'px';
					}
				}
			}
		}
		$$('.puls_pause')[0].innerHTML = '<img src="/cms-file/common/img/puls_pause.png" class="pngImage" alt="pausa animazione" />';
		this.action = true;
		clearTimeout(this.time);
	},
	rotateEmotional : function(){
		buttons_emotional = Element.select($$('.em_buttons')[0],'.buttons_el');
		for (k=0;k<buttons_emotional.length;k++){
			if(buttons_emotional[k].className=='buttons_el on') on_light = k;
		}
		
		to_light = on_light+1;
		if(to_light==buttons_emotional.length) to_light=0;
		
		this.changeEmotional(buttons_emotional[to_light])
		this.timeEmotional();
	},
	timeEmotional : function(){	
		if ($$(".fedelta_emotional")[0]) this.time = setTimeout('emotional.rotateEmotional()',this.delay);
	},
	pause : function(){
		if(this.action==true){
			clearTimeout(this.time);
			this.action = false;
			
			$$('.puls_pause')[0].innerHTML = '<img src="/cms-file/common/img/puls_play.png" class="pngImage" alt="pausa animazione" />';
			
		}
		else{
			emotional.timeEmotional();
			$$('.puls_pause')[0].innerHTML = '<img src="/cms-file/common/img/puls_pause.png" class="pngImage" alt="play animazione" />';
			this.action = true;
		}
	}
}
Event.observe(window, 'load', function() {	
	emotional.init();
});