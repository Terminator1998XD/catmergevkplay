class Cat extends GameObject{
  static pool = [];
  constructor(){
    const lvl = getrand(0,Math.min(catslen, CurLevel));
    const tex = getTex('cats/'+lvl);
    super(new Vector3(300, curDL.pos.y - tex.height,1), new Size(tex.width, tex.height));
    this.setTexture(tex);
    this.lvl = lvl;
    this.OnUpdate = true;
    this.isDrop = false;
    this.loseCheck = false;
    Cat.pool.push(this);
  }

  Drop(){
    this.isDrop = true;
    PlaySound('bubble');
    setTimeout(GetNextCat,350);

    var counter = 0;
    var interval = setInterval(()=>{
      if(!OnPause&&counter++ > 5){
        this.loseCheck = true;
        clearInterval(interval);
      }
    },100);


    const ph = this.AddComponent(Physics, {tag: 'cat', OnColide: (any)=>{
      if(any.tag == 'cat' && this.lvl == any.gameobj.lvl){
        AddScore(any.gameobj.lvl+1);
        console.log("Слияние!");
        any.gameobj.OnExplode();
        PlaySound('bubble');
        if(this.lvl + 1 >= catslen){
          return;
        }

        this.lvl++;
        const tex = getTex('cats/'+this.lvl);
        CurLevel = Math.max(CurLevel, this.lvl + 1);
        this.size.w = tex.width;
        this.size.h = tex.height;
        this.pos.x = clamp(this.pos.x, 30, 719 - this.size.w);
        this.pos.y = clamp(this.pos.y, 0, 1279 - this.size.h);
        ph.recheckcol = true;
        ph.forceY = -30;
        this.setTexture(tex);
      }
    }});

    this.ph = ph;
  }

  OnExplode(){
    this.ph.Destroy();
    dim.map.splice(dim.map.indexOf(this),1);
    new Explode(new Vector3(this.pos.x,this.pos.y,this.pos.z), new Size(this.size.w,this.size.h));
  }

  Update(){
    if(this.isDrop){
      if(curDL.pos.y >= this.pos.y && this.loseCheck){
        Lose('losetext');
      }
    }
    else{
      const w = this.size.w;
      this.pos.x = clamp(mx-w/2,1,719-w);

      if(AnyMouseUp){
        AnyMouseUp = false;
        this.Drop();
      }
    }
  }
}
