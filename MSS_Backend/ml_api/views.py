# ======================================================================================
# 1 Million SongID Recommender ML
# http://127.0.0.1:8000/mlapi/1wsRitfRRtWyEapl0q22o8/
# This API suggest song for given song id From over Million Songs in Global
# ======================================================================================
from rest_framework.decorators import api_view
from rest_framework.response import Response
import pandas as pd
from sklearn.preprocessing import StandardScaler
import joblib
import os
from django.conf import settings


df = pd.read_csv(os.path.join(settings.MEDIA_ROOT, 'finaldataset_v0.csv'))
# allFeaturedDataset = pd.read_csv(os.path.join(settings.MEDIA_ROOT, '1mDataset.csv'))


features = ['explicit', 'danceability', 'energy', 'key', 'loudness', 'mode',
            'speechiness', 'acousticness', 'instrumentalness', 'liveness',
            'valence', 'tempo', 'duration_ms', 'time_signature', 'year']

X = df[features]
song_ids = df['id']

model_path = os.path.join(settings.MEDIA_ROOT, 'knn_model.joblib')
knn_model = joblib.load(model_path)

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# @api_view(['GET'])
# def recommend_song(request, song_id):
#     try:

#         song_index = df[df['id'] == song_id].index[0] 
#         query_song_features = X_scaled[song_index].reshape(1, -1)
        
#         distances, indices = knn_model.kneighbors(query_song_features)
        
#         recommended_song_ids = song_ids.iloc[indices[0]].values.tolist()
#         recommendations = allFeaturedDataset[allFeaturedDataset['id'].isin(recommended_song_ids)][['name', 'id']]
        
#         recommendations['distance'] = distances[0]
#         recommendations = recommendations.sort_values(by='distance', ascending=True)
        
#         recommendations_json = recommendations.to_dict(orient='records')
#         return Response(recommendations_json)

#     except IndexError:
#         return Response({"error": "Song ID not found"}, status=404)
#     except Exception as e:
#         return Response({"error": str(e)}, status=500)

from spotipy import Spotify
from spotipy.oauth2 import SpotifyClientCredentials
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Set up the Spotipy client
sp = Spotify(auth_manager=SpotifyClientCredentials(client_id="ff14a0bc7f824e879d94d30736b0a1ac",
                                                   client_secret="8740cac0215f482d855112f0622ad60a"))

# @api_view(['GET'])
# def recommend_song(request, song_id):
#     try:
#         song_index = df[df['id'] == song_id].index[0] 
#         query_song_features = X_scaled[song_index].reshape(1, -1)
        
#         # Limit the number of recommended songs to 2 by setting n_neighbors=2
#         distances, indices = knn_model.kneighbors(query_song_features, n_neighbors=2)
        
#         # Fetch the recommended song IDs
#         recommended_song_ids = song_ids.iloc[indices[0]].values.tolist()

#         recommended_tracks = []
#         for sptfy_id in recommended_song_ids:
#             track_info = sp.track(sptfy_id)

#             # Safely retrieve preview_url (set to None if it doesn't exist)
#             preview_url = track_info.get('preview_url', None)

#             track_data = {
#                 "id": track_info['id'],
#                 "title": track_info['name'],
#                 "preview_url": preview_url,  # Can be None if not available
#                 "cover": track_info['album']['images'][0]['url'] if track_info['album']['images'] else None,
#                 "album": {
#                     "id": track_info['album']['id'],
#                     "title": track_info['album']['name'],
#                     "image_url": track_info['album']['images'][0]['url'] if track_info['album']['images'] else None,
#                     "release_date": track_info['album']['release_date'],
#                     "total_tracks": track_info['album']['total_tracks']
#                 },
#                 "artist": [
#                     {
#                         "id": artist['id'],
#                         "name": artist['name'],
#                         "image_url": sp.artist(artist['id'])['images'][0]['url'] if sp.artist(artist['id'])['images'] else None
#                     }
#                     for artist in track_info['artists']
#                 ],
#                 "playlists": [],  # Add playlist data here if necessary
#                 "sptfy_id": track_info['id'],
#                 "type": "track"
#             }
#             recommended_tracks.append(track_data)

#         return Response(recommended_tracks)

#     except IndexError:
#         return Response({"error": "Song ID not found"}, status=404)
#     except Exception as e:
#         return Response({"error": str(e)}, status=500)

from music_api.models import Trackfav, Track

