from rest_framework.serializers import Serializer, FileField
class FileUpload(Serializer):
    file = FileField(max_length=None, allow_empty_file=False)
    class Meta:
        fields = ['file']