from django.db import models
from django.contrib import admin


class StartTotal(models.Model):
    price = models.IntegerField('Начальная цена', default=0, blank=True)

    def __str__(self):
        return f'{self.price}'

    class Meta:
        verbose_name = 'Начальные цены'
        verbose_name_plural = 'Начальные цены'


class StartTotalWithoutCoef(models.Model):
    price = models.ForeignKey(
        StartTotal, on_delete=models.SET_NULL, null=True, verbose_name='Начальная цена')

    def __str__(self):
        return f'{self.price}'

    class Meta:
        verbose_name = 'Начальная цена (без коэф)'
        verbose_name_plural = 'Начальная цена (без коэф)'


class Coefficients(models.Model):
    value = models.CharField('Наименование', max_length=200, blank=True)
    price = models.FloatField('Коэффициент', default=0, blank=True)
    start_total = models.ForeignKey(
        StartTotal, on_delete=models.SET_NULL, null=True, verbose_name='Начальная цена')

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
    total = models.FloatField(
        'Тотал (не изменяемое поле)', default=0, blank=True)
    material = models.JSONField('Материалы', blank=True, null=True)

    def __str__(self):
        return self.value

    class Meta:
        verbose_name = 'Диаметр коронки'
        verbose_name_plural = 'Диаметры коронок'


class DiameterSecondCalc(models.Model):
    """Дефолтный диаметр второго калькулятора"""

    value = models.IntegerField('Размер', blank=True)
    material = models.JSONField('Материалы', blank=True, null=True)

    def __str__(self):
        return f'{self.value}'

    class Meta:
        verbose_name = 'Диаметр коронки'
        verbose_name_plural = 'Диаметр коронки 2 калькулятора'


class Client(models.Model):
    fio = models.CharField('ФИО', max_length=200, blank=True, null=True)
    email = models.CharField('Почта', max_length=200, blank=True, null=True)
    phone = models.CharField('Телефон', max_length=200, blank=True, null=True)
    # order_list = models.JSONField('Состав заказа', blank=True, null=True)

    def __str__(self):
        return f'{self.fio}'

    class Meta:
        verbose_name = 'Клиент'
        verbose_name_plural = 'Клиенты'



class ClientNote(models.Model):
    note = models.TextField('Заметка', max_length=5000, blank=True, null=True)
    date = models.DateField('Дата', blank=True, null=True)
    time = models.TimeField('Время', blank=True, null=True)
    address = models.CharField('Адрес', max_length=400, blank=True, null=True)
    data = models.JSONField('Данные', blank=True, null=True)
    client = models.ForeignKey(
        Client, blank=True, null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return f'{self.id}'

    class Meta:
        verbose_name = 'Состав заказа'
        verbose_name_plural = 'Состав заказа'