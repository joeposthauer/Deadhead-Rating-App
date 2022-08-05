f = open("hello-world.txt", "r")
token = (f.read())

from unicodedata import name
from bottle import route, run, request, template
import spotipy
from spotipy import oauth2

PORT_NUMBER = 8000
SPOTIPY_CLIENT_ID = 'd28a2cde39f84142af25d32e174c613a'
SPOTIPY_CLIENT_SECRET = '2b15228d3a974de1882394ae52ab371f'
SPOTIPY_REDIRECT_URI = 'http://localhost:8000'
SCOPE = 'user-library-read'
CACHE = '.spotipyoauthcache'

sp_oauth = oauth2.SpotifyOAuth( SPOTIPY_CLIENT_ID, SPOTIPY_CLIENT_SECRET,SPOTIPY_REDIRECT_URI,scope=SCOPE,cache_path=CACHE )

def get_user(token):
    sp = spotipy.Spotify(token)
    results = sp.current_user()
    return results

