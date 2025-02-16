const numberBtn = document.querySelectorAll(".number-btn");
const operatorBtn = document.querySelectorAll(".operator")
const decimalBtn = document.querySelector("#decimal-dot")
const resultBtn = document.querySelector("#operate-btn")
const clearBtn = document.querySelector("#clear");
const backspaceBtn = document.querySelector("#backspace")

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
    };
};

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
    };
};

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
};

const updateDisplay = (num) => {
    numberDisplay.textContent = num + ".";
};

const pressNumber = (btn) => {
    if (isCalcStopped) {
        return;
    };
    if (isDone && secondNum !== null) {
        clear();
    };
    if (isSecondNum && !isFirstNum){
        isDone = false;
        updateDisplay("");
        if (secondNum === null) {secondNum = ""};
        secondNum += btn.value;
        updateDisplay(secondNum);
    } else {
        isFirstNum = true;
        if (firstNum === null) {firstNum = ""};
        firstNum += btn.value;
        updateDisplay(firstNum);
    };
    debug("NUMBER PRESSED");
};

const pressDecimal = () => {
    if (isCalcStopped) {
        return;
    };

    if (isDecimal) return;
    
    if (firstNum === null && !isFirstNum) {isFirstNum = true; firstNum = "0."} else
    if (isFirstNum) firstNum += ".";

    if (secondNum === null && isSecondNum) {return} else
    if (isSecondNum) secondNum += ".";

    isDecimal = true;
    debug("DECIMAL ENABLED");
};

const pressOperator = (btn) => {
    if (isCalcStopped) {
        return;
    };
    if (isSecondNum && secondNum == null) {
        operator = btn.value;
        return;
    };
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
    };
    debug("OPERATOR PRESSED");
};


const pressResult = () => {
    if (isCalcStopped) {
        return;
    };

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
        updateDisplay(result);
        isDecimal = false;
    }
    debug("RESULT PRESSED");
};

const pressBackspace = () => {
    if (isCalcStopped) return;

    if (isFirstNum) {
        if (firstNum !== null) {
            if (firstNum.length == 1) {
                firstNum = null;
                isFirstNum = false;
                updateDisplay("0");
            } else if (firstNum.length > 1) {
                firstNum = firstNum.split("");
                if (firstNum[firstNum.length - 1] == ".") {firstNum.pop(); firstNum = firstNum.join(""); isDecimal = false;} else {
                    firstNum.pop();
                    firstNum = firstNum.join("");
                }
                updateDisplay(firstNum);
            }
        }
    }
    if (isSecondNum) {
        if (secondNum !== null) {
            if (secondNum.length == 1) {
                secondNum = null;
                updateDisplay("0");
            } else if (secondNum.length > 1) {
                secondNum = secondNum.split("");
                if (secondNum[secondNum.length - 1] == ".") {secondNum.pop(); secondNum = secondNum.join(""); isDecimal = false;} else {
                    secondNum.pop();
                    secondNum = secondNum.join("");
                }
                updateDisplay(secondNum);
            }
        }
    }

    debug("BACKSPACE PRESSED")
};


operatorBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
        pressOperator(btn);
    });
});

resultBtn.addEventListener("click", pressResult)

numberBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
        pressNumber(btn);
    });
});

decimalBtn.addEventListener("click", pressDecimal);

backspaceBtn.addEventListener("click", pressBackspace);

clearBtn.addEventListener("click", clear);
