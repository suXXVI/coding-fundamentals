let redirectUri = window.location.origin;
// let redirectUri = 'https://suxxvi.github.io/DiscoverWeeklyToNewPlaylist/'
let clientId = 'e30c60a1df644367b302df0a2bdd9d52';
const loginBtn = document.querySelector('.login-button');
const clonePlaylist = document.querySelector('.clone-button');


// on click will clone the playlist 
clonePlaylist.addEventListener('click', () => {
    fetchNewPlaylist();
    clonePlaylist.textContent = 'Cloned to New Playlist :)'
});


// shows discover weekly playlist on page load
window.addEventListener('load', async function() {
    const urlParams = new URLSearchParams(window.location.search); 
    let code = urlParams.get('code'); 
    // console.log(code)

    if (code) {
        requestAccessToken(code);

        await fetchWebApi();
        await fetchPlaylistId();
        await fetchDiscoverWeekly();
    } else {
        requestAuthorization();
    };
});


// authentication with pkce starts here, following spotify guide //
function generateRandomString(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

async function generateCodeChallenge(codeVerifier) {
    function base64encode(string) {
      return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
    }
  
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
  
    return base64encode(digest);
};

// request authorization from user
function requestAuthorization() {
    const clientId = 'e30c60a1df644367b302df0a2bdd9d52';
    // let redirectUri = 'https://suxxvi.github.io/DiscoverWeeklyToNewPlaylist/'
    const redirectUri = window.location.origin;

    let codeVerifier = generateRandomString(128);

    generateCodeChallenge(codeVerifier).then(codeChallenge => {
    let state = generateRandomString(16);
    let scope = 'user-read-private user-read-email user-top-read playlist-modify-public playlist-modify-private playlist-read-private';

    localStorage.setItem('code_verifier', codeVerifier);

    let args = new URLSearchParams({
        response_type: 'code',
        client_id: clientId,
        scope: scope,
        redirect_uri: redirectUri,
        state: state,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge
    });

    window.location = 'https://accounts.spotify.com/authorize?' + args;
    });
};

// getting access token
function requestAccessToken(code) {
    let codeVerifier = localStorage.getItem('code_verifier');

    let body = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: redirectUri,
    client_id: clientId,
    code_verifier: codeVerifier
    });

    async function getToken() {
        try {
          const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: body
          });
      
          if (!response.ok) {
            throw new Error('HTTP status ' + response.status);
          }
      
          const data = await response.json();
          localStorage.setItem('access_token', data.access_token);
        } catch (error) {
          console.error(error);
        };
    };
    const response = getToken();// token acquired 
};


