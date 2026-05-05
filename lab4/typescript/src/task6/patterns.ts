class OldCalculator {
    multiply(a: number, b: number): number {
        return a * b;
    }
}

interface NewCalculator {
    product(a: number, b: number): number;
}

class CalculatorAdapter implements NewCalculator {
    private oldCalc: OldCalculator;
    constructor() {
        this.oldCalc = new OldCalculator();
    }
    product(a: number, b: number): number {
        return this.oldCalc.multiply(a, b);
    }
}

interface SortStrategy {
    sort(data: number[]): number[];
}

class BubbleSort implements SortStrategy {
    sort(data: number[]): number[] {
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

class QuickSort implements SortStrategy {
    sort(data: number[]): number[] {
        if (data.length <= 1) return data;
        const pivot = data[0];
        const left = data.slice(1).filter(x => x < pivot);
        const right = data.slice(1).filter(x => x >= pivot);
        return [...this.sort(left), pivot, ...this.sort(right)];
    }
}

class Sorter {
    constructor(private strategy: SortStrategy) {}
    setStrategy(strategy: SortStrategy) {
        this.strategy = strategy;
    }
    sort(data: number[]): number[] {
        return this.strategy.sort(data);
    }
}

interface Observer {
    update(message: string): void;
}

class ConcreteObserver implements Observer {
    constructor(private name: string) {}
    update(message: string): void {
        console.log(`${this.name} received: ${message}`);
    }
}

class Subject {
    private observers: Observer[] = [];
    attach(observer: Observer): void {
        this.observers.push(observer);
    }
    detach(observer: Observer): void {
        this.observers = this.observers.filter(obs => obs !== observer);
    }
    notify(message: string): void {
        this.observers.forEach(obs => obs.update(message));
    }
}

//проверка
//Адаптер
const calc = new CalculatorAdapter();
console.log(calc.product(2, 3));

//Стратегия
const sorter = new Sorter(new BubbleSort());
console.log(sorter.sort([3,1,2]));
sorter.setStrategy(new QuickSort());
console.log(sorter.sort([3,1,2]));

//Наблюдатель
const subject = new Subject();
const obs1 = new ConcreteObserver("Obs1");
subject.attach(obs1);
subject.notify("Hello");