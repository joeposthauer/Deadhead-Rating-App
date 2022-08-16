import spotipy
from spotipy.oauth2 import SpotifyOAuth

sp = spotipy.Spotify(auth_manager=SpotifyOAuth(client_id="67a7a559635442d7a49f69ba3e0f6b8e",
                                               client_secret="05762567670749a0b6197d49a1bbb359",
                                               redirect_uri="http://api-university.com/",
                                               scope="user-library-read"))

results = sp.current_user_saved_tracks()
for idx, item in enumerate(results['items']):
    track = item['track']
    print(idx, track['artists'][0]['name'], " – ", track['name'])
