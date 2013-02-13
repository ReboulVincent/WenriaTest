var HomeView = function(store) {
 
    this.initialize = function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
        this.Center();//Boutton Disposé au centre
    };
    
     this.Center = function(){
            $(".index_button").css({
                'position':'fixed',
                'left':'50%',
                'top':'50%'
            });
            return false;
        };
    
    this.render = function() {//Return le HTML
        this.el.html(HomeView.template());
        return this;
    };
    
    this.initialize();
}
HomeView.template = Handlebars.compile($("#home-tpl").html());