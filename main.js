/*MATH FUNCTIONS*/
function changeSign() {
    const sign = document.querySelector("#display #sign");
    sign.textContent = (sign.textContent) ? "" : "-";
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    if (b === 0) return NaN;
    return a / b;
}
function sum(a, b) {
    return a + b;
}
function substract(a, b) {
    return a - b;
}

/*DISPLAY FUNCTIONS*/
function appendNumber(number) {
    const maxDigits = 9;
    if (currentOperand.length === maxDigits) return
    currentOperand = currentOperand.toString() + number.toString();
}
function changeSign() {
    currentOperand = (+currentOperand * (-1)).toString();
}
function clearAll() {
    currentOperand = "";
    previousOperand = "";
    operation = undefined;
}
function clearDigit() {
    currentOperand = currentOperand.toString().slice(0, -1);
}
function chooseOperation(newOperation) {
    console.log(newOperation);
    if (currentOperand === "") return;
    if (previousOperand !== "") compute();
    operation = newOperation;
    previousOperand = currentOperand;
    currentOperand = "";
}
function compute() {
    const operationDict = {
        "*" : multiply,
        "/": divide,
        "+": sum,
        "-": substract,
    }
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    console.log(previousOperand, operation, currentOperand);
    computation = operationDict[operation](prev, current);
    computation = getResult(computation);
    currentOperand = computation;
    operation = undefined;
    previousOperand = "";
}
function updateDisplay() {
    displayElement.innerText = currentOperand;
}

function getResult(result) {
    let resultString = result.toString();
    let integerPart = resultString.split(".")[0] || "";
    let decimalPart = resultString.split(".")[1] || "";
    if (integerPart.length > 9) {
        resultString = Number.parseFloat(resultString).toExponential(6);
    } else if (decimalPart.length > 9) {
        resultString = resultString.slice(0, 9);
    }
    return resultString;
}


const displayElement = document.querySelector("#display");

let previousOperand = "";
let operation = undefined;
let currentOperand = "";

const numberButtons = document.querySelectorAll(".button.number");
const allClearButton = document.querySelector("#ac");
const deleteButton = document.querySelector("#c");
const operatorButtons = document.querySelectorAll(".button.oper");
const equalsButton = document.querySelector("[data-equals]");
const changeSignButton = document.querySelector("[data-change-sign]");

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        appendNumber(button.innerText);
        updateDisplay();
    });
});
operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        chooseOperation(button.innerText);
        updateDisplay();
    });
});
equalsButton.addEventListener("click", () => {
    compute();
    updateDisplay();
});
changeSignButton.addEventListener("click", () => {
    changeSign();
    updateDisplay();
});
allClearButton.addEventListener("click", () => {
    clearAll();
    updateDisplay();
});
deleteButton.addEventListener("click", () => {
    clearDigit();
    updateDisplay();
});

//problema -> no quiero borrar el display cuando apreto un operador
/*
propuesta -> cada vez que toco un operador (+,-,*,/)
agrego al número que está en display y al operador
a la cola.
Luego, tengo que evaluar que si hay más de 3 items
en la cola (sería [num1, op1, num2, op2]) tengo que
resolver, haciendo res1 = op1(num1, num2)
y pusheando el resultado al inicio [res1, op2]

AHOOOORA, si tengo un = como operación...

*/