const search = document.querySelector('.palette');

document.addEventListener('keydown', (e) => {
    e.preventDefault()
    if (event.ctrlKey && event.key === 'k') {
        search.classList.toggle('fade-out');
        search.classList.toggle('fade-in');
    }
})

