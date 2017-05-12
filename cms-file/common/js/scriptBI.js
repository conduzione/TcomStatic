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
	
	if( $('#sede').val()=='0' ){
		messaggiErrore[messaggiErrore.length]="Il campo Busitalia - Sita Nord S.r.l. &egrave; obbligatorio";
		ritorno=false;
	}
	
	if( $('#dataviaggio').val()!=''){
		if( !isData($('#dataviaggio').val()) ){
			messaggiErrore[messaggiErrore.length]="Il campo Data non &egrave; correttamente valorizzato";
			ritorno=false;
		}		
	}
	
	if( $('#motivosengnalazione').val()=='' ){
		messaggiErrore[messaggiErrore.length]="Il campo motivo della segnalazione &egrave; obbligatorio";
		ritorno=false;
	}else{
	
		var temp='';	
		temp=$('#motivosengnalazione').val();
		if(temp.length > 4096 ){	
			messaggiErrore[messaggiErrore.length]="Il campo motivo della segnalazione eccede il numero di caratteri consentiti (4096)";
			ritorno=false;
		}
	}
	
	if ( $('#emailcliente').val()!='' || $('#nomecliente').val()!='' || $('#cognomecliente').val()!='' || $('#indirizzocliente').val()!='' || $('#cittacliente').val()!=''
	      || $('#provinciacliente').val()!='' || $('#capcliente').val()!='' || $('#telefonocliente').val()!=''){
		
		if( $('#nome').val()=='' ){
			messaggiErrore[messaggiErrore.length]="Per essere contattati &egrave; necessario inserire il campo Nome";
			ritorno=false;
		}
		if( $('#cognomecliente').val()=='' ){
			messaggiErrore[messaggiErrore.length]="Per essere contattati &egrave; necessario inserire il campo Cognome";
			ritorno=false;
		}
		if( $('#telefonocliente').val()!='' ){ //se il telefono è valorizzato controllo che sia corretto

			if( !isCifra($('#telefonocliente').val()) ){
					messaggiErrore[messaggiErrore.length]="Il campo Telefono deve essere numerico";
					ritorno=false;
				}		
		}
		if( $('#capcliente').val()!='' ){ //se il telefono è valorizzato controllo che sia corretto

					if( !isCifra($('#capcliente').val()) ){
							messaggiErrore[messaggiErrore.length]="Il campo CAP deve essere numerico";
							ritorno=false;
						}		
				}
		if( $('#emailcliente').val()=='' ){
			messaggiErrore[messaggiErrore.length]="Per essere contattati &egrave; necessario inserire il campo Email";
			ritorno=false;
		}else {
				if( !isIndirizzoEMail($('#emailcliente').val()) ){
					messaggiErrore[messaggiErrore.length]="Il campo Email non &egrave; correttamente valorizzato";
					ritorno=false;
				}
		}	
		if( $('#consensoDatiN').attr('checked') ||  ( !$('#consensoDatiS').attr('checked') &&  !$('#consensoDatiN').attr('checked')  )  ){
			messaggiErrore[messaggiErrore.length]="Per essere contattati &egrave; indispensabile prestare il consenso al trattamento dei dati personali";
			ritorno=false;
		}	
    }
			
	if( $('#txtcaptcha').val()=='' ){
		messaggiErrore[messaggiErrore.length]="Il campo Codice &egrave; obbligatorio";
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


function isIndirizzoEMail(mailDaTestare)
{
	var re=new RegExp("^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-]{2,})+\.)+([a-zA-Z0-9]{2,})+$");

   	if (re.test(mailDaTestare)){
      	return true;
   	}else{
		return false;
    }
}

function isData(dataDaTestare){
	
	var espressione = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
	if (!espressione.test(dataDaTestare))
	{
	    return false;
	}else{
		anno = parseInt(dataDaTestare.substr(6),10);
		mese = parseInt(dataDaTestare.substr(3, 2),10);
		giorno = parseInt(dataDaTestare.substr(0, 2),10);
		
		var data=new Date(anno, mese-1, giorno);
		if(data.getFullYear()==anno && data.getMonth()+1==mese && data.getDate()==giorno){
			return true;
		}else{
			return false;
		}
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