# def get_all_sptfy_ids():
#     """
#     Fetch all sptfy_id values from associated Tracks based on all Trackfav records.
#     """
#     # Fetch all Trackfav records
#     trackfav_records = Trackfav.objects.all()

#     # Initialize an empty list to store sptfy_id values
#     sptfy_ids = []

#     # Iterate through each Trackfav record and get associated Track objects
#     for trackfav in trackfav_records:
#         # Fetch the associated Track objects using the favid
#         tracks = Track.objects.filter(id=trackfav.favid)  # Adjust filtering criteria if necessary

#         # Extract and collect the sptfy_id values from each track
#         sptfy_ids.extend(tracks.values_list('sptfy_id', flat=True))

#     # Return the list of sptfy_id values
#     return list(sptfy_ids)




import pandas as pd
from spotipy import Spotify
from spotipy.oauth2 import SpotifyClientCredentials
from rest_framework.decorators import api_view
from rest_framework.response import Response
from music_api.models import Track  # Import your Track model
from music_api.serializers import TrackSerializer  # Import your serializer
import os



# Load CSV file into a DataFrame
CSV_FILE_PATH = os.path.join(settings.MEDIA_ROOT, 'databyapi.csv')
# Check if the CSV file exists; if not, create it with headers
if not os.path.isfile(CSV_FILE_PATH):
    # Create an empty DataFrame with the desired columns
    columns = ['id', 'title', 'preview_url', 'cover', 'sptfy_id', 'album_id', 
               'album_title', 'album_image_url', 'album_release_date', 
               'album_total_tracks', 'artist_ids', 'artist_names','artist_imagr_url']
    dfx = pd.DataFrame(columns=columns)
    dfx.to_csv(CSV_FILE_PATH, index=False)
    
    
# @api_view(['GET'])
# def recommend_song(request, song_id):
#     all_sptfy_ids = get_all_sptfy_ids()
#     try:
        
#         song_index = df[df['id'] == song_id].index[0] 
#         query_song_features = X_scaled[song_index].reshape(1, -1)
        
#         # Limit the number of recommended songs to 2
#         distances, indices = knn_model.kneighbors(query_song_features, n_neighbors=2)
#         recommended_song_ids = song_ids.iloc[indices[0]].values.tolist()

#         recommended_tracks = []
        
#         # Load CSV data
#         csv_data = pd.read_csv(CSV_FILE_PATH)

#         for sptfy_id in recommended_song_ids:
#             # Check if the track exists in the CSV
#             csv_track = csv_data[csv_data['sptfy_id'] == sptfy_id]
#             if not csv_track.empty:
#                 # If track exists in CSV, append it to recommended_tracks
#                 recommended_tracks.append(csv_track.iloc[0].to_dict())
#             else:
#                 # If track is not in CSV, check the Django database
#                 track_instance = Track.objects.filter(sptfy_id=sptfy_id).first()
#                 if track_instance:
#                     # If track exists in the database, serialize and append it
#                     recommended_tracks.append(TrackSerializer(track_instance).data)
#                 else:
#                     # If track is not found, fetch from Spotify
#                     track_info = sp.track(sptfy_id)
#                     preview_url = track_info.get('preview_url', None)
#                     track_data = {
#                         "id": track_info['id'],
#                         "title": track_info['name'],
#                         "preview_url": preview_url,
#                         "cover": track_info['album']['images'][0]['url'] if track_info['album']['images'] else None,
#                         "album": {
#                             "id": track_info['album']['id'],
#                             "title": track_info['album']['name'],
#                             "image_url": track_info['album']['images'][0]['url'] if track_info['album']['images'] else None,
#                             "release_date": track_info['album']['release_date'],
#                             "total_tracks": track_info['album']['total_tracks']
#                         },
#                         "artist": [
#                             {
#                                 "id": artist['id'],
#                                 "name": artist['name'],
#                                 "image_url": sp.artist(artist['id'])['images'][0]['url'] if sp.artist(artist['id'])['images'] else None
#                             }
#                             for artist in track_info['artists']
#                         ],
#                         "playlists": [],  # Add playlist data here if necessary
#                         "sptfy_id": track_info['id'],
#                         "type": "track"
#                     }
#                     recommended_tracks.append(track_data)
#                     # Prepare artist data directly
#                     artist_ids = []
#                     artist_names = []
#                     artist_image_urls = []

