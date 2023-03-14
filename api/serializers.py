from rest_framework import serializers
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from account.models import Account
from .models import *

class CoefficientsSerializer(serializers.ModelSerializer):
    
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
        
class StartTotalSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Logistic
        # fields = ("fname", "email")
        fields = "__all__"
        
class DiameterSecondCalcSerializer(serializers.ModelSerializer):
    
    diameter = DiametersSerializer()
    class Meta:
        model = DiameterSecondCalc
        # fields = ("fname", "email")
        fields = "__all__"
       