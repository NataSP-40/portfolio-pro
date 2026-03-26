from rest_framework import generics
from rest_framework.permissions import IsAdminUser
from rest_framework.exceptions import NotFound
from .models import Project, Profile, ContactInfo, Message, Resume
from .serializers import (
    ProjectSerializer,
    ProfileSerializer,
    ContactInfoSerializer,
    MessageSerializer,
    ResumeSerializer,
)

# Create your views here.

class ProfileDetail(generics.RetrieveAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def get_object(self):
        return Profile.objects.first()

class ProjectList(generics.ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class ContactInfoRetrieve(generics.RetrieveAPIView):
    """
    GET /api/contact-info/
    Returns the admin's static contact information (email, phone, linkedin)
    """
    serializer_class = ContactInfoSerializer

    def get_object(self):
        return ContactInfo.objects.first()

class MessageCreate(generics.CreateAPIView):
    """
    POST /api/messages/
    Submit a new contact message
    """
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

class MessageList(generics.ListAPIView):
    """
    GET /api/messages/list/
    List all contact messages (admin-only endpoint)
    """
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [IsAdminUser]


class ResumeRetrieve(generics.RetrieveAPIView):
    """
    GET /api/resume/
    Returns the currently active resume for public use.
    """
    serializer_class = ResumeSerializer

    def get_object(self):
        resume = Resume.objects.filter(is_active=True).first()
        if resume:
            return resume

        latest_resume = Resume.objects.order_by('-updated_at').first()
        if latest_resume:
            return latest_resume

        raise NotFound(detail="No resume has been uploaded yet.")