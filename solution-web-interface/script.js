const historyLog = [];
let currentOperand = '';
let previousOperand = '';
let operation = undefined;

function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { 
    if (b === 0) return null;
    return a / b; 
}

function addToHistory(a, b, op, result) {
    const entry = {
        a: a,
        b: b,
        op: op,
        result: result
    };
    historyLog.push(entry);
    updateHistoryUI();
}

function updateHistoryUI() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';

    if (historyLog.length === 0) {
        historyList.innerHTML = '<li style="text-align:center; opacity:0.5;">Empty</li>';
        return;
    }

    for (let i = historyLog.length - 1; i >= 0; i--) {
        const item = historyLog[i];
        const li = document.createElement('li');
        li.innerHTML = `${item.a} ${item.op} ${item.b} = <span>${item.result}</span>`;
        historyList.appendChild(li);
    }
}

function clearHistory() {
    historyLog.length = 0;
    updateHistoryUI();
}

function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
    currentOperand = currentOperand.toString() + number.toString();
    updateDisplay();
}

function chooseOperation(op) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        compute();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
    updateDisplay();
}

function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            computation = add(prev, current);
            break;
        case '-':
            computation = subtract(prev, current);
            break;
        case '*':
            computation = multiply(prev, current);
            break;
        case '/':
            computation = divide(prev, current);
            if (computation === null) {
                alert("Error: Cannot divide by zero!");
                clearDisplay();
                return;
            }
            break;
        default:
            return;
    }

    addToHistory(prev, current, operation, computation);

    currentOperand = computation;
    operation = undefined;
    previousOperand = '';
    updateDisplay();
}

function clearDisplay() {
    currentOperand = '';
    previousOperand = '';
    operation = undefined;
    updateDisplay();
}

function deleteLast() {
    currentOperand = currentOperand.toString().slice(0, -1);
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('current-operand').innerText = currentOperand || '0';
    if (operation != null) {
        document.getElementById('previous-operand').innerText = 
            `${previousOperand} ${operation}`;
    } else {
        document.getElementById('previous-operand').innerText = '';
    }
}
