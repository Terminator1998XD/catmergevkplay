class GameLoader{

  static textures = [];

  constructor(){
    this.ready = null;
    this.reslist = [];
    this.showprogress = false;
  }

  download(){

    const showprogress = this.showprogress
    var proginf;
    var progressinf;
    if(showprogress){
      proginf = $('<div id="proginf">').css({
        'position':'absolute',
        'left':0,'top':0,'z-index':500,'width': '100%','height': '100%',
        'background-color':'#7d7d7d','color':'white'
      });
      progressinf = $('<div id="progressinf">').css({
        'position':'absolute',
        'left':'50%','top':'50%','z-index':501,'transform':'translate(-50%,-50%)','font-size':'7vh'
      }).text('0%');
      $('body').append(proginf.append(progressinf));
    }

    const len = this.reslist.length;
    var complited = 0;
    for(let i = 0; i < len; i++){
      const url = this.reslist[i];
      const img = new Image();
      img.onload = () => {
        complited++;

        if(showprogress){
          progressinf.text(parseInt(complited/len*100)+'%');
        }

        if(complited == len){
          this.ready();
        }
      };
      GameLoader.textures[url.toLowerCase()] = img;
      img.src = url;
    }
  }

  AddTexArr(name, count){
    const reslist = this.reslist;
  	for(let i = 0; i < count; i++){
  		reslist.push('textures/'+name+i+'.png');
  	}
  }
}

function getTex(name){
	return GameLoader.textures['textures/'+name.toLowerCase()+".png"];
}

function getTexs(name,count){
	let arr = [];

	for(let i = 0; i < count;i++)	{
		arr.push(GameLoader.textures['textures/'+name.toLowerCase()+i+".png"]);
	}

	return arr;
}

function getTexs2(name,start,count){
	let arr = [];

	for(let i = start; i < count;i++)	{
		arr.push(GameLoader.textures['textures/'+name.toLowerCase()+i+".png"]);
	}

	return arr;
}
