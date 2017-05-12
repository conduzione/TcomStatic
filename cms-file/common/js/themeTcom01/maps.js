var defaultN = 41.919651;
var defaultE = 12.480469;
var defaultZoom = 11;
var map = '';
var cities = new Array();
var poi = new Array();
var marker = new Array();
var locationText = new Array();
var defaulDirectionMode = 'driving';
$(function() {
	/* inserisco la funazione per la ricerca percorso */
	$('#submitMap').each(function() {
		$(this).click(function(event) {
			event.preventDefault();
			calcolaPercorso();
		});
	});
	/* nascondo i tab delle viste e mostro il primo */
	$('.tabMap', '.tabViste').hide();
	$('.tabViste').find('.tabMap').eq(1).show();

	/* aggiungo la funzione per i tab delle viste */
	$('.mapTab li a').each(function() {
		$(this).click(function(event) {
			event.preventDefault();
			$(this).parent().parent().find('li').removeClass('on');
			$('.tabMap', '.tabViste').hide();
			$(this).parent().addClass('on');
			var contatoreTab = $(this).parent().prev('li').size();
			$('.tabViste').find('.tabMap').eq(contatoreTab).show();
		});
	});

	/* inizializzo la mappa */
	if ($('#map_canvas').size() != 0) {
		$('#selectLocation').change(function() {
			cambiaLocalita();
		});
		map = new google.maps.Map(document.getElementById("map_canvas"), {
			mapTypeId : google.maps.MapTypeId.ROADMAP
		});
		directionsDisplay = new google.maps.DirectionsRenderer();
		var mapxmlToLoad = 'cms-file/common/xml/googleMap.xml';
		$.ajax({
			type : "GET",
			url : mapxmlToLoad,
			dataType : 'xml',
			success : function(xml) {
				$('#selectLocation').empty();
				$(xml).find('option').each(function() {
					$('#selectLocation').append("<option value='" + $(this).attr('name') + "'>" + $(this).attr('name') + "</option>");
					cities.push($(this));
				});
				$(xml).find('item').each(function() {					
					poi.push($(this));
				});
				cambiaLocalita(true);
			}
		});
	}

	$('.buttons > li').each(function(i,e){
		$(e).children('a').toggle(
			function(){
				typeFilter = $(this).attr('class');				
				if(typeof($(this).css("background-position")) != "undefined") {
					posx = $(this).css('background-position').split(' ')[0];
					$(this).css({'background-position':posx+' -32px'});
				}else {
					$(this).css("background-position-y","-32px");
				}				
				for (i in marker) {					
			        if (marker[i].categoria == typeFilter) {
			        	marker[i].setVisible(false);
			    	}
			    }
			},
			function(){
				typeFilter = $(this).attr('class');				
				if(typeof($(this).css("background-position")) != "undefined") {
					posx = $(this).css('background-position').split(' ')[0];
					$(this).css({'background-position':posx+' 0px'});
				}else {
					$(this).css("background-position-y","0px");
				}
				for (i in marker) {
			        if (marker[i].categoria == typeFilter) {
			          marker[i].setVisible(true);
			    	}
			    }
			}
		)
	});
	
	$('.invertiMap').click(
		function(i, val) {
			i.preventDefault();
			var newOrigin = $('#roadMap').find('input').eq($('#roadMap').find('input').size() - 1).val();
			var newDestination = $('#roadMap').find('input').eq(0).val();
			$('#roadMap').find('input').eq(0).val(newOrigin);
			$('#roadMap').find('input').eq($('#roadMap').find('input').size() - 1).val(newDestination);
			calcolaPercorso();
		}
	);
	$('.mapMode').click(function(i, val) {
		i.preventDefault();
		defaulDirectionMode = $(this).attr('id');
		$(this).parent().find('.mapMode').removeClass('on');
		$(this).addClass('on');
		calcolaPercorso();
	});
	$('.optionRight > input,#mapAutostrade,#mapPedaggi').click(function(i, val) { calcolaPercorso(); });
	$('.trovaPercorsoOpen a').click(function(i, val) {
		i.preventDefault();
		$('.trovaPercorso').animate({ left : '0' }, 500, function() { });
	});
	$('#openClose').toggle(function(){
		$(this).parent('.filter').animate({right : '-55px'}).addClass('off');
	},function(){
		$(this).parent('.filter').animate({right : '0'}).removeClass('off');
	})
	
	$('.chiudiPercorso').click(function(i, val) {
		i.preventDefault();
		$('.trovaPercorso').animate({
			left : '-229px'
		}, 500, function() {
		});
	});
	$('.mostraOpzioni').click(function(i, val) {
		i.preventDefault();
		$('.moreOption').toggle();
		if ($('.moreOption:visible').size() == 1) {
			$(this).html('Nascondi opzioni');
		} else {
			$(this).html('Mostra opzioni');
		}
	});

	$('.percorsiSuggeriti a').click(function(i, val) {
		i.preventDefault();
		$('#distance_road').toggle();
		if ($('#distance_road:visible').size() == 1) {
			$(this).addClass('on');
		} else {
			$(this).removeClass('on');
		}
	});
	if (querystring('lat')) { defaultN = querystring('lat'); }
	if (querystring('lon')) { defaultE = querystring('lon'); }
	if (querystring('zoom')) { defaultZoom = parseInt(querystring('zoom')) + 1; }
	if (querystring('unita')) {
		var unita = querystring('unita');
		if (unita != '') {
			$($('#' + unita).attr('checked', 'checked'));
		}
	}
	if (querystring('mapAutostrade')) {
		var mapAutostrade = querystring('mapAutostrade');
		if ((mapAutostrade != '') && (mapAutostrade == 'true')) {
			$('#mapAutostrade').attr('checked', 'checked');
		}
	}
	if (querystring('mapPedaggi')) {
		var mapPedaggi = querystring('mapPedaggi');
		if ((mapPedaggi != '') && (mapPedaggi == 'true')) {
			$('#mapPedaggi').attr('checked', 'checked');
		}
	}
	if (querystring('origin')) {
		var origin = querystring('origin');
		$('#roadMap').find('input').eq(0).val(unescape(origin));
	}
	if (querystring('destination')) {
		var destination = querystring('destination');
		$('#roadMap').find('input').eq(1).val(unescape(destination));
	}

	if (($('#roadMap').find('input').eq(0).attr('value') != '')
			&& ($('#roadMap').find('input').eq(1).attr('value') != '')) {
		calcolaPercorso();
	}
	/* fine function */
});

