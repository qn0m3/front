const counterSpan = document.getElementById('counter');
const cpsSpan = document.getElementById('cps');
const clickBtn = document.getElementById('clickBtn');

let count = parseInt(localStorage.getItem('clicker_count')) || 0;
let clickTimes = JSON.parse(localStorage.getItem('click_times')) || [];

counterSpan.textContent = count;
updateCPS();

clickBtn.addEventListener('click', () => {
    count++;
    const now = Date.now();
    clickTimes.push(now);

    counterSpan.textContent = count;
    localStorage.setItem('clicker_count', count);
    localStorage.setItem('click_times', JSON.stringify(clickTimes));

    updateCPS();
});

function updateCPS() {
    const tenSecondsAgo = Date.now() - 10000;
    clickTimes = clickTimes.filter(t => t >= tenSecondsAgo);

    const cps = clickTimes.length / 10;
    cpsSpan.textContent = cps.toFixed(2);

    localStorage.setItem('click_times', JSON.stringify(clickTimes));
}