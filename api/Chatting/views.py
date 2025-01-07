from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer
def get_auth_for_user(user):
    tokens = RefreshToken.for_user(user)
    print('token',tokens)
    return{
        'user': UserSerializer(user).data
    }

class SignInView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        print("received data", request.data)
        username = request.data.get('username')
        password = request.data.get('password')
        if not username or not password:
            return Response(status=400)
    
        user= authenticate(request,username = username,password=password)
        if not user:
            return Response(status=401)
    
        user_data = get_auth_for_user(user)
        return Response(user_data)