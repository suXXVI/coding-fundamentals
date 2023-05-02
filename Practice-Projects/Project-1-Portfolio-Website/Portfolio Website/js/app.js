const nav = document.getElementById('navbar');

function slide() {
    if (window.scrollY === 0 || event.clientY <= 100) {
        nav.classList.add('slide-down');
    } else {
        nav.classList.remove('slide-down')
    }
}

window.addEventListener('scroll', slide)
window.addEventListener('mousemove', slide)