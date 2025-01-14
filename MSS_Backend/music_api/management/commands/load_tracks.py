# music_tracks/management/commands/load_tracks.py
# 01- load track data
# 02- using track data artist names fill artist table
# 03 remove duplicates

# ====================================================================01========================
# this is to add data datbase v1
# import json
# from django.core.management.base import BaseCommand
# from music_api.models import Track, Playlist, Artist, Album
# import os

# class Command(BaseCommand):
#     help = 'Load tracks and artists data from JSON files into Django database'

#     def handle(self, *args, **kwargs):
#         # json_file1 = os.path.join(os.getcwd(), 'featured_tracks.json')  # Adjust path to your JSON file
#         # json_file2 = os.path.join(os.getcwd(), 'all_songs_data.json')  # Adjust path to your JSON file
#         json_file1 = os.path.join(os.getcwd(), 'combined_cleaned_spotify_playlist_data_sinhala.json')  # Adjust path to your JSON file
       

#         # Function to load tracks from a given JSON file
#         def load_tracks_from_json(json_file):
#             with open(json_file, 'r', encoding='utf-8') as f:
#                 tracks_data = json.load(f)

#             for track_data in tracks_data:
#                 playlist_name = track_data.get('playlist', 'System Playlist')
#                 playlist_description = track_data.get('playlist_description', 'No description')

#                 # Get or create the playlist
#                 playlist, created = Playlist.objects.get_or_create(
#                     name=playlist_name,
#                     defaults={'description': playlist_description}
#                 )

#                 # Handle both JSON structures
#                 if 'artists' in track_data:  # Case 1: artists key is present
#                     artist_names = track_data['artists'].split(', ')
#                 elif 'artist' in track_data:  # Case 2: artist key is present
#                     artist_names = [track_data['artist']]
#                 else:
#                     artist_names = ['Unknown Artist']

#                 # Get or create the album
#                 album_title = track_data['album']
#                 album, created = Album.objects.get_or_create(title=album_title)

#                 # Create or get artists and associate with the track
#                 artists = []
#                 for artist_name in artist_names:
#                     artist, created = Artist.objects.get_or_create(name=artist_name)
#                     artists.append(artist)

#                 # Check if track already exists to avoid duplication
#                 track, created = Track.objects.get_or_create(
#                     title=track_data['title'],
#                     preview_url=track_data['preview_url'],
#                     cover=track_data['album_cover'],
#                     sptfy_id=track_data['sptfy_id'],
#                     album=album,
#                 )

#                 # Associate artists with the track
#                 track.artists.set(artists)

#                 # Add track to the playlist
#                 playlist.tracks.add(track)

#         # Load tracks from both JSON files
#         load_tracks_from_json(json_file1)
#         # load_tracks_from_json(json_file2)

#         self.stdout.write(self.style.SUCCESS('Successfully loaded tracks and artists data from JSON files'))


# =========================================================================02==========================
# import os
# import json
# from django.core.management.base import BaseCommand
# from music_api.models import Artist

# class Command(BaseCommand):
#     help = 'Load tracks and artists data from JSON files into Django database'

#     def handle(self, *args, **kwargs):
#         base_path = os.path.dirname(__file__)
#         json_files = [
#             os.path.join(base_path, 'top_artists_info500.json'),
#             os.path.join(base_path, 'top_artists_info1000.json'),
#             os.path.join(base_path, 'top_artists_info1500.json'),
#             os.path.join(base_path, 'top_artists_info2000.json'),
#             os.path.join(base_path, 'top_artists_info2500.json')
#         ]

#         # Function to extract single artist name
#         def extract_single_artist_name(multi_artist_name):
#             # Split the name by commas and return the first part
#             return multi_artist_name.split(',')[0].strip()

#         # Function to load tracks from a given JSON file
#         def load_tracks_from_json(json_file):
#             with open(json_file, 'r', encoding='utf-8') as f:
#                 tracks_data = json.load(f)
            
#             for item in tracks_data:
#                 artist_name = extract_single_artist_name(item['name'])
#                 try:
#                     artist = Artist.objects.get(id=item['id'])
#                     artist.image_url = item['image_url'] if item['image_url'] != 'No Image URL' else None
#                     artist.name = artist_name
#                     artist.save()
#                     self.stdout.write(self.style.SUCCESS(f'Updated artist {artist.name} with image URL'))
#                 except Artist.DoesNotExist:
#                     self.stdout.write(self.style.WARNING(f'Artist with id {item["id"]} does not exist'))

#         # Load tracks from JSON files
#         for json_file in json_files:
#             load_tracks_from_json(json_file)

#         self.stdout.write(self.style.SUCCESS('Successfully loaded tracks and artists data from JSON files'))


