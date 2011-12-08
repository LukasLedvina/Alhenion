function utok(cil_stred, zbran){ //jednotka-utocnik
/*
for(x=cil_stred.x-zbran.polomerUtoku; x<=cil_stred.x+zbran.polomerUtoku; x++){
	for(y=cil_stred.y-zbran.polomerUtoku; y<=cil_stred.y+zbran.polomerUtoku; y++){
		if(x>=0 && y>=0 && x<POCET_POLI_X && y<POCET_POLI_Y){
			pole[x][y].utokPole(this.pole, zbran);
		}
	}
}
*/
for(i=0; i<zbran.akce.plocha.Length; i++){
	zbran.akce.plocha[i].utokPole(this.pole, zbran);
}
}

function vypoctiVzdalenost(utocnik, cil){ //muze nalezet libov. objektu
vzdal_x = Math.abs(cil.x-utocnik.x);
vzdal_y = Math.abs(cil.y-utocnik.y);
vzdalenost = Math.max(vzdal_x, vzdal_y);
return vzdalenost;
}

function utokPole(utocnik, zbran){ //pole-cil
vzdalenost = vypoctiVzdalenost(utocnik, this);
if(zbran.dostrel>=vzdalenost){
	this.jednotka.nastavZivot(zbran, vzdalenost);
}
else{
	window.alert("strilite mimo dostrel");
}
}

function nastavZivot(zbran, vzdalenost){ //jednotka-cil
	this.aktH-=this.vypoctiZraneni(zbran, vzdalenost);
	if(this.aktH<=0){
		this.destroy(); //TODO osetrit obj. udalosti set
	}
	if(this.aktH>this.maxH){
		this.aktH=this.maxH;
	}
}

function vypoctiZraneni(zbran, vzdalenost){ //jednotka-cil
return (vypoctiZraneniFyzicke(zbran, vzdalenost)+vypoctiZraneniMagicke(zbran));
}

function vypoctiZraneniFyzicke(zbran, vzdalenost){ //jednotka-cil
	rStrela=this.getRStrela();
	rZbran=this.getRZbran();
	zraneniStrela=(zbran.utokStrela*(Math.random()+0.5)-vzdalenost)*(100-rStrela);
	if(vzdalenost==1){
		zraneniZbran=zbran.utokZbran*(Math.random()+0.5)*(100-rZbran);
	}
return (zraneniStrela+zraneniZbran);
}

function vypoctiZraneniMagicke(zbran){ //jednotka-cil
	rMagie=this.getRMagie();
	if(zbran.utokMagie<0){ //leceni
		rMagie=0;
	}
	zraneniMagie=zbran.utokMagie*(Math.random()+0.5)*(100-rMagie);
return zraneniMagie;
}
