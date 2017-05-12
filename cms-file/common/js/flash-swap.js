// In questa sezione inseriamo l'html dinamicamente nella pagina web

function swap(Flash, Image, alternateImg, larghezzaFlash, altezzaFlash, larghezzaImg, altezzaImg, hrefLink)
{      
  if(hasRightVersion) {  // Se la versione del flash è accettabile (Version=> 7; in IE/WIN  7<=Version<=9)
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
	
  } else if (Image!=''){  // Il flash non può essere visualizzato correttamente è l'immagine alternativa non è nulla
    
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
	if(hasRightVersion) {// Se la versione del flash è accettabile (Version=> 7; in IE/WIN  7<=Version<=9)

	var oeTags = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" height="'+heightFlash+'" width="'+widthFlash+'"><param name="allowScriptAccess" value="'+flashScriptAccess+'"><param name="movie" value="'+Flash+'"><param name="quality" value="'+flashQuality+'"><param name="bgcolor" value="'+flashBgcolor+'"><param name="wmode" value="'+flashWmode+'"><param name="scale" value="'+flashScale+'"><param name="align" value="'+flashAlign+'"><embed src="'+Flash+'" wmode="'+flashWmode+'" scale="'+flashScale+'" quality="'+flashQuality+'" bgcolor="'+flashBgcolor+'" name="ideeper" allowscriptaccess="'+flashScriptAccess+'" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" align="'+flashAlign+'" height="'+heightFlash+'" width="'+widthFlash+'"></object>';

	document.write(oeTags);	//Inserisce  il filmato flash

	
	} else if (Image!=''){  // Il flash non può essere visualizzato correttamente e l'immagine alternativa non e' nulla

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
  if(hasRightVersion) {  // Se la versione del flash è accettabile (Version=> 7; in IE/WIN  7<=Version<=9)
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
	
  } else if (Image!=''){  // Il flash non può essere visualizzato correttamente e l'immagine alternativa non e' nulla
    
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