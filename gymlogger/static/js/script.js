var currentTab = 0; // Current tab is set to be the first tab (0)


if (document.getElementById("workout-form-card")) {
  document.getElementById("record-button").style.display="none";
  document.getElementById('nextBtn').addEventListener("click",showSubmit);
  showTab(currentTab); // Display the current tab
}


//mobile workout form event listeners //
if (document.getElementById("mobile_exercise_one_category")) {
  document.getElementById("mobile_exercise_one_category").addEventListener("change", selectMobileCategoryOne);
}
if (document.getElementById("mobile_exercise_two_category")) {
  document.getElementById("mobile_exercise_two_category").addEventListener("change", selectMobileCategoryTwo);
}
if (document.getElementById("mobile_exercise_three_category")) {
  document.getElementById("mobile_exercise_three_category").addEventListener("change", selectMobileCategoryThree);
}
if (document.getElementById("mobile_exercise_four_category")) {
  document.getElementById("mobile_exercise_four_category").addEventListener("change", selectMobileCategoryFour);
}
if (document.getElementById("mobile_exercise_five_category")) {
  document.getElementById("mobile_exercise_five_category").addEventListener("change", selectMobileCategoryFive);
}

if (document.getElementById("mobile_exercise_six_category")) {
  document.getElementById("mobile_exercise_six_category").addEventListener("change", selectMobileCategorySix);
}
if (document.getElementById("mobile_exercise_seven_category")) {
  document.getElementById("mobile_exercise_seven_category").addEventListener("change", selectMobileCategorySeven);
}
if (document.getElementById("mobile_exercise_eight_category")) {
  document.getElementById("mobile_exercise_eight_category").addEventListener("change", selectMobileCategoryEight);
}

if (document.getElementById("mobile_exercise_nine_category")) {
  document.getElementById("mobile_exercise_nine_category").addEventListener("change", selectMobileCategoryNine);
}

if (document.getElementById("mobile_exercise_ten_category")) {
  document.getElementById("mobile_exercise_ten_category").addEventListener("change", selectMobileCategoryTen);
}

if (document.getElementById("skip-button")) {
  document.getElementById("skip-button").addEventListener("click", skipToComplete);
}

function showTab(n) {
  if (document.getElementById("workout-form")) {
      // This function will display the specified tab of the form ...
      var x = document.getElementsByClassName("tab");
      x[n].style.display = "block";
      // ... and fix the Previous/Next buttons:
      if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
      } else {
        document.getElementById("prevBtn").style.display = "inline";
      }
      if (n == (x.length - 1)) {
        document.getElementById("nextBtn").style.display = "none";
      }
      // ... and run a function that displays the correct step indicator:
      fixStepIndicator(n)
  }
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  if (document.getElementById("workout-form")) {
      // This function deals with validation of the form fields
      var x, y, i, valid = true;
      x = document.getElementsByClassName("tab");
      y = x[currentTab].getElementsByTagName("input");
      // A loop that checks every input field in the current tab:
      // If the valid status is true, mark the step as finished and valid:
      if (valid) {
        document.getElementsByClassName("step")[currentTab].className += " finish";
      }
      return valid; // return the valid status
    }
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}

function showSubmit() {
  document.getElementById("record-button").style.display = "inline";
}

  // to limit selectable exercises by category

// mobile dropdown functions  //

// mobile dropdown functions exercise one  //

