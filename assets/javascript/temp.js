//if you use an anonymous function, it will work in all browsers:


var myVar;

function myStartFunction() {
    myVar = setTimeout(function(){ alertFunc("First param", "Second param"); }, 2000);
}