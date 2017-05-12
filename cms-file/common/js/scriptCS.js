// funzioni sviluppate usando jquery-1.4.3.js


$(document).ready(function(){
  
  $('#inputTextAltroProvenienzaUtente').css('visibility', 'hidden');
  
  $('#fieldsetCommerciale').hide();
  $('#fieldsetPubblicita').hide();
  $('#fieldsetPartEventi').hide();
  
  $('#divAltroEC').hide();
  $('#divAltroPE').hide();
  $('#divAltroP').hide();
  
  $('#boxtemporanei').attr('disabled', 'disabled');
  
  $('#campiCustomAdvertising').remove();// rimuovo la sezione che contiene i campi "metri quadri" e "tipo di attivita" customizzati per advertising
  
});


function verificaValoreProvenienzaUtente(valoreProvenienzaUtente){
	if (valoreProvenienzaUtente && valoreProvenienzaUtente==90){
		$('#inputTextAltroProvenienzaUtente').css('visibility', 'visible');
	}else{
		$('#inputTextAltroProvenienzaUtente').css('visibility', 'hidden');
	}
}

function optionMqPerAdvertising(){
	$("#mq > option").remove(); //rimuovo tutte le <option>
	
	$('#mq').append('<option value="0">- Seleziona i metri quadri -</option>');
	$('#mq').append('<option value="0-18">0-18</option>');
	$('#mq').append('<option value="18-30">18-30</option>');
	$('#mq').append('<option value="30-50">30-50</option>');

}

function optionMqDefault(){
	$("#mq > option").remove(); //rimuovo tutte le <option>
	
	$('#mq').append('<option value="0">- Seleziona i metri quadri -</option>');
	$('#mq').append('<option value="0-30">0-30</option>');
	$('#mq').append('<option value="31-50">31-50</option>');
	$('#mq').append('<option value="51-100">51-100</option>');
	$('#mq').append('<option value="101-250">101-250</option>');
	$('#mq').append('<option value="oltre 251">oltre 251</option>');
	
}

function optionBoxtemporaneiPerAdvertising(){
	$("#boxtemporanei > option").remove(); //rimuovo tutte le <option>

	$('#boxtemporanei').append('<option value="15 giorni">15 giorni</option>');
	$('#boxtemporanei').append('<option value="1 mese">1 mese</option>');
	$('#boxtemporanei').append('<option value="3 mesi">3 mesi</option>');
	$('#boxtemporanei').append('<option value="6 mesi">6 mesi</option>');
	$('#boxtemporanei').append('<option value="12 mesi">12 mesi</option>');
	
}

function optionBoxtemporaneiDefault(){
	$("#boxtemporanei > option").remove(); //rimuovo tutte le <option>
	
	$('#boxtemporanei').append('<option value="1 giorno - 7 giorni">1 giorno - 7 giorni</option>');
	$('#boxtemporanei').append('<option value="8 giorni - 16 giorni">8 giorni - 16 giorni</option>');
	$('#boxtemporanei').append('<option value="17 giorni - 30 giorni">17 giorni - 30 giorni</option>');
	$('#boxtemporanei').append('<option value="1 mese - 3 mesi">1 mese - 3 mesi</option>');
	$('#boxtemporanei').append('<option value="3 mesi - 6 mesi">3 mesi - 6 mesi</option>');
	$('#boxtemporanei').append('<option value="6 mesi - 12 mesi">6 mesi - 12 mesi</option>');

	
	
}

function aggiungiOptionsDiUnaCategoria(idCategoriaMerceologica){
	for(var i = 1; i < tipEsCom.length;i++)
	{
		// tipEsCom  è un' array definito nella jsp perche' li e' popolato dinamicamente con i valori per: ["id","desc","catMerc"]
		if(tipEsCom[i][2]==idCategoriaMerceologica){
			$('#tipoEserComm').append('<option value="'+tipEsCom[i][0]+'">'+tipEsCom[i][1]+'</option>');
		}
	}
}

function cambiaTipiEserciziCommerciali(idCategoriaMerceologica){

	$("#tipoEserComm > option").remove();//rimuovo tutte le <option>
	$('#tipoEserComm').append('<option value="0">-- Seleziona un\'opzione --</option>');

	aggiungiOptionsDiUnaCategoria(idCategoriaMerceologica);
}

