from rest_framework import serializers,viewsets
from .models import Playlist, Track,Artist,Album
from django_filters import rest_framework as filters


class PlaylistNamesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Playlist
        fields = ['id','name', 'description','playlist_image_url']

# class TrackSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Track
#         fields = ['id', 'title', 'preview_url', 'cover', 'album', 'artists', 'playlists']
#         # fields = ['id', 'title', 'preview_url', 'cover', 'album', 'artists']
#         depth = 1  # Use depth for nested serialization if needed

# class TrackSerializer(serializers.ModelSerializer):
#     playlists = PlaylistNamesSerializer(many=True, read_only=True)

#     class Meta:
#         model = Track
#         fields = ['id', 'title', 'preview_url', 'cover', 'album', 'artists', 'playlists']
#         depth = 1

class TrackSerializer(serializers.ModelSerializer):
    playlists = PlaylistNamesSerializer(many=True, read_only=True)
    type = serializers.SerializerMethodField() 

    class Meta:
        model = Track
        fields = ['id', 'title', 'preview_url', 'cover', 'album', 'artist', 'playlists','sptfy_id', 'type']
        depth = 1

    def get_type(self, obj):
        return 'track'


# class PlaylistSerializer(serializers.ModelSerializer):
#     tracks = TrackSerializer(many=True, read_only=True)

#     class Meta:
#         model = Playlist
#         fields = ['id','name', 'description', 'tracks']


class PlaylistSerializer(serializers.ModelSerializer):
    tracks = TrackSerializer(many=True, read_only=True)
    type = serializers.SerializerMethodField()

    class Meta:
        model = Playlist
        fields = ['id', 'name', 'description','playlist_image_url', 'tracks', 'type']

    def get_type(self, obj):
        return 'playlist'


# class ArtistSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Track
#         fields = ['artist']

# class ArtistSerializer(serializers.ModelSerializer):
#     # tracks = TrackSerializer(many=True, read_only=True)

#     class Meta:
#         model = Artist
#         fields = ['id', 'name','image_url']
#         # fields = ['id', 'name', 'tracks']


# class ArtistDetailSerializer(serializers.ModelSerializer):
#     tracks = TrackSerializer(many=True, read_only=True)

#     class Meta:
#         model = Artist
#         # fields = ['id', 'name','image_url']
#         fields = ['id', 'name','image_url','tracks']

class AlbumSerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField()  # Add this line
    class Meta:
        model = Album
        fields = ['id', 'title', 'tracks','image_url','release_date','total_tracks', 'type']  # Ensure correct field names are used
    def get_type(self, obj):
        return 'album' 
        
class ArtistSerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField()  # Add this line

    class Meta:
        model = Artist
        fields = ['id', 'name', 'image_url', 'type']  # Include the 'type' field

    def get_type(self, obj):
        return 'artist'



class ArtistDetailSerializer(serializers.ModelSerializer):
    tracks = TrackSerializer(many=True, read_only=True)
    type = serializers.SerializerMethodField()  # Add this line

    class Meta:
        model = Artist
        fields = ['id', 'name', 'image_url','type', 'tracks']  # Include the 'type' field

    def get_type(self, obj):
        return 'artist'
       





from django_filters import rest_framework as filters

class TrackFilter(filters.FilterSet):
    title = filters.CharFilter(lookup_expr='icontains')
    album = filters.CharFilter(field_name='album__title', lookup_expr='icontains')
    artist = filters.CharFilter(field_name='artist__name', lookup_expr='icontains')  # Adjusted to use 'artist'
    playlists__name = filters.CharFilter(field_name='playlists__name', method='filter_playlists')

    class Meta:
        model = Track
        fields = ['title', 'album', 'artist', 'playlists__name']

    def filter_artists(self, queryset, name, value):
        return queryset.filter(artist__name__icontains=value)  # Adjusted to use 'artist'


# class TrackFilter(filters.FilterSet):
#     title = filters.CharFilter(lookup_expr='icontains')
#     album = filters.CharFilter(field_name='album__title', lookup_expr='icontains')
#     artists = filters.CharFilter(method='filter_artists')
#     playlists__name = filters.CharFilter(field_name='playlists__name', method='filter_playlists')

#     class Meta:
#         model = Track
#         fields = ['title', 'album', 'artists', 'playlists__name']

#     def filter_artists(self, queryset, name, value):
#         return queryset.filter(artists__name__icontains=value)



# class TrackFilter(filters.FilterSet):
#     title = filters.CharFilter(lookup_expr='icontains')
#     album__title = filters.CharFilter(field_name='album__title', lookup_expr='icontains')
#     artists = filters.CharFilter(field_name='artists__name', method='filter_artists')
#     playlists__name = filters.CharFilter(field_name='playlists__name', method='filter_playlists')

#     class Meta:
#         model = Track
#         fields = ['title', 'album__title', 'artists', 'playlists__name']

#     def filter_artists(self, queryset, name, value):
#         return queryset.filter(artists__name__icontains=value)

#     def filter_playlists(self, queryset, name, value):
#         return queryset.filter(playlists__name__icontains=value)



from rest_framework import serializers
from .models import Trackfav, Albumfav, Artistfav, Playlistfav

class TrackfavSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trackfav
        fields = ['id', 'trackid']

class AlbumfavSerializer(serializers.ModelSerializer):
    class Meta:
        model = Albumfav
        fields = ['id', 'albumid']

class ArtistfavSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artistfav
        fields = ['id', 'artistid']

