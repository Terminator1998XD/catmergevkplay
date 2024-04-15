class DeadLine extends GameObject{
  constructor(){
    super(new Vector3(0,250,0), new Size(720,5));
    window.curDL = this;
  }

  OnRender(rect){
    const x1 = rect.x, y1 = rect.y;
    const x2 = rect.w+x1;

    g.strokeStyle = 'red';
    g.setLineDash([rect.h, 5]); // Длина линии и длина промежутка
    g.beginPath();
    g.moveTo(x1, y1);
    g.lineTo(x2, y1);
    g.stroke();
    g.setLineDash([]); // Сбросываем параметры длины и промежутка
  }
}
