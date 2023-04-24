const nameText = document.querySelector('#name')
const ageText = document.querySelector('#age')
const hobbiesList = document.querySelector('#hobbies')
const fetchBtn = document.querySelector('.fetch_button')

const API_LINK = 'https://api.github.com/gists/b9fc7ad8052362fdc94a3385a2877358'

async function getData() {
    const response = await fetch(API_LINK)
    const data = await response.json()
    console.log(data)
    return JSON.parse(data.files['me.json'].content)
}

function displayData({ name, age, hobbies }) {
    nameText.textContent = name
    ageText.textContent = age
    hobbies.forEach((hobby) => {
        hobbiesList.innerHTML += `<li>${hobby}</li>`
    })
}

fetchBtn.addEventListener('click', async () => {
    const data = await getData()

    displayData(data)
})