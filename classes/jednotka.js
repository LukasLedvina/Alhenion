var Jednotka = Backbone.Model.extend({
    initialize: function(){
        this.set({inventory: new Inventory({jednotka: this})});
        this.life = $("<div>").attr({id:"life"}).css({top: 0, left:0, width:20, height: 20, position: "absolute", color: "red", display: "none"}).html("bla");
        $(document.body).append(this.life);
        
    },
    render: function(){
        var img = this.get("img");
        this.life.show();
        $("#boj").append(img);
        var w = img.width;
        var h = img.height;
        var hh = 140*Math.pow(lmb, this.get("pole").get("y"));
        var ww = hh*w/h;
        var center = this.get("pole").getCenter();
        this.life.html(this.get("aktH"));
        this.life.css({top: parseInt((center[1]-hh)), left: parseInt(center[0]+(ww/4))})
        $(img).attr({id: "hero"}).css({zIndex: 10-this.get("pole").get("y"),position: "absolute",width: parseInt(ww), height: parseInt(hh), top: parseInt((center[1]-hh)), left: parseInt(center[0]-(ww/2))});
        
    },
    utok: function(pole, zbran){
        var plocha = zbran.akce.plocha();
        for(i=0; i<plocha.length; i++){
            plocha[i].utokPole(this.pole, zbran);
        }
    },
    /*
     * TO DO přkopat
     */
    function nastavZivot(zbran, vzdalenost){ //jednotka-cil
    this.aktH-=this.vypoctiZraneni(zbran, vzdalenost);
    if(this.aktH<=0){
        this.destroy(); //TODO osetrit obj. udalosti set
    }
    if(this.aktH>this.maxH){
        this.aktH=this.maxH;
    }
}

function vypoctiZr aneni(zbran, vzdalenost){ //jednotka-cil
    return (vypoctiZraneniFyzicke(zbran, vzdalenost)+vypoctiZraneniMagicke(zbran));
}

function vypoctiZraneniFyzicke(zbran, vzdalenost){ //jednotka-cil
    rStrela=this.getRStrela();
    rZbran=this.getRZbran();
    zraneniStrela=(zbran.utokStrela*(Math.random()+0.5)-vzdalenost)*((100-rStrela)/100);
    if(vzdalenost==1){
        zraneniZbran=zbran.utokZbran*(Math.random()+0.5)*((100-rZbran)/100);
    }
    return (zraneniStrela+zraneniZbran);
}

function vypoctiZraneniMagicke(zbran){ //jednotka-cil
    rMagie=this.getRMagie();
    if(zbran.utokMagie<0){ //leceni
        rMagie=0;
    }
    zraneniMagie=zbran.utokMagie*(Math.random()+0.5)*((100-rMagie)/100);
    return zraneniMagie;
}
    pohni: function(pole){
        this.deselect();
        var vychozi = this.get("pole");
        vychozi.set({jednotka: null});
        vychozi.render();
        this.set({pole: pole});
        pole.set({jednotka: this})
        this.render();
        pole.render();
    },
    getRychlost: function(){
        var maxBonus = 1;
        var predmety = this.get("inventory").get("predmety");
        for(var i = 0;i<predmety.length;i++){
            var predmet = predmety[i];
            if(predmet.get("rychlost")>maxBonus)maxBonus = predmet.get("rychlost");
        }
        return maxBonus;
    },
    select: function(){
        this.set({selected: true});
        var akce = {};
        var prd = this.get("inventory").get("predmety");
        for(var i = 0;i<prd.length;i++){
            akce[prd[i].get("id")] = prd[i];
        }
        actions.setActions(akce);
        mapa.selectedUnit  = this;
        this.render();
        
    },
    deselect: function(){
        this.set({selected: false});
        mapa.selectedUnit = null;
        this.render();
        
    }
    
    
})


