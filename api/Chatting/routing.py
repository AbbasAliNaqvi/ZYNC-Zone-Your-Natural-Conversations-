from django.urls import path
from . import consumers

websocket_urlpatterns = [
    path('Chatting/',consumers.ChattingConsumer.as_asgi())
]