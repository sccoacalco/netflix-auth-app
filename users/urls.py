from django.urls import path
from . import views

urlpatterns = [
    # Ejemplo de vista (puedes cambiarlo después)
    path('', views.index, name='index'),
]