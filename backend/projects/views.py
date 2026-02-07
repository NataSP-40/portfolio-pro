from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import generics
from .models import Project, Profile, Contact
from .serializers import ProjectSerializer, ProfileSerializer, ContactSerializer

# Create your views here.

# def connection_test(request):
#     return JsonResponse({"message": "Hello from Django! The connection is successful."})

class ProfileDetail(generics.RetrieveAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def get_object(self):
        return Profile.objects.first()

class ProjectList(generics.ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class ContactCreate(generics.CreateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer