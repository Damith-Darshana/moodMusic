from django.db import models

# class Album(models.Model):
#     title = models.CharField(max_length=255)

#     def __str__(self):
#         return self.title



from django.db import models

class Artist(models.Model):
    name = models.CharField(max_length=255)
    image_url = models.URLField(blank=True, null=True)  # Add this line

    def __str__(self):
        return self.name


from django.db import models

class Album(models.Model):
    title = models.CharField(max_length=255)  # Album name
    image_url = models.URLField(max_length=1024,blank=True, null=True)  # Album image URL
    release_date = models.DateField(blank=True, null=True)  # Album release date
    total_tracks = models.IntegerField(blank=True, null=True)  # Total number of tracks in the album

    def __str__(self):
        return self.title
    

class Track(models.Model):
    title = models.CharField(max_length=255)
    sptfy_id = models.CharField(max_length=50,blank=True, null=True)
    preview_url = models.URLField()
    album = models.ForeignKey(Album, on_delete=models.CASCADE, related_name='tracks')
    cover = models.URLField()
    artist = models.ManyToManyField(Artist, related_name='tracks')

    def __str__(self):
        return self.title
    

class Playlist(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    tracks = models.ManyToManyField(Track, related_name='playlists', blank=True)  # Many-to-many with Track
    playlist_image_url = models.URLField(max_length=1024,blank=True, null=True)  # Album image URL

    def __str__(self):
        return self.name


from django.db import models
from django.contrib.auth.models import User

# class Trackfav(models.Model):
#     trackid = models.CharField(max_length=255,null=True, blank=True)

#     def __str__(self):
#         return self.trackid

# class Albumfav(models.Model):
#     albumid = models.CharField(max_length=255,null=True, blank=True)

#     def __str__(self):
#         return self.albumid

# class Artistfav(models.Model):
#     artistid = models.CharField(max_length=255,null=True, blank=True)

#     def __str__(self):
#         return self.artistid

# class Playlistfav(models.Model):
#     playlistid = models.CharField(max_length=255, null=True, blank=True)

#     def __str__(self):
#         return self.playlistid

# from django.contrib.auth.models import User

# class Favourite(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)  # Set a default user ID
#     track = models.ForeignKey(Trackfav, on_delete=models.SET_NULL, null=True, blank=True)
#     album = models.ForeignKey(Albumfav, on_delete=models.SET_NULL, null=True, blank=True)
#     artist = models.ForeignKey(Artistfav, on_delete=models.SET_NULL, null=True, blank=True)
#     playlist = models.ForeignKey(Playlistfav, on_delete=models.SET_NULL, null=True, blank=True)
#     added_at = models.DateTimeField(auto_now_add=True)
    

#     def __str__(self):
#         return f"{self.user} - {self.track} - {self.album} - {self.artist}"


class Trackfav(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)  # Optional: associate with User
    favid = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return self.favid



class Albumfav(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)  # Optional: associate with User
    favid = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return self.favid



class Artistfav(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)  # Optional: associate with User
    favid = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return self.favid


class Playlistfav(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)  # Optional: associate with User
    favid = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return self.favid



# models.py
from django.db import models
from django.contrib.auth.models import User

class UsersPlaylist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField()
    playlist_image_url = models.URLField()
    tracks = models.JSONField()  # Assuming you want to store tracks as a list
    type = models.CharField(max_length=20, default='playlist')

    def __str__(self):
        return self.name