function selectMobileCategoryOne() {
  let mobileCategoryOne = document.getElementById("mobile_exercise_one_category").value;
  console.log(mobileCategoryOne)
  if (mobileCategoryOne == "Free Weights"){
    if (!document.getElementById('bench-press-option')) {
      $("#mobile_exercise_one_name").append("<option class='free-weight-option' id='bench-press-option' value= 'Bench Press'> Bench Press </option>")
      $("#mobile_exercise_one_name").append("<option class='free-weight-option' id='dumbbell-curls-option' value= 'Dumbbell Curls'> Dumbbell Curls </option>")
      $("#mobile_exercise_one_name").append("<option class='free-weight-option' id='hammer-curls-option'value= 'Hammer Curls'> Hammer Curls </option>")
      $("#mobile_exercise_one_name").append("<option class='free-weight-option' id='barbell-curls-option'value= 'Barbell Curls'> Barbell Curls </option>")
      $("#mobile_exercise_one_name").append("<option class='free-weight-option' id='dumbbell-fly-option' value= 'Dumbbell Fly'> Dumbbell Fly </option>")
    }
    $("#running-machine-option").remove()
    $("#rowing-machine-option").remove()
    $("#dips-option").remove()
    $("#assisted-bench-press-option").remove()
    $("#abdominal-crunch-option").remove()
    $("#low-row-option").remove()
    $("#lat-pulldown-option").remove()
    $("#pectoral-fly-option").remove()
    $("#chest-press-option").remove()
    $("#diverging-seated-row-option").remove()
    $("#diverging-lat-pulldown-option").remove()
    $("#lateral-raise-option").remove()
    $("#tricep-press-option").remove()
    $("#incline-press-option").remove()
    $("#shoulder-stretch-option").remove()
  }


  if (mobileCategoryOne == "Cardio") {
    if (!document.getElementById('rowing-machine-option')) {
      $("#mobile_exercise_one_name").append("<option id='rowing-machine-option' value= 'Rowing Machine'> Rowing Machine </option>")
      $("#mobile_exercise_one_name").append("<option id='running-machine-option' value= 'Running Machine'> Running Machine </option>")
      
    }
    console.log(mobileCategoryOne)
    $("#bench-press-option").remove()
    $("#dumbbell-curls-option").remove()
    $("#hammer-curls-option").remove()
    $("#barbell-curls-option").remove()
    $("#dumbbell-fly-option").remove()
    $("#dips-option").remove()
    $("#assisted-bench-press-option").remove()
    $("#abdominal-crunch-option").remove()
    $("#lat-pulldown-option").remove()
    $("#low-row-option").remove()
    $("#pectoral-fly-option").remove()
    $("#chest-press-option").remove()
    $("#diverging-seated-row-option").remove()
    $("#diverging-lat-pulldown-option").remove()
    $("#lateral-raise-option").remove()
    $("#tricep-press-option").remove()
    $("#incline-press-option").remove()
    $("#shoulder-stretch-option").remove()
  }


  if (mobileCategoryOne == "Calisthenics") {
    if (!document.getElementById('dips-option')) {
      $("#mobile_exercise_one_name").append("<option id='dips-option' value= 'Dips'> Dips </option>")
    }
    $("#bench-press-option").remove()
    $("#dumbbell-curls-option").remove()
    $("#hammer-curls-option").remove()
    $("#barbell-curls-option").remove()
    $("#dumbbell-fly-option").remove()
    $("#running-machine-option").remove()
    $("#rowing-machine-option").remove()
    $("#assisted-bench-press-option").remove()
    $("#low-row-option").remove()
    $("#lat-pulldown-option").remove()
    $("#pectoral-fly-option").remove()
    $("#chest-press-option").remove()
    $("#diverging-seated-row-option").remove()
    $("#diverging-lat-pulldown-option").remove()
    $("#abdominal-crunch-option").remove()
    $("#lateral-raise-option").remove()
    $("#tricep-press-option").remove()
    $("#incline-press-option").remove()
    $("#shoulder-stretch-option").remove()
    console.log(mobileCategoryOne)
  
  }


  if (mobileCategoryOne == "Weight Machine") {
    if (!document.getElementById('assisted-bench-press-option')) {
      $("#mobile_exercise_one_name").append("<option id='assisted-bench-press-option' value= 'Assisted Bench Press'> Assisted Bench Press </option>")
      $("#mobile_exercise_one_name").append("<option id='abdominal-crunch-option' value= 'Abdominal Crunch'> Abdominal Crunch </option>")
      $("#mobile_exercise_one_name").append("<option id='low-row-option' value= 'Low Row'> Low Row </option>")
      $("#mobile_exercise_one_name").append("<option id='lat-pulldown-option' value= 'Lat Pulldown'> Lat Pulldown </option>")
      $("#mobile_exercise_one_name").append("<option id='pectoral-fly-option' value= 'Pectoral Fly'> Pectoral Fly </option>")
      $("#mobile_exercise_one_name").append("<option id='chest-press-option' value= 'Chest Press'> Chest Press </option>")
      $("#mobile_exercise_one_name").append("<option id='diverging-seated-row-option' value= 'Diverging Seated Row'> Diverging Seated Row </option>")
      $("#mobile_exercise_one_name").append("<option id='diverging-lat-pulldown-option' value= 'Diverging Lat Pulldown'> Diverging Lat Pulldown </option>")
      $("#mobile_exercise_one_name").append("<option id='lateral-raise-option' value= 'Lateral Raise'> Lateral Raise </option>")
      $("#mobile_exercise_one_name").append("<option id='tricep-press-option' value= 'Tricep Press/Seated Dip'> Tricep Press/Seated Dip </option>")
      $("#mobile_exercise_one_name").append("<option id='incline-press-option' value= 'Incline Press'> Incline Press/Seated Dip </option>")
    }
    $("#bench-press-option").remove()
    $("#dumbbell-curls-option").remove()
    $("#hammer-curls-option").remove()
    $("#barbell-curls-option").remove()
    $("#dumbbell-fly-option").remove()
    $("#running-machine-option").remove()
    $("#rowing-machine-option").remove()
    $("#shoulder-stretch-option").remove()
    console.log(mobileCategoryOne)
  }


  if (mobileCategoryOne == "Stretching") {
    if (!document.getElementById('shoulder-stretch-option')) {
      $("#mobile_exercise_one_name").append("<option id='shoulder-stretch-option' value= 'Shoulder Stretch'> Shoulder Stretch </option>")
    }
    $("#bench-press-option").remove()
    $("#dumbbell-curls-option").remove()
    $("#hammer-curls-option").remove()
    $("#barbell-curls-option").remove()
    $("#dumbbell-fly-option").remove()
    $("#running-machine-option").remove()
    $("#rowing-machine-option").remove()
    $("#assisted-bench-press-option").remove()
    $("#abdominal-crunch-option").remove()
    $("#lat-pulldown-option").remove()
    $("#low-row-option").remove()
    $("#pectoral-fly-option").remove()
    $("#chest-press-option").remove()
    $("#diverging-seated-row-option").remove()
    $("#diverging-lat-pulldown-option").remove()
    $("#lateral-raise-option").remove()
    $("#tricep-press-option").remove()
    $("#incline-press-option").remove()
    console.log(mobileCategoryOne)

}
}