#                     for artist in track_info['artists']:
#                         artist_info = sp.artist(artist['id'])
#                         artist_ids.append(artist_info['id'])
#                         artist_names.append(artist_info['name'])
#                         artist_image_urls.append(artist_info['images'][0]['url'] if artist_info['images'] else None)
#                     new_row = {
#                         "id": track_info['id'],
#                         "title": track_info['name'],
#                         "preview_url": preview_url,
#                         "cover": track_info['album']['images'][0]['url'] if track_info['album']['images'] else None,
#                         "sptfy_id": track_info['id'],
#                         "album_id": track_info['album']['id'],
#                         "album_title": track_info['album']['name'],
#                         "album_image_url": track_info['album']['images'][0]['url'] if track_info['album']['images'] else None,
#                         "album_release_date": track_info['album']['release_date'],
#                         "album_total_tracks": track_info['album']['total_tracks'],
#                         # "artist_ids": [artist['id'] for artist in track_info['artists']],  # Adjust based on your needs
#                         # "artist_names": [artist['name'] for artist in track_info['artists']],  # Adjust based on your needs
#                         "artist_ids": artist_ids[0],
#                         "artist_names": artist_names[0],
#                         "artist_imagr_url": artist_image_urls[0],
#                     }
#                     # Convert the new_row dictionary to a DataFrame
#                     new_row_df = pd.DataFrame([new_row])

#                     # Use pd.concat() to append the new row to the existing DataFrame
#                     csv_data = pd.concat([csv_data, new_row_df], ignore_index=True)

#                     # Save updated DataFrame back to CSV
#                     csv_data.to_csv(CSV_FILE_PATH, index=False)

#         return Response(recommended_tracks)

#     except IndexError:
#         return Response({"error": "Song ID not found"}, status=404)
#     except Exception as e:
#         return Response({"error": str(e)}, status=500)




# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from music_api.models import Track
# from music_api.serializers import TrackSerializer
# import pandas as pd
# import numpy as np

# # # Fetch all sptfy_id helper function
# # def get_all_sptfy_ids():
# #     trackfav_records = Trackfav.objects.all()
# #     sptfy_ids = []
# #     for trackfav in trackfav_records:
# #         tracks = Track.objects.filter(id=trackfav.favid)
# #         sptfy_ids.extend(tracks.values_list('sptfy_id', flat=True))
# #     return list(sptfy_ids)

# def get_all_sptfy_ids():
#     # Get all Trackfav records and extract sptfy_id directly from them
#     sptfy_ids = Trackfav.objects.values_list('favid', flat=True)  # Assuming 'favid' now contains sptfy_id
#     return list(sptfy_ids)


# @api_view(['GET'])
# def recommend_song(request):
#     try:
#         all_sptfy_ids = get_all_sptfy_ids()

#         recommended_tracks = []
#         csv_data = pd.read_csv(CSV_FILE_PATH)  # Load CSV data

#         for song_id in all_sptfy_ids:
#             try:
#                 # Get the song index and features from the DataFrame
#                 song_index = df[df['id'] == song_id].index[0]
#                 query_song_features = X_scaled[song_index].reshape(1, -1)
                
#                 # Limit the number of recommended songs to 2
#                 distances, indices = knn_model.kneighbors(query_song_features, n_neighbors=5)
#                 recommended_song_ids = song_ids.iloc[indices[0]].values.tolist()

#                 for sptfy_id in recommended_song_ids:
#                     csv_track = csv_data[csv_data['sptfy_id'] == sptfy_id]
#                     if not csv_track.empty:
#                         # Fill NaN values in CSV track data
#                         track_dict = csv_track.iloc[0].fillna("").to_dict()
#                         recommended_tracks.append(track_dict)
#                     else:
#                         # Check the Django database for track
#                         track_instance = Track.objects.filter(sptfy_id=sptfy_id).first()
#                         if track_instance:
#                             recommended_tracks.append(TrackSerializer(track_instance).data)
#                         else:
#                             # Fetch track from Spotify API if not found
#                             track_info = sp.track(sptfy_id)
#                             preview_url = track_info.get('preview_url', None)
#                             track_data = {
#                                 "id": track_info['id'],
#                                 "title": track_info['name'],
#                                 "preview_url": preview_url,
#                                 "cover": track_info['album']['images'][0]['url'] if track_info['album']['images'] else None,
#                                 "album": {
#                                     "id": track_info['album']['id'],
#                                     "title": track_info['album']['name'],
#                                     "image_url": track_info['album']['images'][0]['url'] if track_info['album']['images'] else None,
#                                     "release_date": track_info['album']['release_date'],
#                                     "total_tracks": track_info['album']['total_tracks']
#                                 },
#                                 "artist": [
#                                     {
#                                         "id": artist['id'],
#                                         "name": artist['name'],
#                                         "image_url": sp.artist(artist['id'])['images'][0]['url'] if sp.artist(artist['id'])['images'] else None
#                                     }
#                                     for artist in track_info['artists']
#                                 ],
#                                 "playlists": [],  # Add playlist data if necessary
#                                 "sptfy_id": track_info['id'],
#                                 "type": "track"
#                             }
#                             # Append to recommended_tracks and handle NaN values in the new track_data
#                             recommended_tracks.append({k: v if v is not None else "" for k, v in track_data.items()})

