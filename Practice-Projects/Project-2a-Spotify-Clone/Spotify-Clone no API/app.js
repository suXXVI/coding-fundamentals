let TOKEN ='';
let client_id ='3258d519c811459da25dc4b743529a19';
let redirect_url = window.location.origin;
let scope = 'user-read-private user-read-email user-top-read';

function authorize() {
    let url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(client_id);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirect_url);
    window.open(url, '_self');
}

function extractTokenFromURI() {
    let hash = window.location.hash;
    if(hash && hash.includes('access_token')) {
        let url = hash.replace('#access_token=', '');
        let chunks = url.split('&');
        let token = chunks[0];
        return token
    }
    return null;
}

window.onload = () => {
    TOKEN = extractTokenFromURI();
    if(TOKEN) {
        console.log('TOKEN', TOKEN);
    } else {
        authorize()
    }
}

async function fetchUserTopItems() {
    try {
        let endpoint = 'https://api.spotify.com/v1/me/top/tracks';
        let response = await fetch(endpoint + '?limit=6', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + TOKEN,
            },
        });
        let data = await response.json();
        displayUserTopItems(data);
        console.log('User Top items', data)
    } catch (error) {
        alert('Something went wrong.');
        console.log(error)
    }
}

async function fetchNewRealeases() {
    try {
        let endpoint = 'https://api.spotify.com/v1/browse/new-releases';
        let response = await fetch(endpoint + '?limit=6', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + TOKEN,
            },
        });
        let data = await response.json();
        displayNewReleases(data);
        console.log('New Releases', data)
    } catch (error) {
        alert('Something went wrong.');
        console.log(error)
    }
}

async function fetchFeaturedPlaylists() {
    try {
        let endpoint = 'https://api.spotify.com/v1/browse/featured-playlists'
        let response = await fetch(endpoint + '?limit=6', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + TOKEN,
            },
        });
        let data = await response.json();
        displayFeaturedPlaylists(data);
        console.log('Featured Playlists', data)
    } catch (error) {
        alert('Something went wrong.');
        console.log(error)
    }
}

window.onload = () => {
    TOKEN = extractTokenFromURI();
    if(TOKEN) {
        console.log('TOKEN', TOKEN);

        fetchUserTopItems();
        fetchNewRealeases();
        fetchFeaturedPlaylists();
    } else {
        authorize();
    }
}

function displayUserTopItems(data) {
    let section = document.querySelector('#your-top-items');
    let sectionTitle = section.querySelector('.title');
    let sectionSubtitle = section.querySelector('.subtitle');
    let sectionWrapper = section.querySelector('.card-wrapper');
    sectionTitle.textContent = 'Your Top Items';
    sectionSubtitle.textContent = 'Based on your recent listening';

    for( let i = 0; i < data.items.length; i++) {
        let track = data.items[i];

        let image = track.album.images[1].url;
        let title = track.name;
        let subtitle = track.album.artists[0].name;
        let href = track.album.external_urls.spotify

        sectionWrapper.innerHTML += generateCard(image, title, subtitle, href);
    }
}

function displayNewReleases(data) {
    let section = document.querySelector('#new-releases');
    let sectionTitle = section.querySelector('.title');
    let sectionSubtitle = section.querySelector('.subtitle');
    let sectionWrapper = section.querySelector('.card-wrapper');
    sectionTitle.textContent = 'New Releases';
    sectionSubtitle.textContent = 'New releases from Spotify';

    for (let i = 0; i < data.albums.items.length; i++) {
        let track = data.albums.items[i];

        let image = track.images[1].url;
        let title = track.name;
        let subtitle = track.artists[0].name;
        let href = track.external_urls.spotify;

        sectionWrapper.innerHTML += generateCard(image, title, subtitle, href);
    }
}

function displayFeaturedPlaylists(data) {
    let section = document.querySelector('#featured-playlists');
    let sectionTitle = section.querySelector('.title');
    let sectionSubtitle = section.querySelector('.subtitle');
    let sectionWrapper = section.querySelector('.card-wrapper');
    sectionTitle.textContent = 'Featured Playlists';
    sectionSubtitle.textContent = 'Featured playlists from Spotify';

    for (let i = 0; i < data.playlists.items.length; i++) {
        let track = data.playlists.items[i];

        let image = track.images[0].url;
        let title = track.name;
        let subtitle = track.description;
        let href = track.external_urls.spotify;

        sectionWrapper.innerHTML += generateCard(image, title, subtitle, href);
    }
}

function generateCard(image, title, subtitle, href) {
    return `
    <a class='card' href='${href}' target='_blank'>
        <img
            src='${image}'
            alt='peaceful piano'
            srcset=''
    />
    <span class='mdi mdi-play mdi-36px'></span>
    <div class='title'>${title}</div>
    <div class='subtitle'>${subtitle}</div>
    </a>
    `
}