// mobile dropdown functions exercise two  //

function selectMobileCategoryTwo() {
  let mobileCategoryTwo = document.getElementById("mobile_exercise_two_category").value;
  console.log(mobileCategoryTwo)
  if (mobileCategoryTwo == "Free Weights"){
    $(".free-weight-option").removeClass("hidden")
    $(".cardio-option").addClass("hidden")
    $(".calisthenics-option").addClass("hidden")
    $(".stretching-option").addClass("hidden")
    $(".weight-machine-option").addClass("hidden")
  }
  if (mobileCategoryTwo == "Cardio") {
    $(".cardio-option").removeClass("hidden")
    $(".free-weight-option").addClass("hidden")
    $(".calisthenics-option").addClass("hidden")
    $(".stretching-option").addClass("hidden")
    $(".weight-machine-option").addClass("hidden")
    console.log(mobileCategoryTwo)
  }
  if (mobileCategoryTwo == "Calisthenics") {
    $(".calisthenics-option").removeClass("hidden")
    $(".weight-machine-option").addClass("hidden")
    $(".free-weight-option").addClass("hidden")
    $(".cardio-option").addClass("hidden")
    $(".stretching-option").addClass("hidden")
    console.log(mobileCategoryTwo)
  }
  if (mobileCategoryTwo == "Weight Machine") {
    $(".weight-machine-option").removeClass("hidden")
    $(".calisthenics-option").addClass("hidden")
    $(".free-weight-option").addClass("hidden")
    $(".cardio-option").addClass("hidden")
    $(".stretching-option").addClass("hidden")
    console.log(mobileCategoryTwo)
  }
  if (mobileCategoryTwo == "Stretching") {
    $(".stretching-option").removeClass("hidden")
    $(".calisthenics-option").addClass("hidden")
    $(".free-weight-option").addClass("hidden")
    $(".cardio-option").addClass("hidden")
    $(".weight-machine-option").addClass("hidden")
    console.log(mobileCategoryTwo)
  }

}

