const numberBtn = document.querySelectorAll(".number-btn");
const operatorBtn = document.querySelectorAll(".operator")
const decimalBtn = document.querySelector("#decimal-dot")
const resultBtn = document.querySelector("#operate-btn")
const clearBtn = document.querySelector("#clear");

const numberDisplay = document.querySelector("#number-display");

let firstNum = null;
let secondNum = null;
let result = 0;

let isFirstNum = false;
let isSecondNum = false;
let isDone = false;

let isCalcStopped = false;

let isDecimal = false;

let operator = "";

const add = (a, b) => 
    a + b;

const subtract = (a, b) => 
    a - b;

const multiply = (a, b) => 
    a * b;

const divide = (a, b) => {
    if (b !== 0) {
        return a / b
    } else {
        updateDisplay("Can't divide by zero");
        isCalcStopped = true;
        return;
    }
}

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
    isCalcStopped = false;
    isDecimal = false;
    firstNum = null;
    secondNum = null;
    result = 0;
    operator = "";
    numberDisplay.textContent = "0.";

    debug("CLEAR PRESSED");
}

const updateDisplay = (num) => {
    numberDisplay.textContent = num + ".";
}

operatorBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (isCalcStopped) {
            return;
        }
        if (isSecondNum && secondNum == null) {
            operator = btn.value;
            return;
        }
        if (isSecondNum && !isDone) {
            result = 0;
            firstNum = parseFloat(firstNum);
            secondNum = parseFloat(secondNum);
            result += operate(operator, firstNum, secondNum);
            if (isCalcStopped) return;
            firstNum = result;
            secondNum = null;
            updateDisplay(result)
            isDone = true;
            operator = btn.value;
            isDecimal = false;
        } else if (isSecondNum && isDone) {
            isDone = false;
            firstNum = result;
            result = 0;
            secondNum = null;
            operator = btn.value;
            isDecimal = false;
        } else if (isFirstNum) {
            isFirstNum = false;
            isSecondNum = true;
            operator = btn.value;
            isDecimal = false;
        }
        debug("OPERATOR PRESSED");
    })
})

resultBtn.addEventListener("click", () => {
    if (isCalcStopped) {
        return;
    }

    if (isFirstNum || secondNum == null) {
        return;
    } else if (isSecondNum && !isDone) {
        result = 0;        
        firstNum = parseFloat(firstNum);
        secondNum = parseFloat(secondNum);
        result += operate(operator, firstNum, secondNum);
        if (isCalcStopped) return;
        updateDisplay(result)
        isDone = true;
        isDecimal = false;
    } else if (isSecondNum && isDone) {
        firstNum = result;
        result = 0;        
        firstNum = parseFloat(firstNum);
        secondNum = parseFloat(secondNum);
        result += operate(operator, firstNum, secondNum);
        if (isCalcStopped) return;
        updateDisplay(result)
        isDecimal = false;
    }
    debug("RESULT PRESSED");
})

numberBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (isCalcStopped) {
            return;
        }
        if (isDone && secondNum !== null) {
            clear();
        }
        if (isSecondNum && !isFirstNum){
            isDone = false;
            updateDisplay("")
            if (secondNum === null) {secondNum = ""}
            secondNum += btn.value;
            updateDisplay(secondNum);
        } else {
            isFirstNum = true;
            if (firstNum === null) {firstNum = ""}
            firstNum += btn.value;
            updateDisplay(firstNum);
        }
        debug("NUMBER PRESSED");
    })
})

decimalBtn.addEventListener("click", () => {
    if (isCalcStopped) {
        return;
    }

    if (isDecimal) return;
    
    if (firstNum === null && !isFirstNum) {isFirstNum = true; firstNum = "0."} else
    if (isFirstNum) firstNum += ".";

    if (secondNum === null && isSecondNum) {return} else
    if (isSecondNum) secondNum += ".";

    isDecimal = true;
    debug("DECIMAL ENABLED")
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
        isDecimal: isDecimal,
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

