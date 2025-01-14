from django.shortcuts import render
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib import messages
from django.contrib.auth.models import User, auth
from django.contrib.auth.decorators import login_required
from music_api import views
import requests
from django.http import JsonResponse

from django.http import JsonResponse

def recommend(request):
    # Your logic for recommending songs
    data = {
        "message": "This is a recommendation response"
    }
    return render(request, 'recommend.html')


def music(request, pk):
    track_id = pk
    response = requests.get(f'http://127.0.0.1:8000/api/tracks/{track_id}')  # Update with your actual URL
    
    if response.status_code == 200:
        data = response.json()
        
        track_name = data.get("title")
        artist_name = data["artists"][0]["name"] if data["artists"] else "Unknown Artist"
        audio_url = data.get("preview_url")
        duration_text = '00:30'  # Assuming this is the duration for preview
        track_image = data.get("cover")

        context = {
            'track_name': track_name,
            'artist_name': artist_name,
            'audio_url': audio_url,
            'duration_text': duration_text,
            'track_image': track_image,
        }

        return JsonResponse(context)
    else:
        return JsonResponse({'error': 'Track not found'}, status=404)

# def music(request, pk):
#     track_id = pk
#     response = requests.get(f'http://127.0.0.1:8000/api/tracks/{track_id}')  # Update with your actual URL
    
#     if response.status_code == 200:
#         data = response.json()
#         # extrack track_name, artist_name

#         track_name = data.get("title")
#         artist_name = data["artists"][0]["name"] if data["artists"] else "Unknown Artist"
#         audio_url = data.get("preview_url")
#         duration_text = '00.30'
#         track_image = data.get("cover")

#         context = {
#             'track_name': track_name,
#             'artist_name': artist_name,
#             'audio_url': audio_url,
#             'duration_text': duration_text,
#             'track_image': track_image,
#         }
#     return render(request, 'index1.html', context)


def profile(request, pk):
    artist_id = pk
    response = requests.get(f'http://127.0.0.1:8000/api/artists/{artist_id}')  # Update with your actual URL
    if response.status_code == 200:
        data = response.json()
    else:
        data = {}

    if data:
        name = data["name"]
        artist_img = data.get('image_url')
        # Assuming these keys exist in your response JSON structure
        monthly_listeners = 10  # Placeholder, replace with actual data if available
        header_url = ''  # Placeholder, replace with actual data if available

        top_tracks = []

        # Extracting all tracks associated with the artist
        tracks = data.get("tracks", [])
        
        for track in tracks:
            track_info = {
                "id": track["id"],
                "title": track["title"],
                "preview_url": track["preview_url"],
                "cover": track["cover"],
                "album_title": track["album"]["title"],
                "artists": track["artists"],
                "durationText": '00:30'  # Placeholder, replace with actual duration if available
            }
            top_tracks.append(track_info)

        artist_data = {
            "name": name,
            "monthlyListeners": monthly_listeners,
            "headerUrl": header_url,
            "topTracks": top_tracks,
            "artist_img": artist_img,
        }
    else:
        artist_data = {}

    context = {
        'artist_data': artist_data
    }
    
    return render(request, 'artists.html', context)


def allplaylistrender():
    url = 'http://127.0.0.1:8000/api/playlistsnames/'  # Replace with your actual API URL
    response = requests.get(url)
    
    if response.status_code == 200:
        tracks = response.json()
    else:
        tracks = []

    playlistdatail = []
    
    for track in tracks:
        track_id = track['id']
        track_name = track['name']
        description = track['description']

        playlistdatail.append({
            'id': track_id,
            'name': track_name,
            'description': description
        })

    context = {
        'playlistnames': playlistdatail
    }

    # return render(request, 'playlist.html', context)
    return playlistdatail[:5]

def playlist(request, pk):
    id1 = pk
    print(pk)
    response = requests.get(f'http://127.0.0.1:8000/api/playlists/{id1}')  # Update with your actual URL
    
    if response.status_code == 200:
        playlist_data = response.json()  # Assuming the response is in JSON format
    else:
        playlist_data = {}

    playlist_details = {
        'playlist_id': playlist_data.get('id'),
        'playlist_name': playlist_data.get('name'),
        'playlist_description': playlist_data.get('description'),
        'tracks': []
    }

    for track in playlist_data.get('tracks', []):
        track_id = track.get('id')
        track_title = track.get('title')
        preview_url = track.get('preview_url')
        cover_url = track.get('cover')
        artist_name = track['artists'][0]['name'] if track.get('artists') else 'Unknown Artist'

        playlist_details['tracks'].append({
            'track_id': track_id,
            'track_title': track_title,
            'preview_url': preview_url,
            'cover_url': cover_url,
            'artist_name': artist_name
        })

    context = {
        'playlist_details': playlist_details
    }

    return render(request, 'playlist.html', context)

def top_tracks():
    response = requests.get('http://127.0.0.1:8000/api/tracks/')  # Update with your actual URL
    if response.status_code == 200:
        tracks10 = response.json()  # Assuming the response is in JSON format
    else:
        tracks10 = []
        

    track_details = []

    for track in tracks10:
        track_id = track['id']
        track_name = track['title']
        artist_name = track['artists'][0]['name'] if track['artists'] else None
        cover_url = track['cover'] if track['cover'] else None

        track_details.append({
            'id': track_id,
            'name': track_name,
            'artist': artist_name,
            'cover_url': cover_url
        })
    context = {
        'first_six_tracks': track_details
    }

    return track_details
    # return render(request, 'playlist.html', context)