function selectMobileCategoryThree() {
  let mobileCategoryThree = document.getElementById("mobile_exercise_three_category").value;
  console.log(mobileCategoryThree)
  if (mobileCategoryThree == "Free Weights"){
    $(".free-weight-option").removeClass("hidden")
    $(".cardio-option").addClass("hidden")
    $(".calisthenics-option").addClass("hidden")
    $(".stretching-option").addClass("hidden")
    $(".weight-machine-option").addClass("hidden")
  }
  if (mobileCategoryThree == "Cardio") {
    $(".cardio-option").removeClass("hidden")
    $(".free-weight-option").addClass("hidden")
    $(".calisthenics-option").addClass("hidden")
    $(".stretching-option").addClass("hidden")
    $(".weight-machine-option").addClass("hidden")
    console.log(mobileCategoryThree)
  }
  if (mobileCategoryThree == "Calisthenics") {
    $(".calisthenics-option").removeClass("hidden")
    $(".weight-machine-option").addClass("hidden")
    $(".free-weight-option").addClass("hidden")
    $(".cardio-option").addClass("hidden")
    $(".stretching-option").addClass("hidden")
    console.log(mobileCategoryThree)
  }
  if (mobileCategoryThree == "Weight Machine") {
    $(".weight-machine-option").removeClass("hidden")
    $(".calisthenics-option").addClass("hidden")
    $(".free-weight-option").addClass("hidden")
    $(".cardio-option").addClass("hidden")
    $(".stretching-option").addClass("hidden")
    console.log(mobileCategoryThree)
  }
  if (mobileCategoryThree == "Stretching") {
    $(".stretching-option").removeClass("hidden")
    $(".calisthenics-option").addClass("hidden")
    $(".free-weight-option").addClass("hidden")
    $(".cardio-option").addClass("hidden")
    $(".weight-machine-option").addClass("hidden")
    console.log(mobileCategoryThree)
  }

}

function selectMobileCategoryFour() {
  let mobileCategoryFour = document.getElementById("mobile_exercise_four_category").value;
  console.log(mobileCategoryFour)
  if (mobileCategoryFour == "Free Weights"){
    $(".free-weight-option").removeClass("hidden")
    $(".cardio-option").addClass("hidden")
    $(".calisthenics-option").addClass("hidden")
    $(".stretching-option").addClass("hidden")
    $(".weight-machine-option").addClass("hidden")
  }
  if (mobileCategoryFour == "Cardio") {
    $(".cardio-option").removeClass("hidden")
    $(".free-weight-option").addClass("hidden")
    $(".calisthenics-option").addClass("hidden")
    $(".stretching-option").addClass("hidden")
    $(".weight-machine-option").addClass("hidden")
    console.log(mobileCategoryFour)
  }
  if (mobileCategoryFour == "Calisthenics") {
    $(".calisthenics-option").removeClass("hidden")
    $(".weight-machine-option").addClass("hidden")
    $(".free-weight-option").addClass("hidden")
    $(".cardio-option").addClass("hidden")
    $(".stretching-option").addClass("hidden")
    console.log(mobileCategoryFour)
  }
  if (mobileCategoryFour == "Weight Machine") {
    $(".weight-machine-option").removeClass("hidden")
    $(".calisthenics-option").addClass("hidden")
    $(".free-weight-option").addClass("hidden")
    $(".cardio-option").addClass("hidden")
    $(".stretching-option").addClass("hidden")
    console.log(mobileCategoryFour)
  }
  if (mobileCategoryFour == "Stretching") {
    $(".stretching-option").removeClass("hidden")
    $(".calisthenics-option").addClass("hidden")
    $(".free-weight-option").addClass("hidden")
    $(".cardio-option").addClass("hidden")
    $(".weight-machine-option").addClass("hidden")
    console.log(mobileCategoryFour)
  }

}

