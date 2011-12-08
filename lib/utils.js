//function maxZraneniTotalFyzicke(utocnik, cil){ //jednotka-UI
//    maximum = 0;
//    var units = getAllUnits();
//    for(i=0; i<units.length; i++){
//            if(units[i].get("hrac")){
//                  maximum = Math.max(maximum, maxZraneniFyzicke(utocnik,units[i]));	
//            }
//    }
//    return (maximum/ utocnik.get("aktH"));
//}

function maxZraneniTotalFyzicke(aktPole, unit){ //jednotka-UI
    var maximum = 0;
    var jednotky = getAllUnits();
    for(var i=0; i<jednotky.Length; i++){
        if(jednotky[i].hrac){
            maximum = Math.max(maximum, maxZraneniFyzicke(jednotky[i], unit, aktPole));	
        }
    }
    return (maximum/this.aktH);
}

function getAllUnits(){
    var p = mapa.get("pole");
    var u = [];
    for(var i = 0;i<mapa.get("strana");i++){
        for(var j = 0;j<mapa.get("strana");j++){
            if(p[i][j].get("jednotka"))u.push(p[i][j].get("jednotka"));
        }
    }
    return u;
}

function maxZraneniFyzicke(hrac, ui, aktPole){ //jednotka-UI
    var soucet_maxim = 0;
    var alpha = 0.2; //TODO nekonstantni bulharska konstanta
    var test_pole = {};
    var rychlost = hrac.getRychlost();
    for(var a = hrac.pole.get("x")-rychlost; a<=hrac.pole.x+rychlost; a++){
	for(var b = hrac.pole("y")-rychlost; b<=hrac.pole.y+rychlost; b++){
            test_pole ={x: a, y: b};
            if (test_pole.x>=0&&test_pole.x<mapa.get("strana")&&test_pole.y>=0&&test_pole.y<mapa.get("strana")){
                var max_zbran = 0;
                for(i=0; i<hrac.inventory.predmety.length; i++){
                    var zbran = hrac.inventory.predmety[i];
                    max_zbran = Math.max(max_zbran, ui.vypoctiZraneniFyzicke(zbran, vypoctiVzdalenost(test_pole, aktPole)));
                }
                if(a==hrac.pole.x && b==hrac.pole.y){
                    soucet_maxim+=(1-alpha)*max_zbran;
                }
                else{
                    soucet_maxim+=(alpha*max_zbran/16);
                }
            }
	}
    }
    return soucet_maxim;
}
/*
function maxZraneniTotalMagicke(){ //jednotka-UI
maximum = 0;
for(i=0; i<jednotka.Length; i++){
	if(jednotka[i].hrac){
		maximum = Math.max(maximum, this.maxZraneniMagicke(jednotka[i]));	
	}
}
return maximum;
}

function maxZraneniMagicke(protivnik){
	max_kouzlo = 0;
	for(i=0; i<protivnik.inventory.predmety.Length; i++){
		zbran = protivnik.inventory.predmety[i];
		max_kouzlo = Math.max(max_kouzlo, this.vypoctiZraneniMagicke(zbran));
	}
return max_kouzlo; //TODO upravit konstantu aby to vychazelo s fyz. utokem
}
 */

/*
 * Hotovo
 */

function maxUtokTotalFyzicky(aktPole, unit){ //jednotka-UI
    var jednotky = getAllUnits();
    var maximum = 0;
    var nejlepsi_zbran = new Predmet();
    var nejhorsi_hrac = new jednotky();
    for(var i=0; i<jednotky.length; i++){
	if(jednotky[i].hrac){
            var fyzUtok = maxUtokFyzicky(jednotky[i], aktPole, unit);	
            var kandidat = fyzUtok[0]/jednotky[i].aktH;	
            maximum = Math.max(maximum, kandidat);
            if(kandidat==maximum){
                nejhorsi_hrac=jednotky[i];
                nejlepsi_zbran=fyzUtok[1];
            }	
	}
    }
    return [maximum, nejlepsi_zbran, nejhorsi_hrac];
}

function maxUtokFyzicky(protivnik, aktPole, unit){ //jednotka-UI
    var soucet_maxim = 0;
    var alpha = 1; //TODO nekonstantni bulharska konstanta
    var test_pole = {};
    var rychlost=unit.getRychlost();
    for(var a=aktPole.x-rychlost; a<=aktPole.x+rychlost; a++){
	for(var b=aktPole.y-rychlost; b<=aktPole.y+rychlost; b++){
            var nejlepsi_zbran = new Predmet();
            test_pole = {x:a,y:b};
            if (test_pole.x>=0&&test_pole.x<mapa.get("strana")&&test_pole.y>=0&&test_pole.y<mapa.get("strana")){
                var max_zbran = 0;
                for(i=0; i<unit.inventory.predmety.Length; i++){
                    zbran = unit.inventory.predmety[i];
                    kandidat = unit.vypoctiZraneniFyzicke(zbran, vypoctiVzdalenost(test_pole, protivnik.pole));
                    max_zbran = Math.max(max_zbran, kandidat);
                    if(a==aktPole.x && b==aktPole.y && max_zbran==kandidat){
                        nejlepsi_zbran=zbran;
                    }
                }
                if(a==aktPole.x && b==aktPole.y){
                    soucet_maxim+=(1-alpha)*max_zbran;
                }
                else{
                    soucet_maxim+=(alpha*max_zbran/16);
                }
            }
	}
    }
    return [soucet_maxim, nejlepsi_zbran];
}

/*
 * HOTOVO
 */
function idealniFyzPolicko(unit){ //jednotka-UI
    var idealni_policko = new Pole();
    var aktPole = {};
    var idealnost_policka = -100;
    var rychlost=unit.getRychlost();
    for(var a = unit.pole.x-rychlost; a<=unit.pole.x+rychlost; a++){
	for(var b = unit.pole.y-rychlost; b<=unit.pole.y+rychlost; b++){
            //TO DO .. nepoužívat aktPOle, ale posunout unit na souřadnici a,b
            aktPole = {x:a,y:b};
            if ( aktPole.x>=0 && aktPole.x<mapa.get("strana") && aktPole.y>=0&&aktPole.y<mapa.get("strana")){
                var zs = maxUtokTotalFyzicky(aktPole, unit); //Array(3) - zranění, které je UI jednotka schopna způsobit
                var uz = maxZraneniTotalFyzicke(aktPole, unit);//int - zranění, které jednotka UI utrpí
                var kandidat = zs[0] - uz;
                idealnost_policka = Math.max(idealnost_policka, kandidat);
                if(idealnost_policka==kandidat){
                    var nejlepsi_zbran=zs[1];
                    var nejhorsi_hrac=zs[2];
                    idealni_policko=aktPole;
                    //TODO baseballista
                }
            }
	}
    }
    return [idealni_policko, nejlepsi_zbran, nejhorsi_hrac, idealnost_policka];
}

/*
 * HOTOVO
 */
function idealniPolicko(){ //jednotka-UI
    //TODO TODO TODO
    return this.idealniFyzPolicko();
}


/*
 * HOTOVO
 */
function vypoctiVzdalenost(utocnik, cil){ //muze nalezet libov. objektu
    if(!utocnik.x)utocnik = utocnik.pole;
    if(!cil.y)cil = cil.pole;
    vzdal_x = Math.abs(cil.x-utocnik.x);
    vzdal_y = Math.abs(cil.y-utocnik.y);
    vzdalenost = Math.max(vzdal_x, vzdal_y);
    return vzdalenost;
}



