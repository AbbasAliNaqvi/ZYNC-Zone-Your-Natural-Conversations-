from channels.generic.websocket import WebsocketConsumer

class ChattingConsumer(WebsocketConsumer):

    def connect(self):
        user = self.scope['user']
        print(user,user.is_authenticated)
        if not user.is_authenticated:
            return
        self.accept()

    def disconnect(self, close_code):
        pass