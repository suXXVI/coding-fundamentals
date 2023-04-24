const pfp = document.querySelector('.pfp')
const profileName = document.querySelector('.profile_name')
const realName = document.querySelector('.real_name')
const dateCreated = document.querySelector('.date_joined')
const userForm = document.querySelector('#user-form')
const searchbtn = document.querySelector('#btn')
const cardContent = document.querySelector('.card')


const API_LINK = 'https://api.github.com/users'

async function findUser(inputInfo) {
    const response = await fetch(`${API_LINK}/${inputInfo}`)
    const data = await response.json()
    console.log(data)
    return data
}

function displayInfo({login, avatar_url, name, created_at}) {
    
    if (login) {
        pfp.src = avatar_url
        profileName.textContent = login
        realName.textContent = name

        const dateObj = new Date(created_at);
        const formattedDate = `${dateObj.getDate().toString().padStart(2, "0")}-${(dateObj.getMonth()+1).toString().padStart(2, "0")}-${dateObj.getFullYear().toString()}`;
        dateCreated.textContent = formattedDate;
    } else {
        pfp.src = './assets/github-logo.jpg'
        profileName.textContent = 'User not found :('
        realName.textContent = ''
        dateCreated.textContent = ''
    }
}


// added event listeners to both the button and the the keyboard 'enter' button, so that pressing either one will also work
searchbtn.addEventListener('click', async () => {
    const userSearchInput = userForm.querySelector('input').value
    const data = await findUser(userSearchInput)

    displayInfo(data)
})

userForm.querySelector('input').addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
        event.preventDefault()
        const userSearchInput = userForm.querySelector('input').value
        const data = await findUser(userSearchInput)

        displayInfo(data)
    }
})