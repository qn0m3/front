function showMonthName() {
    const months = [
        "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
        "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
    ];

    const input = prompt("Введите номер месяца от 1 до 12:");

    if (input === null) return;

    const monthNumber = Number(input);

    if (Number.isInteger(monthNumber) && monthNumber >= 1 && monthNumber <= 12) {
        alert(months[monthNumber - 1]);
    } else {
        alert("Некорректный номер месяца");
    }
}

function isPrime(number) {
    if (number < 2) return false;

    for (let i = 2; i <= Math.sqrt(number); i++) {
        if (number % i === 0) {
            return false;
        }
    }

    return true;
}

function showPrimes() {
    const input = prompt("Введите натуральное число n:");

    if (input === null) return;

    const n = Number(input);

    if (!Number.isInteger(n) || n <= 0) {
        alert("Введите корректное натуральное число");
        return;
    }

    const primes = [];
    let current = 2;

    while (primes.length < n) {
        if (isPrime(current)) {
            primes.push(current);
        }
        current++;
    }

    alert(primes.join(" "));
}

function workWithCounter() {
    const counter = {
        count: 0,
        add(value) {
            this.count += value;
        },
        sub(value) {
            this.count -= value;
        }
    };

    while (true) {
        const action = prompt(
            `Текущее значение count = ${counter.count}\nВведите команду: add, sub или stop`
        );

        if (action === null) break;

        const normalizedAction = action.toLowerCase().trim();

        if (normalizedAction === "stop") break;

        if (normalizedAction !== "add" && normalizedAction !== "sub") {
            alert("Некорректная команда");
            continue;
        }

        const valueInput = prompt("Введите число:");

        if (valueInput === null) break;

        const value = Number(valueInput);

        if (Number.isNaN(value)) {
            alert("Некорректное число");
            continue;
        }

        if (normalizedAction === "add") {
            counter.add(value);
        } else {
            counter.sub(value);
        }
    }

    alert(`Итоговое значение count: ${counter.count}`);
}

function replaceCommasWithDots() {
    const input = prompt("Введите список слов, разделённых запятыми:");

    if (input === null) return;

    const result = input
        .split(",")
        .map(word => word.trim())
        .filter(word => word !== "")
        .join(".");

    alert(result);
}

function checkPalindrome() {
    const input = prompt("Введите строку:");

    if (input === null) return;

    const normalized = input
        .toLowerCase()
        .replace(/[^а-яa-z0-9]/gi, "");

    const reversed = normalized
        .split("")
        .reverse()
        .join("");

    if (normalized !== "" && normalized === reversed) {
        alert("Да");
    } else {
        alert("Нет");
    }
}