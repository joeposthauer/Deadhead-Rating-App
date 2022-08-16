import React, { useState } from "react";

const AUTHORIZE = "https://accounts.spotify.com/authorize"
const TOKEN = "https://accounts.spotify.com/api/token";
const PLAYLISTS = "https://api.spotify.com/v1/me/playlists";
const DEVICES = "https://api.spotify.com/v1/me/player/devices";
const PLAY = "https://api.spotify.com/v1/me/player/play";
const PAUSE = "https://api.spotify.com/v1/me/player/pause";
const NEXT = "https://api.spotify.com/v1/me/player/next";
const PREVIOUS = "https://api.spotify.com/v1/me/player/previous";
const PLAYER = "https://api.spotify.com/v1/me/player";
const TRACKS = "https://api.spotify.com/v1/playlists/{{PlaylistId}}/tracks";
const CURRENTLYPLAYING = "https://api.spotify.com/v1/me/player/currently-playing";
const SHUFFLE = "https://api.spotify.com/v1/me/player/shuffle";

function Playlists(props) {



    const [playlists, setPlaylists] = useState([]);

    const playlistNames = [];

    function callApi(method, url, body, callback) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', 'Bearer ' + props.accessToken);
        xhr.send(body);
        xhr.onload = callback;
    }

    function handlePlaylistsResponse() {
        if (this.status == 200) {
            var data = JSON.parse(this.responseText);
            
            console.log(data);
            // removeAllItems( "playlists" );
            // data.items.forEach(item => addPlaylist(item.name));
            // document.getElementById('playlists').value=currentPlaylist;
            data.items.forEach(item => addPlaylist(item.name));
            setPlaylists(playlistNames);
        }
        else if (this.status == 401) {
            // refreshAccessToken()
        }
        else {
            console.log(this.responseText);
            alert(this.responseText);
        }
        
    }

    function addPlaylist(item) {
        playlistNames.push(item);
    }


    if (playlists.length == 0) {
        callApi("GET", PLAYLISTS, null, handlePlaylistsResponse);
    } else {
        ;
    }
    




    console.log(playlists);

    return (
        <div>
            {console.log(playlists)}
            {/* <button value="Get My Playlists" onClick={handlePlaylistsResponse}> Get Playlists</button> */}
            <div>
                Playlist Names
                {playlists.map((playlist, index) => {
                    return (
                        <p key={index}>{playlist}</p>
                    )
                })}
            </div>

        </div>
    )
}

export default Playlists;