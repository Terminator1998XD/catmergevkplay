function updlb(){
  let xp = score;
  let rec = localStorage['CatTetrisRec'];

  if(rec == null){
    localStorage['CatTetrisRec'] = xp;
    rec = xp;
  }else {
    rec = parseInt(rec);

    if(xp > rec){
      rec = xp;
      localStorage['CatTetrisRec'] = xp;
    }
  }

  $('.crecord').html(parseInt(xp));
  $('.record').html(parseInt(rec));
}
