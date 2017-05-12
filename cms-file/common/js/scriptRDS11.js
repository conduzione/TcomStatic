
function inviaDati(formDati) {
	try
	{
		self.scrollTo(1, 1);

		//rimuovo gli elementi eventualmente presenti del box errore
		$("#spacePrimaDiErrorBox").remove();
		$(".errorBox").remove();
		
	}
	catch(err)
	{
	//alert('dentro il catch: '+err.description);
	}

	if( controlliValidazione(formDati) )  {
		
		var url=""+document.getElementById(formDati).action;
		
		var parametriForm= $("#"+formDati).serialize();
		
		parametriForm = parametriForm + "&idVign="+$('#idVign').val();
		
		parametriForm = parametriForm + "&chiamataAjax=S";
		
		
		$.ajax({
			type: "POST",
			url: url,
			data:parametriForm,
			dataType: "json",
			success: function(data) {
				removeLoader();
				elaboraRispostaServer(data,formDati);
			},
			error: function(request, textStatus, errorThrown){
				
				removeLoader();
				//alert("errore request: "+request);
				//alert("errore textStatus: "+textStatus);
				//alert("errore errorThrown: "+errorThrown);
			}
		});
		
		showLoader(formDati);
				
	}	
	
	return false;
}


function showLoader(formDati,waitMessage)
{
	if (!waitMessage) waitMessage = 'Operazione in corso...';

	$("#"+formDati).before('<div id="spacePrimaDiErrorBox" class="space"></div><div class="errorBox"><div style="text-align:center;"><span>'+waitMessage+'</span><br/><br/><img src="/cms-file/common/img/loaderCS.gif" /></div></div>');

}

function removeLoader()
{
	$("#spacePrimaDiErrorBox").remove();
	$(".errorBox").remove();
}

  
function  elaboraRispostaServer(data,formDati) {

	var arrayMessaggi=data;

	if(arrayMessaggi[0]=='ok'){

		$("#"+formDati).before('<div class="space"></div><div class="MsgOkBox"><span>Il Questionario &egrave; stato inoltrato correttamente</span></div>');

		$("#"+formDati).remove();//rimuovo il form

	}else if(arrayMessaggi[0]=='ko'){

		var messaggi='';

		for (i=1;i<arrayMessaggi.length;i++){
			messaggi+='<li>'+arrayMessaggi[i]+'</li>';
		}

		$("#"+formDati).before('<div id="spacePrimaDiErrorBox" class="space"></div><div class="errorBox"><div><span>Attenzione! Si sono verificati i seguenti errori:</span><ul>'+messaggi+'</ul></div></div>');
		
	}

}

