import React, { useState, useEffect } from "react";
import hash from "./hash";
import Playlists from "./Playlists.jsx";
import Algorithm from "./Algorithm";
import './style.css';

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

var fs = require('browserify-fs');


export const authEndpoint = "https://accounts.spotify.com/authorize";

// Replace with your app's client ID, redirect URI and desired scopes
export const clientId = "67a7a559635442d7a49f69ba3e0f6b8e";
export const redirectUri = "http://localhost:3000/";
export const scopes = [
  "user-top-read",
  "user-read-currently-playing",
  "user-read-playback-state",
];


function App() {

  const [token, setToken] = useState(null);



  useEffect(() => {
    var mToken = hash.access_token;
    if (mToken) {
      setToken(mToken);
    }

  })
  console.log(token)


  return (
    
    <div>
      <link rel="stylesheet" href="style.css"/>
      <div class= "genericPresets">
      Welcome to DeadHead Calculator! 
      Login with your spotify to see your results: 
      <div class="log-in-button">
      {!token && (
        <a
          className="btn btn--loginApp-link"
          href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
            "%20"
          )}&response_type=token&show_dialog=true`}
        >
          Login to Spotify
        </a>
      )}
      
      </div>
       
      </div>
     
      
      <div class = "resultsPageDefaults">
      {token && (
        <div>
          <Algorithm
            accessToken={token}
          />
        </div>
      )}
      </div>
      
    </div>
  )
}

export default App;
