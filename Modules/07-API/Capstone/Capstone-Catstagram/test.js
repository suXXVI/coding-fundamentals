const API_LINK = 'https://www.instagram.com/'

async function getAccount() {
    const response = await fetch(API_LINK)
    const data = await response.json()
    console.log('fetched', data)
    
}

getAccount()