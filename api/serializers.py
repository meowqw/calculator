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
    
    material = MaterialsSerializer(read_only=True, many=True)

    class Meta:
        model = Diameters
        # fields = ("fname", "email")
        fields = "__all__"