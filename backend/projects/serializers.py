from rest_framework import serializers
from .models import Project, Profile, ContactInfo, Message, Resume

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

    def get_object(self):
        return Profile.objects.first()

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

class ContactInfoSerializer(serializers.ModelSerializer):
    """Serializer for admin's static contact information (read-only for public)"""
    class Meta:
        model = ContactInfo
        fields = ['email', 'phone_number', 'linkedin_link', 'github_link']

class MessageSerializer(serializers.ModelSerializer):
    """Serializer for user-submitted messages (create and list)"""
    class Meta:
        model = Message
        fields = ['id', 'sender_name', 'sender_email', 'sender_message', 'created_at', 'is_read']
        read_only_fields = ['id', 'created_at', 'is_read'] 


class ResumeSerializer(serializers.ModelSerializer):
    resume_url = serializers.SerializerMethodField()

    class Meta:
        model = Resume
        fields = ['title', 'resume_url', 'updated_at']

    def get_resume_url(self, obj):
        request = self.context.get('request')
        if not obj.resume_file:
            return None
        file_url = obj.resume_file.url

        # Keep Cloudinary URLs as-is; only local relative paths need request-based expansion.
        if file_url.startswith('https://') or file_url.startswith('http://'):
            return file_url

        if file_url.startswith('//'):
            return f'https:{file_url}'

        if request:
            return request.build_absolute_uri(file_url)
        return file_url
