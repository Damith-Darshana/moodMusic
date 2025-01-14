from rest_framework import viewsets
from .models import Albumfav, Artistfav, Playlistfav, Track,Playlist,Artist
from .serializers import AlbumfavSerializer, ArtistfavSerializer, PlaylistfavSerializer, TrackFilter, TrackSerializer,PlaylistSerializer,PlaylistNamesSerializer,ArtistSerializer,AlbumSerializer,ArtistDetailSerializer
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from django.http import Http404, JsonResponse
from music_api.models import Album, Track
from rest_framework.filters import SearchFilter
from django_filters import rest_framework as filters
from .serializers import TrackSerializer


# views.py
from rest_framework import viewsets
from music_api.models import Playlist
from .serializers import PlaylistSerializer

class PlaylistViewSet(viewsets.ModelViewSet):
    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer


# class Track10ListView(generics.ListAPIView):
#     queryset = Track.objects.all()[:10]
#     serializer_class = TrackSerializer

class Track10ListView(generics.ListAPIView):
    serializer_class = TrackSerializer

    def get_queryset(self):
        # Return 10 random tracks
        return Track.objects.order_by('?')[:50]

    
class PlaylistListView(generics.ListAPIView):
    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer

class PlaylistNamesListView(generics.ListAPIView):
    queryset = Playlist.objects.all()
    serializer_class = PlaylistNamesSerializer


class PlaylistDetailView(generics.RetrieveAPIView):
    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer

    def get(self, request, *args, **kwargs):
        try:
            playlist = self.get_object()
            serializer = self.get_serializer(playlist)
            return Response(serializer.data)
        except Playlist.DoesNotExist:
            return Response({'error': 'Playlist not found'}, status=status.HTTP_404_NOT_FOUND)


class TrackDetailView(generics.RetrieveAPIView):
    queryset = Track.objects.all()
    serializer_class = TrackSerializer

    def get(self, request, *args, **kwargs):
        try:
            track = self.get_object()
            serializer = self.get_serializer(track)
            return Response(serializer.data)
        except Track.DoesNotExist:
            return Response({'error': 'Track not found'}, status=status.HTTP_404_NOT_FOUND)
        


from rest_framework import generics, status
from rest_framework.response import Response
from .models import Track
from .serializers import TrackSerializer

class TrackBySptfyIdView(generics.RetrieveAPIView):
    serializer_class = TrackSerializer

    def get_object(self):
        # Extract sptfy_id from the URL parameters
        sptfy_id = self.kwargs.get('sptfy_id')
        try:
            # Fetch the track based on sptfy_id
            return Track.objects.get(sptfy_id=sptfy_id)
        except Track.DoesNotExist:
            raise Http404('Track not found')

    def get(self, request, *args, **kwargs):
        try:
            track = self.get_object()
            serializer = self.get_serializer(track)
            return Response(serializer.data)
        except Track.DoesNotExist:
            return Response({'error': 'Track not found'}, status=status.HTTP_404_NOT_FOUND)


class ArtistListView(generics.ListAPIView):
    # queryset = Artist.objects.all()[:10]
    serializer_class = ArtistSerializer
    
    def get_queryset(self):
        # Return 10 random artists
        return Artist.objects.order_by('?')[:10]

class ArtistDetailView(generics.RetrieveAPIView):
    queryset = Artist.objects.all()
    serializer_class = ArtistDetailSerializer




# class AlbumListView(generics.ListAPIView):
#     queryset = Album.objects.all()  # Check if any filtering is using 'name'
#     serializer_class = AlbumSerializer

# View to retrieve album by ID
class AlbumDetailView(generics.RetrieveAPIView):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer
    lookup_field = 'id'  # Make sure this matches the URL parameter




from django_filters import rest_framework as filters
from rest_framework import generics
from .models import Track
from .serializers import TrackSerializer

class TrackSearchAPIView(generics.ListAPIView):
    queryset = Track.objects.all()
    serializer_class = TrackSerializer
    filter_backends = (filters.DjangoFilterBackend, SearchFilter)  # Ensure DjangoFilterBackend is included
    filterset_class = TrackFilter  # Use the TrackFilter defined above
    search_fields = ['title', 'artist__name']  # Updated to use 'artist__name'


# class TrackSearchAPIView(generics.ListAPIView):
#     queryset = Track.objects.all()
#     serializer_class = TrackSerializer
#     filter_backends = [SearchFilter]
#     search_fields = ['title', 'artists__name']  # Add fields you want to search


# class TrackSearchAPIView(generics.ListAPIView):
#     queryset = Track.objects.all()
#     serializer_class = TrackSerializer
#     filterset_class = TrackFilter

# class TrackSearchAPIView(generics.ListAPIView):
#     serializer_class = TrackSerializer

#     def get_queryset(self):
#         search_query = self.request.query_params.get('search', '')
#         queryset = Track.objects.filter(title__icontains=search_query)
#         return queryset




# from rest_framework import generics
# from rest_framework.permissions import AllowAny, IsAuthenticated
# from .models import Favourite
# from .serializers import FavouriteSerializer

