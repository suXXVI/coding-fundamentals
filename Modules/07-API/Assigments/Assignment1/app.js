const quote = document.querySelector('.quote')
const authorName = document.querySelector('.author_name')
const newQuote = document.querySelector('.button')

const API = 'https://api.quotable.io/random'

async function getQuote() {
    const response = await fetch(API)
    const data = await response.json()
    
    console.log(data)
    return data
}

function displayQuote({ content, author }) {
    quote.textContent = content
    authorName.textContent = author
}

newQuote.addEventListener('click', async () => {
    const data = await getQuote()

    displayQuote(data)
})

window.onload = () => {
    newQuote.click()
}