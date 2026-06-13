from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Project
from .serializers import ProjectSerializer, ContactMessageSerializer

class ProjectListView(APIView):
    def get(self, request):
        projects = Project.objects.all()
        serializer = ProjectSerializer(projects, many=True, context={'request': request})
        return Response(serializer.data)

# این کلاس را اضافه کن
class ProjectDetailView(APIView):
    def get(self, request, pk):
        project = get_object_or_404(Project, pk=pk)
        # فرستادن context برای درست شدن URL کامل عکس‌ها
        serializer = ProjectSerializer(project, context={'request': request})
        return Response(serializer.data)

class ContactView(APIView):
    # همان کد قبلی تو
    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Message received!'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
