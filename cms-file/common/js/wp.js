	function controllo()
			{

				code="ok";
				if((document.forms[1].elements[0].value=='')||(document.forms[1].elements[1].value==''))
 				{
  					alert('ATTENZIONE inserire user e password.');
					return false;
 				}


				if(!encrypt(document.forms[1].elements[1].value))
				{
					return false;
				}
 			}

 			function encrypt(input)
	   		{
   				car = new Array(input.length);
   				for(i=0; i<input.length; i++)
	      		{
	   				car[i] = input.charCodeAt(i);
	   				if(((car[i] >= 48)&&(car[i] <= 57))
	   					||((car[i] >= 65)&&(car[i] <= 90))
	   					||((car[i] >= 97)&&(car[i] <= 122)))
	   				{}
	   				else
	   				{
	   					alert('La password deve essere formata da lettere e numeri.');
	   					return false;
	   				}
	   			}
   				return true;
   			}