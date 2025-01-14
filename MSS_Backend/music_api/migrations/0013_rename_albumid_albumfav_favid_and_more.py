# Generated by Django 5.1.1 on 2024-09-23 15:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('music_api', '0012_albumfav_user_artistfav_user_playlistfav_user_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='albumfav',
            old_name='albumid',
            new_name='favid',
        ),
        migrations.RenameField(
            model_name='artistfav',
            old_name='artistid',
            new_name='favid',
        ),
        migrations.RenameField(
            model_name='playlistfav',
            old_name='playlistid',
            new_name='favid',
        ),
        migrations.RenameField(
            model_name='trackfav',
            old_name='trackid',
            new_name='favid',
        ),
    ]
