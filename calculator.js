$(function() {

	// The calculators main display (shows number presses & results)
	var displayer = function() {				
		var $el = $( '#display' );
		var sProgress;							// The ongoing calculations between each clear/reset to show.

		var reset = function() { sProgress = ''; };

		var showNumber = function( aNumber ) {
			$el.text( aNumber );
		};

		return {
			reset : reset,
			show : showNumber
		};
	}();


	// Get input from either mouse clicks or keyboard
	var input = function() {
		var $mouseInput = $( 'area' );
		var lastCalcKeyPress;

		$mouseInput.click( function() {
			lastCalcKeyPress = $(this).attr('id') + '';   // cast to string
			console.log ( "click: " + lastCalcKeyPress );
			calc.press ( lastCalcKeyPress );
		});

		$( document ).keypress( function( event ) {
			lastCalcKeyPress = String.fromCharCode( event.which );
			console.log ( "keybaord: " + String.fromCharCode( event.which ) );
			calc.press ( lastCalcKeyPress );
		});

		return {
			lastCalcKeyPress : lastCalcKeyPress
		};

	}();


	// Main calculator functionality; uses the displayer and input objects
	var calc = function() {
		var result;										// Ongoing result of calculations
		var started;									// Whether the first number has been entered yet
		var withinNumber;								// Whether the last key pressed was a number & so is this key press
		var newNumber;
		var isFirstNumber;								// Whether the last number entered was the first in a possible ongoing series of calculations.
		var lastOperator;								// Stores the last operation to eval before moving on to new one

		var reset = function() {
			result = 0;
			started = false;
			withinNumber = false;
			newNumber = 0;
			isFirstNumber = true;
			lastOperator = '';
			displayer.reset();
			displayer.show( result );
		};


		var handleNumberPress = function( whichBtn ) {
			if ( ! withinNumber ) {				// If its the first digit of a new number
				newNumber = whichBtn * 1;		// store it, cast it to Integer trick
				started = true;			// 
			} else {							// Not the first digit of a number
				newNumber = newNumber * 10;
				newNumber += ( whichBtn * 1 );
			}

			withinNumber = true;
			displayer.show( newNumber );
		};


		var handleOperatorPress = function( whichBtn ) {
			withinNumber = false;

			if ( started ) {
				if ( isFirstNumber ) {				// If the last number we got was the first after a reset
					result = newNumber;
					isFirstNumber = false;
					lastOperator = whichBtn;
				}
				else {
					if ( lastOperator === '+' ) {
						result = result + newNumber;
					}
					else if ( lastOperator === '-' ) {
						result = result - newNumber;
					}
					else if ( lastOperator === '*' ) {
						result = result * newNumber;
					}
					else if ( lastOperator === '/' ) {
						result = result / newNumber;
					}

					lastOperator = whichBtn;
				}
				displayer.show( result );
			}
		};


		var handleCalculatorButtonPress = function ( whichBtn ) {
			var operators = [ '+', '-', '*', '/' ];
			var whichOperator;

			if ( whichBtn === 'CA' ) {					// The Clear key was pressed;
				reset();		// Reset any calculation in progress
			} else {
				whichOperator = operators.indexOf( whichBtn );
				if ( whichOperator > -1 ) {				// An operator was pressed;
					handleOperatorPress( whichBtn );
				}
				else {									// A number was pressed;
					handleNumberPress( whichBtn );
				}
			}

		};

		reset();

		return {
			press : handleCalculatorButtonPress
		};

	}();

});