#                             # Prepare artist data and add new row to CSV
#                             artist_ids = [artist['id'] for artist in track_info['artists']]
#                             artist_names = [artist['name'] for artist in track_info['artists']]
#                             artist_image_urls = [
#                                 sp.artist(artist['id'])['images'][0]['url'] if sp.artist(artist['id'])['images'] else None 
#                                 for artist in track_info['artists']
#                             ]

#                             new_row = {
#                                 "id": track_info['id'],
#                                 "title": track_info['name'],
#                                 "preview_url": preview_url if preview_url else "",
#                                 "cover": track_info['album']['images'][0]['url'] if track_info['album']['images'] else "",
#                                 "sptfy_id": track_info['id'],
#                                 "album_id": track_info['album']['id'],
#                                 "album_title": track_info['album']['name'],
#                                 "album_image_url": track_info['album']['images'][0]['url'] if track_info['album']['images'] else "",
#                                 "album_release_date": track_info['album']['release_date'],
#                                 "album_total_tracks": track_info['album']['total_tracks'],
#                                 "artist_ids": artist_ids[0],
#                                 "artist_names": artist_names[0],
#                                 "artist_image_url": artist_image_urls[0] if artist_image_urls[0] else "",
#                                 "type": "track"
#                             }

#                             # Append new row to CSV
#                             new_row_df = pd.DataFrame([new_row])
#                             csv_data = pd.concat([csv_data, new_row_df], ignore_index=True)
#                             csv_data.to_csv(CSV_FILE_PATH, index=False)

#             except IndexError:
#                 continue  # Skip if song_id not found in the DataFrame
#         # print(recommended_tracks)
#         return Response(recommended_tracks)

#     except Exception as e:
#         return Response({"error": str(e)}, status=500)





from rest_framework.decorators import api_view
from rest_framework.response import Response
from music_api.models import Track, Artist, Album  # Import your models
from music_api.serializers import TrackSerializer
import pandas as pd
import numpy as np

def get_all_sptfy_ids(): 
    sptfy_ids = Trackfav.objects.values_list('favid', flat=True)  # Assuming 'favid' now contains sptfy_id
    return list(sptfy_ids)

