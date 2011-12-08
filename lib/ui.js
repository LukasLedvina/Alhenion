

function maxZraneniFyzicke(protivnik, aktPole){ //jednotka-UI
soucet_maxim = 0;
alpha = ; //TODO nekonstantni bulharska konstanta
rychlost = protivnik.getRychlost();
for(a=protivnik.pole.x-rychlost; a<=protivnik.pole.x+rychlost; a++){
	for(b=protivnik.pole.y-rychlost; b<=protivnik.pole.y+rychlost; b++){
		Pole test_pole = new Pole();
		test_pole.x=a;
		test_pole.y=b;
		if (test_pole.x>=0&&test_pole.x<mapa.get("strana")&&test_pole.y>=0&&test_pole.y<mapa.get("strana")){
			max_zbran = 0;
			for(i=0; i<protivnik.inventory.predmety.Length; i++){
				zbran = protivnik.inventory.predmety[i];
				max_zbran = Math.max(max_zbran, this.vypoctiZraneniFyzicke(zbran, vypoctiVzdalenost(test_pole, aktPole)));
			}
			if(a==protivnik.pole.x && b==protivnik.pole.y){
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

function maxUtokTotalFyzicky(aktPole){ //jednotka-UI
maximum = 0;
Predmet nejlepsi_zbran = new Predmet();
Jednotka nejhorsi_hrac = new Jednotka();
for(i=0; i<jednotka.Length; i++){
	if(jednotka[i].hrac){
		fyzUtok[]=this.maxUtokFyzicky(jednotka[i], aktPole);	
		kandidat = fyzUtok[0]/jednotka[i].aktH;	
		maximum = Math.max(maximum, kandidat);
		if(kandidat==maximum){
			nejhorsi_hrac=jednotka[i];
			nejlepsi_zbran=fyzUtok[1];
		}	
	}
}
return [maximum, nejlepsi_zbran, nejhorsi_hrac];
}

function maxUtokFyzicky(protivnik, aktPole){ //jednotka-UI
soucet_maxim = 0;
alpha = ; //TODO nekonstantni bulharska konstanta
rychlost=this.getRychlost();
for(a=aktPole.x-rychlost; a<=aktPole.x+rychlost; a++){
	for(b=aktPole.y-rychlost; b<=aktPole.y+rychlost; b++){
		Pole test_pole = new Pole();
		Predmet nejlepsi_zbran = new Predmet();
		test_pole.x=a;
		test_pole.y=b;
		if (test_pole.x>=0&&test_pole.x<mapa.get("strana")&&test_pole.y>=0&&test_pole.y<mapa.get("strana")){
			max_zbran = 0;
			for(i=0; i<this.inventory.predmety.Length; i++){
				zbran = this.inventory.predmety[i];
				kandidat = this.vypoctiZraneniFyzicke(zbran, vypoctiVzdalenost(test_pole, protivnik.pole));
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

function idealniFyzPolicko(){ //jednotka-UI
Pole idealni_policko = new Pole();
Pole aktPole = new Pole();
idealnost_policka = -100;
rychlost=this.getRychlost();
for(a=this.pole.x-rychlost; a<=this.pole.x+rychlost; a++){
	for(b=this.pole.y-rychlost; b<=this.pole.y+rychlost; b++){
		aktPole.x=a;
		aktPole.y=b;
		if (aktPole.x>=0&&aktPole.x<mapa.get("strana")&&aktPole.y>=0&&aktPole.y<mapa.get("strana")){
			zs[]=this.maxUtokTotalFyzicky(aktPole);
			uz=this.maxZraneniTotalFyzicke(aktPole);
			kandidat = zs[0] - uz;
			idealnost_policka = Math.max(idealnost_policka, kandidat);
			if(idealnost_policka==kandidat){
				nejlepsi_zbran=zs[1];
				nejhorsi_hrac=zs[2];
				idealni_policko=aktPole;
//TODO baseballista
			}
		}
	}
}
return [idealni_policko, nejlepsi_zbran, nejhorsi_hrac, idealnost_policka];
}

function idealniPolicko(){ //jednotka-UI
//TODO TODO TODO
return this.idealniFyzPolicko();
}