# class FavouriteListCreateView(generics.ListCreateAPIView):
#     queryset = Favourite.objects.all()
#     serializer_class = FavouriteSerializer

#     def get_permissions(self):
#         if self.request.method == 'POST':
#             return [IsAuthenticated()]  # Only authenticated users can create
#         return [AllowAny()]  # Allow all users to list
    
#     def get_queryset(self):
#         user = self.request.user
#         return Favourite.objects.filter(user=user)  # Filter favourites by the authenticated user

#     def perform_create(self, serializer):
#         serializer.save(user=self.request.user)  # Automatically set the user


# from rest_framework import generics
# from rest_framework.permissions import IsAuthenticatedOrReadOnly
# from .models import Favourite
# from .serializers import FavouriteSerializer

# class FavouriteRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Favourite.objects.all()
#     serializer_class = FavouriteSerializer
#     lookup_field = 'id'  # Specifies that the ID will be used to look up the Favourite instance.

#     def get_permissions(self):
#         # Allow authenticated users to update and delete, but allow all users to retrieve
#         if self.request.method in ['PUT', 'PATCH', 'DELETE']:
#             return [IsAuthenticatedOrReadOnly()]
#         return [AllowAny()]
    
#     def get_queryset(self):
#             user = self.request.user
#             return Favourite.objects.filter(user=user)  # Filter favourites by the authenticated user
    
#     def perform_destroy(self, instance):
#         instance.delete()  # This will delete the instance




# from rest_framework import generics
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from rest_framework import status
# from .models import Favourite

# class FavouriteDeleteByTrackIDView(generics.DestroyAPIView):
#     permission_classes = [IsAuthenticated]  # Ensure the user is authenticated

#     def delete(self, request, trackid):
#         # Filter the favourites by the authenticated user and the given trackid
#         favourites = Favourite.objects.filter(user=request.user, track__trackid=trackid)

#         if favourites.exists():
#             favourites.delete()  # Delete the favourites
#             return Response({"detail": "Favourites deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
#         else:
#             return Response({"detail": "No favourites found for the given track ID."}, status=status.HTTP_404_NOT_FOUND)





from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Trackfav
from .serializers import TrackfavSerializer

class TrackfavListCreateView(generics.ListCreateAPIView):
    queryset = Trackfav.objects.all()
    serializer_class = TrackfavSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAuthenticated()]  # Only authenticated users can create
        return [AllowAny()]  # Allow all users to list

    def get_queryset(self):
        user = self.request.user
        return Trackfav.objects.filter(user=user)  # Filter tracks by the authenticated user

    def perform_create(self, serializer):
        user = self.request.user
        favid = serializer.validated_data['favid']  # Get trackid from the validated data

        # Check if a track with the same trackid already exists for this user
        if Trackfav.objects.filter(user=user, favid=favid).exists():
            return Response({"detail": "This track has already been added to your favorites."}, 
                            status=status.HTTP_400_BAD_REQUEST)

        # Save the new track if it doesn't exist
        serializer.save(user=user)



# from rest_framework import generics
# from rest_framework.permissions import AllowAny, IsAuthenticated
# from .models import Trackfav
# from .serializers import TrackfavSerializer

# class TrackfavListCreateView(generics.ListCreateAPIView):
#     queryset = Trackfav.objects.all()
#     serializer_class = TrackfavSerializer

#     def get_permissions(self):
#         if self.request.method == 'POST':
#             return [IsAuthenticated()]  # Only authenticated users can create
#         return [AllowAny()]  # Allow all users to list

#     def get_queryset(self):
#         user = self.request.user
#         return Trackfav.objects.filter(user=user)  # Filter tracks by the authenticated user

#     def perform_create(self, serializer):
#         serializer.save(user=self.request.user)  # Automatically set the user


# class TrackfavDeleteView(generics.DestroyAPIView):
#     queryset = Trackfav.objects.all()
#     serializer_class = TrackfavSerializer
#     lookup_field = 'id'  # Specify the ID to look up the Trackfav instance

#     def get_permissions(self):
#         return [IsAuthenticated()]  # Ensure the user is authenticated

#     def get_queryset(self):
#         user = self.request.user
#         return Trackfav.objects.filter(user=user)  # Filter tracks by the authenticated user


from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Trackfav
from .serializers import TrackfavSerializer

class TrackfavDeleteView(generics.DestroyAPIView):
    serializer_class = TrackfavSerializer
    permission_classes = [IsAuthenticated]  # Ensure the user is authenticated

    def get_queryset(self):
        user = self.request.user
        return Trackfav.objects.filter(user=user)  # Filter tracks by the authenticated user

    def delete(self, request, favid):
        # Look up the Trackfav instance by trackid
        try:
            track = self.get_queryset().get(favid=favid)
        except Trackfav.DoesNotExist:
            return Response({"detail": "Track not found."}, status=status.HTTP_404_NOT_FOUND)

        track.delete()  # Delete the track instance
        return Response({"detail": "Track deleted successfully."}, status=status.HTTP_204_NO_CONTENT)



