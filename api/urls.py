from django.urls import path, include, re_path
# from rest_framework_simplejwt.views import TokenVerifyView, TokenRefreshView, TokenObtainPairView
from rest_framework import routers

from api.views import *

urlpatterns = [
   # path('account/<int:pk>', AccountAPIDetailView.as_view()),
   # path('accountList/', AccountAPIList.as_view()),
   path('DiameterList/', DiametersViewSet.as_view({'get': 'list'})),
   path('CoefficientsList/', CoefficientsViewSet.as_view({'get': 'list'})),
   path('MaterialsList/', MaterialsViewSet.as_view({'get': 'list'})),
   path('LogisticList/', LogisticViewSet.as_view({'get': 'list'})),
   path('ExtraWorksList/', ExtraWorksViewSet.as_view({'get': 'list'})),
   path('StartTotalList/', StartTotalViewSet.as_view({'get': 'list'})),
   path('DimeterSecondCalcList/', DiameterSecondCalcViewSet.as_view({'get': 'list'})),
   path('client/', ClientAPIPost.as_view()),
   path('clientNote/', NoteAPIPost.as_view()),
   path('client/orders/<int:id>', ClientOrderByClientId.as_view({'get': 'list'})),
   path('clients/', ClientsViewSet.as_view({'get': 'list'})),
   path('order/<int:id>', ClientOrder.as_view({'get': 'list'})),
   
   path('client/<int:id>', ClientAPIView.as_view({'get': 'list'})),
   path('client/delete/<int:id>', ClientDelete.as_view()),
   path('clientByPhone/<str:phone>', ClientByPhoneAPIView.as_view({'get': 'list'})),
   
   path('StartTotal/', StartTotalWithoutCoefViewSet.as_view({'get': 'list'})),
   
]