function selectMobileCategoryFive() {
  let mobileCategoryFive = document.getElementById("mobile_exercise_five_category").value;
  console.log(mobileCategoryFive)
  if (mobileCategoryFive == "Free Weights"){
    $(".free-weight-option").removeClass("hidden")
    $(".cardio-option").addClass("hidden")
    $(".calisthenics-option").addClass("hidden")
    $(".stretching-option").addClass("hidden")
    $(".weight-machine-option").addClass("hidden")
  }
  if (mobileCategoryFive == "Cardio") {
    $(".cardio-option").removeClass("hidden")
    $(".free-weight-option").addClass("hidden")
    $(".calisthenics-option").addClass("hidden")
    $(".stretching-option").addClass("hidden")
    $(".weight-machine-option").addClass("hidden")
    console.log(mobileCategoryFive)
  }
  if (mobileCategoryFive == "Calisthenics") {
    $(".calisthenics-option").removeClass("hidden")
    $(".weight-machine-option").addClass("hidden")
    $(".free-weight-option").addClass("hidden")
    $(".cardio-option").addClass("hidden")
    $(".stretching-option").addClass("hidden")
    console.log(mobileCategoryFive)
  }
  if (mobileCategoryFive == "Weight Machine") {
    $(".weight-machine-option").removeClass("hidden")
    $(".calisthenics-option").addClass("hidden")
    $(".free-weight-option").addClass("hidden")
    $(".cardio-option").addClass("hidden")
    $(".stretching-option").addClass("hidden")
    console.log(mobileCategoryFive)
  }
  if (mobileCategoryFive == "Stretching") {
    $(".stretching-option").removeClass("hidden")
    $(".calisthenics-option").addClass("hidden")
    $(".free-weight-option").addClass("hidden")
    $(".cardio-option").addClass("hidden")
    $(".weight-machine-option").addClass("hidden")
    console.log(mobileCategoryFive)
  }

}

function selectMobileCategorySix() {
  let mobileCategorySix = document.getElementById("mobile_exercise_six_category").value;
  console.log(mobileCategorySix)
  if (mobileCategorySix == "Free Weights"){
    $(".free-weight-option").removeClass("hidden")
    $(".cardio-option").addClass("hidden")
    $(".calisthenics-option").addClass("hidden")
    $(".stretching-option").addClass("hidden")
    $(".weight-machine-option").addClass("hidden")
  }
  if (mobileCategorySix == "Cardio") {
    $(".cardio-option").removeClass("hidden")
    $(".free-weight-option").addClass("hidden")
    $(".calisthenics-option").addClass("hidden")
    $(".stretching-option").addClass("hidden")
    $(".weight-machine-option").addClass("hidden")
    console.log(mobileCategorySix)
  }
  if (mobileCategorySix == "Calisthenics") {
    $(".calisthenics-option").removeClass("hidden")
    $(".weight-machine-option").addClass("hidden")
    $(".free-weight-option").addClass("hidden")
    $(".cardio-option").addClass("hidden")
    $(".stretching-option").addClass("hidden")
    console.log()
  }
  if (mobileCategorySix == "Weight Machine") {
    $(".weight-machine-option").removeClass("hidden")
    $(".calisthenics-option").addClass("hidden")
    $(".free-weight-option").addClass("hidden")
    $(".cardio-option").addClass("hidden")
    $(".stretching-option").addClass("hidden")
    console.log(mobileCategorySix)
  }
  if (mobileCategorySix == "Stretching") {
    $(".stretching-option").removeClass("hidden")
    $(".calisthenics-option").addClass("hidden")
    $(".free-weight-option").addClass("hidden")
    $(".cardio-option").addClass("hidden")
    $(".weight-machine-option").addClass("hidden")
    console.log(mobileCategorySix)
  }

}

