var Akce = Backbone.Model.extend({
    initialize: function(){
        if(this.get("predmet"))this.get("predmet").set({
            akce: this
        })
        this.set({
            nazev: this.get("predmet").nazevAkce
            })
    },
    proved: function(pole_pus){
        
    },
    pole: function(){
        
    },
    plocha: function(pole){
        return [pole];
    },
    getJednotka: function(){
        return this.get("predmet").get("inventory").get("jednotka");
    }
})
window.mozneAkce = {
    pohyb: Akce.extend({
        initialize: function(){
            this.set({
                nazev: "Pohyb"
            })
        },
        pole: function(){
            var p = mapa.get("pole");
            var s = mapa.get("strana");
            var jj = this.getJednotka();
            var x = jj.get("pole").get("x");
            var y = jj.get("pole").get("y");
            var d = jj.getRychlost();
            var out = [];
            for(var i = x-d;i<=x+d;i++){
                for(var j = y-d; j<=y+d; j++){
                    if(i>=0 && i<s && j>=0 && j<s){
                        out.push(p[i][j]);
                    }
                }
            }
            return out;
        },
        getJednotka: function(){
            return mapa.selectedUnit;  
        },
        proved: function(pole_pus){
            if(pole_pus.get("jednotka"))return;
            //                window.ppppole = this.pole();
            var is = false;
            var poles = this.pole();
            for(var i = 0;i<poles.length;i++){
                if(poles[i]==pole_pus)is = true;
            }
            var jj = this.getJednotka();
            if(is)jj.pohni(pole_pus);
		
        }
    //             var jednotka = this.get("predmet").get("inventory").get("jednotka");
    //             var x = jednotka.get("pole").get("x");
    //             var y = jednotka.get("pole").get("y");
    //             var pole =[mapa.get("pole")[x][y]];
    //             if()
    }),
    utokZblizka: Akce.extend({
        initialize: function(){
            this.set({
                id:"utokZblizka"
            })
        },
        pole: function(){
            var p = mapa.get("pole");
            var s = mapa.get("strana");
            var jj = this.getJednotka();
            var x = jj.get("pole").get("x");
            var y = jj.get("pole").get("y");
            var d = this.get("predmet").dostrel;
            var out = [];
            for(var i = x-d;i<=x+d;i++){
                for(var j = y-d; j<=y+d; j++){
                    if(i>=0 && i<s && j>=0 && j<s){
                        if(!(i==x && j==y)){
                            out.push(p[i][j]);
                        }
                    }
                }
            }
            return out;
        },
        proved: function(pole_pus){
            var jj = this.getJednotka();
            var cil =pole_pus.get("jednotka");
            if(!cil)return;
            var z = this.get("predmet");
            var czi = cil.get("inventory");
            var dmg = z.utokZbran*(1-czi.getRZbran);
            dmg+= z.utokMagie*(1-czi.getRMagie);
            dmg+= z.utokStrela*(1-czi.getRStrela);
            dmg = dmg*(0.5+Math.random());
            cil.zran(dmg);
        }
    }),
    utokStrelou: Akce.extend({
        initialize: function(){
            this.set({
                id:"utokStrelou"
            })
        },
        pole: function(){
            var p = mapa.get("pole");
            var s = mapa.get("strana");
            var jj = this.getJednotka();
            var x = jj.get("pole").get("x");
            var y = jj.get("pole").get("y");
            var d = this.get("predmet").get("dostrel");
            var out = [];
            for(var i = 0;i<=d;i++){
                for(var xj = -i; xj<=i; xj+=i){
                    for(var yj = -i; yj<=i; yj+=i){
                        if((x+xj)>=0 && (x+xj)<s && (y+yj)>=0 && (y+yj)<s){
                            if(!(xj==0 && yj==0)){
                                out.push(p[x+xj][y+yj]);
                            }
                        }
                    }
                }
            }
            return out;
        },
        proved: function(pole_pus){
            var jj = this.getJednotka();
            var zbran = this.get("predmet");
            jj.utok(pole_pus, zbran);
        }
    }),
    utokMagii: Akce.extend({
        initialize: function(){
            this.set({
                id:"utokMagii"
            })
        },
        pole: function(){
            var p = mapa.get("pole");
            var s = mapa.get("strana");
            var out = [];
            for(var i = 0;i<s;i++){
                for(var j = 0; j<s; j++){
                    out.push(p[i][j]);
                }
            }
            return out;
        },
        plocha: function(pole){
            var p = mapa.get("pole");
            var s = mapa.get("strana");
            var jj = this.getJednotka();
            var x = pole.x;
            var y = pole.y;
            var d = this.get("predmet").dostrel;
            var out = [];
            for(var i = x-d;i<=x+d;i++){
                for(var j = y-d; j<=y+d; j++){
                    if(i>=0 && i<s && j>=0 && j<s){
                        if(!(i==x && j==y)){
                            out.push(p[i][j]);
                        }
                    }
                }
            }
            return out;
        },
        proved: function(pole_pus){
            var jj = this.getJednotka();
            var zbran = this.get("predmet");
            jj.utok(pole_pus, zbran);
        }
    })
}
