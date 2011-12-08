var Actions = Backbone.Model.extend({
    initialize: function(){
        this.selected = null;
        this.actions = [];
        this.bar = $("<div>").attr({id: "actionBar"}).css({cursor: "pointer",zIndex:15, position: "absolute", top: 80, left: 50, width: 120});
        $(document.body).append(this.bar);
    },
    setActions: function(items){
        this.items = items;
        this.bar.empty();
        var k = _.keys(items);
        for(var i = 0;i<k.length;i++){
            var it = items[k[i]];
            var li = $("<li>").attr({id: it.get("id")});
            li.html(it.get("nazevAkce"));
            this.bar.append(li);
            li.click($.proxy(function(e){
//                this.selected = "actions.items[$(e";
                this.selected = this.items[$(e.target).attr("id")];
                mapa.actionChanged(this);
            },this))
        }
            li = $("<li>").attr({id: "pohyb"}).html("pohyb");
            li.click($.proxy(function(e){
                this.selected = {get: function(){return new mozneAkce.pohyb()}};
                mapa.actionChanged(this);
            },this))
            this.bar.append(li);
            li = $("<li>").attr({id: "oznacit"}).html("označ");
            li.click($.proxy(function(e){
                this.selected = {id: "oznacit"};
                mapa.actionChanged(this);
            },this))
            this.bar.append(li);
            
        
            this.bar.selectable();
//            this.bar.bind( "selectableselected", function(event, ui) {
//              
//            });
        }
      
})
