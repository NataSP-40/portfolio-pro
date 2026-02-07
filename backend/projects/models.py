from django.db import models

# Create your models here.
class Profile(models.Model):
    name = models.CharField(max_length=100)
    hero_statement = models.TextField(help_text="A brief catchy statement")
    about_me = models.TextField()
    profile_image = models.ImageField(upload_to='profiles/')
    skills = models.JSONField(default=list, help_text="List of skills")

    def __str__(self):
        return self.name

class Project(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    technologies = models.TextField()
    solution = models.TextField(help_text="Detailed solution description")
    challenges = models.TextField(help_text="Challenges faced during the project")
    project_image = models.ImageField(upload_to='projects/')
    live_link = models.URLField(blank=True, null=True)
    repo_link = models.URLField(blank=True, null=True)
    featured = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title
    
class Contact(models.Model):
    email = models.EmailField()
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    linkedin_link = models.URLField(blank=True, null=True)
    sender_name = models.CharField(max_length=255)
    sender_email = models.EmailField()
    sender_message = models.TextField()

    def __str__(self):
        return f"Message from {self.sender_name} <{self.sender_email}>"