const orentations = {vertical: 0, horizontal: 1};

const myOrentation = orentations.vertical;
const gameViewport = [720,1280];

const loader = new GameLoader();
loader.showprogress = true;

loader.reslist.push('textures/back.png');

var reslist_audios = [
	"lose.wav","bubble.mp3"
];

const catslen = 8;
loader.AddTexArr('cats/',catslen);
loader.AddTexArr('exp/e',22)

function PreInit(){
	loader.ready = Init;
	loader.download();
}

document.addEventListener('DOMContentLoaded', function() {
  PreInit();
});
