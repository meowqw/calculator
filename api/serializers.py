from rest_framework import serializers
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from account.models import Account
from .models import *

class StartTotalSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Logistic
        # fields = ("fname", "email")
        fields = "__all__"


class CoefficientsSerializer(serializers.ModelSerializer):
    
    start_total = StartTotalSerializer()
    
    class Meta:
        model = Coefficients
        # fields = ("fname", "email")
        fields = "__all__"

class MaterialsSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Materials
        # fields = ("fname", "email")
        fields = "__all__"


class DiametersSerializer(serializers.ModelSerializer):
    
    # material = MaterialsSerializer(read_only=True, many=True)

    class Meta:
        model = Diameters
        # fields = ("fname", "email")
        fields = "__all__"

class LogisticSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Logistic
        # fields = ("fname", "email")
        fields = "__all__"
        
class ExtraWorksSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Coefficients
        # fields = ("fname", "email")
        fields = "__all__"
        

class DiameterSecondCalcSerializer(serializers.ModelSerializer):
    
    # diameter = DiametersSerializer()
    class Meta:
        model = DiameterSecondCalc
        # fields = ("fname", "email")
        fields = "__all__"
       
       
class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'
        

class StartTotalWithoutCoefSerializer(serializers.ModelSerializer):
    price = StartTotalSerializer()
    
    class Meta:
        model = StartTotalWithoutCoef
        fields = '__all__'
        


class ClientNoteSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ClientNote
        fields = '__all__'
        