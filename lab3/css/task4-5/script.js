const circle = document.getElementById('circle');

document.addEventListener('mousemove', (e) => {
    const x = e.clientX - 30;
    const y = e.clientY - 30;

    circle.style.left = x + 'px';
    circle.style.top = y + 'px';
});