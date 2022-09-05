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
const TOPTRACKS = "https://api.spotify.com/v1/me/top/tracks"
const TOPARTISTS = "https://api.spotify.com/v1/me/top/artists"                                 // *****************
const RELARTISTS = "https://api.spotify.com/v1/artists/4TMHGUX5WI7OOm53PqSDAT/related-artists"; //currently cant work for any artist 



function RelatedArtists (props) {

    const [relatedArtists, setRelatedArtists] = useState([]);
   

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
            

            var artists1 = []
            data.artists.forEach(artist => artists1.push(artist.name));

            props.onRelatedArtists(artists1);
            setRelatedArtists(artists1);
            //topartists = artists;
        }
        else if (this.status == 401) {
            // refreshAccessToken()
        }
        else {
            console.log(this.responseText);
            alert(this.responseText);
        }
    }

    

    if (relatedArtists.length == 0) {
        callApi("GET", RELARTISTS, null, handleTopItems);

    } else {
        ;
    }


    return (
        <div>
            hey
        </div>
    )
}

export default RelatedArtists;