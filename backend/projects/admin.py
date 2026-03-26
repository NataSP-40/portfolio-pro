from django.contrib import admin
from django.db import transaction

# Register your models here.

from .models import ContactInfo, Profile, Project, Message, Resume
admin.site.register(Profile)
admin.site.register(Project)
admin.site.register(ContactInfo)
admin.site.register(Message)


@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):
	list_display = ("title", "is_active", "updated_at")
	list_filter = ("is_active", "updated_at")
	search_fields = ("title",)
	ordering = ("-updated_at",)
	actions = ["make_active"]

	@admin.action(description="Mark selected resume as active")
	def make_active(self, request, queryset):
		selected = queryset.first()
		if not selected:
			return

		with transaction.atomic():
			Resume.objects.filter(is_active=True).exclude(pk=selected.pk).update(
				is_active=False
			)
			if not selected.is_active:
				selected.is_active = True
				selected.save(update_fields=["is_active", "updated_at"])

	def save_model(self, request, obj, form, change):
		with transaction.atomic():
			if obj.is_active:
				Resume.objects.filter(is_active=True).exclude(pk=obj.pk).update(
					is_active=False
				)
			super().save_model(request, obj, form, change)