/*
 * calculator.js  - by Afshin Mokhtari
 *
 */

$(function() {

    // The calculators main display (shows number presses & results)
    var displayer = function() {
        var $el = $( '#display' );              // The main number display area
        var $sign = $( '#sign' );               // Where we display whether number is positive or negative
        var $press = $( '#showKeyPress' );      // Where to show a key has been pressed
        var sProgress;                  // TODO: The ongoing calculations between each clear/reset to show.

        var reset = function() { 
            sProgress = '';
            $sign.text('');
        };

        var showNumber = function( aNumber ) {
            console.log ( 'Result to show: ' + aNumber );
            var isNegative = ( aNumber < 0 );

            showSign ( isNegative ) ;

            if ( isNegative ) { aNumber *= -1; } // So we don't show negative numbers in main display area
            $el.text( aNumber );
        };


        var showSign = function( isNegative ) {     // Show or hide '-' for positive/negative number.
            if ( isNegative ) {
                $sign.text('-');
            } else {
                $sign.text('');
            }
        };


        var showPress = function( ) {               // Little visualization for any keypress
            $press.text('.').fadeOut("fast", function() {
                $press.fadeIn("fast").text(' ');
            });

        };

        return {
            reset : reset,
            showSign : showSign,
            showPress: showPress,
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
            console.log ( "keyboard: " + String.fromCharCode( event.which ) );
            calc.press ( lastCalcKeyPress );
        });

        return {
            lastCalcKeyPress : lastCalcKeyPress
        };

    }();


    // Main calculator functionality; uses the displayer and input objects
    var calc = function() {
        var result;                                     // Ongoing result of calculations
        var started;                                    // Whether the first number has been entered yet
        var withinNumber;                               // Whether the last key pressed was a number & so is this key press
        var newNumber;
        var isFirstNumber;                              // Whether the last number entered was the first in a possible ongoing series of calculations.
        var lastOperator;                               // Stores the last operation to eval before moving on to new one
        var isNegative;                                 // Set to true if very first key entry is - (for ensuing negative number)

        var reset = function() {
            result = 0;
            started = false;
            withinNumber = false;
            newNumber = 0;
            isFirstNumber = true;
            isNegative = false;
            lastOperator = '';
            displayer.reset();
            displayer.show( result );
        };


        var handleNumberPress = function( whichBtn ) {
            whichBtn = whichBtn * 1;            // Typecast it into a number

            if ( ! withinNumber ) {             // If its the first digit of a new number
                newNumber = whichBtn;           // store it
                started = true;         // 
            } else {                            // Not the first digit of a number
                newNumber = newNumber * 10;
                newNumber += whichBtn;
            }

            withinNumber = true;
            displayer.show( isNegative ? ( newNumber * -1) : newNumber );
        };


        var handleOperatorPress = function( whichBtn ) {
            if ( whichBtn === 'i' ) {   // invert; turn positive to negative & vice-versa
                isNegative = !isNegative;
                displayer.showSign( isNegative );
                return;
            }

            // else
            withinNumber = false;

            if ( started ) {            // started is true once any number has been entered
                if ( isFirstNumber ) {              // If the last number we got was the first after a reset
                    result = newNumber;
                    if ( isNegative ) result *= -1;
                    isFirstNumber = false;
                    lastOperator = whichBtn;
                }
                else {
                    if ( isNegative ) newNumber *= -1;  // turn result into its real value before computations

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

                isNegative = false;                 // reset after displaying
            } 
        };


        var handleCalculatorButtonPress = function ( whichBtn ) {
            var operators = [ '+', '-', '*', '/', '=', 'i' ];
            var whichOperator;

            displayer.showPress();
            if ( whichBtn === 'CA' ) {                  // The Clear key was pressed;
                reset();        // Reset any calculation in progress
            } else {
                whichOperator = operators.indexOf( whichBtn );
                if ( whichOperator > -1 ) {             // An operator was pressed;
                    handleOperatorPress( whichBtn );
                }
                else {                                  // A number was pressed;
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
