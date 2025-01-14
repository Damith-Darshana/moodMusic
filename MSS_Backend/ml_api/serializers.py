from rest_framework import serializers

class TrackSerializer(serializers.Serializer):
    track_id = serializers.CharField()  # or serializers.IntegerField() depending on your data type
    title = serializers.CharField()
