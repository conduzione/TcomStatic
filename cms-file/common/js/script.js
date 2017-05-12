/* #common script.js - Ver. 28-01-2014 (disable responseTime)# */
/* PREV #common script.js - Ver. 05-06-2013 (intro responseTime)# */

function addOnLoadEvent(func) {
  // aggiunge ONLOAD handler x hacking UNAPPROVE...
  var oldonload = window.onload;
  if(typeof window.onload != 'function') {
    window.onload = func;
  }else{
    window.onload = function(){
      if (oldonload) {
        oldonload();
      }
      func();
    }
  }
}

//window.onload = intercetta;
addOnLoadEvent(intercetta);


// Site Catalyst: client-side download-time of all hits linked in page-body
/* var ONLOAD_TRACK_TIMEOUT = 60000; */ /* 1 minuto */
/* var _preBodyLoadTimestampValue = new Date().getTime(); */
/* var loadEventTimeRoundedValue = {}; */
/* var trackBodyOnLoadEventTimeOut = setTimeout(function(){ debugLog("(!)Body_Onload_TimedOut(!)"); trackBodyOnLoadEventEsTime(); }, ONLOAD_TRACK_TIMEOUT); */
/* debugLog("Initialized _preBodyLoadTimestampValue=["+_preBodyLoadTimestampValue+"] #"); */
/* addOnLoadEvent(trackBodyOnLoadEventEsTime); */


function intercetta() {
	var url="";
	for (var i=0; i<document.links.length; i++) {
		url=document.links[i].href;
		if(url.substring(0,7)!="mailto:"){
			url=url.split("'");
			url=url.join("\\'");
				
			if (document.links[i].className.indexOf('linkEsterno') != -1){  
				//document.links[i].href="javascript:open_linkEsterno('"+url+"');";
				document.links[i].onclick=new Function("javascript:open_linkEsterno('"+url+"'); return false;");
			}
			
			if (document.links[i].className.indexOf('linkExt_amico') != -1){
				var params = "width=516,height=255,status=yes";
				document.links[i].href="javascript:open_linkEsterno('"+url+"', '"+params+"');";
			}
			if (document.links[i].className.indexOf('linkExt_print') != -1){
				var params = "width=660,menubar=yes,scrollbars=yes,resizable=yes,status=yes";
				document.links[i].href="javascript:open_linkEsterno('"+url+"', '"+params+"');";
			}
		}
	}

	if (document.getElementById("formcruscotto") || document.getElementById("formGen") ){
		if(document.getElementById("ar")) {
			enableAndataRitorno();
		}
		if (document.getElementById("datag")){
			if (document.getElementById("datag").value == ""){
				setFormDefault();
			}
		}
	}
	
	if (document.getElementById("traffic_scroll") || document.getElementById("banner_meteo") 
			|| document.getElementById("emotional") || document.getElementById("mediagallery_scroll")){
		onload_function();
	}
}
//window.onload = intercetta;
addOnLoadEvent(intercetta);


function open_linkEsterno(url, params){
	var o;
	if(params)
		o=window.open(url,'_blank', params);
	else
		o=window.open(url,'_blank');

	if(o==undefined){
		if(confirm("E' stata bloccata l'apertura della pagina in una nuova finestra:\n\n"+url+"\n\nVuoi aprire la pagina nella finestra corrente?"))document.location.href=url;
	}
}


/*About HP FORM */
function setFormDefault(){

	now=new Date();
	d=zeroFill(now.getDate(),2);
	m=zeroFill(now.getMonth()+1,2);
	Y=now.getFullYear();
	H=zeroFill(now.getHours(),2);
	if(H>=15 && document.FHOTEL) {
		d++;
	}
	i=zeroFill(now.getMinutes(),2);
	
	// Default date per form bigliettazione	
	if(document.getElementById("datag")){
		setField("datag",d);
		setField("datam",m);
		setField("dataa",Y);
		setField("timsh",H);
		setField("timsm",i);
	}
	if(document.getElementById("datag_r")){
		setField("datag_r",d);
		setField("datam_r",m);
		setField("dataa_r",Y);
		setField("timsh_r",H);
		setField("timsm_r",i);
	}
}

function enableAndataRitorno(){
	if(document.getElementById("ar").checked==false){
		disattivaRitorno();
	} else {
		attivaRitorno();
	}
}

/*About HP FORM Abbonamenti - OrariAcquisto*/
function setFormAbbDefault(){
	now=new Date();
	now.setDate(now.getDate()+1);			//la data odierna diventa la data di domani	

	d=zeroFill(now.getDate(),2);
	m=zeroFill(now.getMonth()+1,2);
	Y=now.getFullYear();
	if(document.getElementById("datag")){
		setField("datag",d);
		setField("datam",m);
		setField("dataa",Y);
	}
}

