var Predmet = Backbone.Model.extend({
    initialize: function(){
        if(this.get("akce"))this.get("akce").set({predmet: this});
        this.set({
              utokZbran: 0,
              utokMagie: 0,
              utokStrela:0,
              rZbran:0,
              rStrela:0,
              rMagie:0,
              regen:0,
              zivot:0,
              dostrel:0,
              rychlost:0
    })},
    render: function(){
        
    }
})

