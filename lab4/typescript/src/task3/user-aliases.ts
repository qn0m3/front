type UserType = {
    name: string;
    age: number;
    hello: () => string;
};

class User implements UserType {
    constructor(public name: string, public age: number) {}

    hello(): string {
        return `Hi! My name is ${this.name}. And I am ${this.age} years old.`;
    }
}

const user: UserType = new User("Miron", 20);
console.log(user.hello());

export {};