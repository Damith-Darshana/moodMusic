from django.urls import path
# from .views import recommend_song
from .views import recommend_song,recommend_mood_songs

urlpatterns = [
    path('', recommend_song, name='recommend_song'),
    # path('<str:song_id>/', recommend_songs, name='recommend_songs'),
    path('mood/<str:mood>/', recommend_mood_songs, name='recommend_mood_songs'),

]
