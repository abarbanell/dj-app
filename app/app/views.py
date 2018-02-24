from django.http import HttpResponse, Http404
from django.template import loader
from django.shortcuts import get_object_or_404, render
import statsd
import os
import psutil

# TODO: get IP and prefix from environment

def index(request):
  StatsdHost = os.environ['STATSD_HOST']
  StatsdPref = os.environ['STATSD_PREFIX']
  c = statsd.StatsClient(StatsdHost, 8125, prefix=StatsdPref)
  cpu = psutil.cpu_percent(interval=1)
  usage = psutil.disk_usage("/")
  mem = psutil.virtual_memory()
  c.incr("route.index")
  c.gauge('cpu.percent', cpu)
  c.gauge('mem.percent', mem.percent)
  return HttpResponse("You're seeing page:  %s with Statsd Tracking at %s" % (request.path , StatsdHost))


