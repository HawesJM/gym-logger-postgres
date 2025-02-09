var currentTab = 0; // Current tab is set to be the first tab (0)

if (document.getElementById("edit_workout_title")){
  $("#social-footer").addClass("hidden");
  $("#copyright").addClass("hidden");
}

if (document.getElementById("archive-record-container")){
  $("#social-footer").addClass("hidden");
  $("#copyright").addClass("hidden");
}


if (document.getElementById("workout-form-card")) {
  document.getElementById("record-button").style.display="none";
  document.getElementById('nextBtn').addEventListener("click",showSubmit);
  showTab(currentTab); // Display the current tab
}

//edit workout form event listeners //

if (document.getElementById("edit_workout_two_expand")) {
  document.getElementById("edit_workout_one_expand").addEventListener("click",removeNoneValues);
  document.getElementById("edit_workout_two_expand").addEventListener("click",removeNoneValues);
  document.getElementById("edit_workout_three_expand").addEventListener("click",removeNoneValues);
  document.getElementById("edit_workout_four_expand").addEventListener("click",removeNoneValues);
  document.getElementById("edit_workout_five_expand").addEventListener("click",removeNoneValues);
  document.getElementById("edit_workout_six_expand").addEventListener("click",removeNoneValues);
  document.getElementById("edit_workout_seven_expand").addEventListener("click",removeNoneValues);
  document.getElementById("edit_workout_eight_expand").addEventListener("click",removeNoneValues);
  document.getElementById("edit_workout_nine_expand").addEventListener("click",removeNoneValues);
  document.getElementById("edit_workout_ten_expand").addEventListener("click",removeNoneValues);
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

//mobile profile page event listeners //

if (document.getElementById("workout-details-toggle")) {
  document.getElementById("workout-details-toggle").addEventListener("click", mobileProfileHide);
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

//edit workout remove None function //
function removeNoneValues() {
  if (document.getElementById("edit_workout_title")){
    document.getElementById("exercise_two_total_one").value = 0
    document.getElementById("exercise_two_total_two").value = 0
    document.getElementById("exercise_two_total_three").value = 0
    document.getElementById("exercise_three_total_one").value = 0
    document.getElementById("exercise_three_total_two").value = 0
    document.getElementById("exercise_three_total_three").value = 0
    document.getElementById("exercise_four_total_one").value = 0
    document.getElementById("exercise_four_total_two").value = 0
    document.getElementById("exercise_four_total_three").value = 0
    document.getElementById("exercise_five_total_one").value = 0
    document.getElementById("exercise_five_total_two").value = 0
    document.getElementById("exercise_five_total_three").value = 0
    document.getElementById("exercise_six_total_one").value = 0
    document.getElementById("exercise_six_total_two").value = 0
    document.getElementById("exercise_six_total_three").value = 0
    document.getElementById("exercise_seven_total_one").value = 0
    document.getElementById("exercise_seven_total_two").value = 0
    document.getElementById("exercise_seven_total_three").value = 0 
    document.getElementById("exercise_eight_total_one").value = 0
    document.getElementById("exercise_eight_total_two").value = 0
    document.getElementById("exercise_eight_total_three").value = 0
    document.getElementById("exercise_nine_total_one").value = 0
    document.getElementById("exercise_nine_total_two").value = 0
    document.getElementById("exercise_nine_total_three").value = 0
    document.getElementById("exercise_ten_total_one").value = 0
    document.getElementById("exercise_ten_total_two").value = 0
    document.getElementById("exercise_ten_total_three").value = 0                                     
  }
}

  // to limit selectable exercises by category

// mobile dropdown functions  //

// mobile dropdown functions exercise one  //

function selectMobileCategoryOne() {
  let mobileCategoryOne = document.getElementById("mobile_exercise_one_category").value;
  if (mobileCategoryOne == "Free Weights"){
    if (!document.getElementById('bench-press-option')) {
      $("#mobile_exercise_one_name").append("<option class='free-weight-option' id='barbell-curls-option'value= 'Barbell Curls'> Barbell Curls </option>")
      $("#mobile_exercise_one_name").append("<option class='free-weight-option' id='bench-press-option' value= 'Bench Press'> Bench Press </option>")
      $("#mobile_exercise_one_name").append("<option class='free-weight-option' id='dumbbell-curls-option' value= 'Dumbbell Curls'> Dumbbell Curls </option>")
      $("#mobile_exercise_one_name").append("<option class='free-weight-option' id='dumbbell-fly-option' value= 'Dumbbell Fly'> Dumbbell Fly </option>")
      $("#mobile_exercise_one_name").append("<option class='free-weight-option' id='dumbbell-raise-option' value= 'Dumbbell Raise'> Dumbbell Raise </option>")
      $("#mobile_exercise_one_name").append("<option class='free-weight-option' id='hammer-curls-option'value= 'Hammer Curls'> Hammer Curls </option>")

    }
    $("#running-machine-option").remove()
    $("#rowing-machine-option").remove()
    $("#dips-option").remove()
    $("#suspended-leg-raises-option").remove()
    $("#assisted-bench-press-option").remove()
    $("#abdominal-crunch-option").remove()
    $("#low-row-option").remove()
    $("#lat-pulldown-option").remove()
    $("#pectoral-fly-option").remove()
    $("#chest-press-option").remove()
    $("#cable-fly-option").remove()
    $("#converging-shoulder-press-option").remove()
    $("#diverging-seated-row-option").remove()
    $("#diverging-lat-pulldown-option").remove()
    $("#lateral-raise-option").remove()
    $("#tricep-press-option").remove()
    $("#incline-press-option").remove()
    $("#chin-assist-option").remove()
    $("#dip-assist-option").remove()
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
    $("#dumbbell-raise-option").remove()
    $("#hammer-curls-option").remove()
    $("#barbell-curls-option").remove()
    $("#dumbbell-fly-option").remove()
    $("#dumbell-raise-option").remove()
    $("#dips-option").remove()
    $("#sit-ups-option").remove()
    $("#suspended-leg-raises-option").remove()
    $("#assisted-bench-press-option").remove()
    $("#abdominal-crunch-option").remove()
    $("#lat-pulldown-option").remove()
    $("#low-row-option").remove()
    $("#pectoral-fly-option").remove()
    $("#chest-press-option").remove()
    $("#cable-fly-option").remove()
    $("#chin-assist-option").remove()
    $("#dip-assist-option").remove()
    $("#diverging-seated-row-option").remove()
    $("#diverging-lat-pulldown-option").remove()
    $("#lateral-raise-option").remove()
    $("#tricep-press-option").remove()
    $("#incline-press-option").remove()
    $("#converging-shoulder-press-option").remove()
    $("#shoulder-stretch-option").remove()
  }


  if (mobileCategoryOne == "Calisthenics") {
    if (!document.getElementById('dips-option')) {
      $("#mobile_exercise_one_name").append("<option id='dips-option' value= 'Dips'> Dips </option>")
      $("#mobile_exercise_one_name").append("<option id='sit-ups-option' value= 'Sit Ups'> Sit Ups </option>")
      $("#mobile_exercise_one_name").append("<option id='suspended-leg-raises-option' value= 'Suspended Leg Raises'> Suspended Leg Raises </option>")
    }
    $("#bench-press-option").remove()
    $("#dumbbell-curls-option").remove()
    $("#hammer-curls-option").remove()
    $("#barbell-curls-option").remove()
    $("#dumbbell-fly-option").remove()
    $("#dumbbell-raise-option").remove()
    $("#running-machine-option").remove()
    $("#rowing-machine-option").remove()
    $("#assisted-bench-press-option").remove()
    $("#low-row-option").remove()
    $("#lat-pulldown-option").remove()
    $("#pectoral-fly-option").remove()
    $("#chest-press-option").remove()
    $("#cable-fly-option").remove()
    $("#diverging-seated-row-option").remove()
    $("#diverging-lat-pulldown-option").remove()
    $("#abdominal-crunch-option").remove()
    $("#lateral-raise-option").remove()
    $("#tricep-press-option").remove()
    $("#incline-press-option").remove()
    $("#chin-assist-option").remove()
    $("#dip-assist-option").remove()
    $("#converging-shoulder-press-option").remove()
    $("#shoulder-stretch-option").remove()
  
  }


  if (mobileCategoryOne == "Weight Machine") {
    if (!document.getElementById('assisted-bench-press-option')) {
      $("#mobile_exercise_one_name").append("<option id='abdominal-crunch-option' value= 'Abdominal Crunch'> Abdominal Crunch </option>")
      $("#mobile_exercise_one_name").append("<option id='assisted-bench-press-option' value= 'Assisted Bench Press'> Assisted Bench Press </option>")
      $("#mobile_exercise_one_name").append("<option id='cable-fly-option' value= 'Cable Fly'> Cable Fly </option>")
      $("#mobile_exercise_one_name").append("<option id='chest-press-option' value= 'Chest Press'> Chest Press </option>")
      $("#mobile_exercise_one_name").append("<option id='chin-assist-option' value= 'Chin Assist'> Chin Assist </option>")
      $("#mobile_exercise_one_name").append("<option id='converging-shoulder-press-option' value= 'Converging Shoulder Press'> Converging Shoulder Press </option>")
      $("#mobile_exercise_one_name").append("<option id='dip-assist-option' value= 'Dip Assist'> Dip Assist </option>")
      $("#mobile_exercise_one_name").append("<option id='diverging-lat-pulldown-option' value= 'Diverging Lat Pulldown'> Diverging Lat Pulldown </option>")
      $("#mobile_exercise_one_name").append("<option id='diverging-seated-row-option' value= 'Diverging Seated Row'> Diverging Seated Row </option>")
      $("#mobile_exercise_one_name").append("<option id='incline-press-option' value= 'Incline Press'> Incline Press </option>")
      $("#mobile_exercise_one_name").append("<option id='lat-pulldown-option' value= 'Lat Pulldown'> Lat Pulldown </option>")
      $("#mobile_exercise_one_name").append("<option id='lateral-raise-option' value= 'Lateral Raise'> Lateral Raise </option>")
      $("#mobile_exercise_one_name").append("<option id='low-row-option' value= 'Low Row'> Low Row </option>")
      $("#mobile_exercise_one_name").append("<option id='pectoral-fly-option' value= 'Pectoral Fly'> Pectoral Fly </option>")
      $("#mobile_exercise_one_name").append("<option id='tricep-press-option' value= 'Tricep Press/Seated Dip'> Tricep Press/Seated Dip </option>")
    }
    $("#bench-press-option").remove()
    $("#dumbbell-curls-option").remove()
    $("#hammer-curls-option").remove()
    $("#dumbbell-raise-option").remove()
    $("#barbell-curls-option").remove()
    $("#dumbbell-fly-option").remove()
    $("#dumbell-raise-option").remove()
    $("#running-machine-option").remove()
    $("#rowing-machine-option").remove()
    $("#shoulder-stretch-option").remove()
    $("#dips-option").remove()
    $("#sit-ups-option").remove()
    $("#suspended-leg-raises-option").remove()
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
    $("#dips-option").remove()
    $("#sit-ups-option").remove()
    $("#suspended-leg-raises-option").remove()
    $("#pectoral-fly-option").remove()
    $("#chest-press-option").remove()
    $("#cable-fly-option").remove()
    $("#diverging-seated-row-option").remove()
    $("#diverging-lat-pulldown-option").remove()
    $("#lateral-raise-option").remove()
    $("#tricep-press-option").remove()
    $("#incline-press-option").remove()
    $("#chin-assist-option").remove()
    $("#dip-assist-option").remove()
    $("#converging-shoulder-press-option").remove()

}
}

// mobile dropdown functions exercise two  //

function selectMobileCategoryTwo() {
  let mobileCategoryTwo = document.getElementById("mobile_exercise_two_category").value;
  if (mobileCategoryTwo == "Free Weights"){
    if (!document.getElementById('bench-press-option')) {
      $("#mobile_exercise_two_name").append("<option class='free-weight-option' id='barbell-curls-option'value= 'Barbell Curls'> Barbell Curls </option>")
      $("#mobile_exercise_two_name").append("<option class='free-weight-option' id='bench-press-option' value= 'Bench Press'> Bench Press </option>")
      $("#mobile_exercise_two_name").append("<option class='free-weight-option' id='dumbbell-curls-option' value= 'Dumbbell Curls'> Dumbbell Curls </option>")
      $("#mobile_exercise_two_name").append("<option class='free-weight-option' id='dumbbell-fly-option' value= 'Dumbbell Fly'> Dumbbell Fly </option>")
      $("#mobile_exercise_two_name").append("<option class='free-weight-option' id='dumbbell-raise-option' value= 'Dumbbell Raise'> Dumbbell Raise </option>")
      $("#mobile_exercise_two_name").append("<option class='free-weight-option' id='hammer-curls-option'value= 'Hammer Curls'> Hammer Curls </option>")

    }
    $("#running-machine-option").remove()
    $("#rowing-machine-option").remove()
    $("#dips-option").remove()
    $("#sit-ups-option").remove()
    $("#suspended-leg-raises-option").remove()
    $("#assisted-bench-press-option").remove()
    $("#abdominal-crunch-option").remove()
    $("#low-row-option").remove()
    $("#lat-pulldown-option").remove()
    $("#chest-press-option").remove()
    $("#cable-fly-option").remove()
    $("#converging-shoulder-press-option").remove()
    $("#diverging-seated-row-option").remove()
    $("#diverging-lat-pulldown-option").remove()
    $("#lateral-raise-option").remove()
    $("#tricep-press-option").remove()
    $("#incline-press-option").remove()
    $("#chin-assist-option").remove()
    $("#dip-assist-option").remove()
    $("#shoulder-stretch-option").remove()
  }


  if (mobileCategoryTwo == "Cardio") {
    if (!document.getElementById('rowing-machine-option')) {
      $("#mobile_exercise_two_name").append("<option id='rowing-machine-option' value= 'Rowing Machine'> Rowing Machine </option>")
      $("#mobile_exercise_two_name").append("<option id='running-machine-option' value= 'Running Machine'> Running Machine </option>")
      
    }
    $("#bench-press-option").remove()
    $("#dumbbell-curls-option").remove()
    $("#hammer-curls-option").remove()
    $("#barbell-curls-option").remove()
    $("#dumbbell-fly-option").remove()
    $("#dumbbell-raise-option").remove()
    $("#dips-option").remove()
    $("#sit-ups-option").remove()
    $("#suspended-leg-raises-option").remove()
    $("#assisted-bench-press-option").remove()
    $("#abdominal-crunch-option").remove()
    $("#lat-pulldown-option").remove()
    $("#low-row-option").remove()
    $("#pectoral-fly-option").remove()
    $("#chest-press-option").remove()
    $("#cable-fly-option").remove()
    $("#chin-assist-option").remove()
    $("#dip-assist-option").remove()
    $("#diverging-seated-row-option").remove()
    $("#diverging-lat-pulldown-option").remove()
    $("#lateral-raise-option").remove()
    $("#tricep-press-option").remove()
    $("#incline-press-option").remove()
    $("#converging-shoulder-press-option").remove()
    $("#shoulder-stretch-option").remove()
  }


  if (mobileCategoryTwo == "Calisthenics") {
    if (!document.getElementById('dips-option')) {
      $("#mobile_exercise_two_name").append("<option id='dips-option' value= 'Dips'> Dips </option>")
      $("#mobile_exercise_two_name").append("<option id='sit-ups-option' value= 'Sit Ups'> Sit Ups </option>")
      $("#mobile_exercise_two_name").append("<option id='suspended-leg-raises-option' value= 'Suspended Leg Raises'> Suspended Leg Raises </option>")
    }
    $("#bench-press-option").remove()
    $("#dumbbell-curls-option").remove()
    $("#hammer-curls-option").remove()
    $("#barbell-curls-option").remove()
    $("#dumbbell-fly-option").remove()
    $("#dumbell-raise-option").remove()
    $("#running-machine-option").remove()
    $("#rowing-machine-option").remove()
    $("#assisted-bench-press-option").remove()
    $("#low-row-option").remove()
    $("#lat-pulldown-option").remove()
    $("#pectoral-fly-option").remove()
    $("#chest-press-option").remove()
    $("#cable-fly-option").remove()
    $("#diverging-seated-row-option").remove()
    $("#diverging-lat-pulldown-option").remove()
    $("#abdominal-crunch-option").remove()
    $("#lateral-raise-option").remove()
    $("#tricep-press-option").remove()
    $("#incline-press-option").remove()
    $("#chin-assist-option").remove()
    $("#dip-assist-option").remove()
    $("#converging-shoulder-press-option").remove()
    $("#shoulder-stretch-option").remove()
  
  }


  if (mobileCategoryTwo == "Weight Machine") {
    if (!document.getElementById('assisted-bench-press-option')) {
      $("#mobile_exercise_two_name").append("<option id='abdominal-crunch-option' value= 'Abdominal Crunch'> Abdominal Crunch </option>")
      $("#mobile_exercise_two_name").append("<option id='assisted-bench-press-option' value= 'Assisted Bench Press'> Assisted Bench Press </option>")
      $("#mobile_exercise_two_name").append("<option id='cable-fly-option' value= 'Cable Fly'> Cable Fly </option>")
      $("#mobile_exercise_two_name").append("<option id='chest-press-option' value= 'Chest Press'> Chest Press </option>")
      $("#mobile_exercise_two_name").append("<option id='chin-assist-option' value= 'Chin Assist'> Chin Assist </option>")
      $("#mobile_exercise_two_name").append("<option id='converging-shoulder-press-option' value= 'Converging Shoulder Press'> Converging Shoulder Press </option>")
      $("#mobile_exercise_two_name").append("<option id='dip-assist-option' value= 'Dip Assist'> Dip Assist </option>")
      $("#mobile_exercise_two_name").append("<option id='diverging-lat-pulldown-option' value= 'Diverging Lat Pulldown'> Diverging Lat Pulldown </option>")
      $("#mobile_exercise_two_name").append("<option id='diverging-seated-row-option' value= 'Diverging Seated Row'> Diverging Seated Row </option>")
      $("#mobile_exercise_two_name").append("<option id='incline-press-option' value= 'Incline Press'> Incline Press </option>")
      $("#mobile_exercise_two_name").append("<option id='lat-pulldown-option' value= 'Lat Pulldown'> Lat Pulldown </option>")
      $("#mobile_exercise_two_name").append("<option id='lateral-raise-option' value= 'Lateral Raise'> Lateral Raise </option>")
      $("#mobile_exercise_two_name").append("<option id='low-row-option' value= 'Low Row'> Low Row </option>")
      $("#mobile_exercise_two_name").append("<option id='pectoral-fly-option' value= 'Pectoral Fly'> Pectoral Fly </option>")
      $("#mobile_exercise_two_name").append("<option id='tricep-press-option' value= 'Tricep Press/Seated Dip'> Tricep Press/Seated Dip </option>")
    }
    $("#bench-press-option").remove()
    $("#dumbbell-curls-option").remove()
    $("#hammer-curls-option").remove()
    $("#barbell-curls-option").remove()
    $("#dumbbell-fly-option").remove()
    $("#dumbbell-raise-option").remove()
    $("#running-machine-option").remove()
    $("#rowing-machine-option").remove()
    $("#shoulder-stretch-option").remove()
    $("#dips-option").remove()
    $("#sit-ups-option").remove()
    $("#suspended-leg-raises-option").remove()
  }


  if (mobileCategoryTwo == "Stretching") {
    if (!document.getElementById('shoulder-stretch-option')) {
      $("#mobile_exercise_two_name").append("<option id='shoulder-stretch-option' value= 'Shoulder Stretch'> Shoulder Stretch </option>")
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
    $("#cable-fly-option").remove()
    $("#diverging-seated-row-option").remove()
    $("#diverging-lat-pulldown-option").remove()
    $("#lateral-raise-option").remove()
    $("#tricep-press-option").remove()
    $("#incline-press-option").remove()
    $("#chin-assist-option").remove()
    $("#dip-assist-option").remove()
    $("#converging-shoulder-press-option").remove()
    $("#dips-option").remove()
    $("#sit-ups-option").remove()
    $("#suspended-leg-raises-option").remove()

}
}

// mobile dropdown functions exercise three  //

function selectMobileCategoryThree() {
  let mobileCategoryThree = document.getElementById("mobile_exercise_three_category").value;
  if (mobileCategoryThree == "Free Weights"){
    if (!document.getElementById('bench-press-option')) {
      $("#mobile_exercise_three_name").append("<option class='free-weight-option' id='barbell-curls-option'value= 'Barbell Curls'> Barbell Curls </option>")
      $("#mobile_exercise_three_name").append("<option class='free-weight-option' id='bench-press-option' value= 'Bench Press'> Bench Press </option>")
      $("#mobile_exercise_three_name").append("<option class='free-weight-option' id='dumbbell-curls-option' value= 'Dumbbell Curls'> Dumbbell Curls </option>")
      $("#mobile_exercise_three_name").append("<option class='free-weight-option' id='dumbbell-fly-option' value= 'Dumbbell Fly'> Dumbbell Fly </option>")
      $("#mobile_exercise_three_name").append("<option class='free-weight-option' id='dumbbell-raise-option' value= 'Dumbbell Raise'> Dumbbell Raise </option>")
      $("#mobile_exercise_three_name").append("<option class='free-weight-option' id='hammer-curls-option'value= 'Hammer Curls'> Hammer Curls </option>")

    }
    $("#running-machine-option").remove()
    $("#rowing-machine-option").remove()
    $("#dips-option").remove()
    $("#assisted-bench-press-option").remove()
    $("#abdominal-crunch-option").remove()
    $("#low-row-option").remove()
    $("#lat-pulldown-option").remove()
    $("#chest-press-option").remove()
    $("#cable-fly-option").remove()
    $("#converging-shoulder-press-option").remove()
    $("#diverging-seated-row-option").remove()
    $("#diverging-lat-pulldown-option").remove()
    $("#lateral-raise-option").remove()
    $("#tricep-press-option").remove()
    $("#incline-press-option").remove()
    $("#chin-assist-option").remove()
    $("#dip-assist-option").remove()
    $("#shoulder-stretch-option").remove()
    $("#dips-option").remove()
    $("#sit-ups-option").remove()
    $("#suspended-leg-raises-option").remove()
  }


  if (mobileCategoryThree == "Cardio") {
    if (!document.getElementById('rowing-machine-option')) {
      $("#mobile_exercise_three_name").append("<option id='rowing-machine-option' value= 'Rowing Machine'> Rowing Machine </option>")
      $("#mobile_exercise_three_name").append("<option id='running-machine-option' value= 'Running Machine'> Running Machine </option>")
      
    }
    $("#bench-press-option").remove()
    $("#dumbbell-curls-option").remove()
    $("#hammer-curls-option").remove()
    $("#barbell-curls-option").remove()
    $("#dumbbell-fly-option").remove()
    $("#dumbbell-raise-option").remove()
    $("#dips-option").remove()
    $("#sit-ups-option").remove()
    $("#suspended-leg-raises-option").remove()
    $("#assisted-bench-press-option").remove()
    $("#abdominal-crunch-option").remove()
    $("#lat-pulldown-option").remove()
    $("#low-row-option").remove()
    $("#pectoral-fly-option").remove()
    $("#chest-press-option").remove()
    $("#cable-fly-option").remove()
    $("#chin-assist-option").remove()
    $("#dip-assist-option").remove()
    $("#diverging-seated-row-option").remove()
    $("#diverging-lat-pulldown-option").remove()
    $("#lateral-raise-option").remove()
    $("#tricep-press-option").remove()
    $("#incline-press-option").remove()
    $("#converging-shoulder-press-option").remove()
    $("#shoulder-stretch-option").remove()
  }


  if (mobileCategoryThree == "Calisthenics") {
    if (!document.getElementById('dips-option')) {
      $("#mobile_exercise_three_name").append("<option id='dips-option' value= 'Dips'> Dips </option>")
      $("#mobile_exercise_three_name").append("<option id='sit-ups-option' value= 'Sit Ups'> Sit Ups </option>")
      $("#mobile_exercise_three_name").append("<option id='suspended-leg-raises-option' value= 'Suspended Leg Raises'> Suspended Leg Raises </option>")
    }
    $("#bench-press-option").remove()
    $("#dumbbell-curls-option").remove()
    $("#hammer-curls-option").remove()
    $("#barbell-curls-option").remove()
    $("#dumbbell-fly-option").remove()
    $("#dumbell-raise-option").remove()
    $("#running-machine-option").remove()
    $("#rowing-machine-option").remove()
    $("#assisted-bench-press-option").remove()
    $("#low-row-option").remove()
    $("#lat-pulldown-option").remove()
    $("#pectoral-fly-option").remove()
    $("#chest-press-option").remove()
    $("#cable-fly-option").remove()
    $("#diverging-seated-row-option").remove()
    $("#diverging-lat-pulldown-option").remove()
    $("#abdominal-crunch-option").remove()
    $("#lateral-raise-option").remove()
    $("#tricep-press-option").remove()
    $("#incline-press-option").remove()
    $("#chin-assist-option").remove()
    $("#dip-assist-option").remove()
    $("#converging-shoulder-press-option").remove()
    $("#shoulder-stretch-option").remove()
  
  }


  if (mobileCategoryThree == "Weight Machine") {
    if (!document.getElementById('assisted-bench-press-option')) {
      $("#mobile_exercise_three_name").append("<option id='abdominal-crunch-option' value= 'Abdominal Crunch'> Abdominal Crunch </option>")
      $("#mobile_exercise_three_name").append("<option id='assisted-bench-press-option' value= 'Assisted Bench Press'> Assisted Bench Press </option>")
      $("#mobile_exercise_three_name").append("<option id='cable-fly-option' value= 'Cable Fly'> Cable Fly </option>")
      $("#mobile_exercise_three_name").append("<option id='chest-press-option' value= 'Chest Press'> Chest Press </option>")
      $("#mobile_exercise_three_name").append("<option id='chin-assist-option' value= 'Chin Assist'> Chin Assist </option>")
      $("#mobile_exercise_three_name").append("<option id='converging-shoulder-press-option' value= 'Converging Shoulder Press'> Converging Shoulder Press </option>")
      $("#mobile_exercise_three_name").append("<option id='dip-assist-option' value= 'Dip Assist'> Dip Assist </option>")
      $("#mobile_exercise_three_name").append("<option id='diverging-lat-pulldown-option' value= 'Diverging Lat Pulldown'> Diverging Lat Pulldown </option>")
      $("#mobile_exercise_three_name").append("<option id='diverging-seated-row-option' value= 'Diverging Seated Row'> Diverging Seated Row </option>")
      $("#mobile_exercise_three_name").append("<option id='incline-press-option' value= 'Incline Press'> Incline Press </option>")
      $("#mobile_exercise_three_name").append("<option id='lat-pulldown-option' value= 'Lat Pulldown'> Lat Pulldown </option>")
      $("#mobile_exercise_three_name").append("<option id='lateral-raise-option' value= 'Lateral Raise'> Lateral Raise </option>")
      $("#mobile_exercise_three_name").append("<option id='low-row-option' value= 'Low Row'> Low Row </option>")
      $("#mobile_exercise_three_name").append("<option id='pectoral-fly-option' value= 'Pectoral Fly'> Pectoral Fly </option>")
      $("#mobile_exercise_three_name").append("<option id='tricep-press-option' value= 'Tricep Press/Seated Dip'> Tricep Press/Seated Dip </option>")
    }
    $("#bench-press-option").remove()
    $("#dumbbell-curls-option").remove()
    $("#hammer-curls-option").remove()
    $("#barbell-curls-option").remove()
    $("#dumbbell-fly-option").remove()
    $("#dumbbell-raise-option").remove()
    $("#running-machine-option").remove()
    $("#rowing-machine-option").remove()
    $("#shoulder-stretch-option").remove()
    $("#dips-option").remove()
    $("#sit-ups-option").remove()
    $("#suspended-leg-raises-option").remove()
  }


  if (mobileCategoryThree == "Stretching") {
    if (!document.getElementById('shoulder-stretch-option')) {
      $("#mobile_exercise_three_name").append("<option id='shoulder-stretch-option' value= 'Shoulder Stretch'> Shoulder Stretch </option>")
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
    $("#cable-fly-option").remove()
    $("#diverging-seated-row-option").remove()
    $("#diverging-lat-pulldown-option").remove()
    $("#lateral-raise-option").remove()
    $("#tricep-press-option").remove()
    $("#incline-press-option").remove()
    $("#chin-assist-option").remove()
    $("#dip-assist-option").remove()
    $("#converging-shoulder-press-option").remove()
    $("#dips-option").remove()
    $("#sit-ups-option").remove()
    $("#suspended-leg-raises-option").remove()

}
}

// mobile dropdown functions exercise four  //

function selectMobileCategoryFour() {
  let mobileCategoryFour = document.getElementById("mobile_exercise_four_category").value;
  if (mobileCategoryFour == "Free Weights"){
    if (!document.getElementById('bench-press-option')) {
      $("#mobile_exercise_four_name").append("<option class='free-weight-option' id='barbell-curls-option'value= 'Barbell Curls'> Barbell Curls </option>")
      $("#mobile_exercise_four_name").append("<option class='free-weight-option' id='bench-press-option' value= 'Bench Press'> Bench Press </option>")
      $("#mobile_exercise_four_name").append("<option class='free-weight-option' id='dumbbell-curls-option' value= 'Dumbbell Curls'> Dumbbell Curls </option>")
      $("#mobile_exercise_four_name").append("<option class='free-weight-option' id='dumbbell-fly-option' value= 'Dumbbell Fly'> Dumbbell Fly </option>")
      $("#mobile_exercise_four_name").append("<option class='free-weight-option' id='dumbbell-raise-option' value= 'Dumbbell Raise'> Dumbbell Raise </option>")
      $("#mobile_exercise_four_name").append("<option class='free-weight-option' id='hammer-curls-option'value= 'Hammer Curls'> Hammer Curls </option>")

    }
    $("#running-machine-option").remove()
    $("#rowing-machine-option").remove()
    $("#dips-option").remove()
    $("#sit-ups-option").remove()
    $("#suspended-leg-raises-option").remove()
    $("#assisted-bench-press-option").remove()
    $("#abdominal-crunch-option").remove()
    $("#low-row-option").remove()
    $("#lat-pulldown-option").remove()
    $("#chest-press-option").remove()
    $("#cable-fly-option").remove()
    $("#converging-shoulder-press-option").remove()
    $("#diverging-seated-row-option").remove()
    $("#diverging-lat-pulldown-option").remove()
    $("#lateral-raise-option").remove()
    $("#tricep-press-option").remove()
    $("#incline-press-option").remove()
    $("#chin-assist-option").remove()
    $("#dip-assist-option").remove()
    $("#shoulder-stretch-option").remove()
  }


  if (mobileCategoryFour == "Cardio") {
    if (!document.getElementById('rowing-machine-option')) {
      $("#mobile_exercise_four_name").append("<option id='rowing-machine-option' value= 'Rowing Machine'> Rowing Machine </option>")
      $("#mobile_exercise_four_name").append("<option id='running-machine-option' value= 'Running Machine'> Running Machine </option>")
      
    }
    $("#bench-press-option").remove()
    $("#dumbbell-curls-option").remove()
    $("#hammer-curls-option").remove()
    $("#barbell-curls-option").remove()
    $("#dumbbell-fly-option").remove()
    $("#dumbbell-raise-option").remove()
    $("#dips-option").remove()
    $("#sit-ups-option").remove()
    $("#suspended-leg-raises-option").remove()
    $("#assisted-bench-press-option").remove()
    $("#abdominal-crunch-option").remove()
    $("#lat-pulldown-option").remove()
    $("#low-row-option").remove()
    $("#pectoral-fly-option").remove()
    $("#chest-press-option").remove()
    $("#cable-fly-option").remove()
    $("#chin-assist-option").remove()
    $("#dip-assist-option").remove()
    $("#diverging-seated-row-option").remove()
    $("#diverging-lat-pulldown-option").remove()
    $("#lateral-raise-option").remove()
    $("#tricep-press-option").remove()
    $("#incline-press-option").remove()
    $("#converging-shoulder-press-option").remove()
    $("#shoulder-stretch-option").remove()
  }


  if (mobileCategoryFour == "Calisthenics") {
    if (!document.getElementById('dips-option')) {
      $("#mobile_exercise_four_name").append("<option id='dips-option' value= 'Dips'> Dips </option>")
      $("#mobile_exercise_four_name").append("<option id='sit-ups-option' value= 'Sit Ups'> Sit Ups </option>")
      $("#mobile_exercise_four_name").append("<option id='suspended-leg-raises-option' value= 'Suspended Leg Raises'> Suspended Leg Raises </option>")
    }
    $("#bench-press-option").remove()
    $("#dumbbell-curls-option").remove()
    $("#hammer-curls-option").remove()
    $("#barbell-curls-option").remove()
    $("#dumbbell-fly-option").remove()
    $("#dumbell-raise-option").remove()
    $("#running-machine-option").remove()
    $("#rowing-machine-option").remove()
    $("#assisted-bench-press-option").remove()
    $("#low-row-option").remove()
    $("#lat-pulldown-option").remove()
    $("#pectoral-fly-option").remove()
    $("#chest-press-option").remove()
    $("#cable-fly-option").remove()
    $("#diverging-seated-row-option").remove()
    $("#diverging-lat-pulldown-option").remove()
    $("#abdominal-crunch-option").remove()
    $("#lateral-raise-option").remove()
    $("#tricep-press-option").remove()
    $("#incline-press-option").remove()
    $("#chin-assist-option").remove()
    $("#dip-assist-option").remove()
    $("#converging-shoulder-press-option").remove()
    $("#shoulder-stretch-option").remove()
  
  }


  if (mobileCategoryFour == "Weight Machine") {
    if (!document.getElementById('assisted-bench-press-option')) {
      $("#mobile_exercise_four_name").append("<option id='abdominal-crunch-option' value= 'Abdominal Crunch'> Abdominal Crunch </option>")
      $("#mobile_exercise_four_name").append("<option id='assisted-bench-press-option' value= 'Assisted Bench Press'> Assisted Bench Press </option>")
      $("#mobile_exercise_four_name").append("<option id='cable-fly-option' value= 'Cable Fly'> Cable Fly </option>")
      $("#mobile_exercise_four_name").append("<option id='chest-press-option' value= 'Chest Press'> Chest Press </option>")
      $("#mobile_exercise_four_name").append("<option id='chin-assist-option' value= 'Chin Assist'> Chin Assist </option>")
      $("#mobile_exercise_four_name").append("<option id='converging-shoulder-press-option' value= 'Converging Shoulder Press'> Converging Shoulder Press </option>")
      $("#mobile_exercise_four_name").append("<option id='dip-assist-option' value= 'Dip Assist'> Dip Assist </option>")
      $("#mobile_exercise_four_name").append("<option id='diverging-lat-pulldown-option' value= 'Diverging Lat Pulldown'> Diverging Lat Pulldown </option>")
      $("#mobile_exercise_four_name").append("<option id='diverging-seated-row-option' value= 'Diverging Seated Row'> Diverging Seated Row </option>")
      $("#mobile_exercise_four_name").append("<option id='incline-press-option' value= 'Incline Press'> Incline Press </option>")
      $("#mobile_exercise_four_name").append("<option id='lat-pulldown-option' value= 'Lat Pulldown'> Lat Pulldown </option>")
      $("#mobile_exercise_four_name").append("<option id='lateral-raise-option' value= 'Lateral Raise'> Lateral Raise </option>")
      $("#mobile_exercise_four_name").append("<option id='low-row-option' value= 'Low Row'> Low Row </option>")
      $("#mobile_exercise_four_name").append("<option id='pectoral-fly-option' value= 'Pectoral Fly'> Pectoral Fly </option>")
      $("#mobile_exercise_four_name").append("<option id='tricep-press-option' value= 'Tricep Press/Seated Dip'> Tricep Press/Seated Dip </option>")
    }
    $("#bench-press-option").remove()
    $("#dumbbell-curls-option").remove()
    $("#hammer-curls-option").remove()
    $("#barbell-curls-option").remove()
    $("#dumbbell-fly-option").remove()
    $("#dumbbell-raise-option").remove()
    $("#running-machine-option").remove()
    $("#rowing-machine-option").remove()
    $("#shoulder-stretch-option").remove()
    $("#dips-option").remove()
    $("#sit-ups-option").remove()
    $("#suspended-leg-raises-option").remove()
  }


  if (mobileCategoryFour == "Stretching") {
    if (!document.getElementById('shoulder-stretch-option')) {
      $("#mobile_exercise_four_name").append("<option id='shoulder-stretch-option' value= 'Shoulder Stretch'> Shoulder Stretch </option>")
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
    $("#cable-fly-option").remove()
    $("#diverging-seated-row-option").remove()
    $("#diverging-lat-pulldown-option").remove()
    $("#lateral-raise-option").remove()
    $("#tricep-press-option").remove()
    $("#incline-press-option").remove()
    $("#chin-assist-option").remove()
    $("#dip-assist-option").remove()
    $("#converging-shoulder-press-option").remove()
    $("#dips-option").remove()
    $("#sit-ups-option").remove()
    $("#suspended-leg-raises-option").remove()

}
}

// mobile dropdown functions exercise five  //

function selectMobileCategoryFive() {
  let mobileCategoryFive = document.getElementById("mobile_exercise_five_category").value;
  if (mobileCategoryFive == "Free Weights"){
    if (!document.getElementById('bench-press-option')) {
      $("#mobile_exercise_five_name").append("<option class='free-weight-option' id='barbell-curls-option'value= 'Barbell Curls'> Barbell Curls </option>")
      $("#mobile_exercise_five_name").append("<option class='free-weight-option' id='bench-press-option' value= 'Bench Press'> Bench Press </option>")
      $("#mobile_exercise_five_name").append("<option class='free-weight-option' id='dumbbell-curls-option' value= 'Dumbbell Curls'> Dumbbell Curls </option>")
      $("#mobile_exercise_five_name").append("<option class='free-weight-option' id='dumbbell-fly-option' value= 'Dumbbell Fly'> Dumbbell Fly </option>")
      $("#mobile_exercise_five_name").append("<option class='free-weight-option' id='dumbbell-raise-option' value= 'Dumbbell Raise'> Dumbbell Raise </option>")
      $("#mobile_exercise_five_name").append("<option class='free-weight-option' id='hammer-curls-option'value= 'Hammer Curls'> Hammer Curls </option>")

    }
    $("#running-machine-option").remove()
    $("#rowing-machine-option").remove()
    $("#dips-option").remove()
    $("#sit-ups-option").remove()
    $("#suspended-leg-raises-option").remove()
    $("#assisted-bench-press-option").remove()
    $("#abdominal-crunch-option").remove()
    $("#low-row-option").remove()
    $("#lat-pulldown-option").remove()
    $("#chest-press-option").remove()
    $("#cable-fly-option").remove()
    $("#converging-shoulder-press-option").remove()
    $("#diverging-seated-row-option").remove()
    $("#diverging-lat-pulldown-option").remove()
    $("#lateral-raise-option").remove()
    $("#tricep-press-option").remove()
    $("#incline-press-option").remove()
    $("#chin-assist-option").remove()
    $("#dip-assist-option").remove()
    $("#shoulder-stretch-option").remove()
  }


  if (mobileCategoryFive == "Cardio") {
    if (!document.getElementById('rowing-machine-option')) {
      $("#mobile_exercise_five_name").append("<option id='rowing-machine-option' value= 'Rowing Machine'> Rowing Machine </option>")
      $("#mobile_exercise_five_name").append("<option id='running-machine-option' value= 'Running Machine'> Running Machine </option>")
      
    }
    $("#bench-press-option").remove()
    $("#dumbbell-curls-option").remove()
    $("#hammer-curls-option").remove()
    $("#barbell-curls-option").remove()
    $("#dumbbell-fly-option").remove()
    $("#dumbbell-raise-option").remove()
    $("#dips-option").remove()
    $("#sit-ups-option").remove()
    $("#suspended-leg-raises-option").remove()
    $("#assisted-bench-press-option").remove()
    $("#abdominal-crunch-option").remove()
    $("#lat-pulldown-option").remove()
    $("#low-row-option").remove()
    $("#pectoral-fly-option").remove()
    $("#chest-press-option").remove()
    $("#cable-fly-option").remove()
    $("#chin-assist-option").remove()
    $("#dip-assist-option").remove()
    $("#diverging-seated-row-option").remove()
    $("#diverging-lat-pulldown-option").remove()
    $("#lateral-raise-option").remove()
    $("#tricep-press-option").remove()
    $("#incline-press-option").remove()
    $("#converging-shoulder-press-option").remove()
    $("#shoulder-stretch-option").remove()
  }


  if (mobileCategoryFive == "Calisthenics") {
    if (!document.getElementById('dips-option')) {
      $("#mobile_exercise_five_name").append("<option id='dips-option' value= 'Dips'> Dips </option>")
      $("#mobile_exercise_five_name").append("<option id='sit-ups-option' value= 'Sit Ups'> Sit Ups </option>")
      $("#mobile_exercise_five_name").append("<option id='suspended-leg-raises-option' value= 'Suspended Leg Raises'> Suspended Leg Raises </option>")
    }
    $("#bench-press-option").remove()
    $("#dumbbell-curls-option").remove()
    $("#hammer-curls-option").remove()
    $("#barbell-curls-option").remove()
    $("#dumbbell-fly-option").remove()
    $("#dumbell-raise-option").remove()
    $("#running-machine-option").remove()
    $("#rowing-machine-option").remove()
    $("#assisted-bench-press-option").remove()
    $("#low-row-option").remove()
    $("#lat-pulldown-option").remove()
    $("#pectoral-fly-option").remove()
    $("#chest-press-option").remove()
    $("#cable-fly-option").remove()
    $("#diverging-seated-row-option").remove()
    $("#diverging-lat-pulldown-option").remove()
    $("#abdominal-crunch-option").remove()
    $("#lateral-raise-option").remove()
    $("#tricep-press-option").remove()
    $("#incline-press-option").remove()
    $("#chin-assist-option").remove()
    $("#dip-assist-option").remove()
    $("#converging-shoulder-press-option").remove()
    $("#shoulder-stretch-option").remove()
  
  }


  if (mobileCategoryFive == "Weight Machine") {
    if (!document.getElementById('assisted-bench-press-option')) {
      $("#mobile_exercise_five_name").append("<option id='abdominal-crunch-option' value= 'Abdominal Crunch'> Abdominal Crunch </option>")
      $("#mobile_exercise_five_name").append("<option id='assisted-bench-press-option' value= 'Assisted Bench Press'> Assisted Bench Press </option>")
      $("#mobile_exercise_five_name").append("<option id='cable-fly-option' value= 'Cable Fly'> Cable Fly </option>")
      $("#mobile_exercise_five_name").append("<option id='chest-press-option' value= 'Chest Press'> Chest Press </option>")
      $("#mobile_exercise_five_name").append("<option id='chin-assist-option' value= 'Chin Assist'> Chin Assist </option>")
      $("#mobile_exercise_five_name").append("<option id='converging-shoulder-press-option' value= 'Converging Shoulder Press'> Converging Shoulder Press </option>")
      $("#mobile_exercise_five_name").append("<option id='dip-assist-option' value= 'Dip Assist'> Dip Assist </option>")
      $("#mobile_exercise_five_name").append("<option id='diverging-lat-pulldown-option' value= 'Diverging Lat Pulldown'> Diverging Lat Pulldown </option>")
      $("#mobile_exercise_five_name").append("<option id='diverging-seated-row-option' value= 'Diverging Seated Row'> Diverging Seated Row </option>")
      $("#mobile_exercise_five_name").append("<option id='incline-press-option' value= 'Incline Press'> Incline Press </option>")
      $("#mobile_exercise_five_name").append("<option id='lat-pulldown-option' value= 'Lat Pulldown'> Lat Pulldown </option>")
      $("#mobile_exercise_five_name").append("<option id='lateral-raise-option' value= 'Lateral Raise'> Lateral Raise </option>")
      $("#mobile_exercise_five_name").append("<option id='low-row-option' value= 'Low Row'> Low Row </option>")
      $("#mobile_exercise_five_name").append("<option id='pectoral-fly-option' value= 'Pectoral Fly'> Pectoral Fly </option>")
      $("#mobile_exercise_five_name").append("<option id='tricep-press-option' value= 'Tricep Press/Seated Dip'> Tricep Press/Seated Dip </option>")
    }
    $("#bench-press-option").remove()
    $("#dumbbell-curls-option").remove()
    $("#hammer-curls-option").remove()
    $("#barbell-curls-option").remove()
    $("#dumbbell-fly-option").remove()
    $("#dumbbell-raise-option").remove()
    $("#running-machine-option").remove()
    $("#rowing-machine-option").remove()
    $("#shoulder-stretch-option").remove()
    $("#dips-option").remove()
    $("#sit-ups-option").remove()
    $("#suspended-leg-raises-option").remove()
  }


  if (mobileCategoryFive == "Stretching") {
    if (!document.getElementById('shoulder-stretch-option')) {
      $("#mobile_exercise_five_name").append("<option id='shoulder-stretch-option' value= 'Shoulder Stretch'> Shoulder Stretch </option>")
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
    $("#cable-fly-option").remove()
    $("#diverging-seated-row-option").remove()
    $("#diverging-lat-pulldown-option").remove()
    $("#lateral-raise-option").remove()
    $("#tricep-press-option").remove()
    $("#incline-press-option").remove()
    $("#chin-assist-option").remove()
    $("#dip-assist-option").remove()
    $("#converging-shoulder-press-option").remove()
    $("#dips-option").remove()
    $("#sit-ups-option").remove()
    $("#suspended-leg-raises-option").remove()

}
}

// mobile dropdown functions exercise six  //

function selectMobileCategorySix() {
  let mobileCategorySix = document.getElementById("mobile_exercise_six_category").value;
  if (mobileCategorySix == "Free Weights"){
    if (!document.getElementById('bench-press-option')) {
      $("#mobile_exercise_six_name").append("<option class='free-weight-option' id='barbell-curls-option'value= 'Barbell Curls'> Barbell Curls </option>")
      $("#mobile_exercise_six_name").append("<option class='free-weight-option' id='bench-press-option' value= 'Bench Press'> Bench Press </option>")
      $("#mobile_exercise_six_name").append("<option class='free-weight-option' id='dumbbell-curls-option' value= 'Dumbbell Curls'> Dumbbell Curls </option>")
      $("#mobile_exercise_six_name").append("<option class='free-weight-option' id='dumbbell-fly-option' value= 'Dumbbell Fly'> Dumbbell Fly </option>")
      $("#mobile_exercise_six_name").append("<option class='free-weight-option' id='dumbbell-raise-option' value= 'Dumbbell Raise'> Dumbbell Raise </option>")
      $("#mobile_exercise_six_name").append("<option class='free-weight-option' id='hammer-curls-option'value= 'Hammer Curls'> Hammer Curls </option>")

    }
    $("#running-machine-option").remove()
    $("#rowing-machine-option").remove()
    $("#dips-option").remove()
    $("#sit-ups-option").remove()
    $("#suspended-leg-raises-option").remove()
    $("#assisted-bench-press-option").remove()
    $("#abdominal-crunch-option").remove()
    $("#low-row-option").remove()
    $("#lat-pulldown-option").remove()
    $("#chest-press-option").remove()
    $("#cable-fly-option").remove()
    $("#converging-shoulder-press-option").remove()
    $("#diverging-seated-row-option").remove()
    $("#diverging-lat-pulldown-option").remove()
    $("#lateral-raise-option").remove()
    $("#tricep-press-option").remove()
    $("#incline-press-option").remove()
    $("#chin-assist-option").remove()
    $("#dip-assist-option").remove()
    $("#shoulder-stretch-option").remove()
  }


  if (mobileCategorySix == "Cardio") {
    if (!document.getElementById('rowing-machine-option')) {
      $("#mobile_exercise_six_name").append("<option id='rowing-machine-option' value= 'Rowing Machine'> Rowing Machine </option>")
      $("#mobile_exercise_six_name").append("<option id='running-machine-option' value= 'Running Machine'> Running Machine </option>")
      
    }
    $("#bench-press-option").remove()
    $("#dumbbell-curls-option").remove()
    $("#hammer-curls-option").remove()
    $("#barbell-curls-option").remove()
    $("#dumbbell-fly-option").remove()
    $("#dumbbell-raise-option").remove()
    $("#dips-option").remove()
    $("#sit-ups-option").remove()
    $("#suspended-leg-raises-option").remove()
    $("#assisted-bench-press-option").remove()
    $("#abdominal-crunch-option").remove()
    $("#lat-pulldown-option").remove()
    $("#low-row-option").remove()
    $("#pectoral-fly-option").remove()
    $("#chest-press-option").remove()
    $("#cable-fly-option").remove()
    $("#chin-assist-option").remove()
    $("#dip-assist-option").remove()
    $("#diverging-seated-row-option").remove()
    $("#diverging-lat-pulldown-option").remove()
    $("#lateral-raise-option").remove()
    $("#tricep-press-option").remove()
    $("#incline-press-option").remove()
    $("#converging-shoulder-press-option").remove()
    $("#shoulder-stretch-option").remove()
  }


  if (mobileCategorySix == "Calisthenics") {
    if (!document.getElementById('dips-option')) {
      $("#mobile_exercise_six_name").append("<option id='dips-option' value= 'Dips'> Dips </option>")
      $("#mobile_exercise_six_name").append("<option id='sit-ups-option' value= 'Sit Ups'> Sit Ups </option>")
      $("#mobile_exercise_six_name").append("<option id='suspended-leg-raises-option' value= 'Suspended Leg Raises'> Suspended Leg Raises </option>")
    }
    $("#bench-press-option").remove()
    $("#dumbbell-curls-option").remove()
    $("#hammer-curls-option").remove()
    $("#barbell-curls-option").remove()
    $("#dumbbell-fly-option").remove()
    $("#dumbell-raise-option").remove()
    $("#running-machine-option").remove()
    $("#rowing-machine-option").remove()
    $("#assisted-bench-press-option").remove()
    $("#low-row-option").remove()
    $("#lat-pulldown-option").remove()
    $("#pectoral-fly-option").remove()
    $("#chest-press-option").remove()
    $("#cable-fly-option").remove()
    $("#diverging-seated-row-option").remove()
    $("#diverging-lat-pulldown-option").remove()
    $("#abdominal-crunch-option").remove()
    $("#lateral-raise-option").remove()
    $("#tricep-press-option").remove()
    $("#incline-press-option").remove()
    $("#chin-assist-option").remove()
    $("#dip-assist-option").remove()
    $("#converging-shoulder-press-option").remove()
    $("#shoulder-stretch-option").remove()
  
  }


  if (mobileCategorySix == "Weight Machine") {
    if (!document.getElementById('assisted-bench-press-option')) {
      $("#mobile_exercise_six_name").append("<option id='abdominal-crunch-option' value= 'Abdominal Crunch'> Abdominal Crunch </option>")
      $("#mobile_exercise_six_name").append("<option id='assisted-bench-press-option' value= 'Assisted Bench Press'> Assisted Bench Press </option>")
      $("#mobile_exercise_six_name").append("<option id='cable-fly-option' value= 'Cable Fly'> Cable Fly </option>")
      $("#mobile_exercise_six_name").append("<option id='chest-press-option' value= 'Chest Press'> Chest Press </option>")
      $("#mobile_exercise_six_name").append("<option id='chin-assist-option' value= 'Chin Assist'> Chin Assist </option>")
      $("#mobile_exercise_six_name").append("<option id='converging-shoulder-press-option' value= 'Converging Shoulder Press'> Converging Shoulder Press </option>")
      $("#mobile_exercise_six_name").append("<option id='dip-assist-option' value= 'Dip Assist'> Dip Assist </option>")
      $("#mobile_exercise_six_name").append("<option id='diverging-lat-pulldown-option' value= 'Diverging Lat Pulldown'> Diverging Lat Pulldown </option>")
      $("#mobile_exercise_six_name").append("<option id='diverging-seated-row-option' value= 'Diverging Seated Row'> Diverging Seated Row </option>")
      $("#mobile_exercise_six_name").append("<option id='incline-press-option' value= 'Incline Press'> Incline Press </option>")
      $("#mobile_exercise_six_name").append("<option id='lat-pulldown-option' value= 'Lat Pulldown'> Lat Pulldown </option>")
      $("#mobile_exercise_six_name").append("<option id='lateral-raise-option' value= 'Lateral Raise'> Lateral Raise </option>")
      $("#mobile_exercise_six_name").append("<option id='low-row-option' value= 'Low Row'> Low Row </option>")
      $("#mobile_exercise_six_name").append("<option id='pectoral-fly-option' value= 'Pectoral Fly'> Pectoral Fly </option>")
      $("#mobile_exercise_six_name").append("<option id='tricep-press-option' value= 'Tricep Press/Seated Dip'> Tricep Press/Seated Dip </option>")
    }
    $("#bench-press-option").remove()
    $("#dumbbell-curls-option").remove()
    $("#hammer-curls-option").remove()
    $("#barbell-curls-option").remove()
    $("#dumbbell-fly-option").remove()
    $("#dumbbell-raise-option").remove()
    $("#running-machine-option").remove()
    $("#rowing-machine-option").remove()
    $("#shoulder-stretch-option").remove()
    $("#dips-option").remove()
    $("#sit-ups-option").remove()
    $("#suspended-leg-raises-option").remove()
  }


  if (mobileCategorySix == "Stretching") {
    if (!document.getElementById('shoulder-stretch-option')) {
      $("#mobile_exercise_six_name").append("<option id='shoulder-stretch-option' value= 'Shoulder Stretch'> Shoulder Stretch </option>")
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
    $("#cable-fly-option").remove()
    $("#diverging-seated-row-option").remove()
    $("#diverging-lat-pulldown-option").remove()
    $("#lateral-raise-option").remove()
    $("#tricep-press-option").remove()
    $("#incline-press-option").remove()
    $("#chin-assist-option").remove()
    $("#dip-assist-option").remove()
    $("#converging-shoulder-press-option").remove()
    $("#dips-option").remove()
    $("#sit-ups-option").remove()
    $("#suspended-leg-raises-option").remove()

}
}

// mobile dropdown functions exercise seven  //

function selectMobileCategorySeven() {
  let mobileCategorySeven = document.getElementById("mobile_exercise_seven_category").value;
  if (mobileCategorySeven == "Free Weights"){
    if (!document.getElementById('bench-press-option')) {
      $("#mobile_exercise_seven_name").append("<option class='free-weight-option' id='barbell-curls-option'value= 'Barbell Curls'> Barbell Curls </option>")
      $("#mobile_exercise_seven_name").append("<option class='free-weight-option' id='bench-press-option' value= 'Bench Press'> Bench Press </option>")
      $("#mobile_exercise_seven_name").append("<option class='free-weight-option' id='dumbbell-curls-option' value= 'Dumbbell Curls'> Dumbbell Curls </option>")
      $("#mobile_exercise_seven_name").append("<option class='free-weight-option' id='dumbbell-fly-option' value= 'Dumbbell Fly'> Dumbbell Fly </option>")
      $("#mobile_exercise_seven_name").append("<option class='free-weight-option' id='dumbbell-raise-option' value= 'Dumbbell Raise'> Dumbbell Raise </option>")
      $("#mobile_exercise_seven_name").append("<option class='free-weight-option' id='hammer-curls-option'value= 'Hammer Curls'> Hammer Curls </option>")

    }
    $("#running-machine-option").remove()
    $("#rowing-machine-option").remove()
    $("#dips-option").remove()
    $("#sit-ups-option").remove()
    $("#suspended-leg-raises-option").remove()
    $("#assisted-bench-press-option").remove()
    $("#abdominal-crunch-option").remove()
    $("#low-row-option").remove()
    $("#lat-pulldown-option").remove()
    $("#chest-press-option").remove()
    $("#cable-fly-option").remove()
    $("#converging-shoulder-press-option").remove()
    $("#diverging-seated-row-option").remove()
    $("#diverging-lat-pulldown-option").remove()
    $("#lateral-raise-option").remove()
    $("#tricep-press-option").remove()
    $("#incline-press-option").remove()
    $("#chin-assist-option").remove()
    $("#dip-assist-option").remove()
    $("#shoulder-stretch-option").remove()
  }


  if (mobileCategorySeven == "Cardio") {
    if (!document.getElementById('rowing-machine-option')) {
      $("#mobile_exercise_seven_name").append("<option id='rowing-machine-option' value= 'Rowing Machine'> Rowing Machine </option>")
      $("#mobile_exercise_seven_name").append("<option id='running-machine-option' value= 'Running Machine'> Running Machine </option>")
      
    }
    $("#bench-press-option").remove()
    $("#dumbbell-curls-option").remove()
    $("#hammer-curls-option").remove()
    $("#barbell-curls-option").remove()
    $("#dumbbell-fly-option").remove()
    $("#dumbbell-raise-option").remove()
    $("#dips-option").remove()
    $("#sit-ups-option").remove()
    $("#suspended-leg-raises-option").remove()
    $("#assisted-bench-press-option").remove()
    $("#abdominal-crunch-option").remove()
    $("#lat-pulldown-option").remove()
    $("#low-row-option").remove()
    $("#pectoral-fly-option").remove()
    $("#chest-press-option").remove()
    $("#cable-fly-option").remove()
    $("#chin-assist-option").remove()
    $("#dip-assist-option").remove()
    $("#diverging-seated-row-option").remove()
    $("#diverging-lat-pulldown-option").remove()
    $("#lateral-raise-option").remove()
    $("#tricep-press-option").remove()
    $("#incline-press-option").remove()
    $("#converging-shoulder-press-option").remove()
    $("#shoulder-stretch-option").remove()
  }


  if (mobileCategorySeven == "Calisthenics") {
    if (!document.getElementById('dips-option')) {
      $("#mobile_exercise_seven_name").append("<option id='dips-option' value= 'Dips'> Dips </option>")
      $("#mobile_exercise_seven_name").append("<option id='sit-ups-option' value= 'Sit Ups'> Sit Ups </option>")
      $("#mobile_exercise_seven_name").append("<option id='suspended-leg-raises-option' value= 'Suspended Leg Raises'> Suspended Leg Raises </option>")
    }
    $("#bench-press-option").remove()
    $("#dumbbell-curls-option").remove()
    $("#hammer-curls-option").remove()
    $("#barbell-curls-option").remove()
    $("#dumbbell-fly-option").remove()
    $("#dumbell-raise-option").remove()
    $("#running-machine-option").remove()
    $("#rowing-machine-option").remove()
    $("#assisted-bench-press-option").remove()
    $("#low-row-option").remove()
    $("#lat-pulldown-option").remove()
    $("#pectoral-fly-option").remove()
    $("#chest-press-option").remove()
    $("#cable-fly-option").remove()
    $("#diverging-seated-row-option").remove()
    $("#diverging-lat-pulldown-option").remove()
    $("#abdominal-crunch-option").remove()
    $("#lateral-raise-option").remove()
    $("#tricep-press-option").remove()
    $("#incline-press-option").remove()
    $("#chin-assist-option").remove()
    $("#dip-assist-option").remove()
    $("#converging-shoulder-press-option").remove()
    $("#shoulder-stretch-option").remove()
  
  }


  if (mobileCategorySeven == "Weight Machine") {
    if (!document.getElementById('assisted-bench-press-option')) {
      $("#mobile_exercise_seven_name").append("<option id='abdominal-crunch-option' value= 'Abdominal Crunch'> Abdominal Crunch </option>")
      $("#mobile_exercise_seven_name").append("<option id='assisted-bench-press-option' value= 'Assisted Bench Press'> Assisted Bench Press </option>")
      $("#mobile_exercise_seven_name").append("<option id='cable-fly-option' value= 'Cable Fly'> Cable Fly </option>")
      $("#mobile_exercise_seven_name").append("<option id='chest-press-option' value= 'Chest Press'> Chest Press </option>")
      $("#mobile_exercise_seven_name").append("<option id='chin-assist-option' value= 'Chin Assist'> Chin Assist </option>")
      $("#mobile_exercise_seven_name").append("<option id='converging-shoulder-press-option' value= 'Converging Shoulder Press'> Converging Shoulder Press </option>")
      $("#mobile_exercise_seven_name").append("<option id='dip-assist-option' value= 'Dip Assist'> Dip Assist </option>")
      $("#mobile_exercise_seven_name").append("<option id='diverging-lat-pulldown-option' value= 'Diverging Lat Pulldown'> Diverging Lat Pulldown </option>")
      $("#mobile_exercise_seven_name").append("<option id='diverging-seated-row-option' value= 'Diverging Seated Row'> Diverging Seated Row </option>")
      $("#mobile_exercise_seven_name").append("<option id='incline-press-option' value= 'Incline Press'> Incline Press </option>")
      $("#mobile_exercise_seven_name").append("<option id='lat-pulldown-option' value= 'Lat Pulldown'> Lat Pulldown </option>")
      $("#mobile_exercise_seven_name").append("<option id='lateral-raise-option' value= 'Lateral Raise'> Lateral Raise </option>")
      $("#mobile_exercise_seven_name").append("<option id='low-row-option' value= 'Low Row'> Low Row </option>")
      $("#mobile_exercise_seven_name").append("<option id='pectoral-fly-option' value= 'Pectoral Fly'> Pectoral Fly </option>")
      $("#mobile_exercise_seven_name").append("<option id='tricep-press-option' value= 'Tricep Press/Seated Dip'> Tricep Press/Seated Dip </option>")
    }
    $("#bench-press-option").remove()
    $("#dumbbell-curls-option").remove()
    $("#hammer-curls-option").remove()
    $("#barbell-curls-option").remove()
    $("#dumbbell-fly-option").remove()
    $("#dumbbell-raise-option").remove()
    $("#running-machine-option").remove()
    $("#rowing-machine-option").remove()
    $("#shoulder-stretch-option").remove()
    $("#dips-option").remove()
    $("#sit-ups-option").remove()
    $("#suspended-leg-raises-option").remove()
  }


  if (mobileCategorySeven == "Stretching") {
    if (!document.getElementById('shoulder-stretch-option')) {
      $("#mobile_exercise_seven_name").append("<option id='shoulder-stretch-option' value= 'Shoulder Stretch'> Shoulder Stretch </option>")
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
    $("#cable-fly-option").remove()
    $("#diverging-seated-row-option").remove()
    $("#diverging-lat-pulldown-option").remove()
    $("#lateral-raise-option").remove()
    $("#tricep-press-option").remove()
    $("#incline-press-option").remove()
    $("#chin-assist-option").remove()
    $("#dip-assist-option").remove()
    $("#converging-shoulder-press-option").remove()
    $("#dips-option").remove()
    $("#sit-ups-option").remove()
    $("#suspended-leg-raises-option").remove()

}
}

// mobile dropdown functions exercise eight  //

function selectMobileCategoryEight() {
  let mobileCategoryEight= document.getElementById("mobile_exercise_eight_category").value;
  if (mobileCategoryEight == "Free Weights"){
    if (!document.getElementById('bench-press-option')) {
      $("#mobile_exercise_eight_name").append("<option class='free-weight-option' id='barbell-curls-option'value= 'Barbell Curls'> Barbell Curls </option>")
      $("#mobile_exercise_eight_name").append("<option class='free-weight-option' id='bench-press-option' value= 'Bench Press'> Bench Press </option>")
      $("#mobile_exercise_eight_name").append("<option class='free-weight-option' id='dumbbell-curls-option' value= 'Dumbbell Curls'> Dumbbell Curls </option>")
      $("#mobile_exercise_eight_name").append("<option class='free-weight-option' id='dumbbell-fly-option' value= 'Dumbbell Fly'> Dumbbell Fly </option>")
      $("#mobile_exercise_eight_name").append("<option class='free-weight-option' id='dumbbell-raise-option' value= 'Dumbbell Raise'> Dumbbell Raise </option>")
      $("#mobile_exercise_eight_name").append("<option class='free-weight-option' id='hammer-curls-option'value= 'Hammer Curls'> Hammer Curls </option>")

    }
    $("#running-machine-option").remove()
    $("#rowing-machine-option").remove()
    $("#dips-option").remove()
    $("#sit-ups-option").remove()
    $("#suspended-leg-raises-option").remove()
    $("#assisted-bench-press-option").remove()
    $("#abdominal-crunch-option").remove()
    $("#low-row-option").remove()
    $("#lat-pulldown-option").remove()
    $("#chest-press-option").remove()
    $("#cable-fly-option").remove()
    $("#converging-shoulder-press-option").remove()
    $("#diverging-seated-row-option").remove()
    $("#diverging-lat-pulldown-option").remove()
    $("#lateral-raise-option").remove()
    $("#tricep-press-option").remove()
    $("#incline-press-option").remove()
    $("#chin-assist-option").remove()
    $("#dip-assist-option").remove()
    $("#shoulder-stretch-option").remove()
  }


  if (mobileCategoryEight == "Cardio") {
    if (!document.getElementById('rowing-machine-option')) {
      $("#mobile_exercise_eight_name").append("<option id='rowing-machine-option' value= 'Rowing Machine'> Rowing Machine </option>")
      $("#mobile_exercise_eight_name").append("<option id='running-machine-option' value= 'Running Machine'> Running Machine </option>")
      
    }
    $("#bench-press-option").remove()
    $("#dumbbell-curls-option").remove()
    $("#hammer-curls-option").remove()
    $("#barbell-curls-option").remove()
    $("#dumbbell-fly-option").remove()
    $("#dumbbell-raise-option").remove()
    $("#dips-option").remove()
    $("#sit-ups-option").remove()
    $("#suspended-leg-raises-option").remove()
    $("#assisted-bench-press-option").remove()
    $("#abdominal-crunch-option").remove()
    $("#lat-pulldown-option").remove()
    $("#low-row-option").remove()
    $("#pectoral-fly-option").remove()
    $("#chest-press-option").remove()
    $("#cable-fly-option").remove()
    $("#chin-assist-option").remove()
    $("#dip-assist-option").remove()
    $("#diverging-seated-row-option").remove()
    $("#diverging-lat-pulldown-option").remove()
    $("#lateral-raise-option").remove()
    $("#tricep-press-option").remove()
    $("#incline-press-option").remove()
    $("#converging-shoulder-press-option").remove()
    $("#shoulder-stretch-option").remove()
  }


  if (mobileCategoryEight == "Calisthenics") {
    if (!document.getElementById('dips-option')) {
      $("#mobile_exercise_eight_name").append("<option id='dips-option' value= 'Dips'> Dips </option>")
      $("#mobile_exercise_eight_name").append("<option id='sit-ups-option' value= 'Sit Ups'> Sit Ups </option>")
      $("#mobile_exercise_eight_name").append("<option id='suspended-leg-raises-option' value= 'Suspended Leg Raises'> Suspended Leg Raises </option>")
    }
    $("#bench-press-option").remove()
    $("#dumbbell-curls-option").remove()
    $("#hammer-curls-option").remove()
    $("#barbell-curls-option").remove()
    $("#dumbbell-fly-option").remove()
    $("#dumbell-raise-option").remove()
    $("#running-machine-option").remove()
    $("#rowing-machine-option").remove()
    $("#assisted-bench-press-option").remove()
    $("#low-row-option").remove()
    $("#lat-pulldown-option").remove()
    $("#pectoral-fly-option").remove()
    $("#chest-press-option").remove()
    $("#cable-fly-option").remove()
    $("#diverging-seated-row-option").remove()
    $("#diverging-lat-pulldown-option").remove()
    $("#abdominal-crunch-option").remove()
    $("#lateral-raise-option").remove()
    $("#tricep-press-option").remove()
    $("#incline-press-option").remove()
    $("#chin-assist-option").remove()
    $("#dip-assist-option").remove()
    $("#converging-shoulder-press-option").remove()
    $("#shoulder-stretch-option").remove()
  
  }


  if (mobileCategoryEight == "Weight Machine") {
    if (!document.getElementById('assisted-bench-press-option')) {
      $("#mobile_exercise_eight_name").append("<option id='abdominal-crunch-option' value= 'Abdominal Crunch'> Abdominal Crunch </option>")
      $("#mobile_exercise_eight_name").append("<option id='assisted-bench-press-option' value= 'Assisted Bench Press'> Assisted Bench Press </option>")
      $("#mobile_exercise_eight_name").append("<option id='cable-fly-option' value= 'Cable Fly'> Cable Fly </option>")
      $("#mobile_exercise_eight_name").append("<option id='chest-press-option' value= 'Chest Press'> Chest Press </option>")
      $("#mobile_exercise_eight_name").append("<option id='chin-assist-option' value= 'Chin Assist'> Chin Assist </option>")
      $("#mobile_exercise_eight_name").append("<option id='converging-shoulder-press-option' value= 'Converging Shoulder Press'> Converging Shoulder Press </option>")
      $("#mobile_exercise_eight_name").append("<option id='dip-assist-option' value= 'Dip Assist'> Dip Assist </option>")
      $("#mobile_exercise_eight_name").append("<option id='diverging-lat-pulldown-option' value= 'Diverging Lat Pulldown'> Diverging Lat Pulldown </option>")
      $("#mobile_exercise_eight_name").append("<option id='diverging-seated-row-option' value= 'Diverging Seated Row'> Diverging Seated Row </option>")
      $("#mobile_exercise_eight_name").append("<option id='incline-press-option' value= 'Incline Press'> Incline Press </option>")
      $("#mobile_exercise_eight_name").append("<option id='lat-pulldown-option' value= 'Lat Pulldown'> Lat Pulldown </option>")
      $("#mobile_exercise_eight_name").append("<option id='lateral-raise-option' value= 'Lateral Raise'> Lateral Raise </option>")
      $("#mobile_exercise_eight_name").append("<option id='low-row-option' value= 'Low Row'> Low Row </option>")
      $("#mobile_exercise_eight_name").append("<option id='pectoral-fly-option' value= 'Pectoral Fly'> Pectoral Fly </option>")
      $("#mobile_exercise_eight_name").append("<option id='tricep-press-option' value= 'Tricep Press/Seated Dip'> Tricep Press/Seated Dip </option>")
    }
    $("#bench-press-option").remove()
    $("#dumbbell-curls-option").remove()
    $("#hammer-curls-option").remove()
    $("#barbell-curls-option").remove()
    $("#dumbbell-fly-option").remove()
    $("#dumbbell-raise-option").remove()
    $("#running-machine-option").remove()
    $("#rowing-machine-option").remove()
    $("#shoulder-stretch-option").remove()
    $("#dips-option").remove()
    $("#sit-ups-option").remove()
    $("#suspended-leg-raises-option").remove()
  }


  if (mobileCategoryEight == "Stretching") {
    if (!document.getElementById('shoulder-stretch-option')) {
      $("#mobile_exercise_eight_name").append("<option id='shoulder-stretch-option' value= 'Shoulder Stretch'> Shoulder Stretch </option>")
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
    $("#cable-fly-option").remove()
    $("#diverging-seated-row-option").remove()
    $("#diverging-lat-pulldown-option").remove()
    $("#lateral-raise-option").remove()
    $("#tricep-press-option").remove()
    $("#incline-press-option").remove()
    $("#chin-assist-option").remove()
    $("#dip-assist-option").remove()
    $("#converging-shoulder-press-option").remove()
    $("#dips-option").remove()
    $("#sit-ups-option").remove()
    $("#suspended-leg-raises-option").remove()

}
}

// mobile dropdown functions exercise nine  //

function selectMobileCategoryNine() {
  let mobileCategoryNine= document.getElementById("mobile_exercise_nine_category").value;
  if (mobileCategoryNine == "Free Weights"){
    if (!document.getElementById('bench-press-option')) {
      $("#mobile_exercise_nine_name").append("<option class='free-weight-option' id='barbell-curls-option'value= 'Barbell Curls'> Barbell Curls </option>")
      $("#mobile_exercise_nine_name").append("<option class='free-weight-option' id='bench-press-option' value= 'Bench Press'> Bench Press </option>")
      $("#mobile_exercise_nine_name").append("<option class='free-weight-option' id='dumbbell-curls-option' value= 'Dumbbell Curls'> Dumbbell Curls </option>")
      $("#mobile_exercise_nine_name").append("<option class='free-weight-option' id='dumbbell-fly-option' value= 'Dumbbell Fly'> Dumbbell Fly </option>")
      $("#mobile_exercise_nine_name").append("<option class='free-weight-option' id='dumbbell-raise-option' value= 'Dumbbell Raise'> Dumbbell Raise </option>")
      $("#mobile_exercise_nine_name").append("<option class='free-weight-option' id='hammer-curls-option'value= 'Hammer Curls'> Hammer Curls </option>")

    }
    $("#running-machine-option").remove()
    $("#rowing-machine-option").remove()
    $("#dips-option").remove()
    $("#sit-ups-option").remove()
    $("#suspended-leg-raises-option").remove()
    $("#assisted-bench-press-option").remove()
    $("#abdominal-crunch-option").remove()
    $("#low-row-option").remove()
    $("#lat-pulldown-option").remove()
    $("#chest-press-option").remove()
    $("#cable-fly-option").remove()
    $("#converging-shoulder-press-option").remove()
    $("#diverging-seated-row-option").remove()
    $("#diverging-lat-pulldown-option").remove()
    $("#lateral-raise-option").remove()
    $("#tricep-press-option").remove()
    $("#incline-press-option").remove()
    $("#chin-assist-option").remove()
    $("#dip-assist-option").remove()
    $("#shoulder-stretch-option").remove()
  }


  if (mobileCategoryNine == "Cardio") {
    if (!document.getElementById('rowing-machine-option')) {
      $("#mobile_exercise_nine_name").append("<option id='rowing-machine-option' value= 'Rowing Machine'> Rowing Machine </option>")
      $("#mobile_exercise_nine_name").append("<option id='running-machine-option' value= 'Running Machine'> Running Machine </option>")
      
    }
    $("#bench-press-option").remove()
    $("#dumbbell-curls-option").remove()
    $("#hammer-curls-option").remove()
    $("#barbell-curls-option").remove()
    $("#dumbbell-fly-option").remove()
    $("#dumbbell-raise-option").remove()
    $("#dips-option").remove()
    $("#sit-ups-option").remove()
    $("#suspended-leg-raises-option").remove()
    $("#assisted-bench-press-option").remove()
    $("#abdominal-crunch-option").remove()
    $("#lat-pulldown-option").remove()
    $("#low-row-option").remove()
    $("#pectoral-fly-option").remove()
    $("#chest-press-option").remove()
    $("#cable-fly-option").remove()
    $("#chin-assist-option").remove()
    $("#dip-assist-option").remove()
    $("#diverging-seated-row-option").remove()
    $("#diverging-lat-pulldown-option").remove()
    $("#lateral-raise-option").remove()
    $("#tricep-press-option").remove()
    $("#incline-press-option").remove()
    $("#converging-shoulder-press-option").remove()
    $("#shoulder-stretch-option").remove()
  }


  if (mobileCategoryNine == "Calisthenics") {
    if (!document.getElementById('dips-option')) {
      $("#mobile_exercise_nine_name").append("<option id='dips-option' value= 'Dips'> Dips </option>")
      $("#mobile_exercise_nine_name").append("<option id='sit-ups-option' value= 'Sit Ups'> Sit Ups </option>")
      $("#mobile_exercise_nine_name").append("<option id='suspended-leg-raises-option' value= 'Suspended Leg Raises'> Suspended Leg Raises </option>")
    }
    $("#bench-press-option").remove()
    $("#dumbbell-curls-option").remove()
    $("#hammer-curls-option").remove()
    $("#barbell-curls-option").remove()
    $("#dumbbell-fly-option").remove()
    $("#dumbell-raise-option").remove()
    $("#running-machine-option").remove()
    $("#rowing-machine-option").remove()
    $("#assisted-bench-press-option").remove()
    $("#low-row-option").remove()
    $("#lat-pulldown-option").remove()
    $("#pectoral-fly-option").remove()
    $("#chest-press-option").remove()
    $("#cable-fly-option").remove()
    $("#diverging-seated-row-option").remove()
    $("#diverging-lat-pulldown-option").remove()
    $("#abdominal-crunch-option").remove()
    $("#lateral-raise-option").remove()
    $("#tricep-press-option").remove()
    $("#incline-press-option").remove()
    $("#chin-assist-option").remove()
    $("#dip-assist-option").remove()
    $("#converging-shoulder-press-option").remove()
    $("#shoulder-stretch-option").remove()
  
  }


  if (mobileCategoryNine == "Weight Machine") {
    if (!document.getElementById('assisted-bench-press-option')) {
      $("#mobile_exercise_nine_name").append("<option id='abdominal-crunch-option' value= 'Abdominal Crunch'> Abdominal Crunch </option>")
      $("#mobile_exercise_nine_name").append("<option id='assisted-bench-press-option' value= 'Assisted Bench Press'> Assisted Bench Press </option>")
      $("#mobile_exercise_one_name").append("<option id='cable-fly-option' value= 'Cable Fly'> Cable Fly </option>")
      $("#mobile_exercise_nine_name").append("<option id='chest-press-option' value= 'Chest Press'> Chest Press </option>")
      $("#mobile_exercise_nine_name").append("<option id='chin-assist-option' value= 'Chin Assist'> Chin Assist </option>")
      $("#mobile_exercise_nine_name").append("<option id='converging-shoulder-press-option' value= 'Converging Shoulder Press'> Converging Shoulder Press </option>")
      $("#mobile_exercise_nine_name").append("<option id='dip-assist-option' value= 'Dip Assist'> Dip Assist </option>")
      $("#mobile_exercise_nine_name").append("<option id='diverging-lat-pulldown-option' value= 'Diverging Lat Pulldown'> Diverging Lat Pulldown </option>")
      $("#mobile_exercise_nine_name").append("<option id='diverging-seated-row-option' value= 'Diverging Seated Row'> Diverging Seated Row </option>")
      $("#mobile_exercise_nine_name").append("<option id='incline-press-option' value= 'Incline Press'> Incline Press </option>")
      $("#mobile_exercise_nine_name").append("<option id='lat-pulldown-option' value= 'Lat Pulldown'> Lat Pulldown </option>")
      $("#mobile_exercise_nine_name").append("<option id='lateral-raise-option' value= 'Lateral Raise'> Lateral Raise </option>")
      $("#mobile_exercise_nine_name").append("<option id='low-row-option' value= 'Low Row'> Low Row </option>")
      $("#mobile_exercise_nine_name").append("<option id='pectoral-fly-option' value= 'Pectoral Fly'> Pectoral Fly </option>")
      $("#mobile_exercise_nine_name").append("<option id='tricep-press-option' value= 'Tricep Press/Seated Dip'> Tricep Press/Seated Dip </option>")
    }
    $("#bench-press-option").remove()
    $("#dumbbell-curls-option").remove()
    $("#hammer-curls-option").remove()
    $("#barbell-curls-option").remove()
    $("#dumbbell-fly-option").remove()
    $("#dumbbell-raise-option").remove()
    $("#running-machine-option").remove()
    $("#rowing-machine-option").remove()
    $("#shoulder-stretch-option").remove()
    $("#dips-option").remove()
    $("#sit-ups-option").remove()
    $("#suspended-leg-raises-option").remove()
  }


  if (mobileCategoryNine == "Stretching") {
    if (!document.getElementById('shoulder-stretch-option')) {
      $("#mobile_exercise_nine_name").append("<option id='shoulder-stretch-option' value= 'Shoulder Stretch'> Shoulder Stretch </option>")
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
    $("#cable-fly-option").remove()
    $("#diverging-seated-row-option").remove()
    $("#diverging-lat-pulldown-option").remove()
    $("#lateral-raise-option").remove()
    $("#tricep-press-option").remove()
    $("#incline-press-option").remove()
    $("#chin-assist-option").remove()
    $("#dip-assist-option").remove()
    $("#converging-shoulder-press-option").remove()
    $("#dips-option").remove()
    $("#sit-ups-option").remove()
    $("#suspended-leg-raises-option").remove()

}
}
// mobile dropdown functions exercise ten  //

function selectMobileCategoryTen() {
  let mobileCategoryTen= document.getElementById("mobile_exercise_ten_category").value;
  if (mobileCategoryTen == "Free Weights"){
    if (!document.getElementById('bench-press-option')) {
      $("#mobile_exercise_ten_name").append("<option class='free-weight-option' id='barbell-curls-option'value= 'Barbell Curls'> Barbell Curls </option>")
      $("#mobile_exercise_ten_name").append("<option class='free-weight-option' id='bench-press-option' value= 'Bench Press'> Bench Press </option>")
      $("#mobile_exercise_ten_name").append("<option class='free-weight-option' id='dumbbell-curls-option' value= 'Dumbbell Curls'> Dumbbell Curls </option>")
      $("#mobile_exercise_ten_name").append("<option class='free-weight-option' id='dumbbell-fly-option' value= 'Dumbbell Fly'> Dumbbell Fly </option>")
      $("#mobile_exercise_ten_name").append("<option class='free-weight-option' id='dumbbell-raise-option' value= 'Dumbbell Raise'> Dumbbell Raise </option>")
      $("#mobile_exercise_ten_name").append("<option class='free-weight-option' id='hammer-curls-option'value= 'Hammer Curls'> Hammer Curls </option>")

    }
    $("#running-machine-option").remove()
    $("#rowing-machine-option").remove()
    $("#dips-option").remove()
    $("#sit-ups-option").remove()
    $("#suspended-leg-raises-option").remove()
    $("#assisted-bench-press-option").remove()
    $("#abdominal-crunch-option").remove()
    $("#low-row-option").remove()
    $("#lat-pulldown-option").remove()
    $("#chest-press-option").remove()
    $("#cable-fly-option").remove()
    $("#converging-shoulder-press-option").remove()
    $("#diverging-seated-row-option").remove()
    $("#diverging-lat-pulldown-option").remove()
    $("#lateral-raise-option").remove()
    $("#tricep-press-option").remove()
    $("#incline-press-option").remove()
    $("#chin-assist-option").remove()
    $("#dip-assist-option").remove()
    $("#shoulder-stretch-option").remove()
  }


  if (mobileCategoryTen == "Cardio") {
    if (!document.getElementById('rowing-machine-option')) {
      $("#mobile_exercise_ten_name").append("<option id='rowing-machine-option' value= 'Rowing Machine'> Rowing Machine </option>")
      $("#mobile_exercise_ten_name").append("<option id='running-machine-option' value= 'Running Machine'> Running Machine </option>")
      
    }
    $("#bench-press-option").remove()
    $("#dumbbell-curls-option").remove()
    $("#hammer-curls-option").remove()
    $("#barbell-curls-option").remove()
    $("#dumbbell-fly-option").remove()
    $("#dumbbell-raise-option").remove()
    $("#dips-option").remove()
    $("#sit-ups-option").remove()
    $("#suspended-leg-raises-option").remove()
    $("#assisted-bench-press-option").remove()
    $("#abdominal-crunch-option").remove()
    $("#lat-pulldown-option").remove()
    $("#low-row-option").remove()
    $("#pectoral-fly-option").remove()
    $("#chest-press-option").remove()
    $("#cable-fly-option").remove()
    $("#chin-assist-option").remove()
    $("#dip-assist-option").remove()
    $("#diverging-seated-row-option").remove()
    $("#diverging-lat-pulldown-option").remove()
    $("#lateral-raise-option").remove()
    $("#tricep-press-option").remove()
    $("#incline-press-option").remove()
    $("#converging-shoulder-press-option").remove()
    $("#shoulder-stretch-option").remove()
  }


  if (mobileCategoryTen == "Calisthenics") {
    if (!document.getElementById('dips-option')) {
      $("#mobile_exercise_ten_name").append("<option id='dips-option' value= 'Dips'> Dips </option>")
      $("#mobile_exercise_ten_name").append("<option id='sit-ups-option' value= 'Sit Ups'> Sit Ups </option>")
      $("#mobile_exercise_ten_name").append("<option id='suspended-leg-raises-option' value= 'Suspended Leg Raises'> Suspended Leg Raises </option>")
    }
    $("#bench-press-option").remove()
    $("#dumbbell-curls-option").remove()
    $("#hammer-curls-option").remove()
    $("#barbell-curls-option").remove()
    $("#dumbbell-fly-option").remove()
    $("#dumbell-raise-option").remove()
    $("#running-machine-option").remove()
    $("#rowing-machine-option").remove()
    $("#assisted-bench-press-option").remove()
    $("#low-row-option").remove()
    $("#lat-pulldown-option").remove()
    $("#pectoral-fly-option").remove()
    $("#chest-press-option").remove()
    $("#cable-fly-option").remove()
    $("#diverging-seated-row-option").remove()
    $("#diverging-lat-pulldown-option").remove()
    $("#abdominal-crunch-option").remove()
    $("#lateral-raise-option").remove()
    $("#tricep-press-option").remove()
    $("#incline-press-option").remove()
    $("#chin-assist-option").remove()
    $("#dip-assist-option").remove()
    $("#converging-shoulder-press-option").remove()
    $("#shoulder-stretch-option").remove()
  
  }


  if (mobileCategoryTen == "Weight Machine") {
    if (!document.getElementById('assisted-bench-press-option')) {
      $("#mobile_exercise_ten_name").append("<option id='abdominal-crunch-option' value= 'Abdominal Crunch'> Abdominal Crunch </option>")
      $("#mobile_exercise_ten_name").append("<option id='assisted-bench-press-option' value= 'Assisted Bench Press'> Assisted Bench Press </option>")
      $("#mobile_exercise_ten_name").append("<option id='cable-fly-option' value= 'Cable Fly'> Cable Fly </option>")
      $("#mobile_exercise_ten_name").append("<option id='chest-press-option' value= 'Chest Press'> Chest Press </option>")
      $("#mobile_exercise_ten_name").append("<option id='chin-assist-option' value= 'Chin Assist'> Chin Assist </option>")
      $("#mobile_exercise_ten_name").append("<option id='converging-shoulder-press-option' value= 'Converging Shoulder Press'> Converging Shoulder Press </option>")
      $("#mobile_exercise_ten_name").append("<option id='dip-assist-option' value= 'Dip Assist'> Dip Assist </option>")
      $("#mobile_exercise_ten_name").append("<option id='diverging-lat-pulldown-option' value= 'Diverging Lat Pulldown'> Diverging Lat Pulldown </option>")
      $("#mobile_exercise_ten_name").append("<option id='diverging-seated-row-option' value= 'Diverging Seated Row'> Diverging Seated Row </option>")
      $("#mobile_exercise_ten_name").append("<option id='incline-press-option' value= 'Incline Press'> Incline Press </option>")
      $("#mobile_exercise_ten_name").append("<option id='lat-pulldown-option' value= 'Lat Pulldown'> Lat Pulldown </option>")
      $("#mobile_exercise_ten_name").append("<option id='lateral-raise-option' value= 'Lateral Raise'> Lateral Raise </option>")
      $("#mobile_exercise_ten_name").append("<option id='low-row-option' value= 'Low Row'> Low Row </option>")
      $("#mobile_exercise_ten_name").append("<option id='pectoral-fly-option' value= 'Pectoral Fly'> Pectoral Fly </option>")
      $("#mobile_exercise_ten_name").append("<option id='tricep-press-option' value= 'Tricep Press/Seated Dip'> Tricep Press/Seated Dip </option>")
    }
    $("#bench-press-option").remove()
    $("#dumbbell-curls-option").remove()
    $("#hammer-curls-option").remove()
    $("#barbell-curls-option").remove()
    $("#dumbbell-fly-option").remove()
    $("#dumbbell-raise-option").remove()
    $("#running-machine-option").remove()
    $("#rowing-machine-option").remove()
    $("#shoulder-stretch-option").remove()
    $("#dips-option").remove()
    $("#sit-ups-option").remove()
    $("#suspended-leg-raises-option").remove()
  }


  if (mobileCategoryTen == "Stretching") {
    if (!document.getElementById('shoulder-stretch-option')) {
      $("#mobile_exercise_ten_name").append("<option id='shoulder-stretch-option' value= 'Shoulder Stretch'> Shoulder Stretch </option>")
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
    $("#cable-fly-option").remove()
    $("#diverging-seated-row-option").remove()
    $("#diverging-lat-pulldown-option").remove()
    $("#lateral-raise-option").remove()
    $("#tricep-press-option").remove()
    $("#incline-press-option").remove()
    $("#chin-assist-option").remove()
    $("#dip-assist-option").remove()
    $("#converging-shoulder-press-option").remove()
    $("#dips-option").remove()
    $("#sit-ups-option").remove()
    $("#suspended-leg-raises-option").remove()

}
}

function skipToComplete() {
  $("#mobile-additional-information").removeClass("hidden");
  $("#mobile-visible-switch").removeClass("hidden");
  $("#mobile-exercise-submit").removeClass("hidden");
  $("#skip-button").addClass("hidden");
  $("#continue-logging").addClass("hidden");
}

function mobileProfileHide() {
  $("#profile-name").addClass("mobile-profile-details");
}

// controlling flash messages timing  //

$(function(){
  var flashDurationInSeconds = 10;

  function removeFlashMessages() {
    $('.flashes').remove();
  }

  setTimeout(removeFlashMessages, flashDurationInSeconds * 1000);
})

// unhide view all workouts link on add exercise pages for mobile  //

//document.getElementById("skip-button").addEventListener("click", unHideWorkoutListMobile);

//function unHideWorkoutListMobile() {
  $("#mobile-all-workouts").removeClass("hidden")
//}

// JS for calendar function
