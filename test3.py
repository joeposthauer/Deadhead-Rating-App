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

@route('/')
def index():
    access_token = ""
    token_info = sp_oauth.get_cached_token()

    if token_info:
        print("Found cached token!")
        access_token = token_info['access_token']
    else:
        url = request.url
        code = sp_oauth.parse_response_code(url)
        if code != url:
            print("Found Spotify auth code in Request URL! Trying to get valid access token...")
            token_info = sp_oauth.get_access_token(code)
            access_token = token_info['access_token']

    if access_token:
        print("Access token available! Trying to get user information...")
        # sp = spotipy.Spotify(access_token)
        # results = sp.current_user()
        # return results
        return get_user(access_token)

    else:
        return htmlForLoginButton()

def get_user(token):
    sp = spotipy.Spotify(token)
    results = sp.current_user()
    return results

def htmlForLoginButton():
    auth_url = getSPOauthURI()
    htmlLoginButton = "<a href='" + auth_url + "'>Login to Spotify</a>"
    return htmlLoginButton

def getSPOauthURI():
    auth_url = sp_oauth.get_authorize_url()
    return auth_url

@route('/home')
def home():     #we have a user, as returned as results how do we use/access their info?
    token_info = sp_oauth.get_cached_token()
    sp_name = get_user(token_info['access_token'])["display_name"]
    return '<h1>The name is ' + sp_name+' </h1>'

# @route('/main')
# def main(name):
#     return template('main_template')

if __name__ == "__main__":
    run(host='', port=8000, debug=False, reloader=True)