class PlaylistfavSerializer(serializers.ModelSerializer):
    class Meta:
        model = Playlistfav
        fields = ['id', 'playlistid']

# class FavouriteSerializer(serializers.ModelSerializer):
#     track = TrackfavSerializer()
#     album = AlbumfavSerializer()
#     artist = ArtistfavSerializer()
#     playlist = PlaylistfavSerializer(allow_null=True)

#     class Meta:
#         model = Favourite
#         fields = ['id', 'user', 'track', 'album', 'artist', 'playlist', 'added_at']

#     def create(self, validated_data):
#         track_data = validated_data.pop('track')
#         album_data = validated_data.pop('album')
#         artist_data = validated_data.pop('artist')
#         playlist_data = validated_data.pop('playlist', None)

#         track, _ = Trackfav.objects.get_or_create(**track_data)
#         album, _ = Albumfav.objects.get_or_create(**album_data)
#         artist, _ = Artistfav.objects.get_or_create(**artist_data)

#         playlist = None
#         if playlist_data:
#             playlist, _ = Playlistfav.objects.get_or_create(**playlist_data)
        
#          # Check for existing Favourite
#         existing_favourite = Favourite.objects.filter(
#             user=self.context['request'].user,
#             track=track,
#             album=album,
#             artist=artist,
#             playlist=playlist
#         ).first()

#         if existing_favourite:
#             return existing_favourite  # Return existing favourite instead of creating a new one


#         favourite = Favourite.objects.create(
#             user=self.context['request'].user,
#             track=track,
#             album=album,
#             artist=artist,
#             playlist=playlist
#         )
#         return favourite

#     def update(self, instance, validated_data):
#         track_data = validated_data.pop('track', None)
#         album_data = validated_data.pop('album', None)
#         artist_data = validated_data.pop('artist', None)
#         playlist_data = validated_data.pop('playlist', None)

#         if track_data:
#             for attr, value in track_data.items():
#                 setattr(instance.track, attr, value)
#             instance.track.save()

#         if album_data:
#             for attr, value in album_data.items():
#                 setattr(instance.album, attr, value)
#             instance.album.save()

#         if artist_data:
#             for attr, value in artist_data.items():
#                 setattr(instance.artist, attr, value)
#             instance.artist.save()

#         if playlist_data:
#             for attr, value in playlist_data.items():
#                 setattr(instance.playlist, attr, value)
#             instance.playlist.save()

#         instance.save()
#         return instance




from rest_framework import serializers
from .models import Trackfav

# class TrackfavSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Trackfav
#         fields = ['id', 'user', 'favid']

#     def create(self, validated_data):
#         return Trackfav.objects.create(**validated_data)

#     def update(self, instance, validated_data):
#         instance.favid = validated_data.get('favid', instance.favid)
#         instance.save()
#         return instance


class TrackfavSerializer(serializers.ModelSerializer):
    sptfy_ids = serializers.SerializerMethodField()

    class Meta:
        model = Trackfav
        fields = ['id', 'user', 'favid', 'sptfy_ids']

    # # This method gets the sptfy_id(s) of the track(s) related to favid
    # def get_sptfy_ids(self, obj):
    #     # Assuming that favid can map to one or more Track instances
    #     tracks = Track.objects.filter(id=obj.favid)  # Adjust filtering criteria if needed
    #     sptfy_ids = tracks.values_list('sptfy_id', flat=True)  # Get sptfy_id array
    #     return list(sptfy_ids)
    
    def get_sptfy_ids(self, obj):
        # Ensure that obj is an instance of Trackfav
        if isinstance(obj, Trackfav):
            # Assuming favid is a Spotify ID, filter by favid instead
            tracks = Track.objects.filter(sptfy_id=obj.favid)  # Use sptfy_id if it's a Spotify ID
            sptfy_ids = tracks.values_list('sptfy_id', flat=True)  # Get sptfy_id array
            return list(sptfy_ids)
        else:
            return []  # Return an empty list or appropriate fallback

    

    def create(self, validated_data):
        favid = validated_data.get('favid')
        validated_data['favid'] = str(favid)
        return Trackfav.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.favid = validated_data.get('favid', instance.favid)
        instance.save()
        return instance




from rest_framework import serializers
from .models import Albumfav

class AlbumfavSerializer(serializers.ModelSerializer):
    class Meta:
        model = Albumfav
        fields = ['id', 'user', 'favid']

    def create(self, validated_data):
        return Albumfav.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.favid = validated_data.get('favid', instance.favid)
        instance.save()
        return instance



from rest_framework import serializers
from .models import Artistfav

class ArtistfavSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artistfav
        fields = ['id', 'user', 'favid']

    def create(self, validated_data):
        return Artistfav.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.favid = validated_data.get('favid', instance.favid)
        instance.save()
        return instance



from rest_framework import serializers
from .models import Playlistfav

class PlaylistfavSerializer(serializers.ModelSerializer):
    class Meta:
        model = Playlistfav
        fields = ['id', 'user', 'favid']

    def create(self, validated_data):
        return Playlistfav.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.favid = validated_data.get('favid', instance.favid)
        instance.save()
        return instance






# serializers.py
from rest_framework import serializers
from .models import UsersPlaylist

class usersPlaylistSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsersPlaylist
        fields = ['id', 'user', 'name', 'description', 'playlist_image_url', 'tracks', 'type']
        read_only_fields = ['user']  # User is set automatically
