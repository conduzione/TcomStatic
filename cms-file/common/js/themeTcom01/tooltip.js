var $j = jQuery.noConflict();
/* the next line is an example of how you can override default options globally (currently commented out) ... */

  // $j.fn.tooltipmap.defaults.tracking = true;
  // $j.fn.tooltipmap.defaults.width = 'auto';
  // $j.fn.tooltipmap.defaults.roma = true;
  // $j.fn.tooltipmap.defaults.napoli = true;
  // $j.fn.tooltipmap.defaults.milano = true;
  // $j.fn.tooltipmap.defaults.firenze = true;
  // $j.fn.tooltipmap.defaults.bologna = true;
  // $j.fn.tooltipmap.defaults.torino = true;
  // $j.fn.tooltipmap.defaults.pisa = true;
  // $j.fn.tooltipmap.defaults.padova = true;
  // $j.fn.tooltipmap.defaults.venezia = true;
  // $j.fn.tooltipmap.defaults.bardonecchia = true;
  // $j.fn.tooltipmap.defaults.genova = true;
  // $j.fn.tooltipmap.defaults.firenze = true;
  // $j.fn.tooltipmap.defaults.livorno = true;
	 // $j.fn.tooltipmap.defaults. trieste = true;
	 // $j.fn.tooltipmap.defaults. verona = true;
	 // $j.fn.tooltipmap.defaults. rimini = true;
	 // $j.fn.tooltipmap.defaults. senigallia = true;
	 // $j.fn.tooltipmap.defaults. sorrento = true;
	 // $j.fn.tooltipmap.defaults. arezzo = true;
	 // $j.fn.tooltipmap.defaults. rovereto = true;
	 // $j.fn.tooltipmap.defaults. trento = true;
	 // $j.fn.tooltipmap.defaults. bari = true;
  // $j.fn.tooltipmap.defaults.arrows = true;
  

