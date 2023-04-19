const button = document.querySelector('.add__button');
const notif = document.querySelector('.notification');
const close_btn = document.querySelector('.cta__button');

button.addEventListener('click', () => {
    notif.classList.remove('hidden')
    notif.classList.add('show')
})

close_btn.addEventListener('click', () => {
    notif.classList.remove('show');
    notif.classList.add('hidden')
})