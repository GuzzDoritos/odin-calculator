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

    debug("CLEAR PRESSED");
}


operatorBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (isSecondNum && secondNum == null) {
            operator = btn.value;
            return;
        }
        if (isSecondNum && !isDone) {
            result = 0;
            firstNum = parseFloat(firstNum);
            secondNum = parseFloat(secondNum);
            result += operate(operator, firstNum, secondNum);
            firstNum = result;
            secondNum = null;
            numberDisplay.textContent = result;
            isDone = true;
            operator = btn.value;
        } else if (isSecondNum && isDone) {
            isDone = false;
            firstNum = result;
            result = 0;
            secondNum = null;
            operator = btn.value;
        } else if (isFirstNum) {
            isFirstNum = false;
            isSecondNum = true;
            operator = btn.value;
        }
        debug("OPERATOR PRESSED");
    })
})

resultBtn.addEventListener("click", () => {
    if (isFirstNum || secondNum == null) {
        return;
    } else if (isSecondNum && !isDone) {
        result = 0;        
        firstNum = parseFloat(firstNum);
        secondNum = parseFloat(secondNum);
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
        if (isDone && secondNum !== null) {
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


// DEBUG //

const debugDiv = document.createElement("div");
document.body.appendChild(debugDiv);

debugDiv.style = `
width: 300px;
overflow: hidden;
font-size: 1.5em;
margin-left: 10px;

`

function debug(button) {
    debugDiv.innerHTML = "";
    const debugList = document.createElement("ul");
    const buttonMessage = document.createElement("h3");
    buttonMessage.textContent = button;
    debugList.appendChild(buttonMessage);
    const variables = {
        firstNum: firstNum,
        isFirstNum: isFirstNum,
        secondNum: secondNum,
        isSecondNum: isSecondNum,
        operator: operator,
        result: result,
        isDone: isDone,
    }
    for (const prop in variables) {
        let listItem = document.createElement("li");
        listItem.innerHTML = `<span style="color: red">${prop}</span>: ${variables[prop]}`
        debugList.appendChild(listItem);
    }

    debugDiv.appendChild(debugList);
}

