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
function displayNumber(e) {
    const number = e.target.textContent;
    const digits = document.querySelector("#display #digits");
    if (!actualDigits) {
        digits.textContent = number;
    } else {
        const numberList = actualDigits.split("");
        // 9 digitos max
        if (numberList.length === 9) return
        numberList.push(number);
        digits.textContent = numberList.join("");
    }
}
function getNumberDisplay() {
    let digits = actualDigits;
    if (!actualDigits) {
        digits = (queue[0]) ? queue[0] : 0;
    }
    const sign = document.querySelector("#display #sign").textContent;
    return (sign) ? -(+digits) : (+digits);
}
function clearDisplay() {
    const digits = document.querySelector("#display #digits");
    digits.textContent = "0";
}
function clearDigit() {
    const digits = document.querySelector("#display #digits");
    const numberList = digits.textContent.split("");
    numberList.pop();
    digits.textContent = (numberList.length === 0) ? "0" : numberList.join("");
}
function clearActualDigits() {
    actualDigits = "";
}
function showResult(result) {
    const digits = document.querySelector("#display #digits");
    if (result === NaN) {
        digits.textContent = "lol";
        return
    }
    let resultString = result.toString();
    if (resultString.length > 9) {
        console.log(resultString);
        resultString = Number.parseFloat(resultString).toExponential(6);
    }
    digits.textContent = resultString;
}

/*EVALUATE FUNCTIONS*/
function evaluateOperand(e) {
    const operation = {
        "+/-" : changeSign,
        "*" : multiply,
        "/": divide,
        "+": sum,
        "-": substract,
        "=": executeQueue,
    }
    const operator = this.textContent;
    if (operator === "+/-") {
        operation[operator]();
        return;
    }
    const operand = getNumberDisplay();
    queueAdd(operand);
    if (operator === "=") {
        operation[operator]();
        return;
    }
    clearActualDigits();
    evaluateQueue();
    queueAdd(operation[operator]);
}

/*QUEUE FUNCTIONS*/
function queueAdd(elem) {
    queue.push(elem);
}
function evaluateQueue() {
    if (queue.length === 3) executeQueue();
}
function executeQueue() {
    console.log(queue);
    let result;
    //0 o 1 elemento --> vaciar cola
    //2 o 3 elementos --> resolver, mostrar, vaciar cola
    const operandA = queue[0];
    const operator = queue[1];
    const operandB = (queue[2]) ? queue[2] : queue[0];
    if (queue.length >= 2) { // 2 o 3
        result = operator(operandA, operandB);
    }
    clearQueue();
    showResult(result);
}
function clearQueue() {
    const times = queue.length;
    for (let i = 0; i < times; i++) {
        queue.pop();
    }
}

const queue = [];
// para que, cuando apreto un operador, no se borre
// el anterior numero en pantalla
// y funcione como las calculadoras reales
let actualDigits = "";


const numbers = document.querySelectorAll(".button.number");
numbers.forEach(number => number.addEventListener("click", displayNumber));
const ac = document.querySelector("#ac");
ac.addEventListener("click", clearDisplay);
const c = document.querySelector("#c");
c.addEventListener("click", clearDigit);
const operators = document.querySelectorAll(".button.oper");
operators.forEach(operator => operator.addEventListener("click", evaluateOperand));
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