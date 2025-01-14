from django.contrib import admin

# Register your models here.

from music_api.models import Artist, Album, Track,Playlist,UsersPlaylist,Playlistfav ,Artistfav ,Albumfav ,Trackfav

# Register models with default admin options
admin.site.register(Artist)
admin.site.register(Album)
admin.site.register(Track)

admin.site.register(Playlist)
admin.site.register(UsersPlaylist)
admin.site.register(Playlistfav)

admin.site.register(Artistfav)
admin.site.register(Albumfav)
admin.site.register(Trackfav)