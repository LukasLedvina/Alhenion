var typy = {
    hero:    new Jednotka(),
    partiz:  new Jednotka(),
    medaA:   new Jednotka(),
    vlkA:    new Jednotka(),
    mdrakA:  new Jednotka(),
    magorB:  new Jednotka(),
    punkB:   new Jednotka(),
    vojakB:  new Jednotka(),
    mdrakB:  new Jednotka(),
    drakB:   new Jednotka(),
    magorC:  new Jednotka(),
    punkC:   new Jednotka(),
    vojakC:  new Jednotka(),
    mdrakC:  new Jednotka(),
    drakC:   new Jednotka(),
    bazookC: new Jednotka()
}
$(function(){
    typy.hero.get("inventory").add(new predmety.krumpac({utokZbran: 5}));
    typy.hero.get("inventory").add(new predmety.bouchacka({utokZbran: 6}));
    typy.partiz.get("inventory").add(new predmety.automat());

    typy.medaA.get("inventory").add(new predmety.drap());
    typy.vlkA.get("inventory").add(new predmety.tesak());
    typy.mdrakA.get("inventory").add(new predmety.malyPlamen());
    
    typy.magorB.get("inventory").add(new predmety.baseball());
    typy.punkB.get("inventory").add(new predmety.bouchacka());
    typy.vojakB.get("inventory").add(new predmety.samopal());
    typy.mdrakB.get("inventory").add(new predmety.malyPlamen({utokZbran: 8}));
    typy.drakB.get("inventory").add(new predmety.velikyPlamen());
    
    typy.magorC.get("inventory").add(new predmety.baseball({utokZbran: 10}));
    typy.punkC.get("inventory").add(new predmety.bouchacka({utokZbran: 15}));
    typy.vojakC.get("inventory").add(new predmety.samopal({utokZbran: 16}));
    typy.mdrakC.get("inventory").add(new predmety.malyPlamen({utokZbran: 12}));
    typy.drakC.get("inventory").add(new predmety.velikyPlamen({dostrel: 6}));
    typy.bazookC.get("inventory").add(new predmety.bazook());
})
typy.hero.set({img: images.hero,         aktH:7,  maxH:7,  rychlost: 1, hrac: true, potrebuje: true, selected: false, uiSettings: {}});

typy.partiz.set({img: images.partyzanka, aktH:15, maxH:15, rychlost: 2, hrac: true, potrebuje: true, selected: false, uiSettings: {}});
/////////////////

typy.medaA.set({img: images.meda1,     aktH:5, maxH:5, rychlost: 1, hrac: false, potrebuje: false, selected: false, uiSettings: {}});
typy.vlkA.set({img: images.vlk1,       aktH:2, maxH:2, rychlost: 3, hrac: false, potrebuje: false, selected: false, uiSettings: {}});
typy.mdrakA.set({img: images.minidrak, aktH:7, maxH:7, rychlost: 1, hrac: false, potrebuje: false, selected: false, uiSettings: {}});
////////////////////////

typy.magorB.set({img: images.magorBaseball1, aktH:3,  maxH:3,  rychlost: 1, hrac: false, potrebuje: false, selected: false, uiSettings: {}});
typy.punkB.set({img: images.magorkaPunk1,    aktH:4,  maxH:4,  rychlost: 3, hrac: false, potrebuje: false, selected: false, uiSettings: {}});
typy.vojakB.set({img: images.vojak,          aktH:8,  maxH:8,  rychlost: 1, hrac: false, potrebuje: false, selected: false, uiSettings: {}});
typy.mdrakB.set({img: images.minidrak,       aktH:6,  maxH:6,  rychlost: 2, hrac: false, potrebuje: false, selected: false, uiSettings: {}});
typy.drakB.set({img: images.drak,            aktH:20, maxH:20, rychlost: 1, hrac: false, potrebuje: false, selected: false, uiSettings: {}});
////////////////////////

typy.magorC.set({img: images.magorBaseball1, aktH:8,  maxH:8,  rychlost: 1, hrac: false, potrebuje: false, selected: false, uiSettings: {}});
typy.punkC.set({img: images.magorkaPunk1,    aktH:7,  maxH:7,  rychlost: 3, hrac: false, potrebuje: false, selected: false, uiSettings: {}});
typy.vojakC.set({img: images.vojak,          aktH:14, maxH:14, rychlost: 1, hrac: false, potrebuje: false, selected: false, uiSettings: {}});
typy.mdrakC.set({img: images.minidrak,       aktH:10, maxH:10, rychlost: 1, hrac: false, potrebuje: false, selected: false, uiSettings: {}});
typy.drakC.set({img: images.drak,            aktH:20, maxH:20, rychlost: 2, hrac: false, potrebuje: false, selected: false, uiSettings: {}});
typy.bazookC.set({img: images.bazook,        aktH:3,  maxH:3,  rychlost: 1, hrac: false, potrebuje: false, selected: false, uiSettings: {}});
    