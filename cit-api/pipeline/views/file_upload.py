from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response

from pipeline.serializers.file_upload import FileUpload


class FileUploadViewSet(viewsets.ViewSet):

    def create(self, request):
        serializer_class = FileUpload(data=request.data)
       
        print(serializer_class.is_valid())

        if 'file' not in request.FILES or not serializer_class.is_valid():
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            #Multiple Files
            files = request.FILES.getlist('file')
            for f in files:
                handle_uploaded_file(f)

            return Response(status=status.HTTP_201_CREATED)

def handle_uploaded_file(f):
    with open(f.name, 'wb+') as destination:
        for chunk in f.chunks():
            destination.write(chunk)