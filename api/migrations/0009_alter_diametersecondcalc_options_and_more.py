# Generated by Django 4.1.5 on 2023-03-16 21:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_diametersecondcalc'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='diametersecondcalc',
            options={'verbose_name': 'Диаметр коронки', 'verbose_name_plural': 'Диаметр коронки 2 калькулятора'},
        ),
        migrations.RemoveField(
            model_name='diametersecondcalc',
            name='diameter',
        ),
        migrations.AddField(
            model_name='diametersecondcalc',
            name='material',
            field=models.JSONField(blank=True, null=True, verbose_name='Материалы'),
        ),
        migrations.AddField(
            model_name='diametersecondcalc',
            name='value',
            field=models.IntegerField(blank=True, default=1, verbose_name='Размер'),
            preserve_default=False,
        ),
    ]