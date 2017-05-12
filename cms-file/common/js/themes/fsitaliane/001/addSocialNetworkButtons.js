
var socialToolsEmbedCode = 
	"<div class=\"socialToolsCc\">Condividi: " +
	"<a href=\"https://twitter.com/share\" class=\"twitter-share-button\">Tweet</a> " +
	"<div class=\"g-plusone\" data-size=\"medium\" data-annotation=\"none\"></div> " +
	"<div id=\"fb-root\"></div> " +
	"<fb:like send=\"false\" layout=\"button_count\" show_faces=\"false\" font=\"arial\"></fb:like> " +
	"<div class=\"cl\"></div> " +
	"</div> ";
	
	//facebook
	(function(d, s, id) {
	  $("#socialToolsBox").html(socialToolsEmbedCode);
	
	  var js, fjs = d.getElementsByTagName(s)[0];
	  if (d.getElementById(id)) return;
	  js = d.createElement(s); js.id = id;
	  js.src = "//connect.facebook.net/it_IT/all.js#xfbml=1&appId=486533648037680";
	  fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
	//gplus
	(function() {
	    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
	    po.src = 'https://apis.google.com/js/plusone.js';
	    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
	  })();
	  //twitter
	  !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");

