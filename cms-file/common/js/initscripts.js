
Event.observe(window, 'load', function() {
	 fixAnsaImgUrl();
	 initAllBoxTabs();
	 slide.init();
});

var MAXLENPREVIEWTEXT = 39;

function fixAnsaImgUrl(){
	// FIX per mancato invio IMG3 da ANSA
	var previewDivRef = $('previewDiv');
	if (previewDivRef && previewDivRef.style.backgroundImage){
		var urlFixed = (previewDivRef.style.backgroundImage).replace("img3", "img1")
		previewDivRef.style.backgroundImage = urlFixed;
		previewDivRef.style.paddingTop = '102px';
	}
}
	
function videoLinkClicked(linkObj){
	var previewDivRef = $('previewDiv');
	if (previewDivRef && previewDivRef.style.backgroundImage){
		var urlFixed = (linkObj.rel).replace("img3", "img1")
		previewDivRef.style.backgroundImage = 'url('+ urlFixed +')';
		previewDivRef.style.paddingTop = '102px';
		//previewDivRef.style.backgroundImage = 'url('+ linkObj.rel +')'; // solo se viene inviata di nuovo IMG3 a corredo xml
	}
	
	var previewLinkRef = $('previewLink');
	var imgChildRef = (linkObj.getElementsByTagName("img"))[0];
	if (previewLinkRef && imgChildRef){
		previewLinkRef.href = linkObj.href;
		var str = imgChildRef.getAttribute('alt');
		if (str.length>MAXLENPREVIEWTEXT){
			var indx = -1;
			for (indx=(MAXLENPREVIEWTEXT);indx>(MAXLENPREVIEWTEXT-20);indx--) if (str.charAt(indx)==' ') break;
			if (indx==-1) indx=(MAXLENPREVIEWTEXT-3);
			str= (str.substr(0,indx))+'...';
		}
		previewLinkRef.innerHTML = str;
		new Effect.Highlight(previewLinkRef.parentNode, {startcolor: "#BDBDBD", endcolor: "#585858", duration: 0.35});
		//alert('***** DATI LINK: \n HREF='+linkObj.href + "\n ALT-ATTR="+imgChildRef.getAttribute('alt')+'\n*****')
	}
	
	return false;
}
	
var slide = {
 	init : function(){
 		if($$('.boxSlideAnsaVideo')!=''){
			this.margine_layer = 8;
			this.time = 0;
			this.delay = 3000;
			this.slide = $$('.boxSlideAnsaVideo')[0];
			this.scrolling = this.slide.getElementsByClassName('scroll')[0];
			var boxes = this.scrolling.getElementsByClassName('boxMulti');
			
			this.automatic_slide = true;
			
			if(this.automatic_slide == true ){
				var firstLayer = boxes[0].clone(true);
				var secondLayer = boxes[1].clone(true);
				boxes[boxes.length-1].insert({'after':firstLayer});
				boxes = this.scrolling.getElementsByClassName('boxMulti');
				boxes[boxes.length-1].insert({'after':secondLayer});
				boxes = this.scrolling.getElementsByClassName('boxMulti');
			}
			
			this.grandezzaTot = 0;
			for (var i=0;i<boxes.length;i++){
				this.grandezzaLay = boxes[i].getWidth();
				this.grandezzaTot += boxes[i].getWidth();
				this.grandezzaTot += this.margine_layer;
			}
			this.drag = true;
			this.scrolling.setStyle({width:this.grandezzaTot+'px'});
			this.slide.setStyle({overflow:'hidden'});
			
			if(this.automatic_slide == true ) this.timeSlide();
		}
	},
	
	moveSlide : function(direction,who){
		move='';
		if(who!='bot') slide.stopTimeSlide();
		
		if(direction=='right'){
			var nextStep = this.scrolling.style.left.replace('px','')-parseInt(2*(this.grandezzaLay+this.margine_layer));
			nextStep = 0-nextStep;
			if(nextStep<this.grandezzaTot)	move='-'+parseInt(this.grandezzaLay+this.margine_layer);
		}
		else{
			if(this.scrolling.style.left!='' && this.scrolling.style.left!='0px' ){
				move='+'+parseInt(this.grandezzaLay+this.margine_layer);
			}
		}
		
		if (move!='' && this.drag == true){
			this.drag = false;
			new Effect.Move(
				this.scrolling,{
				x:move,
				y:0,
				mode:'relative',
				duration:0.8,
				transition:Effect.Transitions.sinoidal,
				  afterFinishInternal: function() {
					slide.drag = true;
					slide.delay = 3000;
					slide.timeSlide();
					
				  }
				}
			)	
		}else if (this.automatic_slide==true && move=='' && who=='bot'){
			this.scrolling.style.left='0px';
			slide.drag = true;
			slide.delay = 0;
			slide.timeSlide();
		}
	},
	
	timeSlide : function(){	
		if (this.automatic_slide==true && slide.drag == true) this.time = setTimeout('slide.moveSlide(\'right\',\'bot\')',this.delay);
	},
	
	stopTimeSlide : function(){
		clearTimeout(this.time);	
	}
}

