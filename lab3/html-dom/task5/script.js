const display = document.getElementById('display');
let firstOperand = null;
let operator = null;
let shouldResetDisplay = false;

document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const value = e.target.textContent;

        if (value >= '0' && value <= '9') {
            if (shouldResetDisplay) {
                display.value = value;
                shouldResetDisplay = false;
            } else {
                display.value = display.value === '0' ? value : display.value + value;
            }
        } else if (value === 'C') {
            display.value = '0';
            firstOperand = null;
            operator = null;
            shouldResetDisplay = false;
        } else if (value === '+' || value === '-' || value === '*' || value === '/') {
            if (operator !== null) {
                const result = calculate(firstOperand, operator, parseFloat(display.value));
                display.value = result;
                firstOperand = result;
            } else {
                firstOperand = parseFloat(display.value);
            }
            operator = value;
            shouldResetDisplay = true;
        } else if (value === '=') {
            if (operator && firstOperand !== null) {
                const secondOperand = parseFloat(display.value);
                const result = calculate(firstOperand, operator, secondOperand);
                display.value = result;
                firstOperand = result;
                operator = null;
                shouldResetDisplay = true;
            }
        }
    });
});

function calculate(a, op, b) {
    switch (op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return b !== 0 ? a / b : 'Ошибка';
        default: return b;
    }
}