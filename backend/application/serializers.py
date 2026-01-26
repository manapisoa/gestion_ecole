from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    
    class Meta:
        model = User
        fields = ('id', 'email', 'password', 'first_name', 'last_name', 'role', 'genre')
        extra_kwargs = {
            'password': {'write_only': True},
            'first_name': {'required': True},
            'last_name': {'required': True},
            'role': {'required': True},
            'genre': {'required': False}
        }
    
    def create(self, validated_data):
        user_data = {
            'email': validated_data['email'],
            'first_name': validated_data['first_name'],
            'last_name': validated_data['last_name'],
            'password': validated_data['password'],
            'role': validated_data['role']
        }
        
        # Ajouter le genre s'il est fourni
        if 'genre' in validated_data:
            user_data['genre'] = validated_data['genre']
            
        # Désactiver automatiquement le compte pour les étudiants
        if validated_data['role'] == 'ETUDIANT':
            user_data['is_active'] = False
            
        user = User.objects.create_user(**user_data)
        return user

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        
        # Ajouter les informations utilisateur à la réponse
        user_data = UserSerializer(self.user).data
        data.update({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': {
                'id': user_data['id'],
                'email': user_data['email'],
                'first_name': user_data['first_name'],
                'last_name': user_data['last_name'],
                'role': user_data['role'],
                'genre': user_data.get('genre')
            }
        })
        return data
