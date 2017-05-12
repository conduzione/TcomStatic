function updateSelectHRS(data, type) {
	var date = data.split("/");
	var d=date[0]*1;
	var m=date[1]*1;
	var y=date[2]*1;
	
	var selectDay;
	var selectMonth;
	var selectYea;
	if(document.getElementById("datag")){										/*CASO NAZIONALI-ABBONAMENTI*/
		if(!type){
			selectDay = document.getElementById("datag");
			selectMonth = document.getElementById("datam");
			selectYear = document.getElementById("dataa");
		}else{
			selectDay = document.getElementById("datag_r");
			selectMonth = document.getElementById("datam_r");
			selectYear = document.getElementById("dataa_r");
		}
	}else if(document.getElementById("dateDay")){						/*CASO INTERNAZIONALI*/
		selectDay = document.getElementById("dateDay");
		selectMonth = document.getElementById("dateMonth");
		selectYear = document.getElementById("dateYear");	
	}else if((document.getElementById("startDateDay"))&&(type)){						/*CASO HOTEL START DAY*/
		selectDay = document.getElementById("startDateDay");
		selectMonth = document.getElementById("startDateMonth");
		selectYear = document.getElementById("startDateYear");	
	}else if((document.getElementById("endDateDay"))&&(!type)){						/*CASO HOTEL END DAY*/
		selectDay = document.getElementById("endDateDay");
		selectMonth = document.getElementById("endDateMonth");
		selectYear = document.getElementById("endDateYear");	
	}
	
	selectDay.value = zeroFill(d,2);
	selectMonth.value = zeroFill(m,2);
	selectYear.value = y;
	
	
	document.getElementById("stayPeriod.start.date").value =  (selectDay.value + '.' +  selectMonth.value + '.'  + selectYear.value);
	//alert('stayPeriod.start.date=' + selectDay.value + '/' +  selectMonth.value + '/'  + selectYear.value);

	//document.getElementById("stayPeriod.end.date").value =  (selectDay.value + '.' +  selectMonth.value + '.'  + selectYear.value);
	//alert(document.getElementById("stayPeriod.end.date").value);
	//alert(document.getElementById("startDateDay").value);
	//	alert(document.getElementById("endDateDay").value);
		
		inizioG = document.getElementById("startDateDay").value;
		fineG = document.getElementById("endDateDay").value;
		numerofin =Number(inizioG);
		
		 inizioGDopo= numerofin + 1;
		 
		 if (inizioGDopo == '32'){
		 //alert('dentro');
		 inizioGDopo = 1;
		 inizioGDopoString = 0 + inizioGDopo.toString();
		// alert(inizioGDopoString);
		document.getElementById("endDateDay").value = inizioGDopoString;
		meseInizio =  document.getElementById("endDateMonth").value;
		
		if(Number(meseInizio) <= 9){
		numeroMeseInizio = 0 + Number(meseInizio);
		meseOK = numeroMeseInizio + 1;
		meseOK = 0 + meseOK.toString();
		//alert('meseOK:' + meseOK);
		document.getElementById("endDateMonth").value = meseOK;
		} else {
		numeroMeseInizio = Number(meseInizio);
		meseOK = numeroMeseInizio + 1;
		meseOK = meseOK.toString();
		//alert('meseOK:' + meseOK);
		
		document.getElementById("endDateMonth").value = meseOK;
		
		if (meseOK == 13){
		//alert('sono a gennaio');
		document.getElementById("endDateMonth").value = '01';
		document.getElementById("endDateYear").value = '2013';
		}
		
		}
		
		
		 } else {
		// alert(inizioGDopo);
		  if(inizioGDopo <=9){
		   document.getElementById("endDateDay").value = 0 +  inizioGDopo.toString();
		  }else{
		 
		  document.getElementById("endDateDay").value = inizioGDopo;
		   }
		  document.getElementById("endDateMonth").value = document.getElementById("startDateMonth").value;
		 }  
		 
		 //alert('Mese:' + document.getElementById("startDateMonth").value);
		 meseTrentagg = document.getElementById("startDateMonth").value;
		// alert(meseTrentagg);
		 if((meseTrentagg == '06') || (meseTrentagg == '09') || (meseTrentagg == '11') || (meseTrentagg == '04')){
		//alert('QUA');
		 //alert(inizioGDopo)
		 //alert(document.getElementById("startDateMonth").value);
		 document.getElementById("endDateMonth").value = document.getElementById("startDateMonth").value;
		 
		 
		 
		 if(inizioG ==30){
		 		  if(inizioGDopo <=9){
		   document.getElementById("endDateDay").value = 0 +  inizioGDopo.toString();
		  }else{
		 
		  document.getElementById("endDateDay").value = inizioGDopo;
		   }
		 
		 document.getElementById("endDateDay").value = '01';
		 Meseval = document.getElementById("startDateMonth").value;
		 numeroMese = Number(Meseval) + 1;
		 //alert('giorno' + inizioG + ' - Mese:' + numeroMese);
		 				  if (numeroMese <= 9)
						  	{
		  					numeroMeseStr = 0 + numeroMese.toString(); 
		 					// alert('MesevalAdd:' + numeroMeseStr);
		 					document.getElementById("endDateMonth").value = numeroMeseStr;
							 } else {
							 numeroMeseStr = numeroMese.toString(); 
		 					// alert('MesevalAdd:' + numeroMeseStr);
		 					document.getElementById("endDateMonth").value = numeroMeseStr;
							 }
		 
		  }
		  
		
		
		 } 
		 
		 
		//  alert(document.getElementById("startDateMonth").value) ;
		// alert(document.getElementById("startDateDay").value);
		  if ((document.getElementById("startDateMonth").value== '02') && (document.getElementById("startDateDay").value== '28')){
		  //alert('28 febbraio 2012');
		  document.getElementById("endDateMonth").value = '03';
		  document.getElementById("endDateDay").value = '01';
		  }
		
		 
		
		 
		 //alert(inizioGDopo);
	
		//setField("startDateDay",selectDay.value);
		//setField("startDateMonth",selectMonth.value);
		//setField("startDateYear",selectYear.value);
}




