$(function() {

	var displayer = function() {				// The calculators main display (shows number presses & results)
		var $el = $( '#display' );
		var sProgress = '';						// The ongoing calculations between each clear/reset.

		var showNumber = function( aNumber ) {
			$el.text( aNumber );
		};

		return {
			showNumber : showNumber
		};
	}();


	var input = function() {
		var $mouseInput = $( 'area' );
		var lastCalcKeyPress;

		$mouseInput.click( function() {
			lastCalcKeyPress = $(this).attr('id') + '';   // cast to string
			console.log ( "click: " + lastCalcKeyPress );
		});

		$( document ).keypress( function( event ) {
			lastCalcKeyPress = String.fromCharCode( event.which );
			console.log ( "keybaord: " + String.fromCharCode( event.which ) );
		});

		return {
			lastCalcKeyPress : lastCalcKeyPress
		};

	}();





/*


		var operators = [ '+', '-', '*', '/' ];
		var result;
		var started = false;
		var dirtyResult;
		var withinNumber;
		var number;


		var reset = function() {
			result = 0;
			started = false;
			dirtyResult = false;
			withinNumber = false;
			number = 0;
		};

		reset();

		$( 'area' ).click( function() { 
		    var id = $(this).attr('id'); 
		    var whichOperator;

		    console.log( "-->" + id ); 


		    if ( id === 'CA' ) {						// Reset any calculation in progress
		    	reset();
		    	$display.text ( result );
		    } else {
		    	whichOperator = operators.indexOf( id );
	    		if ( whichOperator > -1 ) {				// An operator was pressed; 
		    		console.log( "___>" + operators[whichOperator] );  
					console.log( ' result befoer ' + result ) ; 
		    		if ( started ) {
						console.log('in started block');
						if ( ! dirtyResult ) {
							result = number;
						}
							if ( id === '+' ) {
								result += number;
						}
						else if ( id === '-' ) {
							result -= number;
						}
						else if ( id === '*' ) {
							result = result * number;
						}
						else if ( id === '/' ) {
							result = result / number;
						}

						dirtyResult = true;
					}

					withinNumber = false;
					console.log( ' result after ' + result ) ;
					$display.text ( result );
				} else {								// A number was pressed
					if ( ! withinNumber ) {				// If its the first digit of a new number
						number = id * 1;		// store it, cast it to Integer trick
						started = true;			// 
					} else {							// Not the first digit of a number
						number = number * 10;
						number += ( id * 1 );
					}

					withinNumber = true;

					$display.text( number );
				}
			}


			return false; 
		});


*/

});
