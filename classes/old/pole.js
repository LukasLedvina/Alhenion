var Pole = Backbone.Model.extend({
    initialize: function(){
        this.zvyrazneni = [];  
    },
    utokPole: function(utocnik, zbran){
        var vzdalenost = vypoctiVzdalenost(utocnik, this);
        if(zbran.dostrel>=vzdalenost){
            this.jednotka.nastavZivot(zbran, vzdalenost);
        }
        else{
            window.alert("strilite mimo dostrel");
        }
    },
    getCorners: function(){
        var x = this.get("x");
        var y = this.get("y");
        return [{
            x: this.get("mapa").getCornerX(x  ,y  ),
            y: this.get("mapa").getCornerY(x  ,y  )
        },

        {
            x: this.get("mapa").getCornerX(x+1,y  ),
            y: this.get("mapa").getCornerY(x+1,y  )
        },

        {
            x: this.get("mapa").getCornerX(x+1,y+1),
            y: this.get("mapa").getCornerY(x+1,y+1)
        },

        {
            x: this.get("mapa").getCornerX(x  ,y+1),
            y: this.get("mapa").getCornerY(x  ,y+1)
        }];
    },
    getCenter: function(){
        var corners = this.getCorners();
        var center = [(corners[0].x+corners[2].x)/2,(corners[0].y+corners[2].y)/2];
        return center;
    },
    render: function(){
        var b = $("#boj");
        window.log.push("renderuju x:"+this.get("x")+" y:"+this.get("y"))
        var corners = this.getCorners();
        var center = this.getCenter();
        window.b = corners;
        //        b.append($("<div>").attr({
        //            id: "x"+this.get("x")+"y"+this.get("y")
        //            })
        //        //            .html(this.get("x")+","+this.get("y"))
        //        .css({
        //            position: "absolute", 
        //            left: parseInt(center[0]),
        //            top: parseInt(center[1]),
        //            border: "1px solid black"
        //        }));
        //            .html("x:"+this.get("x")+" y:"+this.get("y"))
        //            .css({position: "absolute", left: parseInt(this.get("mapa").getCornerX(this.get("x"),this.get("y"))),top: parseInt(this.get("mapa").getCornerY(this.get("x"),this.get("y"))),border: "1px solid black"}));
    
        // test canvas redraw
        var ctx = this.get("mapa").get("ctx");
        ctx.beginPath(corners[0].x,corners[0].y);
        ctx.lineTo(corners[1].x,corners[1].y);
        ctx.lineTo(corners[2].x,corners[2].y);
        ctx.lineTo(corners[3].x,corners[3].y);
        ctx.lineTo(corners[0].x,corners[0].y);
        ctx.closePath();
        ctx.fillStyle = "rgba(255,255,255,1)";
        ctx.fill();
        ctx.fillStyle = "rgba(50,"+parseInt(100+Math.random()*154)+",50,0.2)";
        ctx.fill();
        
        for(var i = 0;i<this.zvyrazneni.length;i++){
            var color = this.zvyrazneni[i];
            ctx.fillStyle = "rgba("+color[0]+","+color[1]+","+color[2]+","+color[3]+")";
            ctx.fill();
        }
        var jj = this.get("jednotka");
        if(jj){
            if(jj.get("selected")){
                ctx.beginPath(corners[0].x,corners[0].y);

                ctx.arc(parseInt(center[0]),parseInt(center[1]),this.get("mapa").get("width")/32,0,Math.PI*2,false);
                ctx.closePath();
                ctx.fillStyle = "rgba(0,0,255,0.7)";
                ctx.fill();
            }
            jj.render();
        }
        
    }
    
    
})


