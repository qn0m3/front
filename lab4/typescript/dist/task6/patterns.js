"use strict";
class OldCalculator {
    multiply(a, b) {
        return a * b;
    }
}
class CalculatorAdapter {
    constructor() {
        this.oldCalc = new OldCalculator();
    }
    product(a, b) {
        return this.oldCalc.multiply(a, b);
    }
}
class BubbleSort {
    sort(data) {
        const arr = [...data];
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = 0; j < arr.length - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                }
            }
        }
        return arr;
    }
}
class QuickSort {
    sort(data) {
        if (data.length <= 1)
            return data;
        const pivot = data[0];
        const left = data.slice(1).filter(x => x < pivot);
        const right = data.slice(1).filter(x => x >= pivot);
        return [...this.sort(left), pivot, ...this.sort(right)];
    }
}
class Sorter {
    constructor(strategy) {
        this.strategy = strategy;
    }
    setStrategy(strategy) {
        this.strategy = strategy;
    }
    sort(data) {
        return this.strategy.sort(data);
    }
}
class ConcreteObserver {
    constructor(name) {
        this.name = name;
    }
    update(message) {
        console.log(`${this.name} received: ${message}`);
    }
}
class Subject {
    constructor() {
        this.observers = [];
    }
    attach(observer) {
        this.observers.push(observer);
    }
    detach(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }
    notify(message) {
        this.observers.forEach(obs => obs.update(message));
    }
}
//проверка
//Адаптер
const calc = new CalculatorAdapter();
console.log(calc.product(2, 3));
//Стратегия
const sorter = new Sorter(new BubbleSort());
console.log(sorter.sort([3, 1, 2]));
sorter.setStrategy(new QuickSort());
console.log(sorter.sort([3, 1, 2]));
//Наблюдатель
const subject = new Subject();
const obs1 = new ConcreteObserver("Obs1");
subject.attach(obs1);
subject.notify("Hello");
//# sourceMappingURL=patterns.js.map