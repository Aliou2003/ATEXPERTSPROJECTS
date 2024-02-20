# myapp/urls.py
from django.urls import path
from .views import InscriptionView, LoginView
from . import views

urlpatterns = [
    path('inscription/', InscriptionView.as_view(), name='Inscription'),
    path('connexion/', LoginView.as_view(), name='connexion'),
    # Définissez d'autres URL si nécessaire
    path('api/user-profiles/', views.UserProfileListCreate.as_view(), name='user-profile-list-create'),
]