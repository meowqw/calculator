from django.db import models
from django.contrib import admin


class Coefficients(models.Model):
    value = models.CharField('Наименование', max_length=200, blank=True)
    price = models.FloatField('Коэффициент', default=0, blank=True)

    def __str__(self):
        return self.value

    class Meta:
        verbose_name = 'Коэффициент'
        verbose_name_plural = 'Коэффициенты'
        

class ExtraWorks(models.Model):
    value = models.CharField('Наименование', max_length=200, blank=True)
    price = models.FloatField('Цена', default=0, blank=True)

    def __str__(self):
        return self.value

    class Meta:
        verbose_name = 'Доп работа'
        verbose_name_plural = 'Доп работы'


class Materials(models.Model):
    value = models.CharField('Наименование', max_length=200, blank=True)

    def __str__(self):
        return f'{self.value}'

    class Meta:
        verbose_name = 'Материалы'
        verbose_name_plural = 'Материал'

class Logistic(models.Model):
    price = models.FloatField('Цена за км', default=0, blank=True)

    def __str__(self):
        return f'{self.price}'

    class Meta:
        verbose_name = 'Логистика'
        verbose_name_plural = 'Логистика'

    
class Diameters(models.Model):
    value = models.CharField('Наименование', max_length=200, blank=True)
    total = models.FloatField('Тотал (не изменяемое поле)', default=0, blank=True)
    material = models.JSONField('Материалы', blank=True, null=True)


    def __str__(self):
        return self.value

    class Meta:
        verbose_name = 'Диаметр коронки'
        verbose_name_plural = 'Диаметры коронок'