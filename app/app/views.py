from django.http import HttpResponse, Http404
from django.template import loader
from django.shortcuts import get_object_or_404, render
import statsd
import os
import psutil

def index(request):
  c = statsd.StatsClient('159.100.250.75', 8125, prefix="dj-app.dev")
  cpu = psutil.cpu_percent(interval=1)
  usage = psutil.disk_usage("/")
  mem = psutil.virtual_memory()
  c.incr("route.index")
  c.gauge('cpu.percent', cpu)
  c.gauge('mem.percent', mem.percent)
  return HttpResponse("You're seeing page:  %s" % request.path )


