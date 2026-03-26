from django.db import models

# Create your models here.
class Profile(models.Model):
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=255, help_text="Professional title or tagline", default='Full Stack Software Engineer')
    hero_statement = models.TextField(help_text="A brief catchy statement")
    about_me = models.TextField(help_text="Detailed about me section")
    profile_image = models.ImageField(upload_to='profiles/')
    skills = models.JSONField(
        default=dict,
        help_text="Skills organized by category. Format: {\"Frontend\": [\"React\", \"JavaScript\"], \"Backend\": [\"Python\", \"Django\"], \"Tools\": [\"Git\", \"Docker\"]}"
    )

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
    
class ContactInfo(models.Model):
    """Admin's static contact information (singleton pattern with pk=1)"""
    email = models.EmailField()
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    linkedin_link = models.URLField(blank=True, null=True)
    github_link = models.URLField(blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Contact Info - {self.email}"

    class Meta:
        verbose_name_plural = "Contact Info"


class Resume(models.Model):
    title = models.CharField(max_length=120, default="Current Resume")
    resume_file = models.FileField(upload_to='resumes/')
    is_active = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['is_active'],
                condition=models.Q(is_active=True),
                name='unique_active_resume',
            )
        ]
        ordering = ['-updated_at']

    def __str__(self):
        return f"{self.title} ({'active' if self.is_active else 'inactive'})"


class Message(models.Model):
    """User-submitted contact messages"""
    sender_name = models.CharField(max_length=255)
    sender_email = models.EmailField()
    sender_message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return f"Message from {self.sender_name} ({self.created_at.strftime('%Y-%m-%d')})"

    class Meta:
        ordering = ['-created_at']
