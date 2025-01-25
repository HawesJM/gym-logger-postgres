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

function selectMobileCategoryOne() {
  let mobileCategoryOne = document.getElementById("mobile_exercise_one_category").value;
  console.log(mobileCategoryOne)
  if (mobileCategoryOne == "Free Weights"){
    $("#mobile_exercise_one_name").append("<option value= Dumbbell Curls> Dumbbell Curls </option>")
    $("#mobile_exercise_one_name").append("<option value= Hammer Curls> Hammer Curls </option>")
    $("#mobile_exercise_one_name").append("<option value= Barbell Curls> Barbell Curls </option>")
    $("#mobile_exercise_one_name").append("<option value= Dumbell Fly> Dumbbell Fly </option>")
    $("#mobile_exercise_one_category_selected").attr('disabled','disabled')
  }
  if (mobileCategoryOne == "Cardio") {
    $(".cardio-option").removeClass("hidden")
    $(".free-weight-option").addClass("hidden")
    $(".calisthenics-option").addClass("hidden")
    $(".stretching-option").addClass("hidden")
    $(".weight-machine-option").addClass("hidden")
    console.log(mobileCategoryOne)
  }
  if (mobileCategoryOne == "Calisthenics") {
    $(".calisthenics-option").removeClass("hidden")
    $(".weight-machine-option").addClass("hidden")
    $(".free-weight-option").addClass("hidden")
    $(".cardio-option").addClass("hidden")
    $(".stretching-option").addClass("hidden")
    console.log(mobileCategoryOne)
  }
  if (mobileCategoryOne == "Weight Machine") {
    $(".weight-machine-option").removeClass("hidden")
    $(".calisthenics-option").addClass("hidden")
    $(".free-weight-option").addClass("hidden")
    $(".cardio-option").addClass("hidden")
    $(".stretching-option").addClass("hidden")
    console.log(mobileCategoryOne)
  }
  if (mobileCategoryOne == "Stretching") {
    $(".stretching-option").removeClass("hidden")
    $(".calisthenics-option").addClass("hidden")
    $(".free-weight-option").addClass("hidden")
    $(".cardio-option").addClass("hidden")
    $(".weight-machine-option").addClass("hidden")
    console.log(mobileCategoryOne)
  }

}

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