function selectMobileCategorySeven() {
  let mobileCategorySeven = document.getElementById("mobile_exercise_seven_category").value;
  console.log(mobileCategorySeven)
  if (mobileCategorySeven == "Free Weights"){
    $(".free-weight-option").removeClass("hidden")
    $(".cardio-option").addClass("hidden")
    $(".calisthenics-option").addClass("hidden")
    $(".stretching-option").addClass("hidden")
    $(".weight-machine-option").addClass("hidden")
  }
  if (mobileCategorySeven == "Cardio") {
    $(".cardio-option").removeClass("hidden")
    $(".free-weight-option").addClass("hidden")
    $(".calisthenics-option").addClass("hidden")
    $(".stretching-option").addClass("hidden")
    $(".weight-machine-option").addClass("hidden")
    console.log(mobileCategorySeven)
  }
  if (mobileCategorySeven == "Calisthenics") {
    $(".calisthenics-option").removeClass("hidden")
    $(".weight-machine-option").addClass("hidden")
    $(".free-weight-option").addClass("hidden")
    $(".cardio-option").addClass("hidden")
    $(".stretching-option").addClass("hidden")
    console.log(mobileCategorySeven)
  }
  if (mobileCategorySeven == "Weight Machine") {
    $(".weight-machine-option").removeClass("hidden")
    $(".calisthenics-option").addClass("hidden")
    $(".free-weight-option").addClass("hidden")
    $(".cardio-option").addClass("hidden")
    $(".stretching-option").addClass("hidden")
    console.log(mobileCategorySeven)
  }
  if (mobileCategorySeven == "Stretching") {
    $(".stretching-option").removeClass("hidden")
    $(".calisthenics-option").addClass("hidden")
    $(".free-weight-option").addClass("hidden")
    $(".cardio-option").addClass("hidden")
    $(".weight-machine-option").addClass("hidden")
    console.log(mobileCategorySeven)
  }

}

function selectMobileCategoryEight() {
  let mobileCategoryEight= document.getElementById("mobile_exercise_eight_category").value;
  console.log(mobileCategoryEight)
  if (mobileCategoryEight == "Free Weights"){
    $(".free-weight-option").removeClass("hidden")
    $(".cardio-option").addClass("hidden")
    $(".calisthenics-option").addClass("hidden")
    $(".stretching-option").addClass("hidden")
    $(".weight-machine-option").addClass("hidden")
  }
  if (mobileCategoryEight == "Cardio") {
    $(".cardio-option").removeClass("hidden")
    $(".free-weight-option").addClass("hidden")
    $(".calisthenics-option").addClass("hidden")
    $(".stretching-option").addClass("hidden")
    $(".weight-machine-option").addClass("hidden")
    console.log(mobileCategoryEight)
  }
  if (mobileCategoryEight == "Calisthenics") {
    $(".calisthenics-option").removeClass("hidden")
    $(".weight-machine-option").addClass("hidden")
    $(".free-weight-option").addClass("hidden")
    $(".cardio-option").addClass("hidden")
    $(".stretching-option").addClass("hidden")
    console.log(mobileCategoryEight)
  }
  if (mobileCategoryEight == "Weight Machine") {
    $(".weight-machine-option").removeClass("hidden")
    $(".calisthenics-option").addClass("hidden")
    $(".free-weight-option").addClass("hidden")
    $(".cardio-option").addClass("hidden")
    $(".stretching-option").addClass("hidden")
    console.log(mobileCategoryEight)
  }
  if (mobileCategoryEight == "Stretching") {
    $(".stretching-option").removeClass("hidden")
    $(".calisthenics-option").addClass("hidden")
    $(".free-weight-option").addClass("hidden")
    $(".cardio-option").addClass("hidden")
    $(".weight-machine-option").addClass("hidden")
    console.log(mobileCategoryEight)
  }

}

