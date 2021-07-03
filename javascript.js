// Flag set to prevent the result of an equacion from being deleted after the "=" be pressed

var equalFlag = false;

// click listener
$(".btn").click(function(){
  var clicked = $(this).attr("id");
  inputNumber(clicked);
});

//keydown listener
$(document).keydown(function(event){
  var keyPressed = event.key;

  //prevent strange chacarters from being inputed
  if(keyPressed == "0" || keyPressed == "1" || keyPressed == "2" || keyPressed == "3" || keyPressed == "4" || keyPressed == "5" || keyPressed == "6" || keyPressed == "7" || keyPressed == "8" || keyPressed == "9" || keyPressed == "," || keyPressed == "." || keyPressed == "Enter" || keyPressed == "+" || keyPressed == "-" || keyPressed == "*" || keyPressed == "/" || keyPressed == "Backspace" || keyPressed == "=" || keyPressed == "c"){

    //handling the 'Enter' and ',' keys
    if(keyPressed === "Enter"){
      inputNumber("=");
    }
    else if(keyPressed === ","){
      inputNumber(".");
    }
    else {
      inputNumber(event.key);
    }
  }
});

function inputNumber(character){
  // code that deletes the last equation result if a new number is input
  if(character === "0" || character === "1" || character === "2" || character === "3" || character === "4" || character === "5" || character === "6" || character === "7" || character === "8" || character === "9"){
    if(equalFlag === true){
      $("input").val("");
      equalFlag = false;
    }
  }

  // code to handle the default input (zero)
  if($("input").val() === "0"){
    if(!(character == "." || character == "+" || character == "-" || character == "/" || character == "%" || character == "*")){
      $("input").val("");
    }
  }

  // handling the Nan cases, if the user try to use a "+/-" in a equation
  else if($("input").val() === "NaN"){
    $("input").val("");
  }

  if(character === "c"){
    $("input").val("0");
  }
  else if(character === "%"){
    $("input").val($("input").val() + "/100");
    equalFlag = false;
  }
  else if(character === "+/-"){
      $("input").val($("input").val() * -1);
    }

  // avoiding sequences of Math Symbols
  else if(character === "*"){
    var currentValue = $("input").val();
    if(currentValue[currentValue.length-1] === "-" || currentValue[currentValue.length-1] === "+" || currentValue[currentValue.length-1] === "*" || currentValue[currentValue.length-1] === "/"){}
    else{
      $("input").val(currentValue + "*");
      equalFlag = false;
    }
  }

  else if(character === "/"){
    var currentValue = $("input").val();
    if(currentValue[currentValue.length-1] === "-" || currentValue[currentValue.length-1] === "+" || currentValue[currentValue.length-1] === "*" || currentValue[currentValue.length-1] === "/"){}
    else{
      $("input").val(currentValue + "/");
      equalFlag = false;
    }
  }

  else if(character === "+"){
    var currentValue = $("input").val();
    if(currentValue[currentValue.length-1] === "-" || currentValue[currentValue.length-1] === "+" || currentValue[currentValue.length-1] === "*" || currentValue[currentValue.length-1] === "/"){}
    else{
      $("input").val(currentValue + "+");
      equalFlag = false;
    }
  }

  else if(character === "-"){
    var currentValue = $("input").val();
    if(currentValue[currentValue.length-1] === "-"){}
    else{
      $("input").val(currentValue + "-");
      equalFlag = false;
    }
  }

  else if(character === "Backspace"){
    var value = $("input").val();
    $("input").val(value.slice(0, value.length - 1));
  }

  else if(character === "="){
    calc();
  }

  else{
    equalFlag = false;
    insert(character);
  }
}

// function that insert the number in the calc's screen
function insert(num) {
  $("input").val($("input").val() + num);
}

// function that do the math
function calc() {
  var result = eval($("input").val());

  // handleling the decimal places 
  if(!(Number.isSafeInteger(result))){
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

  $("input").val(result);
  equalFlag = true;
}