// this function will make API requests for all the other functions //
async function fetchWebApi(endpoint, method, body) {
    const accessToken = localStorage.getItem('access_token')
    const response = await fetch(`https://api.spotify.com/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method,
      body:JSON.stringify(body)
    });
    return await response.json();
};


// get discover weekly playlist_id //
async function fetchPlaylistId() {
    try {
        const endpoint =`v1/me/playlists`;
        let response = await fetchWebApi(endpoint + '?limit=20', 'GET');
        let data = response.items;

        let discoverWeeklyItem = data.find(item => item.name === 'Discover Weekly');
        let playlistId = discoverWeeklyItem.id;

        localStorage.setItem('playlist_id', playlistId);
    } catch (error) {
        console.log(error)
    };
};


// getting the URI of each track //
async function fetchDiscoverWeekly() {
    try {
        let playlist_id = localStorage.getItem('playlist_id');
        const endpoint = `v1/playlists/${playlist_id}/tracks`

        let response = await fetchWebApi(endpoint + '?limit=30', 'GET')
        let data = response
        // localStorage.setItem('discoverWeekly_items', data);
        console.log('Discover Weekly', data)

        // extract tracks URIs
        let tracksUris = data.items.map(item => item.track.uri);
        localStorage.setItem('tracks_uri', tracksUris);

        displayDiscoverWeekly(data);
    } catch (error) {
        console.log(error)
    };
};


// getting the tracks for the new playlist
async function fetchNewPlaylist() {
    try {
        let playlist_id = localStorage.getItem('playlist_id');
        const endpoint = `v1/playlists/${playlist_id}/tracks`

        let response = await fetchWebApi(endpoint + '?limit=30', 'GET')
        let data = response
        localStorage.setItem('discoverWeekly_items', data)
        console.log('Discover Weekly', data)

        // extract tracks URIs
        let tracksUris = data.items.map(item => item.track.uri);
        localStorage.setItem('tracks_uri', tracksUris);

        createPlaylist(tracksUris);
        displayNewPlaylist(data);
    } catch (error) {
        console.log(error)
    }
};


// create new playlist, following spotify guide //
async function createPlaylist(tracksUris) {
    const { id: user_id } = await fetchWebApi('v1/me', 'GET')
    const tracksUri = tracksUris

    const playlist = await fetchWebApi(
        `v1/users/${user_id}/playlists`, 'POST', {
          "name": "Cloned from Discover Weekly",
          "description": "Playlist created by DiscoverWeekly-to-NewPlaylist webApp by suXXVI on Github",
          "public": false
        }
    );
    
    await fetchWebApi(
        `v1/playlists/${playlist.id}/tracks?uris=${tracksUri.join(',')}`,
        'POST'
    );
    return playlist;
};


// display the songs in the discover weekly and new playlist boxes
function displayDiscoverWeekly(data) {
    const parentList = document.querySelector('.discoverWeekly-list');

    for (let i = 0; i < data.items.length; i++) {
        let track = data.items[i].track;
        let image = track.album.images[2].url;

        let artists = track.artists;
        let trackName = track.name;
        let artistNames = artists.map(artist => artist.name);

        // Create the main container for the track
        const trackDiv = document.createElement('div');
        trackDiv.classList.add('track-container');

        // Create the container for the album art
        const albumArt = document.createElement('div');
        albumArt.classList.add('album-art-container');

        // Create the image element for the album art
        const img = document.createElement('img');
        img.src = image;
        albumArt.appendChild(img);

        // Create the container for the track info
        const trackInfo = document.createElement('div');
        trackInfo.classList.add('track-info');

        // Create the element for the track title
        const trackTitle = document.createElement('p');
        trackTitle.classList.add('track-name');
        trackTitle.textContent = trackName;

        // Create the element for the artist title
        const artistTitle = document.createElement('p');
        artistTitle.classList.add('artist-name');
        artistTitle.textContent = artistNames.join(', ');

        // Append the elements to their respective containers
        trackInfo.appendChild(trackTitle);
        trackInfo.appendChild(artistTitle);

        trackDiv.appendChild(albumArt);
        trackDiv.appendChild(trackInfo);

        parentList.appendChild(trackDiv);
    };
};


function displayNewPlaylist(data) {
    const parentList = document.querySelector('.newPlaylist-list');

    for (let i = 0; i < data.items.length; i++) {
        let track = data.items[i].track;
        let image = track.album.images[2].url;

        let artists = track.artists;
        let trackName = track.name;
        let artistNames = artists.map(artist => artist.name);

        // Create the main container for the track
        const trackContainer = document.createElement('div');
        trackContainer.classList.add('track-container');

        // Create the container for the album art
        const albumArt = document.createElement('div');
        albumArt.classList.add('album-art-container');

        // Create the image element for the album art
        const img = document.createElement('img');
        img.src = image;
        albumArt.appendChild(img);

        // Create the container for the track info
        const trackInfo = document.createElement('div');
        trackInfo.classList.add('track-info');

        // Create the element for the track title
        const trackTitle = document.createElement('p');
        trackTitle.classList.add('track-name');
        trackTitle.textContent = trackName;

        // Create the element for the artist title
        const artistTitle = document.createElement('p');
        artistTitle.classList.add('artist-name');
        artistTitle.textContent = artistNames.join(', ');

        // Append the elements to their respective containers
        trackInfo.appendChild(trackTitle);
        trackInfo.appendChild(artistTitle);

        trackContainer.appendChild(albumArt);
        trackContainer.appendChild(trackInfo);

        parentList.appendChild(trackContainer);
    };
};