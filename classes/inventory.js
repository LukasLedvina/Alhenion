var Inventory = Backbone.Model.extend({
    initialize: function(){
        this.set({predmety: []})
//        this.set({inventory: new Inventory()});
    },
    getRZbran: function(){
        var resist=0;
        for(var i=0; i<this.get("predmety").length;i++){
           resist+=this.get("predmety")[i].rZbrane;
        }
        if(resist>100) resist=100; 
        return resist;
    },
    getRMagie: function(){
        var resist=0;
        for(var i=0; i<this.get("predmety").length;i++){
           resist+=this.get("predmety")[i].rMagie;
        }
        if(resist>100) resist=100; 
        return resist;
    },
    getRStrela: function(){
        var resist=0;
        for(var i=0; i<this.get("predmety").length;i++){
           resist+=this.get("predmety")[i].rStrela;
        }
        if(resist>100) resist=100; 
        return resist;
    },
    add: function(predmet){
        this.get("predmety").push(predmet);
        predmet.set({inventory: this});
    },
    remove: function(){
        
    }
})
