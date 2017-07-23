/*jshint browser:true */ /*global $ */
(function() {
  "use strict";
  var ajaxUrl = 'https://2dwebsolutions.com/wp-json/wp/v2';
  var podcasts = {};
  var media = {};
  
  var content = '';
  var fimg = "";

    jQuery.ajax({
    url: ajaxUrl + '/podcast/?per_page=6&_embed=true',
    method: 'GET',
    success: function(res) {
     
      podcasts = res;
      showAllContent(podcasts);
    
     
      
       }//end success 
    });//end ajax

  // When one of the podcast blocks cliiked
     jQuery(document).on( "click swipeleft swiperight", "#podcasts .one-half" ,  function(e) {
              

        var pid = this.dataset.id;
        jQuery("ul").html("Loading ... ");
        showOne(pid);
      });  //end on one-half click
      var fullpage = jQuery(".full");
      jQuery( document ).on( "swipeleft swiperight", fullpage, function() {
        jQuery(".full").html("")
        showAllContent(podcasts);
        jQuery(this).toggle();
      }); //end on swipelift

      //when backbutton clicked
      jQuery(document).on( "click", "button.back" ,  function(e) {
        jQuery(".full").html("")
        jQuery('button.back').toggle();
        showAllContent(podcasts);
      });  //end on back button clicked
  
  function showAllContent(res){ 
        jQuery.each(res, function(key, value) {
         
      var fimg = value._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url;
            //content = '<h2>' + value.title.rendered + '</h2>';
            content = '<img src="' + fimg + '" data-pin-nopin="true" /><h2 class="episode-title wrap">' + value.title.rendered + '</h2>';
        
        jQuery("ul").append('<a href="#" class="post-btn"><li class="one-half " data-id="'+value.id+'" data-episode="'+value.eposide+'" data-transition="slide">' +content + '</li></a>');    
        
      })
  }  
  
  function showOne(pid){
    
    jQuery.ajax({
    url: ajaxUrl + '/podcast/'+pid+'/?_embed=true',
    method: 'GET',
    success: function(res) {
      var fimg = res._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url;
      jQuery("ul").html("");
      jQuery('button.back').toggle();
      var epcontent = '<img src="' + fimg + '" /><h2>' + res.title.rendered + '</h2>';
      jQuery(".full").append(epcontent+'<div class="player"><audio controls><source src="https://listen.2dwebsolutions.com/2dwebsolutions-e'+ res.eposide +'.mp3" type="audio/mpeg"></audio><p>' + res.intro_paragraph + '</p></div>');
    }//end success
    });//end ajax call to show one
    
  }
  
})();