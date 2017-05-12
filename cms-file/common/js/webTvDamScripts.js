
function hideShowPlayList(){
	var btnShHdPlaylistRef = document.getElementById("btnShowHidePlayList");
	var silverlightObjBoxRef = document.getElementById("silverlightObjBox");
	var silverlightObjRef = document.getElementById("silverlightObj");
	var playListBoxObjRef = document.getElementById("playListBox");
	var botVideoSxBoxRef = document.getElementById("botVideoSxBox");
	
	if(btnShHdPlaylistRef.blur) btnShHdPlaylistRef.blur();
	
	if (silverlightObjRef.width.indexOf("432") >= 0){
		playListBoxObjRef.style.visibility = "hidden";
		silverlightObjBoxRef.style.width = "616px"; 
		silverlightObjBoxRef.style.height = "462px";
		silverlightObjRef.width = "616px"; silverlightObjRef.height = "462px";
		btnShHdPlaylistRef.src="/cms-file/common/img/button_visualizza_PL.gif";
		botVideoSxBoxRef.style.borderRight = "0px none #fff";
	}else{
		silverlightObjRef.width = "432px"; silverlightObjRef.height = "324px";
		silverlightObjBoxRef.style.width = "432px"; 
		silverlightObjBoxRef.style.height = "324px"; 
		playListBoxObjRef.style.visibility = "visible";
		btnShHdPlaylistRef.src="/cms-file/common/img/button_nascondiPL.gif";
		botVideoSxBoxRef.style.borderRight = "1px dotted #999999";
	}
}