function impostaSettoreRiferimento(idSettoreRiferimento){

	if(idSettoreRiferimento==0){
		
		$('#altroEC').val("");
		$('#altroP').val("");
		$('#altroPE').val("");
		
		$('#divAltroEC').hide();
		$('#divAltroP').hide();
		$('#divAltroPE').hide();
		
		$("#categorieMerc option:first").attr('selected', 'selected');
		$("#tipoEserComm option:first").attr('selected', 'selected');
		$("#pubblicita option:first").attr('selected', 'selected');
		$("#partnerEventi option:first").attr('selected', 'selected');
		
		$('#fieldsetCommerciale').hide();
		$('#fieldsetPubblicita').hide();
		$('#fieldsetPartEventi').hide();
		
	}
	if(idSettoreRiferimento==1){

		$('#altroP').val("");
		$('#altroPE').val("");
		
		$('#divAltroP').hide();
		$('#divAltroPE').hide();
		
		$("#pubblicita option:first").attr('selected', 'selected');
		$("#partnerEventi option:first").attr('selected', 'selected');

		$('#fieldsetCommerciale').show();
		$('#fieldsetPubblicita').hide();
		$('#fieldsetPartEventi').hide();

		optionMqDefault();
		optionBoxtemporaneiDefault();
		
		$('#attivitCont').show();
		$('#attivitTemp').removeClass('sx').addClass('dx');
		
		$('#attivTemp').removeAttr('checked','checked');
		$('#boxtemporanei').attr('disabled','disabled'); 
		
		
	}else if(idSettoreRiferimento==2){

		$('#altroEC').val("");
		$('#altroPE').val("");
		
		$('#divAltroEC').hide();
		$('#divAltroPE').hide();
		
		$("#categorieMerc option:first").attr('selected', 'selected');
		$("#tipoEserComm option:first").attr('selected', 'selected');
		$("#partnerEventi option:first").attr('selected', 'selected');

		$('#fieldsetCommerciale').hide();
		$('#fieldsetPubblicita').show();
		$('#fieldsetPartEventi').hide();
		
		optionMqPerAdvertising();
		optionBoxtemporaneiPerAdvertising();
		
		$('#attivitCont').hide();
		
		$('#attivitTemp').removeClass('dx').addClass('sx');

		//per default viene mostrato selezionato
		$('#attivTemp').attr('checked','checked');
		
		//menu a tendina abilitato
		$('#boxtemporanei').removeAttr('disabled'); 
		
		
		
	}if(idSettoreRiferimento==3){

		$('#altroEC').val("");
		$('#altroP').val("");
		
		$('#divAltroEC').hide();
		$('#divAltroP').hide();
		
		$("#categorieMerc option:first").attr('selected', 'selected');
		$("#tipoEserComm option:first").attr('selected', 'selected');
		$("#pubblicita option:first").attr('selected', 'selected');

		$('#fieldsetCommerciale').hide();
		$('#fieldsetPubblicita').hide();
		$('#fieldsetPartEventi').show();
		
		optionMqDefault();
		optionBoxtemporaneiDefault();
		
		$('#attivitCont').show();
		
		$('#attivitTemp').removeClass('sx').addClass('dx');
		
		
		$('#attivTemp').removeAttr('checked','checked');
		$('#boxtemporanei').attr('disabled','disabled'); 
		
		
		
	}

}
	
	
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

	if(  controlliValidazione(formDati) )  {
		
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

	$("#"+formDati).before('<div id="spacePrimaDiErrorBox" class="space"></div><div class="errorBox"><div style="text-align:center;"><span>'+waitMessage+'</span><br/><br/><img src="/cms-file/immagini/centostazioni/loaderCS.gif" /></div></div>');

}

