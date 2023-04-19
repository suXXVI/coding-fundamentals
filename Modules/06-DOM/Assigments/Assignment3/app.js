const close_button = document.querySelector('.close-button');
const slide_panel = document.querySelector('.slide-over-panel');
const register_button = document.querySelector('.register-button')

register_button.addEventListener('click', () => {
    slide_panel.classList.remove('slide-over-layout')
    slide_panel.classList.remove('slide-out')
    slide_panel.classList.add('slide-in')
})

close_button.addEventListener('click', () => {
    slide_panel.classList.remove('slide-in')
    slide_panel.classList.add('slide-out')
})