$j(document).ready(function() {

 // $j.tooltipmap.setup({insertionType: 'insertBefore', insertionElement: 'div:first'});
 // $j.fn.tooltipmap.defaults.ajaxSettings.beforeSend = function(ct) {
 //     console.log(this);
 // };

//default theme
  $j('a.title').tooltipmap({splitTitle: '|'});
  $j('a.basic').tooltipmap();
  $j('a.custom-width').tooltipmap({width: '200px', showTitle: false});
  $j('h4').tooltipmap({attribute: 'id', hoverClass: 'highlight'});
  $j('#roma').tooltipmap({roma: true, closePosition: 'title', arrows: true });
  $j('#napoli').tooltipmap({napoli: true, closePosition: 'title', arrows: true });
  $j('#milano').tooltipmap({milano: true, closePosition: 'title', arrows: true });
  $j('#firenze').tooltipmap({firenze: true, closePosition: 'title', arrows: true });
  $j('#bologna').tooltipmap({bologna: true, closePosition: 'title', arrows: true });
  $j('#torino').tooltipmap({torino: true, closePosition: 'title', arrows: true });
  $j('#pisa').tooltipmap({pisa: true, closePosition: 'title', arrows: true });
  $j('#padova').tooltipmap({padova: true, closePosition: 'title', arrows: true });
  $j('#venezia').tooltipmap({venezia: true, closePosition: 'title', arrows: true });
  $j('#bardonecchia').tooltipmap({bardonecchia: true, closePosition: 'title', arrows: true });
  $j('#genova').tooltipmap({genova: true, closePosition: 'title', arrows: true });
  $j('#firenze').tooltipmap({firenze: true, closePosition: 'title', arrows: true });
  $j('#livorno').tooltipmap({livorno: true, closePosition: 'title', arrows: true });
  $j('#trieste').tooltipmap({trieste: true, closePosition: 'title', arrows: true });
  $j('#verona').tooltipmap({verona: true, closePosition: 'title', arrows: true });
  $j('#rimini').tooltipmap({rimini: true, closePosition: 'title', arrows: true });
  $j('#senigallia').tooltipmap({senigallia: true, closePosition: 'title', arrows: true });
  $j('#sorrento').tooltipmap({sorrento: true, closePosition: 'title', arrows: true });
  $j('#arezzo').tooltipmap({arezzo: true, closePosition: 'title', arrows: true });
  $j('#rovereto').tooltipmap({rovereto: true, closePosition: 'title', arrows: true });
  $j('#trento').tooltipmap({trento: true, closePosition: 'title', arrows: true });
  $j('#bari').tooltipmap({bari: true, closePosition: 'title', arrows: true });
  $j('#examples a:eq(5)').tooltipmap({
    hoverClass: 'highlight',
    roma: true,
	napoli: true,
	milano: true,
	firenze: true,
	bologna: true,
	torino: true,
	pisa: true,
	padova: true,
	venezia: true,
	bardonecchia: true,
	genova: true,
	firenze: true,
	livorno: true,
	trieste: true,
	verona: true,
	rimini: true,
	senigallia: true,
	sorrento: true,
	arezzo: true,
	rovereto: true,
	trento: true,
	bari: true,
    closePosition: 'bottom',
    closeText: '<img src="/cms-file/immagini/trenitalia/mappa/close.gif" alt="close" width="16" height="16" />',
    truncate: 60
	
  });
  $j('a.load-local').tooltipmap({local:true, hideLocal: true, roma: true, napoli: true, milano: true, firenze: true,bologna: true,torino: true, pisa: true, padova: true, venezia: true, bardonecchia: true, genova: true,  firenze: true, livorno: true,  trieste: true,  verona: true, rimini: true, senigallia: true, sorrento: true, arezzo: true, rovereto: true, trento: true, bari: true, arrows: true, cursor: 'pointer'});
  $j('#clickme').tooltipmap({activation: 'click', roma: true,  napoli: true, milano: true, firenze: true,bologna: true, torino: true, pisa: true, padova: true, venezia: true, bardonecchia: true, genova: true,  firenze: true, livorno: true,  trieste: true,  verona: true, rimini: true,senigallia: true,sorrento: true,arezzo: true,rovereto: true, trento: true, bari: true, width: 650});
  $j('ol:first a:last').tooltipmap({tracking: true});

// jTip theme
  $j('a.jt:eq(0)').tooltipmap({
    tooltipmapClass: 'jtip',
    arrows: true,
    dropShadow: false,
    roma: true,
	napoli: true,
	milano: true,
	firenze: true,
	bologna: true,
	torino: true,
	pisa: true,
	padova: true,
	venezia: true,
	bardonecchia: true,
	genova: true,
	firenze: true,
	livorno: true,
	trieste: true,
	verona: true,
	rimini: true,
	senigallia: true,
	sorrento: true,
	arezzo: true,
	rovereto: true,
	trento: true,
	bari: true,
    mouseOutClose: true,
    closePosition: 'title',
    closeText: '<img src="/cms-file/immagini/trenitalia/mappa/close.gif" alt="close" />'
  });
  $j('a.jt:eq(1)').tooltipmap({tooltipmapClass: 'jtip', arrows: true, dropShadow: false, hoverIntent: false});
  $j('span[title]').css({borderBottom: '1px solid #900'}).tooltipmap({splitTitle: '|', arrows: true, dropShadow: false, tooltipmapClass: 'jtip'});

  $j('a.jt:eq(2)').tooltipmap({
    tooltipmapClass: 'jtip',
    arrows: true,
    dropShadow: false,
    height: '150px',
	roma: true,
	napoli: true,
	milano: true,
	firenze: true,
	bologna: true,
	torino: true,
	pisa: true,
	padova: true,
	venezia: true,
	bardonecchia: true,
	genova: true,
	firenze: true,
	livorno: true,
	trieste: true,
	verona: true,
	rimini: true,
	senigallia: true,
	sorrento: true,
	arezzo: true,
	rovereto: true,
	trento: true,
	bari: true,
    positionBy: 'bottomTop'
  });

  $j('a.jt:eq(3)').tooltipmap({local: true, hideLocal: false});

  $j('a.jt:eq(4)').tooltipmap({
    tooltipmapClass: 'jtip', arrows: true,
    dropShadow: false,
    onActivate: function(e) {
      var cb = $j('#cb')[0];
      return !cb || cb.checked;
    }
  });

// Rounded Corner theme
  $j('ol.rounded a:eq(0)').tooltipmap({arrows: true, roma: true, napoli: true, milano: true, firenze: true,bologna: true,torino: true, pisa: true, padova: true, venezia: true, bardonecchia: true, genova: true,  firenze: true, livorno: true,  trieste: true,  verona: true, rimini: true, senigallia: true, sorrento: true, arezzo: true, rovereto: true, trento: true, bari: true, splitTitle: '|', tooltipmapClass: 'rounded', showTitle: false});
  $j('ol.rounded a:eq(1)').tooltipmap({tooltipmapClass: 'rounded', dropShadow: false, showTitle: false, positionBy: 'mouse'});
  $j('ol.rounded a:eq(2)').tooltipmap({tooltipmapClass: 'rounded', dropShadow: false, showTitle: false, positionBy: 'bottomTop', topOffset: 70});
  $j('ol.rounded a:eq(3)').tooltipmap({tooltipmapClass: 'rounded', dropShadow: false, roma: true, napoli: true, milano: true, firenze: true,bologna: true,torino: true, pisa: true, padova: true, venezia: true, bardonecchia: true, genova: true,  firenze: true, livorno: true,  trieste: true,  verona: true, rimini: true, senigallia: true, sorrento: true, arezzo: true,rovereto: true,trento: true,bari: true,ajaxCache: false});
  $j('ol.rounded a:eq(4)').tooltipmap({tooltipmapClass: 'rounded', dropShadow: false});
});

