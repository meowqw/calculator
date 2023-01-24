from .models import *
from django.contrib import admin
from django.contrib.auth.models import Group

class CoefficientsAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Coefficients._meta.fields]

    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()

class MaterialsAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Materials._meta.fields]
    
    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()


class DiametersAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Diameters._meta.fields]
    readonly_fields = ('total',)
    list_filter = ()
    fieldsets = ()

admin.site.register(Diameters, DiametersAdmin)
admin.site.register(Coefficients, CoefficientsAdmin)
admin.site.register(Materials, MaterialsAdmin)

admin.site.unregister(Group)