function aggiornaMappa() {
	map.setOptions({
		zoom : parseInt(defaultZoom),
		center : new google.maps.LatLng(defaultN, defaultE),
		mapTypeControl : false
	})
}

/* inizializzo la mappa ed inserisco i poi */
function creaMappa(cities, poi, map) {
	marker = new Array();	
	map.setOptions({
		zoom : parseInt(defaultZoom),
		center : new google.maps.LatLng(defaultN, defaultE),
		mapTypeControl : false
	});	
	//var infowindow = new google.maps.InfoWindow({ content : '' });
	for (j = 0; j < poi.length; j++) {
		var ico = 'cms-file/common/img/ico_' + poi[j].attr('type') + '.png';
		marker[j] = new google.maps.Marker({
			position : new google.maps.LatLng(poi[j].attr('N'), poi[j].attr('E')),
			map : map,
			clickable : true,
			icon : ico,
			title : poi[j].attr('title')
		});
		marker[j].categoria = poi[j].attr('type');
		locationText[j] = '<p style="max-width: 320px;">' + poi[j].attr('text') + '</p>';
		google.maps.event.addListener(
			marker[j],
			'click',
			(
				function(marker, j) {
					return function() {
						var geocoder = new google.maps.Geocoder();
						var coord = new google.maps.LatLng(poi[j].attr('N'), poi[j].attr('E'));
						geocoder.geocode(
							{'location' : coord},
							function(results, status) {
								if (status == google.maps.GeocoderStatus.OK) {
									var campoInput = $('#roadMap').find('input').eq(0);
									var start = true;
									$('#roadMap').find('input').each(function() {
										if(start){ if ($(this).val() == '') {
											campoInput = this; start = false;
										}}
									})
									$(campoInput).val(results[0].address_components[1].long_name+ ',' 
									+ results[0].address_components[0].long_name
									+ ' - ' + results[0].address_components[2].long_name);
								}
							}
						);
						//infowindow.setContent(locationText[j]);
						//infowindow.open(map, this);
					}
				}
			)(marker, j)
		);	
	}
}