# ===========================================================03==========================
# from django.core.management.base import BaseCommand
# from django.db.models import Count
# from music_api.models import Artist, Track

# class Command(BaseCommand):
#     help = 'Remove duplicate artists from the database'

#     def handle(self, *args, **kwargs):
#         # Find duplicate artists by name
#         duplicates = Artist.objects.values('name').annotate(count=Count('id')).filter(count__gt=1)

#         for duplicate in duplicates:
#             artists = Artist.objects.filter(name=duplicate['name'])
#             main_artist = artists.first()  # Keep the first artist

#             for artist in artists[1:]:  # Merge others into the main artist
#                 for track in artist.tracks.all():
#                     track.artists.remove(artist)
#                     track.artists.add(main_artist)
#                 artist.delete()  # Remove the duplicate artist

#         self.stdout.write(self.style.SUCCESS('Successfully removed duplicate artists'))



# ============================================================================================
# THIS IS THE NEW BULK DATA INSERTING CODE  COMBINE ALL ABOVE AS ONE
# ============================================================================================
# THIS IS THE NEW JSON FORMAT
# {
#         "playlist_name": "tobe edit",
#         "playlist_id": "69NULqHvnfbqswCync9YHB",
#         "playlist_description": "",
#         "track_id": "3XyFQxpSlGowWpZkIn3ISA",
#         "title": "One Two Three Four (Get On The Dance Floor)",
#         "artists": "Vishal Dadlani",
#         "artist_image_url": "https://i.scdn.co/image/ab6761610000e5eb76328e37a2c1280ab9adb90c",
#         "preview_url": "https://p.scdn.co/mp3-preview/613774cbadfbcbffa5fc306d69da98119c570c71?cid=ec78f09b7f2b46048c44300ddbdfe1ea",
#         "album": "Chennai Express",
#         "cover_url": "https://i.scdn.co/image/ab67616d0000b273dfd1ddf5b8431d6fc5210d6c",
#         "album_cover": "https://i.scdn.co/image/ab67616d0000b273dfd1ddf5b8431d6fc5210d6c"
#     },
# ============================================================================================
# import json
# import os
# from django.core.management.base import BaseCommand
# from music_api.models import Track, Playlist, Artist, Album

# class Command(BaseCommand):
#     help = 'Load and update tracks, playlists, and artists data from a JSON file into the Django database'

#     def handle(self, *args, **kwargs):
#         json_file = os.path.join(os.getcwd(), 'spotify_cleaned_data.json')  # Adjust path to your JSON file

#         # Function to load and process tracks from a given JSON file
#         def load_tracks_from_json(json_file):
#             with open(json_file, 'r', encoding='utf-8') as f:
#                 tracks_data = json.load(f)

#             for track_data in tracks_data:
#                 playlist_name = track_data.get('playlist_name', 'System Playlist')
#                 playlist_id = track_data.get('playlist_id', 'No ID')
#                 playlist_description = track_data.get('playlist_description', 'No description')

#                 # Get or create the playlist
#                 playlist, _ = Playlist.objects.get_or_create(
#                     name=playlist_name,
#                     defaults={'description': playlist_description}
#                 )

#                 # Get or create the album
#                 album_title = track_data.get('album', 'Unknown Album')
#                 album, _ = Album.objects.get_or_create(title=album_title)

#                 # Handle artist information
#                 artist_names = track_data.get('artists', 'Unknown Artist').split(', ')
#                 artist_image_url = track_data.get('artist_image_url', '')
#                 artist_description = track_data.get('artist_description', '')

#                 artists = []
#                 for artist_name in artist_names:
#                     artist, _ = Artist.objects.get_or_create(name=artist_name)
#                     if artist_image_url:
#                         artist.image_url = artist_image_url
#                         artist.save()
#                     artists.append(artist)

#                 # Create or get the track
#                 track_id = track_data.get('track_id', '')
#                 track, created = Track.objects.get_or_create(
#                     sptfy_id=track_id,
#                     defaults={
#                         'title': track_data.get('title', 'Unknown Title'),
#                         'preview_url': track_data.get('preview_url', ''),
#                         'cover': track_data.get('album_cover', ''),
#                         'album': album
#                     }
#                 )

#                 # Associate artists with the track
#                 track.artists.set(artists)

#                 # Add track to the playlist
#                 playlist.tracks.add(track)

#         # Load tracks from the JSON file
#         load_tracks_from_json(json_file)

#         self.stdout.write(self.style.SUCCESS('Successfully loaded and updated tracks, playlists, and artists data from JSON file'))


# =================================================================


# import os
# import pandas as pd
# from django.core.management.base import BaseCommand
# from music_api.models import Track, Playlist, Artist, Album