function initAllBoxTabs(){
	var tabsRefs = document.getElementsByClassName('boxTab');
	if (!tabsRefs) return;
	for (var k=0;k<tabsRefs.length;k++){
		if (tabsRefs[k]){
			var tabBotRefs = tabsRefs[k].getElementsByClassName('BoxTabBot');
			if (tabBotRefs[0]){ 
				tabBotRefs[0].style.display='block';
				for (var j=1;j<tabBotRefs.length;j++){
					tabBotRefs[j].style.display='none'; 
					(tabBotRefs[j].parentNode).style.display='none';
				}
			}
		}
	}
}

function findActiveTab(tabHeadersContainer){
	if (!tabHeadersContainer) return null;
	var tabItemsArr = tabHeadersContainer.getElementsByTagName('div');
	if (tabItemsArr){
		for(var i=0;i<tabItemsArr.length;i++){ 
			var classNameVal=(tabItemsArr[i].getAttribute("class"));
			if (!classNameVal) classNameVal=(tabItemsArr[i].getAttribute("className"));
			if (classNameVal=='TabOn'){ return tabItemsArr[i]; }
		}
	}else{
		return null;
	}
}
	
function chTab(newActiveTabHeader, idTab, idTabsContainer){
	var newActiveTabHeaderRef = document.getElementById(newActiveTabHeader);
	if (newActiveTabHeaderRef && newActiveTabHeaderRef.parentNode){		
		var actvTabRef = findActiveTab(newActiveTabHeaderRef.parentNode);
		if (!actvTabRef) return false;
				
		chTabHeader(newActiveTabHeaderRef, actvTabRef);
		chTabContent(idTab, idTabsContainer);		
	}
	return false;
}

function chTabContent(idTab, idTabsContainer){
	var contentToActivateRef = document.getElementById(idTab);
	var tabsContents = document.getElementById(idTabsContainer);

	if (contentToActivateRef && tabsContents){
		var liElems=tabsContents.getElementsByTagName('li');
		if (liElems){
			for(var i=0;i<liElems.length;i++){
				var liDivTmp=liElems[i].getElementsByTagName('div');
				if (liDivTmp){ 
					liDivTmp[0].style.display='none'; 
					liElems[i].style.display='none';
				}
			}
		}		
		var liDivTmpActv=contentToActivateRef.getElementsByTagName('div');
		if (liDivTmpActv){ 
			liDivTmpActv[0].style.display='block';
			liDivTmpActv[0].parentNode.style.display='block';
		}
	}
}

function chTabHeader(newActiveTabHeaderRef, toDeActivateTabHeaderRef){
	var divArrDeActivate = toDeActivateTabHeaderRef.getElementsByTagName('div');
	if (divArrDeActivate){
		divArrDeActivate[0].style.display='none';
		divArrDeActivate[3].style.display='block';		
	}
	if (toDeActivateTabHeaderRef.getAttribute("class")){
		toDeActivateTabHeaderRef.setAttribute("class", "TabOff2");
	}else{
		toDeActivateTabHeaderRef.setAttribute("className", "TabOff2");
	}
	
	var divArrActivate = newActiveTabHeaderRef.getElementsByTagName('div');
	if (divArrActivate){ 
		divArrActivate[0].style.display='block';
		divArrActivate[3].style.display='none';		
	}
	if (newActiveTabHeaderRef.getAttribute("class")){	
		newActiveTabHeaderRef.setAttribute("class", "TabOn");
	}else{ 
		newActiveTabHeaderRef.setAttribute("className", "TabOn");
	}
	var linkToBlur = newActiveTabHeaderRef.getElementsByTagName('a');
	if (linkToBlur) linkToBlur[0].blur();
}

function clearTxtCerca(txtFieldRef){
	if (txtFieldRef) txtFieldRef.value='';
}
