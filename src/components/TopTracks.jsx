import React, {useState} from "react";

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
const TOP = "https://api.spotify.com/v1/me/top/type";
const TRACKFEAT = "https://api.spotify.com/v1/audio-features";
const ALBUMTRACKS = "https://api.spotify.com/v1/albums/"
const TOPTRACKS = "https://api.spotify.com/v1/me/top/tracks?limit=50"      //SHOULD WE DO LONG TERM DATA?? (currently medium (6 months))
const TOPARTISTS = "https://api.spotify.com/v1/me/top/artists"



function TopTracks (props) {

    const [topTracks, setTopTracks] = useState([]);
   

    function callApi(method, url, body, callback) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', 'Bearer ' + props.accessToken);
        xhr.send(body);
        xhr.onload = callback;
    }


    function handleTopItems() {
        if (this.status == 200) {
            var data = JSON.parse(this.responseText);
            
            var tracks = []
            data.items.forEach(track => tracks.push({
                name: track.name,
                artists: track.artists
            }));

            props.onTopTracks(tracks);
            setTopTracks(tracks);
            //topTracks = tracks;
        }
        else if (this.status == 401) {
            // refreshAccessToken()
        }
        else {
            console.log(this.responseText);
            alert(this.responseText);
        }
    }

    

    if (topTracks.length == 0) {
        callApi("GET", TOPTRACKS, null, handleTopItems);
    } else {
        ;
    }
   



    return (
        <div>
            Gillian
        </div>
    )
}

export default TopTracks;