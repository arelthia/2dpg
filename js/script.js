/*jshint browser:true */ /*global $ */
(function() {
  "use strict";
  let ajaxUrl = 'https://2dwebsolutions.com/wp-json/wp/v2';
  let podcasts = {};
  let quotes ={};
  let quoteImages = {};
  //let media = {};
  jQuery( document ).one( "pagecreate", "#podcasts", function(){
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
    

 }); //end firstpage pagecreate

jQuery( document ).one( "pageshow", "#podcasts", function(){
 
}); //end firstpage pagecreate

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

let current = '';

  function showQuotes(res){
    //let qimg = '';
    //let quotecontent = '';
    jQuery.each(res, function(key, value) {
         
          //qimg = value._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url;
            //content = '<h2>' + value.title.rendered + '</h2>';
          //quotecontent = '<img src="' + qimg + '" data-pin-nopin="true" /><h2 class="episode-title wrap">' + value.title.rendered + '</h2>';
        
          //jQuery("#quolist").append('<a href="#" class="post-btn"><li class="" data-id="'+value.id+'"  data-transition="slide">' +quotecontent + '</li></a>');    
          //jQuery("#quolist").append('<li class="ui-li-has-thumb"><a href="#singlequote" class="quotes ui-btn ui-btn-icon-right ui-icon-carat-r" id="'+value.id+'"><img src="' + qimg + '" alt="' + value._embedded['wp:featuredmedia'][0].alt_text + '" data-pin-nopin="true"><h2>' + value.title.rendered + '</h2><p>' + value['ddws-quote'] + '</p></a></li>');
     
          jQuery("#image-quotes").append('<img class="single-quote"  data-transition="flip"  style="display:none" src="' + value._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url + '" alt="' + value._embedded['wp:featuredmedia'][0].alt_text + '" >');
     

      })
    jQuery(".single-quote:first").show();
     current = jQuery(".single-quote");
     
  }

jQuery( document ).on( "swipeleft", ".single-quote", function() {
        
          let nxt = jQuery(this).next();
      
     
      if(nxt.length === 0){
        nxt = jQuery(".single-quote").prevAll();
       
      }
        jQuery(this).hide();
      current = nxt.show();  
   
      
}); //end on swipelift
  
jQuery( document ).on( "swiperight", ".single-quote", function() {
        
        
     let prv = jQuery(this).prev();
     
        
      if(prv.length === 0){
        prv = jQuery(".single-quote").prevAll();
        
      }

        jQuery(this).hide();
        current = prv.show();
      
    
        
}); //end on swiperight

jQuery( document ).on( "click", "#leftButton", function() {
        
        let nxt = current.next();
      
     
      if(nxt.length === 0){
        nxt = jQuery(".single-quote").prevAll();
       
      }
        current.hide();
      current = nxt.show();  
   
      
}); //end on left busson clicked
  
jQuery( document ).on( "click", "#rightButton", function() {
        
        
    let prv = current.prev();
     
        
      if(prv.length === 0){
        prv = jQuery(".single-quote").prevAll();
        
      }

        current.hide();
        current = prv.show();
      
    
        
}); //end on right button cicked

function nextQuote(){

}

function prevQuote(){

}

//Note: Convert all form names and ids with periods to underscores

  //gravityformsapi/forms/[Form ID]/submissions
  jQuery(document).on('click','#gform_submit_button_1',function(e){
  
    e.preventDefault();
    let formurl = 'https://230.pintophosting.com/gravityformsapi/forms/3/submissions';
    let forminput = {
                "input_4_1": jQuery('#choice_1_4_1:checked').val(),
                "input_1_3": jQuery('#input_1_1_3').val(),
                "input_1_6": jQuery('#input_1_1_6').val(),
                "input_2": jQuery('#input_1_2').val(),
                "input_3": jQuery('#input_1_3').val(),
                "input_5": jQuery('#input_3_5').val()
    };
    
    //console.log(forminput);
    let datar = {'input_values': forminput};

    let formResponse = sendQuestion(formurl, datar);
    formResponse.complete(function(data) {
        jQuery('form')[0].reset();
        location.href = '#firstpage';
        
    });

   
   

   
  });//end on form submit


  jQuery( document ).one( "pagecreate", ".quote-page", function(){
      jQuery( "#header" ).toolbar({ theme: "b" });
      jQuery( "#footer" ).toolbar({ theme: "b" });

      
     jQuery.ajax({
        url: ajaxUrl + '/image_quote/?per_page=6&_embed=true',
        method: 'GET',
        success: function(res) {
         
        //quotes = res;
         showQuotes(res);
         
        }//end success 
      });//end ajax

    


    });


//submit question
  function sendQuestion(formurl, datar){
        

        return jQuery.ajax({
          url: formurl,
          type: 'POST',
          data: JSON.stringify(datar)
        });
   } //end sendQuestion

})();

