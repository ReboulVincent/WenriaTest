var LocationView = function() {
 
    this.initialize = function() {
        this.el = $('<div/>');
        this.el.on('click', '.map_button', this.toggle);//Cacher afficher Map
        this.addLocation();//Map
        this.el.on('click', '.change-pic-btn', this.changePicture);//Photo
        this.el.on('click', '.comment_bouton', this.writeComment);//Commentaire
    };
    
    /* Fonction Montrer // Cacher */
     this.toggle = function() {
        $("#map_canvas").toggle(500);
        return false;
    };
    
   /* Fonction Commentaire */
    this.writeComment = function() {
        $(".comment").toggle(500);
        return false;
    };
    
    /* Fonction Localisation */
    this.addLocation = function() {
        //event.preventDefault();
        console.log('addLocation');
        navigator.geolocation.getCurrentPosition(
            function(position) {
                $('.location', this.el).html('<p>Latitude : '+position.coords.latitude+'</br> Longitude : ' + position.coords.longitude+'</br> Altitude : ' + position.coords.altitude+'</p>');
                //$("#map_canvas").hide();  BUG la carte se rezise mal si elle est caché au départ
                
                    //Map
                    var mapOptions = {
                      zoom: 16,
                      center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                      //center: new google.maps.LatLng(43.6361543, 3.9234025),
                      mapTypeId: google.maps.MapTypeId.ROADMAP
                    };

                    var map = new google.maps.Map(document.getElementById('map_canvas'),mapOptions);

                    var marker = new google.maps.Marker({
                      position: map.getCenter(),
                      map: map,
                      title: 'Vous êtes ici!'
                    });

                    google.maps.event.addListener(marker, 'click', function() {//Function qui centre le markeur
                      map.setCenter(marker.getPosition());
                    });

            },
            function() {
                alert('Error getting location');
            });
        return false;
    };
    
    /* Fonction Camera */
        this.changePicture = function(event) {
            event.preventDefault();
            if (!navigator.camera) {
                app.showAlert("Camera API not supported", "Error");
                return;
            }
            var options =   {   
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType : Camera.PictureSourceType.CAMERA, 
                allowEdit : true,
                encodingType: Camera.EncodingType.JPEG
                /*
                sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Photo Album
                encodingType: 0     // 0=JPG 1=PNG*/
            };

            navigator.camera.getPicture(function(imageData) {
                    $('.image_capture', this.el).attr('src', "data:image/jpeg;base64," + imageData);
                    $('.image_capture', this.el).css({'display':'block'});//Montre l'image
                },
                function() {
                    app.showAlert('Error taking picture', 'Error');
                },
                options);
            return false;
        };
     
    
    this.render = function() {
        this.el.html(LocationView.template());
        return this;
    };
    this.initialize();
 
 }
 
LocationView.template = Handlebars.compile($("#location-tpl").html());