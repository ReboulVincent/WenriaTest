var HomeView = function(store) {
 
    this.initialize = function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
        this.el.on('click', '.index_button', this.activate);//Localisation activé au click
    };
    
    this.render = function() {//Return le HTML
        this.el.html(HomeView.template());
        return this;
    };
    
    this.activate = function() {
        store.findByName($('.search-key').val(), function(employees) {
            $('.employee-list').html(HomeView.liTemplate(employees));
        });
    };
    
    this.initialize();
}
HomeView.template = Handlebars.compile($("#home-tpl").html());