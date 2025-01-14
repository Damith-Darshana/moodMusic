from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AlbumfavDeleteView, AlbumfavListCreateView, ArtistfavDeleteView, ArtistfavListCreateView, PlaylistfavDeleteView, PlaylistfavListCreateView, Track10ListView,PlaylistListView,PlaylistNamesListView,AlbumDetailView, TrackBySptfyIdView, TrackfavDeleteView, TrackfavListCreateView, UsersPlaylistDetail, UsersPlaylistList
from music_api.views import PlaylistDetailView,TrackDetailView,ArtistListView, ArtistDetailView
from music_api import views
from .views import TrackSearchAPIView

from rest_framework.routers import DefaultRouter
from .views import PlaylistViewSet
# from .views import FavouriteListCreateView, FavouriteRetrieveUpdateDestroyView



urlpatterns = [
    
    path('tracks/', views.Track10ListView.as_view(), name='Top_track-list'),
    path('tracks/<int:pk>/', views.TrackDetailView.as_view(), name='track-detail'),
    path('playlists/', views.PlaylistListView.as_view(), name='playlist-list'),
    path('playlistsnames/', views.PlaylistNamesListView.as_view(), name='playlist-list'),
    path('playlists/<int:pk>/', views.PlaylistDetailView.as_view(), name='playlist-detail'),
    path('artists/', views.ArtistListView.as_view(), name='artist-list'),
    path('artists/<int:pk>/', views.ArtistDetailView.as_view(), name='artist-detail'),
    path('albums/<int:id>/', AlbumDetailView.as_view(), name='album-detail'),
    path('search/', TrackSearchAPIView.as_view(), name='track-search'),
    path('track/sptfy/<str:sptfy_id>/', TrackBySptfyIdView.as_view(), name='track-by-sptfy-id'),
    
    # path('users/playlists/list/', UsersPlaylistList.as_view(), name='playlist-list'),  # Add this line
    # path('users/playlists/', PlaylistCreate.as_view(), name='playlist-create'),
    # path('users/playlists/<int:pk>/', PlaylistUpdate.as_view(), name='playlist-update'),
    # path('users/playlists/<int:pk>/delete/', PlaylistDelete.as_view(), name='playlist-delete'),
    
    path('users/playlists/', UsersPlaylistList.as_view(), name='playlist-list'),
    path('users/playlists/<int:pk>/', UsersPlaylistDetail.as_view(), name='playlist-detail'),
    
    
    # path('favourites/', FavouriteListCreateView.as_view(), name='favourite-list-create'),
    # path('favourites/<int:id>/', FavouriteRetrieveUpdateDestroyView.as_view(), name='favourite-detail'),
    # path('favourites/delete_by_track/<str:trackid>/', FavouriteDeleteByTrackIDView.as_view(), name='favourite-delete-by-trackid'),

        # TrackFav URLs
    path('favourites/tracks/', TrackfavListCreateView.as_view(), name='track-list-create'),
    # path('favourites/tracks/<int:id>/', TrackfavDeleteView.as_view(), name='track-detail-delete'),
    path('favourites/tracks/delete/<str:favid>/', TrackfavDeleteView.as_view(), name='track-delete-by-trackid'),


    # AlbumFav URLs
    path('favourites/albums/', AlbumfavListCreateView.as_view(), name='album-list-create'),
    # path('favourites/albums/<int:id>/', AlbumfavDeleteView.as_view(), name='album-detail-delete'),
    path('favourites/albums/delete/<str:favid>/', AlbumfavDeleteView.as_view(), name='album-delete-by-albumid'),


    # ArtistFav URLs
    path('favourites/artists/', ArtistfavListCreateView.as_view(), name='artist-list-create'),
    # path('favourites/artists/<int:id>/', ArtistfavDeleteView.as_view(), name='artist-detail-delete'),
    path('favourites/artists/delete/<str:favid>/', ArtistfavDeleteView.as_view(), name='artist-delete-by-artistid'),


    # PlaylistFav URLs
    path('favourites/playlists/', PlaylistfavListCreateView.as_view(), name='playlist-list-create'),
    # path('favourites/playlists/<int:id>/', PlaylistfavDeleteView.as_view(), name='playlist-detail-delete'),
    path('favourites/playlists/delete/<str:favid>/', PlaylistfavDeleteView.as_view(), name='playlist-delete-by-playlistid'),



]
