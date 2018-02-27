from django.http import HttpResponse, Http404
from django.template import loader
from django.shortcuts import get_object_or_404, render

def index(request):
  return render(request, 'app/index.html')

