from rest_framework import serializers
from rest_framework_csv import renderers as csv_renderers

class FileUpload(serializers.Serializer):
    file = serializers.FileField(max_length=None, allow_empty_file=False)