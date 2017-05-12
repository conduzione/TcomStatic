checkForm2 = function(e){
	if(e=='en'){
		msg1 = 'You have to state Departure station/Arrival station';
		msg2 = 'You have to state Departure station';
		msg3 = 'You have to state Arrival station';
		msg4 = 'The Departure city is not available';
		msg5 = 'The Arrival city is not available';
		msg6 = "You exceeded the maximum limit of seats booked (max. 5)";
		msg7 = 'You have to state the date of departure';
		msg8 = 'Departure Date format must be wrong. Please , state it like that:';
		msg9 = 'You have to state the return date';
		msg10 = 'Return date format must be wrong. Please, state it like that:';
		msg11 = 'Return date is not correct';
		msg12 = "You have to state a passegger";		
		msg13 = "The date you entered is not correct! Please try again";
		msg14 = "The time you entered is not correct! Please try again";
	}else{
		msg1 = 'La stazione di partenza e\' obbligatoria\n La stazione d\'arrivo e\' obbligatoria';
		msg2 = 'La stazione di partenza e\' obbligatoria';
		msg3 = 'La stazione d\'arrivo e\' obbligatoria';
		msg4 = 'La citta\' di partenza non e\' disponibile';
		msg5 = 'La citta\' di ritorno non e\' disponibile';
		msg6 = "Hai superato il limite massimo di posti prenotabili (max. 5)";
		msg7 = 'La data di partenza e\' obbligatoria';
		msg8 = 'Il formato corretto della data e\' gg-mm-aaaa';
		msg9 = 'La data di ritorno e\' obbligatoria';
		msg10 = 'Il formato corretto della data e\' gg-mm-aaaa';
		msg11 = 'La data di ritorno non e\' corretta';
		msg12 = "Devi selezionare almeno un passeggero";
		msg13 = "La data inserita non e\' corretta. Riprova, per favore";
		msg14 = "L\'ora inserita non e\' corretta. Riprova, per favore"; 
	}
	var torna = true;	
	if(document.getElementById('stazin').value=='' && document.getElementById('stazout').value==''){
		alert(msg1); torna=false;
	}else if(document.getElementById('stazin').value==''){
		alert(msg2); torna=false;
	}else if(document.getElementById('stazout').value==''){
		alert(msg3); torna=false;
	}else{
		torna=true;
		//torna=false;
		
	}	
	
		//PARTE AGGIUNTA PER GESTIONE ERRORI PICO
	//controllo che data inserita per partenza non sia minore di data odierna
		if(document.getElementById('cal_id_1').value != ''){
				var datainserimento= document.getElementById('cal_id_1').value;
				var oggi = new Date();
				var giorno = oggi.getDate();
				var mese = oggi.getMonth() + 1;
				var anno = oggi.getFullYear();
			
				
						//controllo formato del mese
						if (mese < 10) {
						mese = "0" + mese;
						}

						// controllo il formato del giorno
						if (giorno < 10) {
						giorno = "0" + giorno;
						}
						
				
				var datacompleta = anno +  mese + giorno;
				//alert (datacompleta);
				var giornoOggi = datainserimento.substring(0, 2);
				var meseOggi = datainserimento.substring(3, 5);
				var annoOggi = datainserimento.substring(6, 10);
				
				var dataOdierna = annoOggi + meseOggi + giornoOggi ;
			//		alert(dataOdierna);
			
 if (dataOdierna-datacompleta<0) {
         	alert(msg13);
		torna = false;	
        }
			
	
	}
	
	
	
	//FINE PARTE AGGIUNTA PER GESTIONE ERRORI PICO	
		
		var eAd = document.getElementById("adulti");
		var NumAdulti = eAd.options[eAd.selectedIndex].value;
		var NumAdulti= parseInt(NumAdulti)
	
		var eRa = document.getElementById("ragazzi");
		var NumRagazzi = eRa.options[eRa.selectedIndex].value;
		var NumRagazzi = parseInt(NumRagazzi)
		
		var totNum = NumAdulti+NumRagazzi;
		//alert(totNum);
	
	if(totNum>5){
		alert(msg6);
		torna = false;
	}
	else if(totNum==0){
		alert(msg6);
		torna = false;
	}
	if(document.getElementById('cal_id_1').value == ''){
		alert(msg7);
		return false;
		torna = false;		
	}
	else{
		var delim1 = '-';
		var delim2 = '-';
		//alert(document.getElementById('cal_id_1').value);
		var expr = new RegExp("^(\\d{2})[" + delim1 + "](\\d{2})[" + delim2 + "](\\d{4})");		
		//alert(expr.exec(document.getElementById('cal_id_1').value));
	
		if(!expr.exec(document.getElementById('cal_id_1').value)) {
			alert(msg8);
			torna=false;
		}
	}
	
			/*
		AGGIUNTO PER GESTIONE ERRORI PICO
		*/
	
			
		if((document.getElementById('timsh').value)== ''){
			alert(msg14);
			torna = false;	
		}
		
		if (isNaN(document.getElementById('timsh').value)){
			alert(msg14);
			torna = false;	
		}
		
	
				/* FINE AGGIUNTA ERRORI PICO*/

	if(document.getElementById('timrh').disabled == false){	
	
		/*
		AGGIUNTO PER GESTIONE ERRORI PICO
		*/
		if((document.getElementById('timrh').value)== ''){
			alert(msg14);
			torna = false;	
		}
		
		if (isNaN(document.getElementById('timrh').value)){
			alert(msg14);
			torna = false;	
		}
		/* FINE AGGIUNTA ERRORI PICO*/
		
		
		var partenza = document.getElementById('cal_id_1').value.split('-');		
		var ritorno = document.getElementById('cal_id_2').value.split('-');		
		var partenzaH = document.getElementById('timsh').value;	
		var ritornoH = document.getElementById('timrh').value;		
		
						//  }
		
		/* FINE AGGIUNTA ERRORI PICO*/
		
		
		if(ritorno == ''){
			alert(msg9);
			torna = false;	
		}
		else{
			if(!expr.exec(document.getElementById('cal_id_2').value)){
				alert(msg10);
				torna=false;
			}
		}		
		
		if(torna == true){
			if (partenza[2]  <= ritorno[2] ) torna = true;
			else torna = false;			
			if (torna == true && partenza[2] == ritorno[2]){
				if(partenza[1] <=  ritorno[1]) torna = true;
				else torna = false;

			}			
			if (torna == true && partenza[2] == ritorno[2] && partenza[1] == ritorno[1]){
				if(partenza[0] <= ritorno[0]) torna=true;
				else torna = false;

			}		
				

		if(document.getElementById('timrh').disabled == false){	
			if (torna == true && partenza[2] == ritorno[2] && partenza[1] == ritorno[1] && partenza[0] == ritorno[0]){
				if(partenzaH < ritornoH) torna=true;
				//alert(partenzaH + "-" + ritornoH);
				else torna = false;

			}
			if(torna == false) alert(msg11);
		}		
		}
	}	
	return torna;	
}
