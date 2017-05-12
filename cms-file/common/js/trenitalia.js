
/* Area Riservata HP_TCOM*/
/*var Help1 = null;
function showhelp1 () {
	if(Help1 && !Help1.closed)
	{
		Help1.close();
		Help1 = null;
	}
	Help1 = window.open("http://orario.trenitalia.com/b2c/autoreg/sendUserIdMailPhase1.jsp?lang=it&provenienzaWeb=0&shopperGroup=WEBUSER&shNumero=-1","","width=800,height=400,resizable=1,scrollbars=0");
	Help1.focus();
}*/

/* Invia Amico CARTAVIAGGIO WP*/
function setMailtoCartaviaggio(){
	subject = "E' arrivata Cartaviaggio. Ogni viaggio, un vantaggio.";
	intestazione = "Ciao,%0Avieni a conoscere il nuovo programma Cartaviaggio Trenitalia. Subito per te, vantaggi, opportunita' e premi.%0A%0A" + escape(location.href);
	document.location.href = 'mailto:?SUBJECT=' + subject + '&BODY=' + intestazione;
}