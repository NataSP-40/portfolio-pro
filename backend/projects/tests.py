from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Message


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
