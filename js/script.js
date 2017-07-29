/*jshint browser:true */ /*global $ */
(function() {
  "use strict";
  let ajaxUrl = 'https://2dwebsolutions.com/wp-json/wp/v2';
  let podcasts = {};
  let quotes ={};
  //let media = {};
  
//get  podcasts
  jQuery.ajax({
    url: ajaxUrl + '/podcast/?per_page=6&_embed=true',
    method: 'GET',
    success: function(res) {
     
      podcasts = res;
      showAllPodcasts(podcasts);
     
    }//end success 
  });//end ajax

//get image quotes
jQuery.ajax({
    url: ajaxUrl + '/image_quote/?per_page=6&_embed=true',
    method: 'GET',
    success: function(res) {
     
      quotes = res;
     //showQuotes(res);
     
    }//end success 
  });//end ajax

  // When one of the podcast blocks clicked
     jQuery(document).on( "click swipeleft swiperight", "#podcasts .one-half" ,  function(e) {
              
        let pid = this.dataset.id;
        jQuery("#podcasts ul").html("").html("Loading ... ");
        showPodcast(pid);
      });  //end on one-half click
      let fullpage = jQuery("#podcasts .full");
      jQuery( document ).on( "swipeleft swiperight", fullpage, function() {
        jQuery("#podcasts .full").html("")
        showAllPodcasts(podcasts);
        //jQuery('.back').toggle();
      }); //end on swipelift

      //when backbutton clicked
      jQuery(document).on( "click", "button.back" ,  function(e) {
        jQuery("#podcasts .full").html("")
        //jQuery(this).toggle();
        //jQuery('.back').toggle();
        showAllPodcasts(podcasts);
      });  //end on back button clicked
  
  function showAllPodcasts(res){ 
        let fimg='';
        let   podcontent ='';
        jQuery('button.back').hide();
        jQuery('a.back').show();

        jQuery.each(res, function(key, value) {
         
          fimg = value._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url;
            //content = '<h2>' + value.title.rendered + '</h2>';
          podcontent = '<img src="' + fimg + '" data-pin-nopin="true" /><h2 class="episode-title wrap">' + value.title.rendered + '</h2>';
        
          jQuery("#podcasts ul").append('<a href="#" class="post-btn"><li class="one-half " data-id="'+value.id+'" data-episode="'+value.eposide+'" data-transition="slide">' +podcontent + '</li></a>');    
        
      })
  }  
  
  function showPodcast(pid){
    
    jQuery.ajax({
    url: ajaxUrl + '/podcast/'+pid+'/?_embed=true',
    method: 'GET',
    success: function(res) {
      let fimg = res._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url;
      jQuery("ul").html("");
      jQuery('button.back').show();
      jQuery('a.back').hide();
      let epcontent = '<img src="' + fimg + '" /><h2>' + res.title.rendered + '</h2>';
      jQuery("#podcasts .full").append(epcontent+'<div class="player"><audio controls><source src="https://listen.2dwebsolutions.com/2dwebsolutions-e'+ res.eposide +'.mp3" type="audio/mpeg"></audio><p>' + res.intro_paragraph + '</p></div>');
    }//end success
    });//end ajax call to show one
    
  }



  function showQuotes(res){
    let qimg = '';
    let quotecontent = '';
    jQuery.each(res, function(key, value) {
         
          qimg = value._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url;
            //content = '<h2>' + value.title.rendered + '</h2>';
          quotecontent = '<img src="' + qimg + '" data-pin-nopin="true" /><h2 class="episode-title wrap">' + value.title.rendered + '</h2>';
        
          //jQuery("#quolist").append('<a href="#" class="post-btn"><li class="" data-id="'+value.id+'"  data-transition="slide">' +quotecontent + '</li></a>');    
          jQuery("#quolist").append('<li class="ui-li-has-thumb"><a href="#singlequote" class="quotes ui-btn ui-btn-icon-right ui-icon-carat-r" id="'+value.id+'"><img src="' + qimg + '" alt="' + value._embedded['wp:featuredmedia'][0].alt_text + '" data-pin-nopin="true"><h2>' + value.title.rendered + '</h2><p>' + value['ddws-quote'] + '</p></a></li>');
      })
  }
  


//gravityformsapi/forms/[Form ID]/submissions
jQuery(document).on('submit','#gform_questions',function(e){
   // code
e.preventDefault();
let formurl = 'https://230.pintophosting.com/gravityformsapi/forms/3/submissions';
let forminput = {
        "input_4.1": jQuery('#choice_1_4_1:checked').val(),
        "input_1.3": jQuery('#input_1_1_3').val(),
        "input_1.6": jQuery('#input_1_1_6').val(),
        "input_2": jQuery('#input_1_2').val(),
        "input_3":jQuery('#input_1_3').val(),
        "input_5":"/mobileap"
};
console.log(forminput);
let data = {
      'input_values': forminput
  };

//get  podcasts
jQuery.ajax({
  url: formurl,
  method: 'POST',
  data: JSON.stringify(data),
  success: function(res) {
     console.log(res);
         
  }//end success 
 });//end ajax


});//end on form submit

})();

