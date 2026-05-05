"use strict";
function distance(arg1, arg2, arg3, arg4) {
    if (typeof arg1 === 'object' && typeof arg2 === 'object') {
        const dx = arg2.x - arg1.x;
        const dy = arg2.y - arg1.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    else if (typeof arg1 === 'number' &&
        typeof arg2 === 'number' &&
        arg3 !== undefined &&
        arg4 !== undefined) {
        const dx = arg3 - arg1;
        const dy = arg4 - arg2;
        return Math.sqrt(dx * dx + dy * dy);
    }
    throw new Error('Invalid arguments');
}
//проверка
console.log(distance(0, 0, 3, 4));
console.log(distance({ x: 0, y: 0 }, { x: 3, y: 4 }));
//# sourceMappingURL=distance.js.map