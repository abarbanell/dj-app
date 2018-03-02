# from django.shortcuts import render
from rest_framework import generics
from .serializers import QuestionSerializer
from polls.models import Question

# Create your views here.

class CreateView(generics.ListCreateAPIView):
    """This class defines the create behavior of our rest api."""
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    def perform_create(self, serializer):
        """Save the post data when creating a new question."""
        serializer.save()

class DetailsView(generics.RetrieveUpdateDestroyAPIView):
    """This class handles the http GET, PUT and DELETE requests."""

    queryset = Question.objects.all()
    serializer_class = QuestionSerializer