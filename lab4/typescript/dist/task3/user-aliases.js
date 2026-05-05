"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    hello() {
        return `Hi! My name is ${this.name}. And I am ${this.age} years old.`;
    }
}
const user = new User("Miron", 20);
console.log(user.hello());
//# sourceMappingURL=user-aliases.js.map