var images = {
    hero:           new Image(), 
    magorBaseball1: new Image(), 
    magorkaPunk1:   new Image(),
    meda1:          new Image(),
    minidrak:       new Image(),
    vojak:          new Image(),
    drak:       new Image(),
    vlk1:       new Image(), 
    partyzanka:     new Image(),
    bazook:         new Image()
}
var k = _.keys(images);
for(var i = 0;i<k.length;i++){
    this.images[k[i]].src = "img/"+k[i]+".png";
}