# class Command(BaseCommand):
#     help = 'Load and update tracks, playlists, and artists data from a CSV file into the Django database'

#     def handle(self, *args, **kwargs):
#         csv_file = os.path.join(os.getcwd(), 'FInalDB_InputDataset_v2.csv')  # Adjust path to your CSV file

#         # Function to load and process tracks from a given CSV file
#         def load_tracks_from_csv(csv_file):
#             df = pd.read_csv(csv_file)

#             for _, row in df.iterrows():
#                 playlist_name = row.get('playlist_name', 'System Playlist')
#                 playlist_id = row.get('playlist_id', 'No ID')
#                 playlist_description = row.get('playlist_description', 'No description')

#                 # Get or create the playlist
#                 playlist, _ = Playlist.objects.get_or_create(
#                     name=playlist_name,
#                     defaults={'description': playlist_description}
#                 )

#                 # Get or create the album
#                 album_title = row.get('album', 'Unknown Album')
#                 album, _ = Album.objects.get_or_create(title=album_title)

#                 # Handle artist information - use only the first artist
#                 artist_names = row.get('artists', 'Unknown Artist').split(', ')
#                 artist_image_url = row.get('artist_image_url', '')
#                 artist_description = row.get('artist_description', '')

#                 first_artist_name = artist_names[0].strip()  # Use only the first artist

#                 # Get or create the first artist
#                 artist, _ = Artist.objects.get_or_create(name=first_artist_name)
#                 if artist_image_url:
#                     artist.image_url = artist_image_url
#                     artist.save()

#                 # Create or get the track
#                 track_id = row.get('track_id', '')
#                 track, created = Track.objects.get_or_create(
#                     sptfy_id=track_id,
#                     defaults={
#                         'title': row.get('title', 'Unknown Title'),
#                         'preview_url': row.get('preview_url', ''),
#                         'cover': row.get('cover_url', ''),
#                         'album': album
#                     }
#                 )

#                 # Associate only the first artist with the track
#                 track.artists.set([artist])

#                 # Add track to the playlist
#                 playlist.tracks.add(track)

#         # Load tracks from the CSV file
#         load_tracks_from_csv(csv_file)

#         self.stdout.write(self.style.SUCCESS('Successfully loaded and updated tracks, playlists, and artists data from CSV file'))




# ============================================================

# import os
# import pandas as pd
# from django.core.management.base import BaseCommand
# from music_api.models import Track, Playlist, Artist, Album
# from datetime import datetime

# class Command(BaseCommand):
#     help = 'Load and update tracks, playlists, albums, and artists data from a CSV file into the Django database'

#     def handle(self, *args, **kwargs):
#         csv_file = os.path.join(os.getcwd(), 'FInalDB_InputDataset_v3.csv')  # Adjust path to your CSV file

#         # Function to load and process tracks from a given CSV file
#         def load_tracks_from_csv(csv_file):
#             df = pd.read_csv(csv_file)

#             for _, row in df.iterrows():
#                 playlist_name = row.get('playlist_name', 'System Playlist')
#                 playlist_id = row.get('playlist_id', 'No ID')
#                 playlist_description = row.get('playlist_description', 'No description')

#                 # Get or create the playlist
#                 playlist, _ = Playlist.objects.get_or_create(
#                     name=playlist_name,
#                     defaults={'description': playlist_description}
#                 )

#                 # Get or create the album and update album fields if already exists
#                 album_title = row.get('album', 'Unknown Album')
#                 album_image_url = row.get('album_image', '')

#                 # Handle release date
#                 album_release_date = row.get('release_date', None)
#                 if pd.notna(album_release_date):  # If release_date is not NaN
#                     try:
#                         if len(album_release_date) == 4:  # If it's just a year (e.g., '2016')
#                             album_release_date = f'{album_release_date}-01-01'  # Set to January 1st of that year
#                         # Try converting it to a proper date format
#                         album_release_date = datetime.strptime(album_release_date, '%Y-%m-%d').date()
#                     except ValueError:
#                         album_release_date = None  # Set to None if conversion fails

#                 # Handle total_tracks with NaN check
#                 album_total_tracks = row.get('total_tracks', None)
#                 if pd.isna(album_total_tracks):
#                     album_total_tracks = None  # Set to None if NaN

#                 # Create or update the album
#                 album, created = Album.objects.get_or_create(
#                     title=album_title
#                 )
#                 album.image_url = album_image_url or album.image_url
#                 album.release_date = album_release_date or album.release_date
#                 album.total_tracks = album_total_tracks or album.total_tracks
#                 album.save()

#                 # Handle artist information - use only the first artist
#                 artist_names = row.get('artists', 'Unknown Artist').split(', ')
#                 artist_image_url = row.get('artist_image_url', '')