class AlbumfavListCreateView(generics.ListCreateAPIView):
    queryset = Albumfav.objects.all()
    serializer_class = AlbumfavSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAuthenticated()]
        return [AllowAny()]

    def get_queryset(self):
        user = self.request.user
        return Albumfav.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# class AlbumfavDeleteView(generics.DestroyAPIView):
#     queryset = Albumfav.objects.all()
#     serializer_class = AlbumfavSerializer
#     lookup_field = 'id'

#     def get_permissions(self):
#         return [IsAuthenticated()]

#     def get_queryset(self):
#         user = self.request.user
#         return Albumfav.objects.filter(user=user)


from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Albumfav
from .serializers import AlbumfavSerializer

class AlbumfavDeleteView(generics.DestroyAPIView):
    serializer_class = AlbumfavSerializer
    permission_classes = [IsAuthenticated]  # Ensure the user is authenticated

    def get_queryset(self):
        user = self.request.user
        return Albumfav.objects.filter(user=user)  # Filter albums by the authenticated user

    def delete(self, request, favid):
        # Look up the Albumfav instance by albumid
        try:
            album = self.get_queryset().get(favid=favid)
        except Albumfav.DoesNotExist:
            return Response({"detail": "Album not found."}, status=status.HTTP_404_NOT_FOUND)

        album.delete()  # Delete the album instance
        return Response({"detail": "Album deleted successfully."}, status=status.HTTP_204_NO_CONTENT)





class ArtistfavListCreateView(generics.ListCreateAPIView):
    queryset = Artistfav.objects.all()
    serializer_class = ArtistfavSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAuthenticated()]
        return [AllowAny()]

    def get_queryset(self):
        user = self.request.user
        return Artistfav.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# class ArtistfavDeleteView(generics.DestroyAPIView):
#     queryset = Artistfav.objects.all()
#     serializer_class = ArtistfavSerializer
#     lookup_field = 'id'

#     def get_permissions(self):
#         return [IsAuthenticated()]

#     def get_queryset(self):
#         user = self.request.user
#         return Artistfav.objects.filter(user=user)


from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Artistfav
from .serializers import ArtistfavSerializer

class ArtistfavDeleteView(generics.DestroyAPIView):
    serializer_class = ArtistfavSerializer
    permission_classes = [IsAuthenticated]  # Ensure the user is authenticated

    def get_queryset(self):
        user = self.request.user
        return Artistfav.objects.filter(user=user)  # Filter artists by the authenticated user

    def delete(self, request, favid):
        # Look up the Artistfav instance by artistid
        try:
            artist = self.get_queryset().get(favid=favid)
        except Artistfav.DoesNotExist:
            return Response({"detail": "Artist not found."}, status=status.HTTP_404_NOT_FOUND)

        artist.delete()  # Delete the artist instance
        return Response({"detail": "Artist deleted successfully."}, status=status.HTTP_204_NO_CONTENT)




class PlaylistfavListCreateView(generics.ListCreateAPIView):
    queryset = Playlistfav.objects.all()
    serializer_class = PlaylistfavSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAuthenticated()]
        return [AllowAny()]

    def get_queryset(self):
        user = self.request.user
        return Playlistfav.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# class PlaylistfavDeleteView(generics.DestroyAPIView):
#     queryset = Playlistfav.objects.all()
#     serializer_class = PlaylistfavSerializer
#     lookup_field = 'id'

#     def get_permissions(self):
#         return [IsAuthenticated()]

#     def get_queryset(self):
#         user = self.request.user
#         return Playlistfav.objects.filter(user=user)



from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Playlistfav
from .serializers import PlaylistfavSerializer

class PlaylistfavDeleteView(generics.DestroyAPIView):
    serializer_class = PlaylistfavSerializer
    permission_classes = [IsAuthenticated]  # Ensure the user is authenticated

    def get_queryset(self):
        user = self.request.user
        return Playlistfav.objects.filter(user=user)  # Filter playlists by the authenticated user

    def delete(self, request, favid):
        # Look up the Playlistfav instance by playlistid
        try:
            playlist = self.get_queryset().get(favid=favid)
        except Playlistfav.DoesNotExist:
            return Response({"detail": "Playlist not found."}, status=status.HTTP_404_NOT_FOUND)

        playlist.delete()  # Delete the playlist instance
        return Response({"detail": "Playlist deleted successfully."}, status=status.HTTP_204_NO_CONTENT)








# views.py
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import UsersPlaylist
from .serializers import usersPlaylistSerializer

class UsersPlaylistList(generics.ListCreateAPIView):
    serializer_class = usersPlaylistSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # Automatically set the user to the currently authenticated user
        serializer.save(user=self.request.user)

    def get_queryset(self):
        # Return playlists for the authenticated user only
        return UsersPlaylist.objects.filter(user=self.request.user)

class UsersPlaylistDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = UsersPlaylist.objects.all()
    serializer_class = usersPlaylistSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Return the playlist for the authenticated user only
        return UsersPlaylist.objects.filter(user=self.request.user)