/* inizializzo gestisco il cambio di localita' */
function cambiaLocalita(first) {
	var selezionato = $('#selectLocation').find('option:selected').prevAll('option').size();
	defaultN = cities[selezionato].attr('N');
	defaultE = cities[selezionato].attr('E');
	defaultZoom = cities[selezionato].attr('zoom');
	$('.immagineMappa').attr('alt', cities[selezionato].attr('title'));
	$('.immagineMappa').attr('src', cities[selezionato].attr('url'));
	var origin = escape($('#roadMap').find('input').eq(0).val());
	if (origin == '') {
		origin = escape($('#roadMap').find('input').eq(0).attr('value'));
	}
	var destination = escape($('#roadMap').find('input').eq(1).val());
	if (destination == '') {
		origin = escape($('#roadMap').find('input').eq(1).attr('value'));
	}	
	if(first){
		creaMappa(cities, poi, map);
	}else{ 
		aggiornaMappa ();
	}
}



/* gestisco le querystring javascript */
function querystring(id) {
	var query = location.search;
	query = query.substring(1, query.length);
	var parametro = query.split('&');
	for (j = 0; j < parametro.length; j++) {
		var voce = parametro[j].split('=');
		if (voce[0] == id) {
			var ap = voce[1].split('+');
			voce[1] = ap[0];
			for (k = 1; k < ap.length; k++){
				voce[1] += ' ' + ap[k];
			}
			voce[1] = unescape(voce[1]);
			return voce[1];
		}
	}
}

/* trovo il percorso */
function calcolaPercorso() {
	var origin = $('#roadMap').find('input').eq(0).val();
	var destination = $('#roadMap').find('input').eq($('#roadMap').find('input').size() - 1).val();
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode(
		{'address' : destination},
		function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				var destinationCoord = results[0].geometry.location;
				var directionsService = new google.maps.DirectionsService();
				directionsDisplay.setMap(map);
				directionsDisplay.setPanel(document.getElementById('distance_road'));
				$('#title_road').html('Indicazioni stradali per ' + destination);
				$('.percorsiSuggeriti').show();
				geocoder.geocode(
					{'address' : origin},
					function(results, status) {
						var originCoord = results[0].geometry.location;
						var request = {
							origin : originCoord,
							destination : destinationCoord,
							travelMode : getSelectedTravelMode(),
							unitSystem : getSelectedUnitSystemfunction(),
							avoidHighways : getAvoidHighways(),
							avoidTolls : getAvoidTolls()
						};
						directionsService.route(request, function(response,status) {
							if (status == google.maps.DirectionsStatus.OK) {
								directionsDisplay.setDirections(response);
							}
						});
					}
				);

			} else {
				alert("Inserisci correttamente l'indirizzo o clicca sui punti di interesse");
			}
		}
	);
}

function getSelectedTravelMode() {
	var value = defaulDirectionMode;
	if (value == 'driving') {
		value = google.maps.DirectionsTravelMode.DRIVING;
	} else if (value == 'bicycling') {
		value = google.maps.DirectionsTravelMode.BICYCLING;
	} else if (value == 'walking') {
		value = google.maps.DirectionsTravelMode.WALKING;
	} else {
		alert('Unsupported travel mode.');
	}
	return value;
}

function getSelectedUnitSystemfunction() {
	return $('.optionRight > input:checked').attr('value') == 'METRIC' ? google.maps.DirectionsUnitSystem.METRIC
			: google.maps.DirectionsUnitSystem.IMPERIAL;
}

function getAvoidHighways() {
	var valore = ($('#mapAutostrade:checked').size() == 1) ? true : false;
	return valore
}

function getAvoidTolls() {
	var valore = ($('#mapPedaggi:checked').size() == 1) ? true : false;
	return valore
}