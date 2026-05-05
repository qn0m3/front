const display = document.getElementById('display');
let currentExpression = '';

document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const value = e.target.textContent;

        if (value === 'C') {
            currentExpression = '';
            display.value = '';
        } else if (value === '=') {
            try {
                const result = evaluateExpression(currentExpression);
                display.value = result;
                currentExpression = result.toString();
            } catch (err) {
                display.value = 'Ошибка';
                currentExpression = '';
            }
        } else if (value) {
            currentExpression += value;
            display.value = currentExpression;
        }
    });
});

function evaluateExpression(expr) {
    const tokens = tokenize(expr);
    const rpn = toRPN(tokens);
    return evaluateRPN(rpn);
}

function tokenize(str) {
    const tokens = [];
    let i = 0;
    while (i < str.length) {
        const ch = str[i];
        if ('0123456789.'.includes(ch)) {
            let num = '';
            while (i < str.length && '0123456789.'.includes(str[i])) {
                num += str[i];
                i++;
            }
            tokens.push(parseFloat(num));
        } else if ('+-*/()'.includes(ch)) {
            tokens.push(ch);
            i++;
        } else {
            i++;
        }
    }
    return tokens;
}

function toRPN(tokens) {
    const output = [];
    const stack = [];
    const precedence = { '+': 1, '-': 1, '*': 2, '/': 2 };

    for (const token of tokens) {
        if (typeof token === 'number') {
            output.push(token);
        } else if (token === '(') {
            stack.push(token);
        } else if (token === ')') {
            while (stack.length && stack[stack.length - 1] !== '(') {
                output.push(stack.pop());
            }
            stack.pop();
        } else {
            while (stack.length && stack[stack.length - 1] !== '(' &&
            precedence[token] <= precedence[stack[stack.length - 1]]) {
                output.push(stack.pop());
            }
            stack.push(token);
        }
    }
    while (stack.length) {
        output.push(stack.pop());
    }
    return output;
}

function evaluateRPN(rpn) {
    const stack = [];
    for (const token of rpn) {
        if (typeof token === 'number') {
            stack.push(token);
        } else {
            const b = stack.pop();
            const a = stack.pop();
            switch (token) {
                case '+': stack.push(a + b); break;
                case '-': stack.push(a - b); break;
                case '*': stack.push(a * b); break;
                case '/': stack.push(b !== 0 ? a / b : NaN); break;
            }
        }
    }
    if (stack.length !== 1) return 'Ошибка';
    return stack[0];
}