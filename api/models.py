from django.db import models
from django.contrib import admin


class Coefficients(models.Model):
    value = models.CharField('Наименование', max_length=200, blank=True)
    price = models.FloatField('Цена', default=0, blank=True)

    def __str__(self):
        return self.value

    class Meta:
        verbose_name = 'Коэффициент'
        verbose_name_plural = 'Коэффициенты'


class Materials(models.Model):
    value = models.CharField('Наименование', max_length=200, blank=True)
    price = models.FloatField('Цена', default=0, blank=True)

    def __str__(self):
        return f'{self.value}: {self.price}'

    class Meta:
        verbose_name = 'Материалы'
        verbose_name_plural = 'Материал'

    
class Diameters(models.Model):
    value = models.CharField('Наименование', max_length=200, blank=True)
    material = models.ManyToManyField(Materials)
    total = models.FloatField('Тотал (не изменяемое поле)', default=0, blank=True)

    def __str__(self):
        return self.value

    class Meta:
        verbose_name = 'Диаметр коронки'
        verbose_name_plural = 'Диаметры коронок'

