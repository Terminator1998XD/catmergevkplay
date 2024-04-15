function Init(){
	if(window['lang'] != null) return;
	window.backgroundTexture = getTex('back');

	window.lang = 'ru';
	window.scoreui = $('#score');
	window._advprompt = [];
	window.score = 0;
	window.scoremul = 1;
	window.exp = getTexs('exp/e',22);

	dim.addGameObject(new DeadLine());
	window.P = new Player();
	player = [P];

	loadBackgroundTrackPosition();

	let rec = localStorage['CatTetrisRec'];

  if(rec != null && rec > 0){
			$('.record').html(parseInt(rec));
	}
	else{
		$('#startGame .record').parent().remove();
	}

	window.isPC = false;
	EngineRun();

	$('.overlay').show();

	hideTexts();

	const queryString = window.location.search.slice(1);
	  if (queryString) {
		  const paramsArray = queryString.split('&');
		  window.paramsObject = {};

		  paramsArray.forEach(param => {
			  const [key, value] = param.split('=');
			  paramsObject[key.toLowerCase()] = value.toLowerCase();
		  });
	  }
	  else window.paramsObject = {lang: 'en'};

	if (typeof iframeApi === 'undefined') {
			console.log('Cannot find iframeApi function, are we inside an iframe?');
			return;
	}

	iframeApi({appid: 33707,adsCallback: adsCallback}).then(function(api){
		window.ysdk = api;
		console.log('VK SDK initialized');
		window.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

		window.lang = paramsObject.lang == 'ru_ru' ? 'ru' : 'en';

		window.isPC = !window.isMobile;

		if(isPC && myOrentation==orentations.vertical){
			$('body').css({'background-image': 'url("textures/htmlback.jpg")','background-size':'cover'});
			const neonColor = 'rgb(255, 255, 255)'; // Здесь вы можете выбрать цвет неона
			const border = '1px solid white';
			$(canvas).css({
				'box-shadow': `0 0 10px ${neonColor}`,
				'border-left': border,
				'border-right': border
			});
		}

		$('#scoreblock').show();
		translateBlocks();
		fillSettings();
		resizeCanvas();
		$('#proginf').remove();
	});
}

function NewGame(){
	yabanner(function(){
		$('.overlay').hide();
		$('#deadscr').hide();
		$('#pausem').hide();

		_loseflag = false;

		if(isMobile) ysdk.adv.hideBannerAdv();

		dim.map = [curDL];
		Cat.pool = [];
		CurLevel = 1;

		Physics.pool = [];

		window.score = 0;
		window._advprompt = [];
		window.P = new Player();
		$('#score').text(0);
		OnPause = false;
	});
}

var _loseflag = false;
function Lose(res){
	if(_loseflag) return;
	_loseflag = true;
	OnPause = true;
	PlaySound('lose');

	dead_advprompt(TXT(res),preAlive,postAlive);

	function preAlive(){
		const clonepool = [...Cat.pool];
		for(let i = 0; i < clonepool.length; i++){
			const cat = clonepool[i];
			if((Math.abs(curDL.pos.y - cat.pos.y) < 400) && cat.isDrop){
				console.log("start delete cat");
				cat.OnExplode();
				console.log("end delete cat");
			}
		}
	}

	function postAlive(){
		OnPause = false;
		_loseflag = false;
	}
}

function PlayClick(){
	yabanner(function(){
		document.getElementById("startGame").remove();
		$('.overlay').hide();
		OnPause = false;
		playMusic();
		if(isMobile) ysdk.adv.hideBannerAdv();
	});
}

function TogglePause(){
	OnPause = !OnPause;
	saveBackgroundTrackPosition();

	if(OnPause){
		updlb();
		$('.overlay').show(500);
		$('#pausem').show();
	}
	else {
		$('.overlay').hide();
		$('#pausem').hide();
		playMusic();
	}
}

document.addEventListener("visibilitychange", function() {
  if (document.visibilityState === "hidden") {
		if(!OnPause){
			OnPause = true;
			updlb();
			$('.overlay').show(500);
			$('#pausem').show();
		}
		pauseMusic();
		StopAllSound();
  }
});

function AddScore(_score){
	score = parseInt(score + (_score * scoremul));
	scoreui.text(score);
}