function updateSelectHRS2(data, type) {
	var date = data.split("/");
	var d=date[0]*1;
	var m=date[1]*1;
	var y=date[2]*1;
	
	var selectDay;
	var selectMonth;
	var selectYea;
	if(document.getElementById("datag")){										/*CASO NAZIONALI-ABBONAMENTI*/
		if(!type){
			selectDay = document.getElementById("datag");
			selectMonth = document.getElementById("datam");
			selectYear = document.getElementById("dataa");
		}else{
			selectDay = document.getElementById("datag_r");
			selectMonth = document.getElementById("datam_r");
			selectYear = document.getElementById("dataa_r");
		}
	}else if(document.getElementById("dateDay")){						/*CASO INTERNAZIONALI*/
		selectDay = document.getElementById("dateDay");
		selectMonth = document.getElementById("dateMonth");
		selectYear = document.getElementById("dateYear");	
	}else if((document.getElementById("startDateDay"))&&(type)){						/*CASO HOTEL START DAY*/
		selectDay = document.getElementById("startDateDay");
		selectMonth = document.getElementById("startDateMonth");
		selectYear = document.getElementById("startDateYear");	
	}else if((document.getElementById("endDateDay"))&&(!type)){						/*CASO HOTEL END DAY*/
		selectDay = document.getElementById("endDateDay");
		selectMonth = document.getElementById("endDateMonth");
		selectYear = document.getElementById("endDateYear");	
	}
	
	selectDay.value = zeroFill(d,2);
	selectMonth.value = zeroFill(m,2);
	selectYear.value = y;
	
	
	document.getElementById("stayPeriod.end.date").value =  (selectDay.value + '.' +  selectMonth.value + '.'  + selectYear.value);
	
	//alert('stayPeriod.end.date=' + selectDay.value + '.' +  selectMonth.value + '.'  + selectYear.value);
}

function updateAdults() {

	doubleRooms = document.getElementById("doubleRooms");
	singleRooms = document.getElementById("singleRooms");
	
	document.getElementById("adults").value = ((Number(doubleRooms.value))*2)+Number(singleRooms.value);
	
}
