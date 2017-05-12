function startRadio() {
	if(!(document.cookie.length > 0 && document.cookie.indexOf('webradio') != -1)) {
		document.cookie = "webradio=start;path=/";
		var win=window.open('/cms-file/html/fsnews/webradio.html','WebRadio','toolbar=no, scrollbars=no, location=no, statusbar=no, menubar=no, resizable=no, width=250, height=120,status=no');
	}
}

startRadio();
