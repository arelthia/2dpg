$( document ).one( "pagecreate", ".demo-page", function(){
	$( "#header" ).toolbar({ theme: "b" });
	$( "#footer" ).toolbar({ theme: "b" });

	function navnext( next ) {
		$( ":mobile-pagecontainer" ).pagecontainer( "change", next + ".html", {
			transition: "slide"
		});
	}

	function navprev( prev ) {
		$( ":mobile-pagecontainer" ).pagecontainer( "change", prev + ".html", {
			transition: "slide",
			reverse: true
		});
	}

	$( document ).on( "swipeleft", ".ui-page", function( event ){
		//get the filename of the next page. We stored that in the data-next
		// attribute in the original markup
		let next = $( this ).jqmData( "next" );
		//Check i f there is a next page and 
		//swipes may also happe when the user highlights text, so if=gnore those.
		//we're only interested in swipes on the page.
		if ( next & (event.target === $( this )[ 0 ] ) ) {
			navnext( next );
		}

	});

	$ ( document ).on( "click", ".next", function(){
		//go here to finish http://demos.jquerymobile.com/1.4.5/swipe-page/#&ui-state=dialog
	});

});

$( document ).one( "pageshow", ".demo-page", function(){

});