function removeLoader()
{
	$("#spacePrimaDiErrorBox").remove();
	$(".errorBox").remove();
}

  
function  elaboraRispostaServer(data,formDati) {

	var arrayMessaggi=data;

	if(arrayMessaggi[0]=='ok'){

		$("#"+formDati).before('<div class="space"></div><div class="MsgOkBox"><span>La Sua richiesta &egrave; stata inserita correttamente</span></div>');

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
	
	if( $('#nome').val()=='' ){
		messaggiErrore[messaggiErrore.length]="Il campo Nome &egrave; obbligatorio.";
		ritorno=false;
	}
	if( $('#cognome').val()=='' ){
		messaggiErrore[messaggiErrore.length]="Il campo Cognome &egrave; obbligatorio.";
		ritorno=false;
	}
	if( $('#telefono').val()=='' ){
		messaggiErrore[messaggiErrore.length]="Il campo Telefono &egrave; obbligatorio.";
		ritorno=false;
	}else{

		if( !isCifra($('#telefono').val()) ){
				messaggiErrore[messaggiErrore.length]="Il campo Telefono deve essere numerico.";
				ritorno=false;
			}
		
	}
	if( $('#email').val()=='' ){
		messaggiErrore[messaggiErrore.length]="Il campo Email &egrave; obbligatorio.";
		ritorno=false;
	}else {
			if( !isIndirizzoEMail($('#email').val()) ){
				messaggiErrore[messaggiErrore.length]="Il campo Email non &egrave; correttamente valorizzato.";
				ritorno=false;
			}
	}
	
	
	if ( $('#provenienzaUtente option:selected').val()=='0'   ){
		messaggiErrore[messaggiErrore.length]="Il campo Provenienza Utente &egrave; obbligatorio.";
		ritorno=false;
	}else{
		if ( ($('#provenienzaUtente option:selected').val()=='90')  &&  ( $('#provenienzaUtenteAltro').val()=='' ) ){
			messaggiErrore[messaggiErrore.length]="Il campo Provenienza Utente - Altro &egrave; obbligatorio.";
			ritorno=false;
		}
	}
	
	
	if ( $('#settoriRife option:selected').val()=='0'   ){
		messaggiErrore[messaggiErrore.length]="Il campo Settore di riferimento &egrave; obbligatorio.";
		ritorno=false;
	}else {
		if ( $('#settoriRife option:selected').val()=='1' ){
		
			if ( $('#categorieMerc option:selected').val()=='0'   ){
				messaggiErrore[messaggiErrore.length]="Il campo Categoria Merceologica &egrave; obbligatorio.";
				ritorno=false;
			}
			if ( $('#tipoEserComm option:selected').val()=='0'   ){
				messaggiErrore[messaggiErrore.length]="Il campo Tipologia di esercizio commerciale &egrave; obbligatorio.";
				ritorno=false;
			}
		}else if ( $('#settoriRife option:selected').val()=='2' ){
		
			if ( $('#pubblicita option:selected').val()=='0'   ){
				messaggiErrore[messaggiErrore.length]="Il campo Tipologia di Advertising &egrave; obbligatorio.";
				ritorno=false;
			}
		}
		else if ( $('#settoriRife option:selected').val()=='3' ){
		
			if ( $('#partnerEventi option:selected').val()=='0'   ){
				messaggiErrore[messaggiErrore.length]="Il campo Tipologia di Partnership/Eventi &egrave; obbligatorio.";
				ritorno=false;
			}
		}
	}
	
	if ( $('#mq option:selected').val()=='0'   ){
		messaggiErrore[messaggiErrore.length]="Il campo Metri Quadri &egrave; obbligatorio.";
		ritorno=false;
	}
	
	if( $('#consensoDatiN').attr('checked') ||  ( !$('#consensoDatiS').attr('checked') &&  !$('#consensoDatiN').attr('checked')  )  ){
		messaggiErrore[messaggiErrore.length]="Per essere contattati &egrave; indispensabile prestare il consenso al trattamento dei dati personali.";
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

function controllaAltro(idDelDiv, idDelCampo, descrizioneSelezionata){
	
	if( "altro".toUpperCase() === descrizioneSelezionata.toUpperCase()) {
		$('#'+idDelDiv).show();
	}else{
		$('#'+idDelCampo).val("");
		$('#'+idDelDiv).hide();
	}

}
function abilitaDisabilitaInput(idElemento){

	if ( ! $('#'+idElemento).attr('disabled')  ){
		
		$('#'+idElemento).attr('disabled', 'disabled'); 

	}else {
		$('#'+idElemento).removeAttr('disabled'); 
	}

}

function isIndirizzoEMail(mailDaTestare)
{
	var re=new RegExp("^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-]{2,})+\.)+([a-zA-Z0-9]{2,})+$");

   	if (re.test(mailDaTestare)){
      	return true;
   	}else{
		return false;
    }
}


function isCifra(stringaDaTestare)
{
	var re=new RegExp("[^0-9]");
	
   	if (re.test(stringaDaTestare)){
      	return false;
   	}else{
		return true;
    }
}
