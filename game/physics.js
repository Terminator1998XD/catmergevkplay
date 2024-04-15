class Physics extends Component{
  constructor(){
    super();
    this.OnUpdate = true;
    this.forceX = 0;
    this.forceY = 30;
    this.recheckcol = false;
  }

  static pool = [];

  Update(){
    const gameobj = this.gameobj;
    const pos = gameobj.pos;
    const size = gameobj.size;
    const nposx = pos.x + this.forceX;
    const nposy = pos.y + this.forceY;
    const colidePos = new Vector2(nposx+5,nposy+5);
    const colideSize = new Size(size.w-10,size.h-10);

    let colided = false;

    const pool = Physics.pool;
    for(let i = 0; i < pool.length; i++){
      const p = pool[i];
      if(p != this){
        const ppos = p['colidePos'];
        const psize = p['colideSize'];

        if(ppos == null) continue;

        if (ppos.x < colidePos.x + colideSize.w &&
            ppos.x + psize.w > colidePos.x &&
            ppos.y < colidePos.y + colideSize.h &&
            ppos.y + psize.h > colidePos.y) {

            colided = true;

            const hendler = this['OnColide'];
            if(hendler != null){
              hendler(p);
            }
        }
      }
    }

    const flag = !colided;
    if(flag || this.recheckcol){
      if(flag && this.recheckcol){
        this.recheckcol = 0;
        this.forceY = 30;
      }
      pos.x = clamp(nposx, 0, 720-size.w);
      pos.y = clamp(nposy, 0, 1280-size.h);
      this.colidePos = colidePos;
      this.colideSize = colideSize;
    }
  }

  Start(){
    if(this['tag'] == null){
      this.tag = 'default';
    }

    this.pos = this.gameobj.pos;
    this.size = this.gameobj.size;

    Physics.pool.push(this);
  }

  Destroy(){
    Physics.pool.splice(Physics.pool.indexOf(this),1);
    this.OnUpdate = false;
    console.log("Destroy");
  }
}
