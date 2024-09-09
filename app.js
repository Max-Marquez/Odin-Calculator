let operator = "";
let previousValue = "";
let currentValue = "";

document.addEventListener("DOMContentLoaded", function () {
  //Store all components on HTML in our JS
  let clear = document.querySelector(".clear");
  let equal = document.querySelector(".equal");
  let decimal = document.querySelector(".decimal");

  let numbers = document.querySelectorAll(".num");
  let operators = document.querySelectorAll(".operator");

  let previousDisplay = document.querySelector(".previous");
  let currentDisplay = document.querySelector(".current");

  numbers.forEach((number) =>
    number.addEventListener("click", function (e) {
      handleNumber(e.target.textContent);
      currentDisplay.textContent = currentValue;
    })
  );

  operators.forEach((op) =>
    op.addEventListener("click", function (e) {
      handleOperator(e.target.textContent);
      previousDisplay.textContent = previousValue + " " + operator;
      currentDisplay.textContent = currentValue;
    })
  );

  clear.addEventListener("click", function () {
    previousValue = "";
    currentValue = "";
    operator = "";
    previousDisplay.textContent = currentValue;
    currentDisplay.textContent = currentValue;
  });

  equal.addEventListener("click", function () {
    if (currentValue != "" && previousValue != "") {
      operate();
      previousDisplay.textContent = "";
      currentDisplay.textContent = previousValue;
    }
  });

  decimal.addEventListener("click", function () {
    addDecimal();
  });
});

function handleNumber(num) {
  if (currentValue.length <= 10) {
    currentValue += num;
  }
}

function handleOperator(op) {
  operator = op;
  previousValue = currentValue;
  currentValue = "";
}

function operate() {
  previousValue = parseFloat(previousValue);
  currentValue = parseFloat(currentValue);

  if (operator === "+") {
    previousValue += currentValue;
  } else if (operator === "-") {
    previousValue -= currentValue;
  } else if (operator === "x") {
    previousValue *= currentValue;
  } else {
    previousValue /= currentValue;
  }
  //ADD snarky message if dividing by 0
  if (previousValue == "Infinity") {
    previousValue = "to INFINITY and beyond";
  } else {
    previousValue = previousValue.toString();
    currentValue = previousValue.toString();
    console.log(previousValue);
  }
}

function addDecimal() {
  if (!currentValue.includes(".")) {
    currentValue += ".";
  }
}
