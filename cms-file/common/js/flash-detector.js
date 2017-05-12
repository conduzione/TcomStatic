// Variabili globali
var flash2Installed = false;    // boolean. true se flash 2 è installed
var flash3Installed = false;    // boolean. true se flash 3 è installed
var flash4Installed = false;    // boolean. true se flash 4 è installed
var flash5Installed = false;    // boolean. true se flash 5 è installed
var flash6Installed = false;    // boolean. true se flash 6 è installed
var flash7Installed = false;    // boolean. true se flash 7 è installed
var flash8Installed = false;    // boolean. true se flash 8 è installed
var flash9Installed = false;    // boolean. true se flash 9 è installed

var maxVersion = 9;             //la versione più recente di flash
var actualVersion = 0;          // la versione installata nel computer Client
var hasRightVersion = false;    // boolean. true se è possibile inserire il flash
var requiredVersion = 7; // la versione minima che un client deve disporre

function detectFlash() {  
  
  var isIE  = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;    // true if we're on ie
  var isWin = (navigator.appVersion.toLowerCase().indexOf("win") != -1) ? true : false; // true if we're on windows
  var flashVersion = 0;
  
  //In IE/Win si procede a tentativi cercando di istanziare l'oggetto ActiveX ShockwaveFlash
  if(isIE && isWin){	
	var i=maxVersion + 1;
	var trovato = false;
	while( i>0 & trovato==false){
		i--;
		try{
			var flash = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + i);
			flashVersion = i;
			trovato = true;
		}
		catch(e){
	}

   }
  
  }
   // If navigator.plugins esiste...(Firefox.....)
  else if (navigator.plugins) {
    // ...then check for flash 2 or flash 3+.
    if (navigator.plugins["Shockwave Flash 2.0"]
        || navigator.plugins["Shockwave Flash"]) {

      // Una versione di Flash è stata riconosciuta.
      
      // Reference per flash 2.0.
      var isVersion2 = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
      var flashDescription = navigator.plugins["Shockwave Flash" + isVersion2].description;

      // DEBUGGING: decommentare la linea sottostante per visualizzare la descrizione.
      // alert("Flash plugin description: " + flashDescription);
      
      // Un flash plugin-description compare in questa maniera: Shockwave Flash 4.0 r5
      // We can get the major version by grabbing the character before the period
      // note that we don't bother with minor version detection. 
      // Do that in your movie with $version or getVersion().
      flashVersion = parseInt(flashDescription.substring(16));

    }
  }
  
  if (flashVersion != 0)
  {
	// Una versione di flash è stata trovata .
	// Utilizziamo  >= per le future versioni del flash
	// Il test IE/Win però parte dalla versione 9
	flash2Installed = flashVersion == 2;    
	flash3Installed = flashVersion == 3;
	flash4Installed = flashVersion == 4;
	flash5Installed = flashVersion == 5;
	flash6Installed = flashVersion == 6;
	flash7Installed = flashVersion == 7;
	flash8Installed = flashVersion == 8;
	flash9Installed = flashVersion >= maxVersion;
  
	// Ciclo for per valutare la versione installata
	// Settiamo il valore della  versione presente nel client
	for (var i = 2; i <= maxVersion; i++) {  
    if (eval("flash" + i + "Installed") == true) actualVersion = i;
	}
  
  }
    
  // Se siamo in msntv (formalmente webtv), la versione supportata è la 4
  // (come per 1 Gennaio , 2004). 
  if(navigator.userAgent.indexOf("WebTV") != -1) actualVersion = 4;  
  
  // Se l'utente ha una versione del flash idonea
  if (actualVersion >= requiredVersion) {
    //Settiamo il flag e demandiamo a flash-swap.js
    // la scrittura dei tag html.
    hasRightVersion = true;                
  } 
	//alert("flash version = "+actualVersion);
}

detectFlash();  // Richiamiamo la funzione
