// Flags set to prevent the result of an equacion from being deleted after the "=" be pressed

var equalFlag = false;
var calcFlag = false;

// Flag to control the double "=" behavior
var doubleCalc = false;

// falg to prevent the calc from having more than 1 dot
var dotFalg = false;

// click listener
$(".btn").click(function(){
  var clicked = $(this).attr("id");
  inputNumber(clicked);
});

//keydown listener
$(document).keydown(function(event){
  var keyPressed = event.key;

  //prevent strange characters from being inputed
  if(keyPressed == "0" || keyPressed == "1" || keyPressed == "2" || keyPressed == "3" || keyPressed == "4" || keyPressed == "5" || keyPressed == "6" || keyPressed == "7" || keyPressed == "8" || keyPressed == "9" || keyPressed == "," || keyPressed == "." || keyPressed == "Enter" || keyPressed == "+" || keyPressed == "-" || keyPressed == "*" || keyPressed == "/" || keyPressed == "Backspace" || keyPressed == "=" || keyPressed == "c" || keyPressed == "Delete"){
    inputNumber(event.key);
  }
});

function inputNumber(character){
  // code that deletes the last equation result if a new number is input
  if(character === "0" || character === "1" || character === "2" || character === "3" || character === "4" || character === "5" || character === "6" || character === "7" || character === "8" || character === "9"){
    if(equalFlag === true){
      $(".screen-numbers").text("");
      equalFlag = false;
    }
  }

  // code to handle the default input (zero)
  if($(".screen-numbers").text() === "0"){
    if(!(character == "." || character == "+" || character == "-" || character == "/" || character == "%" || character == "*")){
      $(".screen-numbers").text("");
    }
  }

  // handling the Nan cases, if the user try to use a "+/-" in a equation
  else if($(".screen-numbers").text() === "NaN"){
    $(".screen-numbers").text("");
  }

  if(character === "c"){
    dotFalg = false;
    $(".screen-numbers").text("0");
    $(".calc-input").text("");
  }

  else if(character === "%"){
    $(".calc-input").text($(".screen-numbers").text() + "/100");
    $(".screen-numbers").text("");
    equalFlag = false;
    doubleCalc = false;
    calcFlag = false;
    preCalc();
  }

  else if(character === "+/-"){
      $(".screen-numbers").text($(".screen-numbers").text() * -1);
    }

  // avoiding sequences of Math Symbols
  else if(character === "*"){
    checkSign("*");
  }
  else if(character === "/"){
    checkSign("/");
  }
  else if(character === "+"){
    checkSign("+");
  }
  else if(character === "-"){
    checkSign("-");
  }

  else if(character === "Backspace" ||character === "Delete"){
    var value = $(".screen-numbers").text();
    $(".screen-numbers").text(value.slice(0, value.length - 1));
  }

  else if(character === "." || character === ","){
    doubleCalc = false;
    if(! equalFlag){
      if (dotFalg == false){
        dotFalg = true;
        if($(".screen-numbers").text() == ""){
          insert("0.");
        }
        else{
          insert(".");
        }
      }
    }
  }

  else if(character == "=" || character == "Enter" ){
    dotFalg = false;
    preCalc();
  }

  else{
    equalFlag = false;
    doubleCalc = false;
    insert(character);
  }
}

// avoiding sequences of Math Symbols by replacing them
function checkSign(sign){
  doubleCalc = false;
  dotFalg = false;
  var currentValue = $(".calc-input").text();
  if(! $(".screen-numbers").text() == "" || ! $(".calc-input").text() == ""){
    if(currentValue[currentValue.length-1] === " " && $(".screen-numbers").text() == ""){
      $(".calc-input").text(currentValue.slice(0, currentValue.length-2) + sign + " ");
    }
    else{
      $(".screen-numbers").text($(".screen-numbers").text() + " " + sign + " ");
      equalFlag = false;
    }
    insert2();
  }
}

// function that insert the number in the calc's main screen
function insert(num) {
  $(".screen-numbers").text($(".screen-numbers").text() + num);
}

// function that checks the requirements to call for a calculation
function preCalc(){
  if($(".calc-input").text() === ""){
    return false;
  }

  else if(doubleCalc){
    calc();
  }
  
  else{
    insert2();
    calc();
  }
}

// function that insert the calculation in the secondary screen
function insert2() {
  if(calcFlag === true){
    $(".calc-input").text("");
    calcFlag = false;
  }

  $(".calc-input").text($(".calc-input").text() + $(".screen-numbers").text());
  $(".screen-numbers").text("");
}

// calculation function
function calc() {

  if(doubleCalc){
    // set the double calculation behavior
    var currentInput = $(".calc-input").text();
    var n = 0;

    // looks for the sign mark to slice the string
    for(i=0; i < currentInput.length-1; i++){
      if(currentInput[i] === "+" || currentInput[i] === "-" || currentInput[i] === "*" || currentInput[i] === "/"){
        n = i-1;
      }
    }

    $(".calc-input").text($(".screen-numbers").text() + currentInput.slice(n));
  }

  // handling with incomplete inputs  
  try {
    var result = eval($(".calc-input").text());
  } catch (error) {
    // $(".screen-numbers").text("Error");
      return false;
  }
  
  if(result == undefined){
    return false;
  }

  // handleling the decimal places 
  if(!(Number.isInteger(result))){
    result = result.toFixed(7);
    for(i=result.length-1; i >= 0; i--){
      if(result[i] == 0){
        result = result.slice(0, result.length-1);
      }
      else{
        break;
      }
    }
    result = result.slice(0, 9);
  }

  $(".screen-numbers").text(result);
  equalFlag = true;
  calcFlag = true;
  doubleCalc = true;
}