# api/tests.py

from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse
from django.utils import timezone
from polls.models import Question



# Model is tested inside the polls app, so here are just the API tests

# Define this after the ModelTestCase
class ViewTestCase(TestCase):
    """Test suite for the api views."""

    def setUp(self):
        """Define the test client and other test variables."""
        self.client = APIClient()
        self.question_json = {
          'question_text': 'Go to Ibiza?',
          'pub_date': timezone.now()
          }
        self.response = self.client.post(
            reverse('create'),
            self.question_json,
            format="json")

    def test_api_can_create_a_question(self):
        """Test the api has question creation capability."""
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)

    def test_api_can_get_a_question(self):
        """Test the api can get a given question."""
        question = Question.objects.get()
        response = self.client.get(
            reverse('details',
            kwargs={'pk': question.id}), format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, question)

    def test_api_can_update_question(self):
        """Test the api can update a given question."""
        question = Question.objects.get()
        change_question = {
          'question_text': 'Some new question?',
          'pub_date': timezone.now()
        }
        res = self.client.put(
            reverse('details', kwargs={'pk': question.id}),
            change_question, format='json'
        )
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_api_can_delete_question(self):
        """Test the api can delete a question."""
        question = Question.objects.get()
        response = self.client.delete(
            reverse('details', kwargs={'pk': question.id}),
            format='json',
            follow=True)
        self.assertEquals(response.status_code, status.HTTP_204_NO_CONTENT)

