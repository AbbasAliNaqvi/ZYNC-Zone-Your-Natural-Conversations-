import json
import base64
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from django.core.files.base import ContentFile
from .serializers import UserSerializer
class ChattingConsumer(WebsocketConsumer):

    def connect(self):
        user = self.scope['user']
        print(user,user.is_authenticated)
        if not user.is_authenticated:
            return
        
        self.username = user.username

        async_to_sync(self.channel_layer.group_add)(
            self.username,self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.username,self_channel_name
        )

#for requests

    def receive(self,text_data):
        data=json.loads(text_data)
        data_source = data.get('source')

        print('receive',json.dumps(data,indent=2))

#thumbnail upload here
        if data_source == 'thumbnail':
            self.receive_thumbnail(data)


    def receive_thumbnail(self,data):
        user = self.scope['user']
        image_str = data.get('base64')
        image = ContentFile(base64.b64decode(image_str))
        filename= data.get('filename')
        user.thumbnail.save(filename, image , save=True)
        serialized = UserSerializer(user)
        #new data after update
        self.send_group(self.username,'thumbnail', serialized.data)



    def send_group(self, group , source, data):
        response = {
            'type': 'broadcast_group',
            'source': source,
            'data': data
        }
        async_to_sync(self.channel_layer.group_send)(
            group,response
        )

    def broadcast_group(self, data):
        '''
        data:
            - type: 'broadcast_group'
            - source: where it originated from
            - data: whatever you want to send as a dict
        '''
        data.pop('type')
        '''
        return data:
            - source: where it originated from
            - data: whatever you want to send as a dict
        '''
        self.send(text_data=json.dumps(data))

		