function selectMobileCategoryNine() {
  let mobileCategoryNine= document.getElementById("mobile_exercise_nine_category").value;
  console.log(mobileCategoryNine)
  if (mobileCategoryNine == "Free Weights"){
    $(".free-weight-option").removeClass("hidden")
    $(".cardio-option").addClass("hidden")
    $(".calisthenics-option").addClass("hidden")
    $(".stretching-option").addClass("hidden")
    $(".weight-machine-option").addClass("hidden")
  }
  if (mobileCategoryNine == "Cardio") {
    $(".cardio-option").removeClass("hidden")
    $(".free-weight-option").addClass("hidden")
    $(".calisthenics-option").addClass("hidden")
    $(".stretching-option").addClass("hidden")
    $(".weight-machine-option").addClass("hidden")
    console.log(mobileCategoryNine)
  }
  if (mobileCategoryNine == "Calisthenics") {
    $(".calisthenics-option").removeClass("hidden")
    $(".weight-machine-option").addClass("hidden")
    $(".free-weight-option").addClass("hidden")
    $(".cardio-option").addClass("hidden")
    $(".stretching-option").addClass("hidden")
    console.log(mobileCategoryNine)
  }
  if (mobileCategoryNine == "Weight Machine") {
    $(".weight-machine-option").removeClass("hidden")
    $(".calisthenics-option").addClass("hidden")
    $(".free-weight-option").addClass("hidden")
    $(".cardio-option").addClass("hidden")
    $(".stretching-option").addClass("hidden")
    console.log(mobileCategoryNine)
  }
  if (mobileCategoryNine == "Stretching") {
    $(".stretching-option").removeClass("hidden")
    $(".calisthenics-option").addClass("hidden")
    $(".free-weight-option").addClass("hidden")
    $(".cardio-option").addClass("hidden")
    $(".weight-machine-option").addClass("hidden")
    console.log(mobileCategoryNine)
  }

}

function selectMobileCategoryTen() {
  let mobileCategoryTen= document.getElementById("mobile_exercise_ten_category").value;
  console.log(mobileCategoryTen)
  if (mobileCategoryTen == "Free Weights"){
    $(".free-weight-option").removeClass("hidden")
    $(".cardio-option").addClass("hidden")
    $(".calisthenics-option").addClass("hidden")
    $(".stretching-option").addClass("hidden")
    $(".weight-machine-option").addClass("hidden")
  }
  if (mobileCategoryTen == "Cardio") {
    $(".cardio-option").removeClass("hidden")
    $(".free-weight-option").addClass("hidden")
    $(".calisthenics-option").addClass("hidden")
    $(".stretching-option").addClass("hidden")
    $(".weight-machine-option").addClass("hidden")
    console.log(mobileCategoryTen)
  }
  if (mobileCategoryTen == "Calisthenics") {
    $(".calisthenics-option").removeClass("hidden")
    $(".weight-machine-option").addClass("hidden")
    $(".free-weight-option").addClass("hidden")
    $(".cardio-option").addClass("hidden")
    $(".stretching-option").addClass("hidden")
    console.log(mobileCategoryTen)
  }
  if (mobileCategoryTen == "Weight Machine") {
    $(".weight-machine-option").removeClass("hidden")
    $(".calisthenics-option").addClass("hidden")
    $(".free-weight-option").addClass("hidden")
    $(".cardio-option").addClass("hidden")
    $(".stretching-option").addClass("hidden")
    console.log(mobileCategoryTen)
  }
  if (mobileCategoryTen == "Stretching") {
    $(".stretching-option").removeClass("hidden")
    $(".calisthenics-option").addClass("hidden")
    $(".free-weight-option").addClass("hidden")
    $(".cardio-option").addClass("hidden")
    $(".weight-machine-option").addClass("hidden")
    console.log(mobileCategoryTen)
  }

}

function skipToComplete() {
  $("#mobile-additional-information").removeClass("hidden");
  $("#mobile-visible-switch").removeClass("hidden");
  $("#mobile-exercise-submit").removeClass("hidden");
  $("#skip-button").addClass("hidden");
  $("#continue-logging").addClass("hidden");
}

