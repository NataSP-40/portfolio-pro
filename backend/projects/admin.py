from django.contrib import admin

# Register your models here.

from .models import Profile, Project, Contact
admin.site.register(Profile)
admin.site.register(Project)
admin.site.register(Contact)

