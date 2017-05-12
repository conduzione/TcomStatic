// Variabili globali
var flash2Installed = false;    // boolean. true se flash 2 � installed
var flash3Installed = false;    // boolean. true se flash 3 � installed
var flash4Installed = false;    // boolean. true se flash 4 � installed
var flash5Installed = false;    // boolean. true se flash 5 � installed
var flash6Installed = false;    // boolean. true se flash 6 � installed
var flash7Installed = false;    // boolean. true se flash 7 � installed
var flash8Installed = false;    // boolean. true se flash 8 � installed
var flash9Installed = false;    // boolean. true se flash 9 � installed

var maxVersion = 9;             //la versione pi� recente di flash
var actualVersion = 0;          // la versione installata nel computer Client
var hasRightVersion = false;    // boolean. true se � possibile inserire il flash
var requiredVersion = 7; // la versione minima che un client deve disporre

// ##### Richiamiamo la funzione 'detectFlash()' alla fine del file ##### 

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

	      // Una versione di Flash � stata riconosciuta.
	      
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
		// Una versione di flash � stata trovata .
		// Utilizziamo  >= per le future versioni del flash
		// Il test IE/Win per� parte dalla versione 9
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
	    
	  // Se siamo in msntv (formalmente webtv), la versione supportata � la 4
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


// In questa sezione inseriamo l'html dinamicamente nella pagina web
function swap(Flash, Image, alternateImg, larghezzaFlash, altezzaFlash, larghezzaImg, altezzaImg, hrefLink)
{      
  if(hasRightVersion) {  // Se la versione del flash � accettabile (Version=> 7; in IE/WIN  7<=Version<=9)
    var oeTags = 	
	'<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" width="'+larghezzaFlash+'" height="'+altezzaFlash+'" " >'
	+	'<param name="allowScriptAccess" value="sameDomain" />'
	+	'<param name="movie" value="'+Flash+'" />'
	+	'<param name="quality" value="high" />'
	+	'<param name="bgcolor" value="#000000" />'
	+	'<param name="wmode" value="window" />'
	+	'<param name="scale" value="exactfit" />'
	+	'<param name="align" value="middle" />'
	+	'<embed src="'+Flash+'" align="middle" wmode="window" scale="exactfit" quality="high" bgcolor="#000000" width="'+larghezzaImg+'" height="'+altezzaImg+'" name="ideeper" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />'
	+	'</object>'
	 document.write(oeTags);   // Inserisce  il filmato flash
	
  } else if (Image!=''){  // Il flash non pu� essere visualizzato correttamente � l'immagine alternativa non � nulla
    
    var alternateContent = '<img src="'+ Image +'" width="'+larghezzaImg+'" height="'+altezzaImg+'" alt="'+ alternateImg +'" title="'+ alternateImg +'" class="pngImage" />'
    if(hrefLink!=''){
    	var aHrefOpen = '<a title="'+alternateImg+'" href="'+hrefLink+'"' + ' class="linkEsterno">'
    	document.write(aHrefOpen + alternateContent + "</a>");  // Inserisce l'immagine alternativa
    }
    else
      document.write(alternateContent);  // Inserisce l'immagine alternativa
  
  }//fine elese
}


function swapExt(Flash, Image, alternateImg, widthFlash, heightFlash, widthImg, heightImg, flashScriptAccess,
				flashQuality, flashBgcolor, flashWmode, flashScale, flashAlign, hrefLink, isNewWin, hrefTitle)
{
	if(hasRightVersion) {// Se la versione del flash � accettabile (Version=> 7; in IE/WIN  7<=Version<=9)

	var oeTags = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" height="'+heightFlash+'" width="'+widthFlash+'"><param name="allowScriptAccess" value="'+flashScriptAccess+'"><param name="movie" value="'+Flash+'"><param name="quality" value="'+flashQuality+'"><param name="bgcolor" value="'+flashBgcolor+'"><param name="wmode" value="'+flashWmode+'"><param name="scale" value="'+flashScale+'"><param name="align" value="'+flashAlign+'"><embed src="'+Flash+'" wmode="'+flashWmode+'" scale="'+flashScale+'" quality="'+flashQuality+'" bgcolor="'+flashBgcolor+'" name="ideeper" allowscriptaccess="'+flashScriptAccess+'" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" align="'+flashAlign+'" height="'+heightFlash+'" width="'+widthFlash+'"></object>';

	document.write(oeTags);	//Inserisce  il filmato flash

	
	} else if (Image!=''){  // Il flash non pu� essere visualizzato correttamente e l'immagine alternativa non e' nulla

		var imgContent = '<img src="'+ Image +'" width="'+widthImg+'" height="'+heightImg+'" alt="'+ alternateImg +'" />'
		if(hrefLink!=''){
			var classLink = '';
			if(isNewWin) classLink = ' class="linkEsterno"';

			document.write('<a title="'+hrefTitle+'" href="'+hrefLink+'"'+classLink+ '>' +imgContent+ '</a>');  // Inserisce l'immagine alternativa
		}
		else document.write(imgContent);  // Inserisce l'immagine alternativa  
	}
}


function swapExtParam(Flash, flashParName, flashParValue, Image, alternateImg, widthFlash, heightFlash, widthImg, heightImg, flashScriptAccess,
				flashQuality, flashBgcolor, flashWmode, flashScale, flashAlign, hrefLink, isNewWin, hrefTitle)
{      
  if(hasRightVersion) {  // Se la versione del flash � accettabile (Version=> 7; in IE/WIN  7<=Version<=9)
    var oeTags = 	
	'<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" width="'+widthFlash+'" height="'+heightFlash+'" " >'
	+	'<param name="allowScriptAccess" value="'+flashScriptAccess+'" />'
	+	'<param name="movie" value="'+Flash+'" />'
	+	'<param name="quality" value="'+flashQuality+'" />'
	+ '<param name=FlashVars value="'+flashParName+'='+flashParValue+'" />'
	+	'<param name="bgcolor" value="'+flashBgcolor+'" />'
	+	'<param name="wmode" value="'+flashWmode+'" />'
	+	'<param name="scale" value="'+flashScale+'" />'
	+	'<param name="align" value="'+flashAlign+'" />'
	+	'<embed src="'+Flash+'" wmode="'+flashWmode+'" align="'+flashAlign+'" scale="'+flashScale+'" '
	+		'quality="'+flashQuality+'" bgcolor="'+flashBgcolor+'" width="'+widthFlash+'" height="'+heightFlash+'" '
	+		'name="ideeper" allowScriptAccess="'+flashScriptAccess+'" type="application/x-shockwave-flash" '
	+		'pluginspage="http://www.macromedia.com/go/getflashplayer" />'
	+	'</object>'
	 document.write(oeTags);   // Inserisce  il filmato flash
	
  } else if (Image!=''){  // Il flash non pu� essere visualizzato correttamente e l'immagine alternativa non e' nulla
    
    var imgContent = '<img src="'+ Image +'" width="'+widthImg+'" height="'+heightImg+'" alt="'+ alternateImg +'" />'
    if(hrefLink!=''){
    	var classLink = '';
    	if(isNewWin)  
    		classLink = ' class="linkEsterno"';
    	document.write('<a title="'+hrefTitle+'" href="'+hrefLink+'"'+classLink+ '>' +imgContent+ '</a>');  // Inserisce l'immagine alternativa
    }
    else
      document.write(imgContent);  // Inserisce l'immagine alternativa  
  }
}

detectFlash();  // Richiamiamo la funzione
