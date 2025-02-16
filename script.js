const numberBtn = document.querySelectorAll(".number-btn");
const operatorBtn = document.querySelectorAll(".operator")
const resultBtn = document.querySelector("#operate-btn")
const clearBtn = document.querySelector("#clear");

const numberDisplay = document.querySelector("#number-display");

let firstNum = null;
let secondNum = null;
let result = 0;

let isFirstNum = false;
let isSecondNum = false;
let isDone = false;

let operator = "";

const add = (a, b) => 
    a + b;
const subtract = (a, b) => 
    a - b;
const multiply = (a, b) => 
    a * b;
const divide = (a, b) => 
    b !== 0 ? a / b : "Can't divide by 0";

const operate = (operator, a, b) => {
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
    }
}

const clear = () => {
    isFirstNum = false;
    isSecondNum = false;
    isDone = false;
    firstNum = null;
    secondNum = null;
    result = 0;
    operator = "";
    numberDisplay.textContent = "0.";
}

function debug(button) {
    console.log("--" + button + "--")
    console.log("firstNum: " + firstNum);
    console.log("isFirstNum: " + isFirstNum);
    console.log("secondNum: " + secondNum);
    console.log("isSecondNum: " + isSecondNum);
    console.log("result: " + result);
    console.log("isDone: " + isDone)
    console.log("------------------------")

}

operatorBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
        operator = btn.value;
        if (isSecondNum && secondNum == null) {
            return;
        }
        if (isSecondNum && !isDone) {
            firstNum = parseInt(firstNum);
            secondNum = parseInt(secondNum);
            result += operate(operator, firstNum, secondNum);
            firstNum = result;
            secondNum = null;
            numberDisplay.textContent = result;
            isDone = true;
        } else if (isSecondNum && isDone) {
            isDone = false;
            firstNum = result;
            result = 0;
            secondNum = null;
        } else if (isFirstNum) {
            isFirstNum = false;
            isSecondNum = true;
        }
        debug("OPERATOR PRESSED");
    })
})

resultBtn.addEventListener("click", () => {
    if (isFirstNum) {
        return;
    } else if (isSecondNum && !isDone) {
        if (result !== 0) {result += parseInt(secondNum); numberDisplay.textContent = result; return}        
        firstNum = parseInt(firstNum);
        secondNum = parseInt(secondNum);
        result += operate(operator, firstNum, secondNum);
        numberDisplay.textContent = result;
        isDone = true;
    } else if (isSecondNum && isDone) {
        firstNum = null;
        result += secondNum;
        numberDisplay.textContent = result;
    }
    debug("RESULT PRESSED");
})

numberBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (isDone) {
            clear();
        }
        if (isSecondNum && !isFirstNum){
            isDone = false;
            numberDisplay.textContent = ""
            if (secondNum === null) {secondNum = ""; numberDisplay.textContent = ""}
            secondNum += btn.value;
            numberDisplay.textContent = secondNum;
        } else {
            isFirstNum = true;
            if (firstNum === null) {firstNum = ""; numberDisplay.textContent = ""}
            firstNum += btn.value;
            numberDisplay.textContent = firstNum;
        }
        debug("NUMBER PRESSED");
    })
})

clearBtn.addEventListener("click", () => {
    clear();
})