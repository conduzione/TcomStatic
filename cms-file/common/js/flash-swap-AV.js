// In questa sezione inseriamo l'html dinamicamente nella pagina web


function swapExt(Flash,widthFlash, heightFlash, flashScriptAccess,flashQuality, flashBgcolor, flashWmode, flashScale, flashAlign, currentDate)
{      
  if(hasRightVersion) {  // Se la versione del flash è accettabile (Version=> 7; in IE/WIN  7<=Version<=9)
    var currentDate_flashVars = currentDate;
    var oeTags = 	
	'<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" width="'+widthFlash+'" height="'+heightFlash+'" " >'
	+	'<param name="allowScriptAccess" value="'+flashScriptAccess+'" />'
	+	'<param name="movie" value="'+Flash+'" />'
	+	'<param name="quality" value="'+flashQuality+'" />'
	+	'<param name="bgcolor" value="'+flashBgcolor+'" />'
	+	'<param name="wmode" value="'+flashWmode+'" />'
	+	'<param name="scale" value="'+flashScale+'" />'
	+	'<param name="align" value="'+flashAlign+'" />'
	+ '<param name="FlashVars" value=currentDate"'+currentDate_flashVars+'" />'
	+	'<embed src="'+Flash+'" wmode="'+flashWmode+'" flashVars=currentDate="'+currentDate_flashVars+'" align="'+flashAlign+'" scale="'+flashScale+'" '
	+		'quality="'+flashQuality+'" bgcolor="'+flashBgcolor+'" width="'+widthFlash+'" height="'+heightFlash+'" '
	+		'name="ideeper" allowScriptAccess="'+flashScriptAccess+'" type="application/x-shockwave-flash" '
	+		'pluginspage="http://www.macromedia.com/go/getflashplayer" />'
	+	'</object>'
	 document.write(oeTags);   // Inserisce  il filmato flash
	
  } 
}


function hideFlashAlternative(){
 if(hasRightVersion) {
 
 document.write( "<link rel=\"stylesheet\" href=\"../../common/css/flashNoAlternative.css\" media=\"screen\" />");

 
 }

}