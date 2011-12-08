/* 
 * Inheritance javascript framework
 * @author Ing. Zdeněk Mlčoch
 * 
 * modified: http://ejohn.org/blog/simple-javascript-inheritance/ 
 *  
 */
    (function(){
      var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
      this.Class = function(){};
      Class.extend = function(prop) {
        var _super = this.prototype;
        initializing = true;
        var prototype = new this();
        initializing = false;
        for (var name in prop) {
          prototype[name] = typeof prop[name] == "function" &&
            typeof _super[name] == "function" && fnTest.test(prop[name]) ?
            (function(name, fn){
              return function() {
                var tmp = this._super;
                this._super = _super[name];
                var ret = fn.apply(this, arguments);       

                // don't like some not used properties 
                if(tmp)this._super = tmp;

                return ret;
              };
            })(name, prop[name]) :
            prop[name];
        }
        function Class() {
          if ( !initializing && this.init )
            this.init.apply(this, arguments);
        }
        Class.prototype = prototype;
        Class.prototype.constructor = Class;
        Class.extend = arguments.callee;

        // Set method
        Class.prototype.set = function(attrs) {
          for (var attr in attrs) {
            //if exist setter function this.on_change{key of wrap: function(key of wrap, new value)
            if(this.on_change[attr])this.on_change[attr].call(this,attr,attrs[attr]);
            else this[attr] = attrs[attr];
          }
          return this;
        };
        if(!Class.prototype.on_change)Class.prototype.on_change={};

        return Class;
      };
    })();