@api_view(['GET'])
def recommend_song(request):
    try:
        all_sptfy_ids = get_all_sptfy_ids()
        unique_sptfy_ids = set()
        filtered_recommended_tracks = []
        recommended_tracks = []
        csv_data = pd.read_csv(CSV_FILE_PATH)  # Load CSV data

        for song_id in all_sptfy_ids:
            try:
                # Get the song index and features from the DataFrame
                song_index = df[df['id'] == song_id].index[0]
                query_song_features = X_scaled[song_index].reshape(1, -1)
                
                distances, indices = knn_model.kneighbors(query_song_features, n_neighbors=5)
                recommended_song_ids = song_ids.iloc[indices[0]].values.tolist()

                for sptfy_id in recommended_song_ids:
                    csv_track = csv_data[csv_data['sptfy_id'] == sptfy_id]
                    if not csv_track.empty:
                        track_dict = csv_track.iloc[0].fillna("").to_dict()
                        recommended_tracks.append(track_dict)
                    else:
                        track_instance = Track.objects.filter(sptfy_id=sptfy_id).first()
                        if track_instance:
                            recommended_tracks.append(TrackSerializer(track_instance).data)
                        else:
                            track_info = sp.track(sptfy_id)
                            # Set default values
                            default_preview_url = "https://p.scdn.co/mp3-preview/7cf013f68cbe1d9a40ca558877658cacaedcb0fc?cid=382b723e3d2044a1b97de76c736789fb"
                            default_cover_url = "https://i.scdn.co/image/ab67616d0000b273551c70d342facb9e13581d9d"

                            # preview_url = track_info.get('preview_url', None)
                            preview_url = track_info.get('preview_url', default_preview_url)
                            
                            # Get the cover or use the default
                            cover = track_info['album']['images'][0]['url'] if track_info['album']['images'] else default_cover_url

                            
                            
                            # Create or get the artist
                            # Initialize lists to store artist details
                            artist_objects = []
                            artist_ids = []  
                            artist_names = []
                            artist_image_urls = []

                            # Process only the first artist
                            if track_info['artists']:
                                artist = track_info['artists'][0]  # Get the first artist only

                                # Use name as the lookup field in get_or_create to avoid duplicates
                                artist_obj, created = Artist.objects.get_or_create(
                                    name=artist['name'],  # Ensure unique lookup by name
                                    defaults={
                                        'image_url': sp.artist(artist['id'])['images'][0]['url'] if sp.artist(artist['id'])['images'] else None
                                    }
                                )
                                
                                # Append artist details to the lists
                                artist_objects.append(artist_obj)
                                # artist_ids.append(artist_obj.id)
                                artist_names.append(artist_obj.name)
                                artist_image_urls.append(artist_obj.image_url)

                            # # Create or get the album
                            # album_obj, _ = Album.objects.get_or_create(
                            #     title=track_info['album']['name'], 
                            #     release_date=track_info['album']['release_date'],  # Add release_date as a secondary unique identifier
                            #     defaults={
                            #         'image_url': track_info['album']['images'][0]['url'] if track_info['album']['images'] else None,
                            #         'total_tracks': track_info['album']['total_tracks']
                            #     }
                            # )
                            
                            
                                                        # Create or get the album
                            release_date = track_info['album']['release_date']

                            # If only the year is provided (e.g., '1972'), append '-01-01' to make it a valid date
                            if len(release_date) == 4:  # Only the year is provided
                                release_date += '-01-01'

                            # If the release_date is still invalid, catch the exception and skip this track
                            try:
                                album_obj, _ = Album.objects.get_or_create(
                                    title=track_info['album']['name'], 
                                    release_date=release_date,  # Use the formatted release date
                                    defaults={
                                        'image_url': track_info['album']['images'][0]['url'] if track_info['album']['images'] else None,
                                        'total_tracks': track_info['album']['total_tracks']
                                    }
                                )
                            except ValueError as e:
                                print(f"Error with release date for album: {e}")
                                continue  # Skip this track if the release date is invalid



                            # # Create the new track instance
                            # new_track = Track.objects.create(
                            #     title=track_info['name'],
                            #     sptfy_id=track_info['id'],
                            #     preview_url=preview_url,
                            #     cover=track_info['album']['images'][0]['url'] if track_info['album']['images'] else None,
                            #     album=album_obj
                            # )
                            # new_track.artist.set(artist_objects)  # Set the ManyToMany relationship
                            
                            try:
                                # Create the new track instance
                                new_track = Track.objects.create(
                                    title=track_info['name'],
                                    sptfy_id=track_info['id'],
                                    preview_url=preview_url,
                                    # cover=track_info['album']['images'][0]['url'] if track_info['album']['images'] else None,
                                    cover=cover,
                                    album=album_obj
                                )
                                new_track.artist.set(artist_objects)  # Set the ManyToMany relationship

                            except Exception as e:
                                # Log the error or print it for debugging purposes
                                print(f"Error creating track: {e}")
                                # Continue with the next track
                                pass


                            # Prepare the track data for response
                            track_data = {
                                
                                "title": new_track.title,
                                "preview_url": new_track.preview_url,
                                "cover": new_track.cover,
                                "album": {
                                    "id": album_obj.id,
                                    "title": album_obj.title,
                                    "image_url": album_obj.image_url,
                                    # "release_date": album_obj.release_date,
                                    "total_tracks": album_obj.total_tracks
                                },
                                "artist": [
                                    {
                                        "id": artist.id,
                                        "name": artist.name,
                                        "image_url": artist.image_url
                                    }
                                    for artist in artist_objects
                                ],
                                "playlists": [],
                                "sptfy_id": new_track.sptfy_id,
                                "type": "track"
                            }

                            recommended_tracks.append(track_data)

                            # Prepare artist data and add new row to CSV
                            new_row = {
                                
                                "title": track_info['name'],
                                "preview_url": preview_url if preview_url else "",
                                "cover": track_info['album']['images'][0]['url'] if track_info['album']['images'] else "",
                                "sptfy_id": track_info['id'],
                                "album_id": track_info['album']['id'],
                                "album_title": track_info['album']['name'],
                                "album_image_url": track_info['album']['images'][0]['url'] if track_info['album']['images'] else "",
                                # "album_release_date": track_info['album']['release_date'],
                                "album_total_tracks": track_info['album']['total_tracks'],
                                "artist_ids": artist_ids,  # Use the list of artist IDs
                                "artist_names": artist_names,  # Use the list of artist names
                                "artist_image_url": artist_image_urls,  # Use the list of artist image URLs
                                "type": "track"
                            }

                            new_row_df = pd.DataFrame([new_row])
                            csv_data = pd.concat([csv_data, new_row_df], ignore_index=True)
                            csv_data.to_csv(CSV_FILE_PATH, index=False)


            except IndexError:
                continue  # Skip if song_id not found in the DataFrame
        
        for track in recommended_tracks:
            if track['sptfy_id'] not in unique_sptfy_ids:
                unique_sptfy_ids.add(track['sptfy_id'])
                filtered_recommended_tracks.append(track)
        
        return Response(filtered_recommended_tracks)

    except Exception as e:
        return Response({"error": str(e)}, status=500)









