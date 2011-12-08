var predmety = {
    krumpac: Predmet.extend({
        initialize: function(){
            this.set({
                akce: new mozneAkce.utokZblizka({
                    predmet: this
                }),
                id:        "krumpac",
                nazev:     "Krumpáč",
                nazevAkce: "Útok krumpáčem",
                utokZbran:4, 
                dostrel: 1
            })
        }
    }),
    
    tesak: Predmet.extend({
        initialize: function(){
            this.set({
                akce: new mozneAkce.utokZblizka({
                    predmet: this
                }),
                id:        "tesak",
                nazev:     "Tesák",
                nazevAkce: "Kousnutí tesákem",
                utokZbran:5, 
                dostrel: 1
            })
        }
    }),
    
    drap: Predmet.extend({
        initialize: function(){
            this.set({
                akce: new mozneAkce.utokZblizka({
                    predmet: this
                }),
                id:        "drap",
                nazev:     "Dráp",
                nazevAkce: "Seknutí drápem",
                utokZbran:3, 
                dostrel: 1
            })
        }
    }),
    
    malyPlamen: Predmet.extend({
        initialize: function(){
            this.set({
                akce: new mozneAkce.utokZblizka({
                    predmet: this
                }),
                id:        "malyPlamen",
                nazev:     "Propan-butanový vařič",
                nazevAkce: "Plivnutí ohně",
                utokZbran:5, 
                dostrel: 2
            })
        }
    }),
    
    baseball: Predmet.extend({
        initialize: function(){
            this.set({
                akce: new mozneAkce.utokZblizka({
                    predmet: this
                }),
                id:        "baseball",
                nazev:     "Pálka",
                nazevAkce: "Rána pálkou",
                utokZbran:5, 
                dostrel: 1
            })
        }
    }),
    
    bouchacka: Predmet.extend({
        initialize: function(){
            this.set({
                akce: new mozneAkce.utokStrelou({
                    predmet: this
                }),
                id:        "bouchacka",
                nazev:     "Bouchačka",
                nazevAkce: "Útok bouchačkou",
                utokZbran:7, 
                dostrel: 4
            })
        }
    }),
    
    automat: Predmet.extend({
        initialize: function(){
            this.set({
                akce: new mozneAkce.utokStrelou({
                    predmet: this
                }),
                id:        "automat",
                nazev:     "Automatická zbraň",
                nazevAkce: "Dávka z automatu",
                utokZbran:8, 
                dostrel: 8
            })
        }
    }),
    
    samopal: Predmet.extend({
        initialize: function(){
            this.set({
                akce: new mozneAkce.utokStrelou({
                    predmet: this
                }),
                id:        "samopal",
                nazev:     "Samopal",
                nazevAkce: "Dávka ze samopalu",
                utokZbran:14, 
                dostrel: 5
            })
        }
    }),
    
    velikyPlamen: Predmet.extend({
        initialize: function(){
            this.set({
                akce: new mozneAkce.utokZblizka({
                    predmet: this
                }),
                id:        "velikyPlamen",
                nazev:     "Dračí hlava",
                nazevAkce: "Sežehnutí plamenem",
                utokZbran:12, 
                dostrel: 4
            })
        }
    }),
    
    bazook: Predmet.extend({
        initialize: function(){
            this.set({
                akce: new mozneAkce.utokStrelou({
                    predmet: this
                }),
                id:        "bazook",
                nazev:     "Bazooka",
                nazevAkce: "Útok bazookou",
                utokZbran:20, 
                dostrel: 8
            })
        }
    })
    
    
//boty: Predmet.extend({initialize: function(){this.set({akce: new Akce().pohyb({predmet: this,
//                id: "boty",
//                nazev: "Sedmimílové boty",
//            })})}})
//    
//     
}