def top_artists():
    response = requests.get('http://127.0.0.1:8000/api/artists/')  # Update with your actual URL
    if response.status_code == 200:
        tracks = response.json()  # Assuming the response is in JSON format
    else:
        tracks = []

    artists_info = []

    for artist in tracks:
        artist_img = artist.get('image_url')
        name = artist.get('name', 'No Name')
        artist_id = artist.get('id', 'No ID')
        if artist_img != None:
            print(artist_img)
            artists_info.append((name, artist_id, artist_img))
    
    return artists_info

@login_required(login_url='login')
def index(request):
    artists_info = top_artists()
    top_track_list = top_tracks()
    # playlist =playlist()
    playlistdatail = allplaylistrender()
    

    context = {
        'artists_info' : artists_info,
        'playlistdatail' : playlistdatail,
        'first_six_tracks': top_track_list,
        # 'playlist': playlist,
    }

    return render(request, 'index1.html', context)

@login_required(login_url='login')
def discover(request):
    artists_info = top_artists()
    top_track_list = top_tracks()
    # playlist =playlist()
    playlistdatail = allplaylistrender()
    

    context = {
        'artists_info' : artists_info,
        'playlistdatail' : playlistdatail,
        'first_six_tracks': top_track_list,
        # 'playlist': playlist,
    }

    return render(request, 'discover.html', context)

@login_required(login_url='login')
def trending(request):
    artists_info = top_artists()
    top_track_list = top_tracks()
    # playlist =playlist()
    playlistdatail = allplaylistrender()
    

    context = {
        'artists_info' : artists_info,
        'playlistdatail' : playlistdatail,
        'first_six_tracks': top_track_list,
        # 'playlist': playlist,
    }

    return render(request, 'trending.html', context)

def page2(request):
    return render(request, 'page2.html') 

#===================================================================================================== 

def login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

        user = auth.authenticate(username=username, password=password)

        if user is not None:
            auth.login(request, user)
            return redirect('/')
        else:
            messages.info(request, 'Credentials Invalid')
            return redirect('login')
        
    return render(request, 'login.html')





# ===================================================================================================
# ===================================================================================================


def signup(request):
    if request.method == 'POST':
        email = request.POST['email']
        username = request.POST['username']
        password = request.POST['password']
        password2 = request.POST['password2']

        if password == password2:
            if User.objects.filter(email=email).exists():
                messages.info(request, 'Email Taken')
                return redirect('signup')
            elif User.objects.filter(username=username).exists():
                messages.info(request, 'Username Taken')
                return redirect('signup')
            else:
                user = User.objects.create_user(username=username, email=email, password=password)
                user.save()

                # log user in 
                user_login = auth.authenticate(username=username, password=password)
                auth.login(request, user_login)
                return redirect('/')
        else:
            messages.info(request, 'Password Not Matching')
            return redirect('signup')
    else:    
        return render(request, 'signup.html')
    
 

   
    
#======================================================================================================== 
@login_required(login_url='login')
def logout(request):
    auth.logout(request)
    return redirect('login')


def search(request):
    if request.method == 'POST':
        search_query = request.POST.get('search_query', '')
        api_url = f'http://127.0.0.1:8000/api/search/?search={search_query}'
        
        response = requests.get(api_url)

        if response.status_code == 200:
            data = response.json()
            
            # Print data structure for debugging
            # print(data)
            
            # Adjust based on actual data structure
            if isinstance(data, list):
                tracks = data
                search_results_count = len(tracks)
            else:
                tracks = data.get("results", [])
                search_results_count = data.get("count", 0)
            
            track_list = []
            artist_set = set()
            album_set = set()
            playlist_set = set()

            for track in tracks:
                track_name = track["title"]
                duration = track.get("duration", "Unknown Duration")
                trackid = track["id"]
                cover = track["cover"]
                
                # Process artists
                artists = track.get("artists", [])
                for artist_data in artists:
                    artist_name = artist_data["name"]
                    artist_id = artist_data["id"]
                    artist_img = artist_data.get("image_url", "Unknown Image URL")
                    artist_set.add((artist_name, artist_id, artist_img))

                # Process albums
                album_data = track.get("album", {})
                album_title = album_data.get("title", "Unknown Album Title")
                album_id = album_data.get("id", "Unknown id")
                album_set.add((album_title, album_id))

                # Process playlists
                playlists = track.get("playlists", [])
                for playlist_data in playlists:
                    playlist_name = playlist_data["name"]
                    playlist_id = playlist_data["id"]
                    playlist_set.add((playlist_name, playlist_id))

                track_list.append({
                    'track_name': track_name,
                    'duration': duration,
                    'trackid': trackid,
                    'cover': cover,
                })
            
            # Convert sets back to lists for context
            artist_list = [{'artist_name': name, 'artist_id': id, 'artist_img': img} for name, id, img in artist_set]
            album_list = [{'album_title': title, 'album_id': id} for title, id in album_set]
            playlist_list = [{'playlist_name': name, 'playlist_id': id} for name, id in playlist_set]
            
            context = {
                'search_results_count': search_results_count,
                'track_list': track_list[:5],
                'artist_list': artist_list[:5],
                'album_list': album_list[:5],
                'playlist_list': playlist_list[:5],
            }
            # print(track_list)
            
            return render(request, 'search.html', context)
        else:
            context = {
                'error': 'Failed to retrieve search results from the API',
            }
            return render(request, 'search.html', context)
    
    return render(request, 'search.html')





