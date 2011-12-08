<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <script type="text/javascript" src="lib/jquery.js"></script>
<!--        <script type="text/javascript" src="lib/underscore.js"></script>-->
<!--        <script type="text/javascript" src="lib/backbone.js"></script>-->
        <script type="text/javascript" src="lib/jqueryui.js"></script>
        <script type="text/javascript" src="lib/class.js"></script>
        
        <script type="text/javascript" src="lib/utils.js"></script>
        
        
        <script type="text/javascript" src="classes/mapa.js"></script>
<!--        <script type="text/javascript" src="classes/pole.js"></script>
        <script type="text/javascript" src="classes/jednotka.js"></script>
        <script type="text/javascript" src="classes/kulisa.js"></script>
        <script type="text/javascript" src="classes/inventory.js"></script>
        <script type="text/javascript" src="classes/predmet.js"></script>
        <script type="text/javascript" src="classes/imageFactory.js"></script>
        <script type="text/javascript" src="classes/actionSelector.js"></script>
        <script type="text/javascript" src="classes/akce.js"></script>
        <script type="text/javascript" src="classes/typy.js"></script>
        <script type="text/javascript" src="classes/predmety.js"></script>
        <script type="text/javascript" src="classes/ui.js"></script>-->
        <title>Alhenion</title>
        <style>
            .ui-selected{
                display: block;
                background-color: orange;
            }
        </style>
        <script type="text/javascript">
            $(function(){
                var w,h;
                if(window.innerHeight/window.innerWidth<7/10){
                    h = window.innerHeight;
                    w = h*10/7;
                }else{
                    w = window.innerWidth;
                    h = w*7/10;
                }
                window.w = w;
                window.h = h;
                window.lmb = 0.9;
                window.log= [];
                window.mapa = new Mapa({dLeft:0,dTop:0,width: w,height: h,strana: 8,pole: [],
//                    inits: {}} );
                    inits:{
                        x0y0:{jednotka: typy.hero},
                        x5y5:{jednotka: typy.mdrakA}}
                    });
                $("#obj").css({top: (window.innerHeight-h)/2, left: (window.innerWidth-w)/2});
                window.actions = new Actions();
                
//                var predmet = new predmety.bouchacka();
//                window.inv = typy.hero.get("inventory");
//                window.predmet = predmet;
//                mapa.select(typy.hero);
//                window.poles = predmet.get("akce").pole();
//                window.us = mozneAkce.utokStrelou();
//                window.xxx = new predmety.bouchacka();
//                inv.add(xxx);
//                window.yyy =xxx.get("akce").getJednotka();
            })
            function unitKilled(unit){
                
            }
        </script>
    </head>
    
    <body style="overflow:hidden">
        <div id="obj" style="position: absolute;border: 1px solid blue">
            <div id="boj" style="position: absolute;z-index:2;font-size:11px"></div>
            <div id="rt" style="position: absolute"></div>
            <div id="dialog" style="width: 100%;height: 100%;position: absolute"></div>
            <div id="mouse" style="position: absolute;z-index:5"></div>
            <canvas id="mapa"></canvas>
        </div>
    </body>
</html>
