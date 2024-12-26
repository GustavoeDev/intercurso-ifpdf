from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('student.urls')),
    path('', include('users.urls')),
    path('', include('competitions.urls')),
    path('organizador/', include('organizer.urls'))
]