function setField(q,v){
	if (document.getElementById(q)) {
		document.getElementById(q).value = v;
	}
}

function zeroFill(q,z){
	q=String(q);
	while(q.length<z)q="0"+q;
	return q;
}

function addDay(){
	var myDate=new Date();
	d1=zeroFill(myDate.getDate(),2);
	m1=zeroFill(myDate.getMonth()+1,2);
	Y1=myDate.getFullYear();
	
	myDate.setDate(myDate.getDate()+1);			//ottengo la data di domani
	d2=zeroFill(myDate.getDate(),2);
	m2=zeroFill(myDate.getMonth()+1,2);
	Y2=myDate.getFullYear();
	if(document.getElementById("datag")) datag = document.getElementById("datag").value;
	else datag = "";
	if(document.getElementById("datam")) datam = document.getElementById("datam").value;
	else datam = "";
	if(document.getElementById("dataa")) dataa = document.getElementById("dataa").value;
	else dataa = "";
	if (datag==d1 && datam==m1 && dataa==Y1){
		document.getElementById("datag").value=d2;
		document.getElementById("datam").value=m2;
		document.getElementById("dataa").value=Y2;
	}
}


function setRitorno(){
	var stazin = document.getElementById("stazin");
	var stazout = document.getElementById("stazout");
	var stazin_r = document.getElementById("stazin_r");
	var stazout_r = document.getElementById("stazout_r");

	stazin_r.value = stazout.value;
	stazout_r.value = stazin.value;
};

function attivaRitorno(){
	if(document.getElementById("datag_r")){
		document.getElementById("datag_r").disabled=false;
		document.getElementById("datam_r").disabled=false;
		document.getElementById("dataa_r").disabled=false;
		document.getElementById("timsh_r").disabled=false;
	}
};

function disattivaRitorno(){
	if(document.getElementById("datag_r")){
		document.getElementById("datag_r").disabled=true;
		document.getElementById("datam_r").disabled=true;
		document.getElementById("dataa_r").disabled=true;
		document.getElementById("timsh_r").disabled=true;
	}
};

function checkForm(){
	
	var Y_a = parseInt(document.getElementById("dataa").value,10);
	var M_a = parseInt(document.getElementById("datam").value,10);
	var D_a = parseInt(document.getElementById("datag").value,10);
	var H_a = parseInt(document.getElementById("timsh").value,10);

	var data_a = new Date(Y_a,M_a-1,D_a,H_a);

	if(valiDate(data_a, Y_a, M_a, D_a)){
		if(document.getElementById("ar").checked==true){
			var Y_r = parseInt(document.getElementById("dataa_r").value,10);
			var M_r = parseInt(document.getElementById("datam_r").value,10);
			var D_r = parseInt(document.getElementById("datag_r").value,10);
			var H_r = parseInt(document.getElementById("timsh_r").value,10);
			var data_r  = new Date(Y_r,M_r-1,D_r,H_r);

			if(valiDate(data_r, Y_r, M_r, D_r)){
				if(data_r<data_a){
					if(document.getElementById("lang").value=="it") alert("Attenzione: la data del viaggio di ritorno deve essere uguale o successiva a quella di andata");
					if(document.getElementById("lang").value=="en") alert("Attention: your return journey must occur in the same date or after your departure ");
					return false;
				}else{
					setRitorno();
					return true;
				}
			}
			return false;
		}
		return true;
	}
	return false;
}

function valiDate(td, year, month, day){
	var result = (td.getFullYear() == year && (td.getMonth()+1 == month) && td.getDate() == day);
	if (result == false) {
		if(document.getElementById("lang").value=="it") alert("Data non valida");
		if(document.getElementById("lang").value=="en") alert("Wrong Date");
	}
	return result;
}


/* Check Area Riservata */
function controlloAR(formObj){
	var code="ok";
	if((formObj.elements[0].value=='') || (formObj.elements[1].value=='')) 	{
		alert('ATTENZIONE inserire user e password.');
		code="ko";
 	} 	
	if(!encrypt(formObj.elements[1].value))	{
		code="ko";
	}
	if(code != "ko")	{
		/*formObj.setAttribute('target', '_blank');*/
		formObj.submit();
	}	
	return false;
}

/* Check Area Riservata */
function encrypt(Input){
	var car = new Array(Input.length);
	for(i=0; i<Input.length; i++){
		car[i] = Input.charCodeAt(i);
			if(((car[i] >= 48)&&(car[i] <= 57))
			||((car[i] >= 65)&&(car[i] <= 90))
			||((car[i] >= 97)&&(car[i] <= 122)))
			{}
			else{
				alert('La password deve essere formata da lettere e numeri.');
				return false;
			}
	}
	return true;
}

