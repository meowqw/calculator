from django.shortcuts import render
from rest_framework import generics, viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import action
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.views import APIView
from django.forms import model_to_dict
from rest_framework import mixins
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser, IsAuthenticated
# from .permissions import IsAdminReadOnly, IsOwnerOrReadOnly
from account.models import Account
from .serializers import *
from .models import *
from rest_framework import status
from .googleAPI.calendar.calendar import GoogleCalendar


class DiametersViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Only read Diameters
    """
    queryset = Diameters.objects.all()
    serializer_class = DiametersSerializer


class StartTotalViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Only read StrtTotal
    """
    queryset = StartTotal.objects.all()
    serializer_class = StartTotalSerializer


class CoefficientsViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Only read Coefficients
    """
    queryset = Coefficients.objects.all()
    serializer_class = CoefficientsSerializer


class MaterialsViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Only read Coefficients
    """
    queryset = Materials.objects.all()
    serializer_class = MaterialsSerializer


class LogisticViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Only read Logistic
    """
    queryset = Logistic.objects.all()
    serializer_class = LogisticSerializer


class ExtraWorksViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Only read ExtraWorks
    """
    queryset = ExtraWorks.objects.all()
    serializer_class = ExtraWorksSerializer


class DiameterSecondCalcViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Only read DiameterSecondCalc
    """
    queryset = DiameterSecondCalc.objects.all()
    serializer_class = DiameterSecondCalcSerializer
    
class StartTotalWithoutCoefViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Only read DiameterSecondCalc
    """
    queryset = StartTotalWithoutCoef.objects.all()
    serializer_class = StartTotalWithoutCoefSerializer



class ClientAPIPost(APIView):
    """Получить и добавить клиента"""

    def post(self, request, *args, **kwargs):

        data = request.data.copy()

        cleint_serializer = ClientSerializer(data=data)
        if cleint_serializer.is_valid():
            client = cleint_serializer.save()
            response_serializer = ClientSerializer(client)

            return Response(response_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(cleint_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    serializer_class = ClientSerializer
    
class ClientAPIView(viewsets.ReadOnlyModelViewSet):
    def get_queryset(self):
        client = Client.objects.filter(id=self.kwargs['id'])
        return client
        
    serializer_class = ClientSerializer
    

class ClientByPhoneAPIView(viewsets.ReadOnlyModelViewSet):
    serializer_class = ClientSerializer

    def get_queryset(self):
        phone = self.kwargs['phone']
        queryset = Client.objects.filter(phone__icontains=phone)
        return queryset
    
    
    
    
class NoteAPIPost(APIView):
    """Добавить заметку"""

    def post(self, request, *args, **kwargs):

        data = request.data.copy()

        client_note_serializer = ClientNoteSerializer(data=data)
        if client_note_serializer.is_valid():
            client_note = client_note_serializer.save()
            response_serializer = ClientNoteSerializer(client_note)
            
            # Создать заметку в календаре 
            obj = GoogleCalendar()
            calendar = 'e17ce3cd8c93d5bdc14a516251527b1c5b8436647a8eab6d55cf1f4581c8ae89@group.calendar.google.com'
            
            
            event = {
                'summary': f'{data["fio"]} {data["phone"]}',
                'location': f'{data["location"]}',
                'description': f'{data["note"]}',
                'start': {
                    'date': f'{data["date"]}',
                },
                'end': {
                    'date': f'{data["date"]}',
                }
            }
            
            obj.add_event(calendar_id=calendar, event=event)

            return Response(response_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(client_note_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    serializer_class = ClientNoteSerializer
    
