# Generated by Django 5.0.6 on 2024-09-13 12:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('music_api', '0002_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='track',
            name='sptfy_id',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
