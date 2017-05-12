	function checkInfowebMtpk(formObj, lingua) {
		
		var mandatoryMsg = "Attenzione!\nTutti i campi con asterisco sono OBBLIGATORI!";
		var noValidEmailMsg = "Attenzione!\nIndirizzo e-mail non valido!";
		var numericMsg = "Attenzione!\nI campi Cap, Telefono, Cellulare e Fax sono numerici!";
		var privacyMsg = "Attenzione!\nE' necessario autorizzare il trattamento dei dati personali!";
		if(lingua != null && lingua == "EN"){
			mandatoryMsg = "Warning,\nfields with stars are required!";
			noValidEmailMsg = "Warning,\nnot valid e-mail!";
			numericMsg = "Warning,\nCap, Telephone, Mobile and Fax fields are numeric!";
			privacyMsg = "Warning,\nit's necessary to give the consent for processing personal informations!";
		}
		
		var nomeElement = formObj.nome; 
		var cognomeElement = formObj.cognome;  
		var emailElement = formObj.emailmitt;
		var emailReplayElement = formObj.emailmittreplay;
		
		//Controllo obbligatorieta' campi
		if(nomeElement){
			if(Trim(nomeElement.value) == ""){
				alert(mandatoryMsg);
				nomeElement.focus();
				return false;
			}
		}
		if(cognomeElement){
			if(Trim(cognomeElement.value) == ""){
				alert(mandatoryMsg);
				cognomeElement.focus();
				return false;
			}
		}
		
		// Verifico indirizzo email
		if(emailElement && emailReplayElement){
			if(Trim(emailElement.value) != ""){
				if(!checkEmail(emailElement)){
					alert(noValidEmailMsg);
					emailElement.value="";
					emailElement.focus();
					return false;
				}
				if(emailElement.value != emailReplayElement.value){
					alert(noValidEmailMsg);
					emailReplayElement.value="";
					emailReplayElement.focus();
					return false;
				}
			}
		}
		
		if(!checkNumericFields(formObj)){
			alert(numericMsg);
			return false;
		}
		
		//Controllo trattamento dati personali
		var yesPrivacy = document.getElementById("si");
		if(!yesPrivacy.checked){
			alert(privacyMsg);
			return false;
		}
		
		return true;
	}
	
	
	function checkInfocomMtpk(formObj, lingua) {
		
		var mandatoryMsg = "Attenzione!\nTutti i campi con asterisco sono OBBLIGATORI!";
		var noValidEmailMsg = "Attenzione!\nIndirizzo e-mail non valido!";
		var numericMsg = "Attenzione!\nI campi Cap, Telefono, Cellulare e Fax sono numerici!";
		var privacyMsg = "Attenzione!\nE' necessario autorizzare il trattamento dei dati personali!";
		if(lingua != null && lingua == "EN"){
			mandatoryMsg = "Warning,\nfields with stars are required!";
			noValidEmailMsg = "Warning,\nnot valid e-mail!";
			numericMsg = "Warning,\nCap, Telephone, Mobile and Fax fields are numeric!";
			privacyMsg = "Warning,\nit's necessary to give the consent for processing personal informations!";
		}
		
		var ragsocElement = formObj.ragSoc; 
		var jobElement = formObj.job; 
		var settElement = formObj.sett; 
		var emailElement = formObj.emailmitt;
		var telElement = formObj.tel;
		
		//Controllo obbligatorieta' campi
		if(ragsocElement){
			if(Trim(ragsocElement.value) == ""){
				alert(mandatoryMsg);
				ragsocElement.focus();
				return false;
			}
		}
		if(jobElement){
			if(Trim(jobElement.value) == ""){
				alert(mandatoryMsg);
				jobElement.focus();
				return false;
			}
		}
		if(settElement){
			if(Trim(settElement.value) == ""){
				alert(mandatoryMsg);
				settElement.focus();
				return false;
			}
		}
		if(emailElement){
			if(Trim(emailElement.value) == ""){
				alert(mandatoryMsg);
				emailElement.focus();
				return false;
			}
		}
		if(telElement){
			if(Trim(telElement.value) == ""){
				alert(mandatoryMsg);
				telElement.focus();
				return false;
			}
		}
		
		// Verifico indirizzo email
		if(emailElement){
			if(!checkEmail(emailElement)){
				alert(noValidEmailMsg);
				emailElement.value="";
				emailElement.focus();
				return false;
			}
		}
		
		if(!checkNumericFields(formObj)){
			alert(numericMsg);
			return false;
		}
		
		//Controllo trattamento dati personali
		var yesPrivacy = document.getElementById("si");
		if(!yesPrivacy.checked){
			alert(privacyMsg);
			return false;
		}
		
		return true;
	}
	
	
	function verificaInput(formObj, lingua) {
		var alerString = "Attenzione!\nTUTTI I CAMPI SONO OBBLIGATORI!";
		if(lingua != null && lingua == "EN")
			alerString = "Attenction!\nYou must fill in all fields!";

		var nomeMittElement = formObj.nomemitt;
		var nomeDestElement = formObj.nomedest;
		var emailMittElement = formObj.emailmitt;
		var emailDestElement = formObj.emaildest;

		if(nomeMittElement){
			if(nomeMittElement.value == ""){
				alert(alerString);
			return false;
			}
		}
		if(nomeDestElement){
			if(nomeDestElement.value == ""){
				alert(alerString);
			return false;
			}
		}
		if(emailMittElement){
			if(emailMittElement.value == ""){
				alert(alerString);
    		return false;
			}
		}		
		if(emailDestElement){
			if(emailDestElement.value == ""){
				alert(alerString);
    		return false;
			}
		}

		// Verifico indirizzo email Mittente e Destinatario
		verificaMittente = controllaEmail(emailMittElement, lingua);
		if(!verificaMittente)
			return false;
		else{
			return controllaEmail(emailDestElement, lingua);
		}

	}
	
	
	function checkNumericFields(formObj){
		
		var capElement = formObj.cap; 
		var tellElement = formObj.tel;  
    var cellElement = formObj.cell;
    var faxElement = formObj.fax;
    var areNumericFields = true;
		
		// Verifico campi numerici
		if(capElement){
			if(Trim(capElement.value)!="" && !isNumerico(capElement)){
				capElement.value="";
				if(areNumericFields)	capElement.focus();
				areNumericFields = false;
			}
		}
		if(tellElement){
			if(Trim(tellElement.value)!="" && !isNumerico(tellElement)){
				tellElement.value="";
				if(areNumericFields)	tellElement.focus();
				areNumericFields = false;
			}
		}
		if(cellElement){
			if(Trim(cellElement.value)!="" && !isNumerico(cellElement)){
				cellElement.value="";
				if(areNumericFields)	cellElement.focus();
				areNumericFields = false;
			}
		}
		if(faxElement){
			if(Trim(faxElement.value)!="" && !isNumerico(faxElement)){
				faxElement.value="";
				if(areNumericFields)	faxElement.focus();
				areNumericFields = false;
			}
		}
		return areNumericFields;
	}
	
	
	
	// CONTROLLA LA CORRETTEZZA DELLA E-MAIL
	function controllaEmail(formElement, lingua) {
		var nome;
		var	espressione = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

		if(formElement){
			if(espressione.test(formElement.value) == false){
				nome = formElement.name;

				if (nome == "emailmitt"){
					var alerMitt = "Indirizzo Mail del mittente non valido";
					if(lingua != null && lingua == "EN")
						alerMitt = "Sender E-mail not valid";
					alert(alerMitt);
					formElement.select();
				} 
				if (nome == "emaildest"){
					var alerDest = "Indirizzo Mail del destinatario non valido";
					if(lingua != null && lingua == "EN")
						alerDest = "Addressee E-mail not valid";
					alert(alerDest);
					formElement.select();
				} 
				return false;
			}
		}
		return true;
	}
	
	
	function checkEmail(emailAddr){
		filtro = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
   	if(emailAddr){
	   	if(!filtro.test(emailAddr.value))
				return false;
	  }
	  return true;
	}
	
	
	// LIMITA UN CAMPO DI TESTO AD UNA LUNGH MAX
	function contacaratteri(textObj, maxLength, lingua){
		var errorMsg = "Sono stati immessi pi\u00f9 dei caratteri consentiti";
		if(lingua != null && lingua == "EN")
			errorMsg = "You fill in more than allowed characters!";
		
		if(textObj){
			textValue = textObj.value;
			lung = textValue.length;
			
			var resto = maxLength-lung;
			if(resto < 0){ 
				resto = 0;
				textValue = textValue.substr(0,maxLength);
				alert(errorMsg);
				textObj.value = textValue;
			}
			
			var contacharObj = document.getElementById("ContaChar");
			if(contacharObj){
				if (contacharObj.innerText != undefined){
					contacharObj.innerText = resto;
				}else{
					contacharObj.textContent = resto;
				}
			}
		}
	}
	
	
	// CONTROLLA SE UN CAMPO E' NUMERICO
	function isNumerico(campo){
		//if(campo.value!=null && campo.value!=""){
		if(campo.value!=""){
			if(isNaN(campo.value) || parseInt(campo.value) < 0 )
		   		return false;
		}
		return true;
	}