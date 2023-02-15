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
    list_display = [field.name for field in Diameters._meta.fields if field.name != 'total']
    readonly_fields = ('total',)
    exclude = ['total']
    list_filter = ()
    fieldsets = ()

class LogisticAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Logistic._meta.fields]
    
    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()

class ExtraWorksAdmin(admin.ModelAdmin):
    list_display = [field.name for field in ExtraWorks._meta.fields]

    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()

admin.site.register(Diameters, DiametersAdmin)
admin.site.register(Coefficients, CoefficientsAdmin)
admin.site.register(Materials, MaterialsAdmin)
admin.site.register(Logistic, LogisticAdmin)
admin.site.register(ExtraWorks, ExtraWorksAdmin)



admin.site.unregister(Group)
