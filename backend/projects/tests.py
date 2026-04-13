import shutil
import tempfile
from datetime import timedelta

from django.contrib.auth import get_user_model
from django.urls import reverse
from django.test import override_settings
from django.utils import timezone
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Message, Resume


class MessageListPermissionsTests(APITestCase):
	def setUp(self):
		self.url = reverse("message_list")
		Message.objects.create(
			sender_name="Visitor",
			sender_email="visitor@example.com",
			sender_message="Hello from test.",
		)

		user_model = get_user_model()
		self.regular_user = user_model.objects.create_user(
			username="user",
			email="user@example.com",
			password="secure-pass-123",
		)
		self.admin_user = user_model.objects.create_superuser(
			username="admin",
			email="admin@example.com",
			password="secure-pass-123",
		)

	def test_anonymous_user_cannot_list_messages(self):
		response = self.client.get(self.url)
		self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

	def test_authenticated_non_admin_cannot_list_messages(self):
		self.client.force_authenticate(user=self.regular_user)
		response = self.client.get(self.url)
		self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

	def test_admin_user_can_list_messages(self):
		self.client.force_authenticate(user=self.admin_user)
		response = self.client.get(self.url)
		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertEqual(len(response.data), 1)


class ResumeRetrieveTests(APITestCase):
	@classmethod
	def setUpClass(cls):
		super().setUpClass()
		cls._temp_media_dir = tempfile.mkdtemp()
		cls._media_override = override_settings(MEDIA_ROOT=cls._temp_media_dir)
		cls._media_override.enable()

	@classmethod
	def tearDownClass(cls):
		cls._media_override.disable()
		shutil.rmtree(cls._temp_media_dir, ignore_errors=True)
		super().tearDownClass()

	def setUp(self):
		self.url = reverse("resume_retrieve")

	def _create_resume(self, title, filename, is_active=False):
		resume_file = SimpleUploadedFile(
			name=filename,
			content=b"dummy resume content",
			content_type="application/pdf",
		)
		return Resume.objects.create(
			title=title,
			resume_file=resume_file,
			is_active=is_active,
		)

	def test_fetch_active_resume_returns_200_and_absolute_url(self):
		active_resume = self._create_resume(
			title="Active Resume",
			filename="active-resume.pdf",
			is_active=True,
		)

		response = self.client.get(self.url)

		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertEqual(response.data["title"], active_resume.title)
		self.assertEqual(
			response.data["resume_url"],
			f"http://testserver{active_resume.resume_file.url}",
		)

	def test_fallback_to_most_recently_updated_resume_when_no_active_exists(self):
		now = timezone.now()
		older_resume = self._create_resume(
			title="Older Resume",
			filename="older-resume.pdf",
			is_active=False,
		)
		newer_resume = self._create_resume(
			title="Newer Resume",
			filename="newer-resume.pdf",
			is_active=False,
		)

		Resume.objects.filter(pk=older_resume.pk).update(updated_at=now - timedelta(days=3))
		Resume.objects.filter(pk=newer_resume.pk).update(updated_at=now - timedelta(days=1))

		newer_resume.refresh_from_db()

		response = self.client.get(self.url)

		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertEqual(response.data["title"], newer_resume.title)
		self.assertEqual(
			response.data["resume_url"],
			f"http://testserver{newer_resume.resume_file.url}",
		)

	def test_returns_404_when_no_resumes_exist(self):
		response = self.client.get(self.url)

		self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
		self.assertEqual(response.data["detail"], "No resume has been uploaded yet.")
