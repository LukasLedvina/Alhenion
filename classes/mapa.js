var Mapa = Class.extend({
    width: 0,
    height: 0,
    root: 8,
    fields: [],
    lastSelectedUnit: null,
    lastActiveField: null,
    initialize: function(){// fields {xintyint: {jednotka: Jednotka, kulisa: Kulisa}}
        //poslední označená jednotka - pro pořteby zrušení selekce
        this.lastSelected = null;
        //úprava rozměrů plátna
        var cnv = $("#mapa").attr({width:window.innerWidth,height:window.innerHeight}).css({position:"absolute",top:0,left:0, border: "1px solid purple"});
        
        //debug info o souřadnicích
        $(document.body).append($("<div>").attr({id: "souradnice"}));
        
        $("#mouse").css({width:window.innerWidth,height:window.innerHeight})
        $("#mouse").mousemove($.proxy(function(e){
            var x = parseInt(e.pageX-((window.innerWidth-this.width)/2));
            var y = parseInt(e.pageY-((window.innerHeight-this.height)/2));
            y = this.height-y;
            var p = this.getFPPX(x,y);
            
            //je-li myš nad novým polem
            if( p && this.lastActive != p ){
                
            //debug info o souřadnicích myši
            $("#souradnice").html(x+","+y+" ppx:"+this.getFPPX(x,y).x+" ppy:"+this.getFPPX(x,y).get("y"));
                
                
//                if(this.lastActive){
//                    this.lastActive.zvyrazneni = [];
//                    this.lastActive.render();
//                }
//                this.lastActive = p;
//                this.lastActive.zvyrazneni.push([0,255,0,0.5]);
//                this.lastActive.render();
            }
//            if(!p && this.lastActive){
//                this.lastActive.zvyrazneni = [];
//                this.lastActive.render();
//                this.lastActive=null;
//            }
        },this));
         $("#mouse").mousedown($.proxy(function(e){
//            var x = parseInt(e.pageX-((window.innerWidth-this.width)/2));
//            var y = parseInt(e.pageY-((window.innerHeight-this.height)/2));
//            y = this.height-y;
//            var p = this.getFPPX(x,y);
//            if(p){
//                var jj = p.get("jednotka");
//                var akce = actions.selected;
//
//                if((akce && akce.id && akce.id=="oznacit") || !akce){
//                    if(jj){
//                        if(jj.get("hrac")&&!jj.get("selected")){
//                            this.select(jj);
//                        }
//                    } 
//                }else{
////                    window.p = p;
//                    akce.get("akce").proved(p);
//                }
//                
//            }
        },this));
        

        this.set({cnv: cnv, ctx: cnv[0].getContext("2d")});
        
        window.log.push("init map");
        
        var p = this.policka;
        for(var i = 0;i<this.strana;i++){
            p[i] = [];
            for(var j = 0;j<this.strana;j++){
//                var p = this.pole[i][j];
                var f = this.get("inits")["x"+i+"y"+j];
                if(f){
                    p[i][j] = new Pole();
                    p[i][j].set({x:i,y:j,kulisa: f.kulisa, jednotka: f.jednotka, mapa: this})
                    f.jednotka.set({pole: p[i][j]});
                }else{
                    p[i][j] = new Pole();
                    p[i][j].set({x:i,y:j,mapa: this});
                }
            }
        }
        this.render();
    },
    // vrátí nějakou neznámou a divnou hodnotu
    getCY: function(a,b){
        var nx = this.width;
        var n = this.strana;
        return ((nx/n)*8/10*(1-Math.pow(lmb,b))/(1-lmb));
    },
    // vrátí nějakou neznámou a divnou hodnotu
    getCX: function(a,b){
        var ny = this.height;
        var nx = this.width;
        var n = this.strana;
        var l = nx*(1-this.getCY(a,b)/(1.5*ny));
        return (nx-l)/2+(a*l/n);
    },
    // transformuje divnou hodnotu na pixelovou top hodnotu rohu pole x,y
    getCornerY: function(x,y){
        return this.height-this.getCY(x,y)+this.dTop;
    },
    // transformuje divnou hodnotu na pixelovou left hodnotu rohu pole x,y
    getCornerX: function(x,y){
        return this.getCX(x,y)+this.dLeft;
    },
    getFPPX: function(x,y){
        var nx = this.width;
        var n = this.strana;
        var ny = this.height;
        var py,px;
        for(var i = 0;i<this.strana;i++){
            if((nx/n)*8/10*(1-Math.pow(lmb,i))<y*(1-lmb)&&(nx/n)*8/10*(1-Math.pow(lmb,i+1))>y*(1-lmb)){
                py=i;break;
            }
        }
        var l = nx*(1-y/(1.5*ny));
        px=parseInt((x-(nx-l)/2)/l*8);
        if(px<0||px>=n)return undefined;
        else return this.pole[px][py];
    },
    render: function(){
        window.log.push("render map");
        $("#boj").empty();
        var ctx = this.get("ctx");
        ctx.clearRect(0,0,window.innerWidth+500,window.innerHeight+500);
        
        for(var i = 0;i<this.strana;i++){
            for(var j = 0;j<this.strana;j++){
                this.pole[i][j].render();
            }
        }
//        ctx.strokeStyle="black";
//        ctx.strokeRect(this.get("dTop"),this.get("dLeft"),this.width, this.height);
    },
    select: function(jj){
        if(this.lastSelected){
            this.lastSelected.deselect();
            this.lastSelected.get("pole").render();
        }
        this.lastSelected = jj;
        jj.select();
        jj.get("pole").render();
    }
})