function  controlliValidazione(formDati) {
	
	var ritorno=true;
	
	var messaggiErrore=new Array();
	

	// Sezione 1
	if ( !$('#ChB').attr('checked') && !$('#ChM').attr('checked') && !$('#ChD').attr('checked') && !$('#ChA').attr('checked') ){
		messaggiErrore[messaggiErrore.length]="&Egrave; necessario rispondere alla domanda relativa alla chiarezza del documento.";
		ritorno=false;
	}
	if ( !$('#CoB').attr('checked') && !$('#CoM').attr('checked') && !$('#CoD').attr('checked') && !$('#CoA').attr('checked') ){
		messaggiErrore[messaggiErrore.length]="&Egrave; necessario rispondere alla domanda relativa alla completezza del documento";
		ritorno=false;
	}
		if ( !$('#TrB').attr('checked') && !$('#TrM').attr('checked') && !$('#TrD').attr('checked') && !$('#TrA').attr('checked') ){
		messaggiErrore[messaggiErrore.length]="&Egrave; necessario rispondere alla domanda relativa alla trasparenza esposta nel documento.";
		ritorno=false;
	}
		if ( !$('#EfB').attr('checked') && !$('#EfM').attr('checked') && !$('#EfD').attr('checked') && !$('#EfA').attr('checked') ){
		messaggiErrore[messaggiErrore.length]="&Egrave; necessario rispondere alla domanda relativa all&apos; efficacia del documento.";
		ritorno=false;
	}
	
	var temp='';	
	temp=$('#MotivoQualita').val();
	if(temp.length > 4096 ){	
		messaggiErrore[messaggiErrore.length]="La motivazione fornita per la Qualit&agrave; del documento eccede il numero di caratteri consentiti (4096)";
		ritorno=false;
	}
	
	// Sezione 2
	if ( !$('#IdB').attr('checked') && !$('#IdM').attr('checked') && !$('#IdD').attr('checked') && !$('#IdA').attr('checked') ){
		messaggiErrore[messaggiErrore.length]="&Egrave; necessario rispondere alla domanda relativa all&apos; argomento Identit&agrave; Aziendale.";
		ritorno=false;
	}
	if ( !$('#SosB').attr('checked') && !$('#SosM').attr('checked') && !$('#SosD').attr('checked') && !$('#SosA').attr('checked') ){
		messaggiErrore[messaggiErrore.length]="&Egrave; necessario rispondere alla domanda relativa all&apos; argomento Corporate e Governance e Gestione della Sostenibilit&agrave;"
		ritorno=false;
	}
	if ( !$('#EcB').attr('checked') && !$('#EcM').attr('checked') && !$('#EcD').attr('checked') && !$('#EcA').attr('checked') ){
		messaggiErrore[messaggiErrore.length]="&Egrave; necessario rispondere alla domanda relativa all&apos; argomento La responsabilit&agrave; economica";
		ritorno=false;
	}
	
	if ( !$('#PrB').attr('checked') && !$('#PrM').attr('checked') && !$('#PrD').attr('checked') && !$('#PrA').attr('checked') ){
		messaggiErrore[messaggiErrore.length]="&Egrave; necessario rispondere alla domanda relativa all&apos; argomento La responsabilit&agrave; di prodotto";
		ritorno=false;
	}
	
	if ( !$('#SocB').attr('checked') && !$('#SocM').attr('checked') && !$('#SocD').attr('checked') && !$('#SocA').attr('checked') ){
		messaggiErrore[messaggiErrore.length]="&Egrave; necessario rispondere alla domanda relativa all&apos; argomento La responsabilit&agrave; di sociale";
		ritorno=false;
	}
		
	if ( !$('#AmB').attr('checked') && !$('#AmM').attr('checked') && !$('#AmD').attr('checked') && !$('#AmA').attr('checked') ){
		messaggiErrore[messaggiErrore.length]="&Egrave; necessario rispondere alla domanda relativa all&apos; argomento La responsabilit&agrave; ambientale";
		ritorno=false;
	}
	
	temp='';	
	temp=$('#MotivoArgomenti').val();
	if(temp.length > 4096 ){	
		messaggiErrore[messaggiErrore.length]="La motivazione fornita per gli Argomenti del documento eccede il numero di caratteri consentiti (4096)";
		ritorno=false;
	}
	
	temp='';	
	temp=$('#arg_forza').val();
	if(temp.length > 4096 ){	
		messaggiErrore[messaggiErrore.length]="La descrizione fornita per i punti di forza del documento eccede il numero di caratteri consentiti (4096)";
		ritorno=false;
	}
	
	temp='';	
	temp=$('#arg_debolezza').val();
	if(temp.length > 4096 ){	
		messaggiErrore[messaggiErrore.length]="La descrizione fornita per i punti di debolezza del documento eccede il numero di caratteri consentiti (4096)";
		ritorno=false;
	}
	
	if (!$('#Sta').attr('checked') && 
		!$('#Ent').attr('checked') && 
		!$('#Sci').attr('checked') && 
		!$('#Dip').attr('checked') &&
		!$('#For').attr('checked') &&
		!$('#Par').attr('checked') &&
		!$('#Cli').attr('checked') &&
		!$('#Oss').attr('checked') &&
		!$('#Soc').attr('checked') &&
		!$('#Med').attr('checked') &&
		!$('#Alt').attr('checked') ){
		messaggiErrore[messaggiErrore.length]="&Egrave; necessario selezionare una categoria di appartenenza.";
		ritorno=false;
	}
	
	if ($('#Alt').attr('checked') && $('#AltVal').val()=='' ){
		messaggiErrore[messaggiErrore.length]="&Egrave; necessario specificare la categoria &apos;Altro&apos; nell&apos; apposita casella.";
		ritorno=false;
	}else{
		temp='';	
		temp=$('#AltVal').val();
		if(temp.length > 100 ){	
			messaggiErrore[messaggiErrore.length]="La descrizione fornita per la Categoria eccede il numero di caratteri consentiti (100)";
			ritorno=false;
		}
	}
	
	if( $('#txtcaptcha').val()=='' ){
		messaggiErrore[messaggiErrore.length]="&Egrave; necessario inserire il codice di sicurezza contenuto nell&apos; immagine";
		ritorno=false;
	}
	
	if(ritorno==false){
	
		var messaggi='';
	
		for (i=0;i<messaggiErrore.length;i++){
			messaggi+='<li>'+messaggiErrore[i]+'</li>';
		}
	
		$("#"+formDati).before('<div id="spacePrimaDiErrorBox" class="space"></div><div class="errorBox"><div><span>Attenzione! Si sono verificati i seguenti errori:</span><ul>'+messaggi+'</ul></div></div>');
	
	}
	
	return ritorno;//true = tutto ok
}

function abilitaDisabilitaInput(idElemento){

	if ( ! $('#'+idElemento).attr('disabled')  ){
		
		$('#'+idElemento).attr('disabled', 'disabled'); 

	}else {
		$('#'+idElemento).removeAttr('disabled'); 
	}

}
