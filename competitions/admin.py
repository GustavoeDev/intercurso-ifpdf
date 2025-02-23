from django.contrib import admin
from .models import Team, Competition, Modality, Request

admin.site.register(Team)
admin.site.register(Competition)
admin.site.register(Modality)
admin.site.register(Request)
