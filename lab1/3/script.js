function parseNaturalNumbers(input) {
    return input
        .split(/[,\s]+/)
        .filter(item => item !== "")
        .map(item => Number(item));
}

function areNaturalNumbers(numbers) {
    return numbers.every(num => Number.isInteger(num) && num > 0);
}

function sortNaturalNumbers() {
    const input = prompt("Введите натуральные числа через пробел или запятую:");

    if (input === null) return;

    const numbers = parseNaturalNumbers(input);

    if (numbers.length === 0 || !areNaturalNumbers(numbers)) {
        alert("Введите корректный список натуральных чисел");
        return;
    }

    const sorted = [...numbers].sort((a, b) => a - b);

    alert(sorted.join(" "));
}

function getRemaindersByFive(numbers) {
    return numbers.map(num => num % 5);
}

function showRemainders() {
    const input = prompt("Введите натуральные числа через пробел или запятую:");

    if (input === null) return;

    const numbers = parseNaturalNumbers(input);

    if (numbers.length === 0 || !areNaturalNumbers(numbers)) {
        alert("Введите корректный список натуральных чисел");
        return;
    }

    const remainders = getRemaindersByFive(numbers);

    alert(remainders.join(" "));
}

function getMedian(...numbers) {
    if (numbers.length === 0) {
        return null;
    }

    const sorted = [...numbers].sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);

    if (sorted.length % 2 === 0) {
        return (sorted[middle - 1] + sorted[middle]) / 2;
    }

    return sorted[middle];
}

function showMedianExamples() {
    const classicInput = prompt("Введите числа для медианы через пробел или запятую:");

    if (classicInput === null) return;

    const numbers = classicInput
        .split(/[,\s]+/)
        .filter(item => item !== "")
        .map(item => Number(item));

    if (numbers.length === 0 || numbers.some(num => Number.isNaN(num))) {
        alert("Введите корректный список чисел");
        return;
    }

    let classicResult;

    if (numbers.length === 1) classicResult = getMedian(numbers[0]);
    else if (numbers.length === 2) classicResult = getMedian(numbers[0], numbers[1]);
    else if (numbers.length === 3) classicResult = getMedian(numbers[0], numbers[1], numbers[2]);
    else if (numbers.length === 4) classicResult = getMedian(numbers[0], numbers[1], numbers[2], numbers[3]);
    else if (numbers.length === 5) classicResult = getMedian(numbers[0], numbers[1], numbers[2], numbers[3], numbers[4]);
    else {
        classicResult = getMedian(...numbers);
    }

    const spreadResult = getMedian(...numbers);

    alert(
        `Вызов через аргументы: ${classicResult}\n` +
        `Вызов через распаковку массива: ${spreadResult}`
    );
}

function isCorrectBracketSequence(str) {
    const stack = [];

    for (const char of str) {
        if (char === "(") {
            stack.push(char);
        } else if (char === ")") {
            if (stack.length === 0) {
                return false;
            }
            stack.pop();
        } else {
            return false;
        }
    }

    return stack.length === 0;
}

function checkBracketSequence() {
    const input = prompt('Введите строку из символов "(" и ")":');

    if (input === null) return;

    const result = isCorrectBracketSequence(input.trim());

    if (result) {
        alert("Правильная");
    } else {
        alert("Неправильная");
    }
}

function deepCopy(value) {
    if (value === null || typeof value !== "object") {
        return value;
    }

    if (Array.isArray(value)) {
        return value.map(item => deepCopy(item));
    }

    const copy = {};

    for (const key in value) {
        if (Object.hasOwn(value, key)) {
            copy[key] = deepCopy(value[key]);
        }
    }

    return copy;
}

function showDeepCopyExample() {
    const original = {
        name: "Мирон",
        age: 20,
        address: {
            city: "Москва",
            street: "Старокаширское шоссе"
        },
        marks: [5, 4, 5],
        extra: {
            hobbies: ["рыбалочка", "музыка"],
            university: {
                title: "МИФИ"
            }
        }
    };

    const copied = deepCopy(original);

    copied.address.city = "Питер";
    copied.marks[0] = 3;
    copied.extra.university.title = "Синергия";

    alert(
        "Оригинал:\n" + JSON.stringify(original, null, 2) +
        "\n\nКопия после изменений:\n" + JSON.stringify(copied, null, 2)
    );
}