const counterSpan = document.getElementById('counter');
const clickBtn = document.getElementById('clickBtn');

let count = parseInt(localStorage.getItem('clicker_count')) || 0;
counterSpan.textContent = count;

clickBtn.addEventListener('click', () => {
    count++;
    counterSpan.textContent = count;
    localStorage.setItem('clicker_count', count);
});