function checkInfoutiliForm(formObj) {	
	var lingua = "it";
	var langElement = document.getElementById("lang"); 
	if (langElement)  lingua = langElement.value;
	
	var mandatoryMsg = "Entrambe i campi sono OBBLIGATORI!";
	var errorCompareMsg = "La data di fine non pu\u00F2 essere antecedente alla data di inizio!";
	if(lingua != null && lingua == "en"){
		mandatoryMsg = "Warning,\nfields with stars are required!";
		errorCompareMsg = "End date has to be greater than start date!";
	}
	
	var fromDateElement = formObj.fromDate; 
	var toDateElement = formObj.toDate;  
	
	//Controllo obbligatorieta' campi
	if(fromDateElement){
		if(Trim(fromDateElement.value) == ""){
			alert(mandatoryMsg);
			fromDateElement.focus();
			return false;
		}
		if(!isValidDateFormat(fromDateElement.value, lingua))
			return false;
	}
	if(toDateElement){
		if(Trim(toDateElement.value) == ""){
			alert(mandatoryMsg);
			toDateElement.focus();
			return false;
		}
		if(!isValidDateFormat(toDateElement.value, lingua))
			return false;
	}
	
	
	var arr_dateDa = fromDateElement.value.split('/');
	Y_da = arr_dateDa[2];
	M_da = arr_dateDa[1];
	D_da = arr_dateDa[0];
	var data_da = new Date(Y_da,M_da-1,D_da);

	var arr_dateA = toDateElement.value.split('/');
	Y_a = arr_dateA[2];
	M_a = arr_dateA[1];
	D_a = arr_dateA[0];
	var data_a = new Date(Y_a,M_a-1,D_a);

	if(data_a<data_da){
		alert(errorCompareMsg);
		toDateElement.focus();
		return false;
	}
	return true;
}



// ----------------------------------------------------------------------------
//  CONTROLLA LA CORRETTEZZA DI UNA DATA (effettuandone il parsing)
// ----------------------------------------------------------------------------
function isValidDateFormat (str_date, lingua) {
	
	var invalidFormatMsg = "Formato di data non valido";
	var validFormatMsg = "Il formato consentito e' gg/mm/yyyy.";
	var allowedValueMsg = "I valori consentiti sono interi senza segno.";
	var invalidDayMsg = "Valore del giorno del mese non valido";
	var invalidMonthMsg = "Valore del mese non valido";
	var invalidYearMsg = "Valore dell'anno non valido";
	var allowedDayMsg = "L'intervallo consentito e' 01-";
	var allowedMonthMsg = "L'intervallo consentito e' 01-12.";
	var allowedYearMsg = "I valori consentiti sono gli anni successivi al 1900.";
	
	if(lingua != null && lingua == "en"){
		invalidFormatMsg = "Warning, not valid date format";
		validFormatMsg = "Warning, allowed date format is gg/mm/yyyy.";
		allowedValueMsg = "Allowed values are integers without sign.";
		invalidDayMsg = "Not valid day of month";
		invalidMonthMsg = "Not valid month";
		invalidYearMsg = "Not valid year";
		allowedDayMsg = "Allowed interval is 01-";
		allowedMonthMsg = "Allowed months interval is 01-12.";
		allowedYearMsg = "Allowed values are the years beyond 1900.";
	}
	
	
	var RE_NUM = /^\-?\d+$/;
	var NUM_CENTYEAR = 30;
	var arr_date = str_date.split('/');
	
	
	//CONTROLLI PRELIMINARI
	if (str_date.length != 10) {
		alert (invalidFormatMsg + ": '" + str_date + "'.\n" + validFormatMsg);
		return false;
	}
	if (arr_date.length != 3) {
		alert (invalidFormatMsg + ": '" + str_date + "'.\n" + validFormatMsg);
		return false;
	}
	
	//CONTROLLI SUL GIORNO
	if (!arr_date[0]) {
		alert (invalidFormatMsg + ": '" + str_date + "'.\n" + validFormatMsg);
		return false;
	}
	if (arr_date[0].length != 2) {
		alert (invalidFormatMsg + ": '" + str_date + "'.\n" + validFormatMsg);
		return false;
	}
	if (!RE_NUM.exec(arr_date[0])) {
		alert (invalidFormatMsg + ": '" + arr_date[0] + "'.\n" + allowedValueMsg);
		return false;
	}
	
	//CONTROLLI SUL MESE
	if (!arr_date[1]){ 
		alert (invalidFormatMsg + ": '" + str_date + "'.\n" + validFormatMsg);
		return false;
	}
	if (arr_date[1].length != 2){ 
		alert (invalidFormatMsg + ": '" + str_date + "'.\n" + validFormatMsg);
		return false;
	}
	if (!RE_NUM.exec(arr_date[1])) {
		alert (invalidFormatMsg + ": '" + arr_date[1] + "'.\n" + allowedValueMsg);
		return false;
	}
	if (arr_date[1] < 1 || arr_date[1] > 12) {
		alert (invalidMonthMsg + ": '" + arr_date[1] + "'.\n" + allowedMonthMsg);
		return false;
	}
	
	//CONTROLLI SULL'ANNO
	if (!arr_date[2]) {
		alert (invalidFormatMsg + ": '" + str_date + "'.\n" + validFormatMsg);
		return false;
	}
	if (arr_date[2].length != 4){ 
		alert (invalidFormatMsg + ": '" + str_date + "'.\n" + validFormatMsg);
		return false;
	}
	if (!RE_NUM.exec(arr_date[2])) {
		alert (invalidFormatMsg + ":  '" + arr_date[2] + "'.\n" + allowedValueMsg);
		return false;
	}
	if (arr_date[2] < 1900) {
		alert (invalidYearMsg + ":  '" + arr_date[2] + "'.\n" + allowedYearMsg);
		return false;
	}
	
	//CONTROLLO VALIDITA DEL GIORNO DEL MESE
	if (arr_date[2] < 100) {
		arr_date[2] = Number(arr_date[2]) + (arr_date[2] < NUM_CENTYEAR ? 2000 : 1900);
	}
	var dt_date = new Date();
	dt_date.setDate(1);
	dt_date.setMonth(arr_date[1]-1);	
	dt_date.setFullYear(arr_date[2]);
	var dt_numdays = new Date(arr_date[2], arr_date[1], 0);
	dt_date.setDate(arr_date[0]);
	
	if (dt_date.getMonth() != (arr_date[1]-1)){ 
		alert (invalidDayMsg + ": '" + arr_date[0] + "'.\n" + allowedDayMsg+dt_numdays.getDate()+".");
		return false;
	}
	return true;
}