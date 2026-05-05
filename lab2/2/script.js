class User {
    #age;

    constructor(name, age) {
        this.name = name;
        this._tel = "";
        this.age = age;
    }

    hello() {
        console.log(`Hi! My name is ${this.name}. And I am ${this.age} years old.`);
        alert(`Hi! My name is ${this.name}. And I am ${this.age} years old.`);
    }

    get tel() {
        return this._tel;
    }

    set tel(value) {
        const phonePattern = /^\+7\d{10}$/;

        if (phonePattern.test(value)) {
            this._tel = value;
        } else {
            alert('Некорректный телефон. Нужен формат "+7xxxxxxxxxx"');
        }
    }

    get age() {
        return this.#age;
    }

    set age(value) {
        if (Number.isInteger(value) && value >= 1 && value <= 100) {
            this.#age = value;
        } else {
            alert("Возраст должен быть целым числом от 1 до 100");
        }
    }
}

function UserFunction(name, age) {
    this.name = name;
    this.age = age;
}

UserFunction.prototype.hello = function () {
    console.log(`Hi! My name is ${this.name}. And I am ${this.age} years old.`);
    alert(`Hi! My name is ${this.name}. And I am ${this.age} years old.`);
};

class Student extends User {
    #knowledge = 0;

    constructor(name, age) {
        super(name, age);
    }

    hello() {
        console.log(`Hi! My name is ${this.name}. I am ${this.age} years old. And I am a student!`);
        alert(`Hi! My name is ${this.name}. I am ${this.age} years old. And I am a student!`);
    }

    learn() {
        this.#knowledge += 1;
    }

    getKnowledge() {
        return this.#knowledge;
    }
}

Array.prototype.reverse = function () {
    return [...this, ...this];
};

function runUserMainDemo() {
    const name = prompt("Введите имя пользователя:");
    if (name === null) return;

    const ageInput = prompt("Введите возраст пользователя (1-100):");
    if (ageInput === null) return;

    const age = Number(ageInput);
    const user = new User(name.trim(), age);

    const telInput = prompt('Введите телефон в формате "+7xxxxxxxxxx":');
    if (telInput !== null) {
        user.tel = telInput.trim();
    }

    user.hello();

    alert(
        `Имя: ${user.name}\n` +
        `Возраст: ${user.age}\n` +
        `Телефон: ${user.tel || "не указан"}`
    );
}

function runUserFunctionDemo() {
    const name = prompt("Введите имя пользователя:");
    if (name === null) return;

    const ageInput = prompt("Введите возраст пользователя:");
    if (ageInput === null) return;

    const age = Number(ageInput);

    const user = new UserFunction(name.trim(), age);
    user.hello();
}

function runStudentDemo() {
    const name = prompt("Введите имя студента:");
    if (name === null) return;

    const ageInput = prompt("Введите возраст студента:");
    if (ageInput === null) return;

    const age = Number(ageInput);

    const student = new Student(name.trim(), age);

    student.hello();

    student.learn();
    student.learn();
    student.learn();

    alert(`Текущее knowledge: ${student.getKnowledge()}`);
}

function runArrayReverseDemo() {
    const input = prompt("Введите элементы массива через запятую:");
    if (input === null) return;

    const arr = input
        .split(",")
        .map(item => item.trim())
        .filter(item => item !== "");

    const result = arr.reverse();

    alert(`Результат reverse(): ${JSON.stringify(result)}`);
}