# ================================================================================






# ====================================================================================
# MoodML recommend using moods
# http://127.0.0.1:8000/mlapi/mood/Sad/
# This API output the songs list when input the mood of the user
# ====================================================================================
from rest_framework.response import Response
from rest_framework.decorators import api_view
import pandas as pd
import pickle
from sklearn.preprocessing import LabelEncoder
import numpy as np
from .serializers import TrackSerializer

# Load the model and dataset
rfmodel_path = os.path.join(settings.MEDIA_ROOT, 'best_random_forest_model.pkl')
with open(rfmodel_path, 'rb') as model_file:
    model = pickle.load(model_file)

track_data = pd.read_csv(os.path.join(settings.MEDIA_ROOT, 'songs_with_moods_ML_Dataset.csv'))

mood_labels = ['Calm', 'Excited', 'Happy', 'Melancholic', 'Neutral', 'Relaxed', 'Sad', 'Thoughtful', 'Upset', 'Worried']
label_encoder = LabelEncoder()
label_encoder.fit(mood_labels)

def get_tracks_by_mood(mood_input, track_data, label_encoder):
    try:
        mood_encoded = label_encoder.transform([mood_input])[0]
        
        if mood_encoded not in track_data['mood'].map(lambda x: label_encoder.transform([x])[0]).values:
            return pd.DataFrame(columns=['track_id', 'title', 'track_popularity'])
        
        filtered_tracks = track_data[track_data['mood'] == mood_input]
        
        if filtered_tracks.empty:
            return pd.DataFrame(columns=['track_id', 'title', 'track_popularity'])
        
        result = filtered_tracks[['track_id', 'title', 'track_popularity']]
        return result
    except Exception as e:
        return pd.DataFrame(columns=['track_id', 'title', 'track_popularity'])

def pridicted_id_randomizer(track_data, mood_input, label_encoder):
    filtered_tracks = get_tracks_by_mood(mood_input, track_data, label_encoder)
    
    if filtered_tracks.empty:
        return pd.DataFrame(columns=['track_id', 'title'])
    
    random_song = filtered_tracks.sample(n=10, random_state=np.random.randint(0, 1000))
    return random_song[['track_id', 'title']]

# @api_view(['GET'])
# def recommend_mood_songs(request, mood):
#     moodVariatedSongs = pridicted_id_randomizer(track_data, mood, label_encoder)
    
#     # Convert DataFrame to list of dictionaries
#     tracks_list = moodVariatedSongs[['track_id', 'title']].to_dict(orient='records')
    
#     serializer = TrackSerializer(tracks_list, many=True)
#     return Response(serializer.data)

from rest_framework.decorators import api_view
from rest_framework.response import Response
from music_api.models import Track
from music_api.serializers import TrackSerializer

@api_view(['GET'])
def recommend_mood_songs(request, mood):
    try:
        # Get recommended track IDs based on mood
        moodVariatedSongs = pridicted_id_randomizer(track_data, mood, label_encoder)
        
        # Extract Spotify IDs from the DataFrame (assuming sptfy_id is the correct field)
        track_ids = moodVariatedSongs['track_id'].astype(str).tolist()
        
        # Fetch Track instances from the database using sptfy_id
        tracks = Track.objects.filter(sptfy_id__in=track_ids)
        
        # Serialize the Track instances
        serializer = TrackSerializer(tracks, many=True)
        
        return Response(serializer.data)
    
    except Exception as e:
        return Response({'error': str(e)}, status=500)