#                 first_artist_name = artist_names[0].strip()  # Use only the first artist

#                 # Get or create the first artist and update artist fields if already exists
#                 artist, created = Artist.objects.get_or_create(name=first_artist_name)
#                 if artist_image_url:
#                     artist.image_url = artist_image_url or artist.image_url
#                     artist.save()

#                 # Create or get the track
#                 track_id = row.get('track_id', '')
#                 track, created = Track.objects.get_or_create(
#                     sptfy_id=track_id,
#                     defaults={
#                         'title': row.get('title', 'Unknown Title'),
#                         'preview_url': row.get('preview_url', ''),
#                         'cover': row.get('cover_url', ''),
#                         'album': album
#                     }
#                 )

#                 # Associate only the first artist with the track
#                 track.artist.set([artist])

#                 # Add track to the playlist
#                 playlist.tracks.add(track)

#         # Load tracks from the CSV file
#         load_tracks_from_csv(csv_file)

#         self.stdout.write(self.style.SUCCESS('Successfully loaded and updated tracks, playlists, albums, and artists data from CSV file'))


# =====================================================================


import os
import pandas as pd
from django.core.management.base import BaseCommand
from music_api.models import Track, Playlist, Artist, Album
from datetime import datetime

class Command(BaseCommand):
    help = 'Load and update tracks, playlists, albums, and artists data from a CSV file into the Django database'

    def handle(self, *args, **kwargs):
        csv_file = os.path.join(os.getcwd(), 'FinalDB_InputDataset_v4.csv')  # Adjust path to your CSV file

        # Function to load and process tracks from a given CSV file
        def load_tracks_from_csv(csv_file):
            df = pd.read_csv(csv_file)

            for _, row in df.iterrows():
                playlist_name = row.get('playlist_name', 'System Playlist')
                playlist_id = row.get('playlist_id', 'No ID')
                playlist_description = row.get('playlist_description', 'No description')
                playlist_cover_image_url = row.get('playlist_cover_image_url', None)  # New column for cover image URL

                # Get or create the playlist and update the cover image if provided
                playlist, created = Playlist.objects.get_or_create(
                    name=playlist_name,
                    defaults={'description': playlist_description}
                )
                if playlist_cover_image_url:
                    playlist.playlist_image_url = playlist_cover_image_url  # Update playlist cover image URL
                    playlist.save()

                # Get or create the album and update album fields if already exists
                album_title = row.get('album', 'Unknown Album')
                album_image_url = row.get('album_image', '')

                # Handle release date
                album_release_date = row.get('release_date', None)
                if pd.notna(album_release_date):  # If release_date is not NaN
                    try:
                        if len(album_release_date) == 4:  # If it's just a year (e.g., '2016')
                            album_release_date = f'{album_release_date}-01-01'  # Set to January 1st of that year
                        # Try converting it to a proper date format
                        album_release_date = datetime.strptime(album_release_date, '%Y-%m-%d').date()
                    except ValueError:
                        album_release_date = None  # Set to None if conversion fails

                # Handle total_tracks with NaN check
                album_total_tracks = row.get('total_tracks', None)
                if pd.isna(album_total_tracks):
                    album_total_tracks = None  # Set to None if NaN

                # Create or update the album
                album, created = Album.objects.get_or_create(
                    title=album_title
                )
                album.image_url = album_image_url or album.image_url
                album.release_date = album_release_date or album.release_date
                album.total_tracks = album_total_tracks or album.total_tracks
                album.save()

                # Handle artist information - use only the first artist
                artist_names = row.get('artists', 'Unknown Artist').split(', ')
                artist_image_url = row.get('artist_image_url', '')

                first_artist_name = artist_names[0].strip()  # Use only the first artist

                # Get or create the first artist and update artist fields if already exists
                artist, created = Artist.objects.get_or_create(name=first_artist_name)
                if artist_image_url:
                    artist.image_url = artist_image_url or artist.image_url
                    artist.save()

                # Create or get the track
                track_id = row.get('track_id', '')
                track, created = Track.objects.get_or_create(
                    sptfy_id=track_id,
                    defaults={
                        'title': row.get('title', 'Unknown Title'),
                        'preview_url': row.get('preview_url', ''),
                        'cover': row.get('cover_url', ''),
                        'album': album
                    }
                )

                # Associate only the first artist with the track
                track.artist.set([artist])

                # Add track to the playlist
                playlist.tracks.add(track)

        # Load tracks from the CSV file
        load_tracks_from_csv(csv_file)

        self.stdout.write(self.style.SUCCESS('Successfully loaded and updated tracks, playlists, albums, and artists data from CSV file'))


