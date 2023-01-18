
// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}


//generate password base on user preference


// Assignment code here
var myapp = angular.module("app", ['ngAnimate']);
  myapp.controller("myController", function($scope) {


    $scope.secureKey = "";
    $scope.kengenCharNum = 20;
    
    
    $scope.btns = {
      keygenConfirmBtn: "Confirm",
    };


    $scope.showItem = {
      header: true,
      keygenBtn: true,
      keygenPrefChar: false,
      keygenPrefType: false,
      keygenPrefTypeWarning: false,
      keygenHeaderCard: true,
      keygenNextBtn: true,
      keygenSecureKeyDisplay: false
    };


    $scope.cbKeygenType = {
      lowercase: true,
      lowercaseNumChar: 0,

      uppercase: true,
      uppercaseNumChar: 0,

      numeric: true,
      numericNumChar: 0,
      
      specialChar: true,
      specialCharNumChar: 0
    };

    $scope.scrollTo = function (id) {
      $anchorScroll(id);  
    }
    
    $scope.kengenCharNumSub = function () {
      if ($scope.kengenCharNum <= 8)
        $scope.kengenCharNum = 8;
      else
        $scope.kengenCharNum = $scope.kengenCharNum - 1;
    }

    $scope.kengenCharNumAdd = function () {
      if ($scope.kengenCharNum >= 128)
        $scope.kengenCharNum = 128;
      else
        $scope.kengenCharNum = $scope.kengenCharNum + 1;
    }


    $scope.keygenStart = function () {
      $scope.showItem.keygenBtn = false;
      $scope.showItem.keygenPrefChar = true;
      $scope.showItem.keygenHeaderCard = false;
      $scope.showItem.header = false;
      
    }

    $scope.keygenPrefChar = function () {

      $scope.showItem.keygenPrefType = true;
      $scope.showItem.keygenNextBtn = false;

      //when number of character has not specify, set the value to 8 characters
      if ($scope.kengenCharNum == "")
        $scope.kengenCharNum = "8";
      else if ($scope.kengenCharNum > 128)
        $scope.kengenCharNum = "128";     
    
    }

    $scope.keygenConfirm = function () {

      
      
      let charTypeArray = [];
      let totalType = 0;
      


      
      //when number of character has not specify, set the value to 8 characters
      if ($scope.kengenCharNum == "")
        $scope.kengenCharNum = "8";
      else if ($scope.kengenCharNum < 8)
        $scope.kengenCharNum = "8";
      else if ($scope.kengenCharNum > 128)
        $scope.kengenCharNum = "128";
           


      $scope.kengenCharNumLeft = $scope.kengenCharNum;


      if ($scope.cbKeygenType.lowercase)
      {
        totalType++;

        charTypeArray.unshift("lowercase");
      }

      if ($scope.cbKeygenType.uppercase)
      {
        totalType++;

        charTypeArray.unshift("uppercase");
      }

      if ($scope.cbKeygenType.numeric)
      {
        totalType++;

        charTypeArray.unshift("numeric");
      }

      if ($scope.cbKeygenType.specialChar)
      {
        totalType++;

        charTypeArray.unshift("specialChar");
      }


      //check if at least one type is selected
      if (totalType == 0)
      {
        $scope.showItem.keygenSecureKeyDisplay = false;  
        $scope.showItem.keygenPrefTypeWarning = true;
      }
      else
      {
        $scope.showItem.keygenPrefTypeWarning = false;

        let typeCharNum = Math.round($scope.kengenCharNum / totalType);
        let typeCount = 0;


        //generate a random number of character for each selected type
        charTypeArray.forEach(element => {
          
          //console.log (typeCount + "==" +  totalType);
          if (typeCount == totalType - 1) //last item
          {

            $scope.cbKeygenType[element + "NumChar"] = $scope.kengenCharNumLeft;
          }
          else
          {
            if ($scope.cbKeygenType[element])
            {
              $scope.cbKeygenType[element + "NumChar"] = typeCharPercentageDiff (typeCharNum);
            }
      
            $scope.kengenCharNumLeft = $scope.kengenCharNumLeft - $scope.cbKeygenType[element + "NumChar"];
          }

          typeCount++;
        });
        
        
        //console.log ("kengenCharNum: " + $scope.kengenCharNum);
        //console.log ("totalType: " + totalType);
        //console.log ($scope.cbKeygenType);


        //populate character in an array base on the $scope.cbKeygenType.lowercaseNumChar, $scope.cbKeygenType.uppercaseNumChar, $scope.cbKeygenType.numberNumChar, $scope.cbKeygenType.specialCharNumChar 
        let passwordArray = [];
        let aRandomChar = "";
        charTypeArray.forEach(element => {

          if (element == "lowercase")
          {
            for (let i = 0; i < $scope.cbKeygenType[element + "NumChar"]; i++)
            {
              //generate lowercase base on ASCII table
              aRandomChar = String.fromCharCode( 97 + getRandomArbitrary(0, 26) ); //ascii lowercase start at ord 97 and has 26 characters
              passwordArray.unshift(aRandomChar);
            }
          }
          else if (element == "uppercase")
          {
            for (let i = 0; i < $scope.cbKeygenType[element + "NumChar"]; i++)
            {
              //generate uppercase base on ASCII table
              aRandomChar = String.fromCharCode( 65 + getRandomArbitrary(0, 26) ); //ascii uppercase start at ord 65 and has 26 characters
              passwordArray.unshift(aRandomChar);
            }
          }
          else if (element == "numeric")
          {
            for (let i = 0; i < $scope.cbKeygenType[element + "NumChar"]; i++)
            {
              //generate number base on ASCII table
              aRandomChar = String.fromCharCode( 48 + getRandomArbitrary(0, 10) ); //ascii symbol start at ord 48 and has 9 mumber
              passwordArray.unshift(aRandomChar);
            }
          }
          else if (element == "specialChar")
          {
            for (let i = 0; i < $scope.cbKeygenType[element + "NumChar"]; i++)
            {
              //generate number base on ASCII table
              aRandomChar = String.fromCharCode( 33 + getRandomArbitrary(0, 15) ); //ascii symbol start at ord 33 and has 15 symbols
              passwordArray.unshift(aRandomChar);
            }
          }

          //console.log (passwordArray);


          //change button text
          $scope.btns.keygenConfirmBtn = "Re-generate";
        });

        //shuffle the characters in the passwordArray to create a random password
        shuffle (passwordArray);
        //console.log (passwordArray);

        $scope.secureKey = passwordArray.join("");

        //console.log ($scope.secureKey);


        $scope.showItem.keygenSecureKeyDisplay = true;
      
      }
    }






});


