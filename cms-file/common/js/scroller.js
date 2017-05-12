var speed=120   // speed of scroller
var step=3     // smoothness of movement
var x, scroll, divW, sText=""

function onclickIE(idAttr,handler,call){
	if ((document.all)&&(document.getElementById)){idAttr[handler]=new Function(call)}
}

function stopScroller(){clearTimeout(scroll)}


function startScroller(){
	document.getElementById('tag').style.whiteSpace='nowrap'
	var p=document.createElement('P')
	p.id='testP'
	p.style.fontSize='25%' //fix for mozilla. multiply by 4 before using
	x-=step
	if (document.getElementById('tag').className) p.className=document.getElementById('tag').className
	p.appendChild(document.createTextNode(sText))
	document.body.appendChild(p)
	var pw=p.offsetWidth
	document.body.removeChild(p)
	if (x<(pw*4)*-1){x=divW}
	document.getElementById('tag').style.left=x+'px'
	scroll=setTimeout('startScroller()',speed)
}

function initScroller(){
	if (document.getElementById && document.createElement && document.body.appendChild) {
		
		var scrollerElem = document.getElementById('scroller');
		scrollerElem.onmouseover=function(){		
			stopScroller();
		}
		scrollerElem.onmouseout=function(){
			startScroller();
		}
		
		scrollerElem.style.width='450px'								//NEW
		//divW=document.getElementById('scroller').offsetWidth
		divW=document.getElementById('tag').offsetWidth
		x=divW
		document.getElementById('tag').style.position='relative'
		document.getElementById('tag').style.left=divW+'px'
		
		var tagElem = document.getElementById('tag')		//NEW
		tagElem.style.lineHeight='1em'									//NEW
		tagElem.style.backgroundColor='transparent'			//NEW
		
		sText=getObjInnerText(tagElem);									//NEW
		
		scroll=setTimeout('startScroller()',speed)
	}
}

addLoadEvent(initScroller)

function addLoadEvent(func) {
  if (!document.getElementById | !document.getElementsByTagName) return
	var oldonload = window.onload
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			oldonload()
			func()
		}
	}
}


function getObjInnerText(obj){ 
	if (obj.innerText)  // IE; 
		return obj.innerText; 
	
	if (obj.textContent)	// FireFox
		return obj.textContent; 
	return "";
}