class Player extends GameObject{
  constructor(){
    super(new Vector3(720/2, curDL.pos.y ,10), new Size(10,1024 - curDL.pos.y));
    this.OnUpdate = true;
    GetNextCat();
  }

  OnRender(rect){
    const x1 = rect.x, y1 = rect.y;
    const y2 = rect.h+y1;

    g.strokeStyle = 'white';
    g.setLineDash([rect.w, 5]); // Длина линии и длина промежутка
    g.beginPath();
    g.moveTo(x1, y1);
    g.lineTo(x1, y2);
    g.stroke();
    g.setLineDash([]); // Сбросываем параметры длины и промежутка
  }

  Update(){
    this.pos.x = clamp(mx,10,710);
  }
}