let charDifference = 0;

//create the randomness of the number of character in each type 
//increase or decrease the typeCharPercentage base on the percentageDiff
// random from 10% to 50% of character either increase or decresae
function typeCharPercentageDiff (typeCharNum) {

  
  
  let percentageDifference = Math.round(getRandomArbitrary(10, 20) / 100 * typeCharNum);
  //console.log ("typeCharNum: "  +typeCharNum)   
  if (percentageDifference > 0)
  {
    charDifference = getRandomArbitrary(0, percentageDifference);
    charDifference = Math.round(charDifference);
    if (getRandomArbitrary(0, 1))
      charDifference = charDifference * -1;
  }
  else
  {
    charDifference = 0;
  }
  //console.log ("test:" + charDifference)  
  return typeCharNum + charDifference;
}



//random number functions
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}



//shuffle array functions
function shuffle (t)
{ let last = t.length
  let n
  while (last > 0)
  { n = rand(last)
    swap(t, n, --last)
  }
}

const rand = n =>
  Math.floor(Math.random() * n)

function swap (t, i, j)
{ let q = t[i]
  t[i] = t[j]
  t[j] = q
  return t
}

//let arrayRandom = [1, 3, 5, 78, 39, 6];
//shuffle (arrayRandom)

//console.log (arrayRandom);
