from django.db import models
from django.contrib.auth.models import User


class Utilisateur(models.Model):
    nom = models.CharField(max_length=255)
    prenom = models.CharField(max_length=255, blank=False)  # Rendre le prénom obligatoire
    email = models.EmailField(unique=True)
    motDepasse = models.CharField(max_length=100, blank=True)
    dateCreation = models.DateField()

    def __str__(self):
        return f"{self.nom} {self.prenom}"

    class Meta:
        app_label = 'myapp'


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)
    notes = models.TextField(blank=True)
    
    # Ajoutez d'autres champs selon vos besoins, comme les mots de passe générés, etc.

    def __str__(self):
        return f"Profile de {self.user.username}"        
