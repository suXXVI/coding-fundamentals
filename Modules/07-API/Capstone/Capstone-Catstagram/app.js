const API_LINK = 'https://api.thecatapi.com/v1/breeds'

async function getUser() {
    const response = await fetch(`${API_LINK}`)
    const data = await response.json()
    console.log('fetched', data)
    return data
}

const card_container = document.querySelector('.main_container')

async function displayAccount() {
    let info = await getUser()
    info.forEach((element) => {
            const image = element.reference_image_id
            card_container.innerHTML += `
            <div class="card_container">
            <div class="card">
                <div class="img_container">
                    <img class="profile_pic" src="https://cdn2.thecatapi.com/images/${image}.jpg" onerror="this.onerror=null; this.src='./cat.png'">
                </div>
                <div class="text_container">
                    <h3 class="name_text">${element.name}</h3>
                    <p class="description_text">${element.description}</p>
                </div>
            </div>
            <div class="button_container">
                <button>Profile</button>
            </div>          
            `
        
    });
}

displayAccount()


