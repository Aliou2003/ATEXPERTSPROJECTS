from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Utilisateur, UserProfile
from .serializers import UtilisateurSerializer, UserProfileSerializer
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from rest_framework import generics
from rest_framework.permissions import AllowAny



class InscriptionView(APIView):
    def get(self, request, *args, **kwargs):
        utilisateurs = Utilisateur.objects.all()
        serializer = UtilisateurSerializer(utilisateurs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = UtilisateurSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        mot_de_passe = request.data.get('motDepasse')

        if not email or not mot_de_passe:
            raise AuthenticationFailed('Email and password are required.')
        
        user = authenticate(email=email, password=mot_de_passe)

        
        
        return Response({'message': 'login successful.'}, status=status.HTTP_200_OK)


        
class UserProfileListCreate(generics.ListCreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