function Tclear(el) {
	if (el.defaultValue==el.value) el.value = ""
}

function openViaggiaTrenoApplicaz(url) {	
	if(screen.width > 1024){
		var w = 1012;
		var h = 715;
		var l = (screen.width-w)/2;
		var t = (screen.height-h)/2;
		window.open(url,"","width=" + w + ",height=" + h + ",top=" + t + ",left=" + l);
	}
	else{
		var w = screen.width;
		var h = screen.height;
		window.open(url,"","width=" + w + ",height=" + h + ",top=0,left=0");
	}
}

// #EFFETTUA IL TRIM DI UNA STRINGA#
function Trim(stringa) {
	reTrim=/\s+$|^\s+/g;
	return stringa.replace(reTrim,"");
}

// Site Catalyst: Analisi interazione con l'Homepage FS Italiane
function setSCVarsForm(tabName) {
  if(typeof s_gi!='undefined'){
	eval("var s=s_gi(s_account);s.linkTrackVars='events';");	
	if(tabName==='biglietti'){
		eval("s.linkTrackEvents='event34';s.events='event34';");	
	}
	else if(tabName==='abbonamenti'){
		eval("s.linkTrackEvents='event35';s.events='event35';");
	}
	else if(tabName==='hotel'){
		eval("s.linkTrackEvents='event36';s.events='event36';");
	}
	eval("s.tl(this,'o','Inizio ricerca '+tabName);");
  }	
}

// Site Catalyst: Analisi condivisione di contenuti con social bookmarking
function setSCVarsSocial(socialName) {
  if(typeof s_gi!='undefined'){
	eval("var s=s_gi(s_account);s.linkTrackVars='eVar34,events';s.linkTrackEvents='event21';s.events='event21';s.eVar34=socialName;s.tl(this,'o','Segnalazione '+socialName);");
  }
}


function trackBodyOnLoadEventEsTime(){
	//debugLog("Running trackBodyOnLoadEventEsTime() #");
	clearTimeout(trackBodyOnLoadEventTimeOut);
	//debugLog("TIMEOUT REMOVED(!) - loadEventTimeRoundedValue=["+trackBodyOnLoadEventTimeOut+"] #");
	
	 /* check if current page is under Site Catalyst */
	if(typeof s_gi!='undefined'){
		var loadEventTimeTmp=0;
		var curLocationHostName='';
		try{
			loadEventTimeTmp=((new Date().getTime())-_preBodyLoadTimestampValue);
			loadEventTimeRoundedValue = loadEventTimeTmp/1000;
			loadEventTimeRoundedValue = (Math.round(loadEventTimeRoundedValue));
			if((!isNumberObj(loadEventTimeTmp)) || (!isNumberObj(loadEventTimeRoundedValue))){
				loadEventTimeTmp = ONLOAD_TRACK_TIMEOUT+1;
				loadEventTimeRoundedValue = 61;
			}
			curLocationHostName = location.hostname;
			curLocationHostName = curLocationHostName.replace('www.', '');
		}catch(e){
			loadEventTimeTmp = ONLOAD_TRACK_TIMEOUT+1;
			loadEventTimeRoundedValue = 61;
		}finally{};
		
		if(loadEventTimeTmp<1000){
			/* MIN value */
			loadEventTimeRoundedValue = "1"; 
		}
		if(loadEventTimeTmp>ONLOAD_TRACK_TIMEOUT){
			/* MAX value */
			loadEventTimeRoundedValue = "Onload_TimedOut"; 
		}
		/* value must be a string object */
		loadEventTimeRoundedValue = ""+loadEventTimeRoundedValue+"";  
				
		var debugStr =	"loadEventTimeTmp=["+loadEventTimeTmp+"] "+ "# loadEventTimeRoundedValue=["+
						loadEventTimeRoundedValue+"] "+ "# loadEventTimeTmp/1000=["+(loadEventTimeTmp/1000)+"] #";
		debugLog(debugStr);
		
		var s=s_gi(s_account);
		if((s.linkInternalFilters.indexOf(curLocationHostName))<0){
			return;
		}
		/* Send value to Site Catalyst */
		//s.linkTrackVars='eVar35,events';
		//s.linkTrackEvents='event4';
		//s.eVar35=loadEventTimeRoundedValue;
		//s.events='event4';
		//s.tl(this,'o','Tempo di risposta '+loadEventTimeRoundedValue);
		//debugLog(" PageOnloadTimingInfo Sent["+loadEventTimeRoundedValue+"] \n#");
	}
}

function debugLog(str){
 /*	try{ console.log("@ "+(new Date())+": "+str); }catch(e){}finally{}; */
}
function isNumberObj(obj){
    return ((typeof obj == "number") || (typeof obj == "object" && obj.constructor === Number));
}
