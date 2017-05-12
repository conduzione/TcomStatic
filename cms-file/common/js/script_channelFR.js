

var emotional = {
 	init : function(){ 
		this.time='';
		this.attuale=0;
		this.accendi=1;
		this.delay=5000;
		
		this.timeEmotional();
	},
	changeEmotional : function(Sbutton){
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
						var divInScroll = $('scroll').getElementsByTagName('DIV');
						
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
		clearTimeout(this.time);
	},
	rotateEmotional : function(){
		var emotional = $('emotional');
		buttonsemotional = emotional.getElementsByTagName('div');
		for (k=0;k<buttonsemotional.length;k++){
			if(buttonsemotional[k].className=='buttons'){
				buttons=buttonsemotional[k];
			}
		}	
		
		elenco_buttons = buttons.getElementsByTagName('div');
		for (var i=0;i<elenco_buttons.length;i++){
			if(elenco_buttons[i].className=='Sbutton on') this.attuale=i
		}
		
		this.accendi=this.attuale+1;
		if(this.accendi==elenco_buttons.length)this.accendi=0;
		
		this.attuale=this.accendi
		
		this.changeEmotional(elenco_buttons[this.accendi])
	
		this.timeEmotional();
	},
	timeEmotional : function(){	
		if ($("emotional")) this.time = setTimeout('emotional.rotateEmotional()',this.delay);
	}
}




function accessibility(){
	if($('emotional'))	$('emotional').style.overflow='hidden';
	
	var slider = document.getElementsByClassName('slider');
	var maschera = document.getElementsByClassName('maschera');
	
	for (var i=0;i<slider.length;i++){
		slider[i].style.overflow='hidden';	
	}
	for (var j=0;j<maschera.length;j++){
		maschera[j].style.overflow='hidden';	
	}
}

function onload_function(){
	accessibility();	
	emotional.init();
	slide.init();
	scrolling.init();
	
}

var slide = {
 	init : function(){ 
		this.time='';
		this.delay=3000;
		this.margine_layer = 1;
		this.automatic_slide = false;
		
		var padri = $$('.slider');
		for (var i=0;i<padri.length;i++){
			slide.setVar(padri[i].getElementsByClassName('arrow_left')[0].getElementsByTagName('a')[0]);
			slide.checkArrowPosition();
			padri[i].setStyle({overflow:'hidden'});
		}
	},
	setVar : function(ele){
		if(ele != '')	this.ele = ele;
		
		this.move = '';
		
		if(this.padre!=this.ele.parentNode.parentNode){

			this.padre = this.ele.parentNode.parentNode;
			this.sliderCT = this.ele.parentNode.parentNode.getElementsByClassName('sliderCT')[0];
			this.layer = this.sliderCT.getElementsByClassName('layer');
					
			this.grandezza = 0;
			this.grandezza_layer = 0;
			
			if(this.automatic_slide == true){
				var firstLayer = this.layer[0].clone(true);
				
				this.sliderCT.appendChild(firstLayer);
			}
			this.layer = this.sliderCT.getElementsByClassName('layer');
			
			for( var i=0;i<this.layer.length;i++){
				this.grandezza_layer = this.layer[i].getWidth();
				this.grandezza += this.layer[i].getWidth();
				this.grandezza += this.margine_layer;
				
			}
			
			this.timeSlide();
		}
	},
	moveSlide : function(ele,direction){
		slide.setVar(ele);
			
		if(direction=='left'){
			var nextStep = this.sliderCT.style.left.replace('px','')-parseInt(3*(this.grandezza_layer+this.margine_layer))
			nextStep = 0-nextStep;
			if(nextStep<this.grandezza)	this.move='-'+parseInt(this.grandezza_layer+this.margine_layer);
		}
		else{
			if(this.sliderCT.style.left!='' && this.sliderCT.style.left!='0px' ){
				this.move='+'+parseInt(this.grandezza_layer+this.margine_layer);
			}
		}
		
		if(this.move!=''){
			
			new Effect.Move(
				this.sliderCT,{
				x:this.move,
				y:0,
				mode:'relative',
				duration:0.8,
				transition:Effect.Transitions.sinoidal,
					afterFinishInternal: function() { 
						slide.checkArrowPosition();
					}
				}
			)
			this.delay=3000;
			this.timeSlide();
		}
		else{
			this.sliderCT.style.left='0px';
			this.delay=0;
			this.timeSlide();
		}
		
	},
	checkArrowPosition : function(){
		this.padre.getElementsByClassName('arrow_right')[0].style.visibility='visible';
		this.padre.getElementsByClassName('arrow_left')[0].style.visibility='visible';
		if(this.sliderCT.style.left=='' || this.sliderCT.style.left=='0px' ){
			this.padre.getElementsByClassName('arrow_left')[0].style.visibility='hidden';
			
		}
		
		nextStep = this.sliderCT.style.left.replace('px','')-parseInt(3*(this.grandezza_layer+this.margine_layer));
		nextStep = 0-nextStep;
		
		if(nextStep>=this.grandezza)  this.padre.getElementsByClassName('arrow_right')[0].style.visibility='hidden';
		
	},
	timeSlide : function(){	
		if (this.automatic_slide==true) this.time = setTimeout('slide.moveSlide(\'\',\'left\')',this.delay);
	},
	stopTimeSlide : function(){
		clearTimeout(this.time);	
	}
}


var scrolling = {
	init : function(){ 
	
		this.time='';
		this.delay=3000;
		this.dad = $$('.lancio_scroll');
		for (var i=0;i<this.dad.length;i++){
			this.dad[i].style.overflow='hidden';
			
		}
		this.dim = 244;
		
		scrolling.timeSlide();
		
		
	},
	change : function(){
		for (i=0;i<this.dad.length;i++){
			scrolld = this.dad[i].getElementsByClassName('scroll')[0]
			grandezza = this.dim * this.dad[i].getElementsByClassName('scroll')[0].getElementsByTagName('img').length
			nextStep = scrolld.style.left.replace('px','')-this.dim
			nextStep = 0-nextStep;			
			
			if(nextStep<grandezza){
				scrolld.style.left = scrolld.style.left.replace('px','')-this.dim+'px';
			}
			else scrolld.style.left = '0px';
			
		}
		scrolling.timeSlide();
	},
	timeSlide : function(){
		this.time = setTimeout('scrolling.change()',this.delay);
	},
	stopTimeSlide : function(){
		clearTimeout(this.time);	
	}
	
	
}