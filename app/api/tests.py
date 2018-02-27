from django.test import TestCase
from django.utils import timezone

# Create your tests here.

from polls.models import Question, Choice

class PollsModelTestCase(TestCase):
  """This class defines the test suite for the polls model."""


  def setUp(self):
    """Define the test client and other test variables."""
    self.question_text = "Write world class code"
    time = timezone.now()
    self.question = Question(question_text=self.question_text,pub_date=time)

  def test_model_can_create_a_question(self):
    """Test the polls model can create a Question."""
    old_count = Question.objects.count()
    self.question.save()
    new_count = Question.objects.count()
    self.assertNotEqual(old_count, new_count)