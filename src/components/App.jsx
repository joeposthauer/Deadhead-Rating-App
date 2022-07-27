import React, { useState, useEffect } from "react";
import hash from "./hash";


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



  return (
    <div>
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
  )
}

export default App;
