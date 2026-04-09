const calculationHistory = [];

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        console.error("Error: Division by zero is not allowed.");
        return null;
    }
    return a / b;
}

function addToHistory(a, b, op, res) {
    const entry = {
        operand1: a,
        operand2: b,
        operator: op,
        result: res,
        timestamp: new Date().toLocaleTimeString()
    };
    calculationHistory.push(entry);
}

function displayHistory() {
    console.log("\n--- Calculation History ---");
    if (calculationHistory.length === 0) {
        console.log("No calculations stored yet.");
        return;
    }
    
    calculationHistory.forEach((entry, index) => {
        console.log(`${index + 1}. ${entry.operand1} ${entry.operator} ${entry.operand2} = ${entry.result}`);
    });
    console.log("---------------------------\n");
}

function performCalculation(a, b, operation) {
    let result;
    let operatorSymbol;

    switch (operation.toLowerCase()) {
        case 'add':
            result = add(a, b);
            operatorSymbol = '+';
            break;
        case 'subtract':
            result = subtract(a, b);
            operatorSymbol = '-';
            break;
        case 'multiply':
            result = multiply(a, b);
            operatorSymbol = '*';
            break;
        case 'divide':
            result = divide(a, b);
            operatorSymbol = '/';
            break;
        default:
            console.error("Invalid operation selected.");
            return;
    }

    if (result !== null) {
        addToHistory(a, b, operatorSymbol, result);
        console.log(`Result: ${result}`);
    }
}

console.log("Initializing Calculator...");

performCalculation(10, 5, 'add');
performCalculation(20, 8, 'subtract');
performCalculation(5, 5, 'multiply');
performCalculation(100, 10, 'divide');
performCalculation(5, 0, 'divide');

displayHistory();
