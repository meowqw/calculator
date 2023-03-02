# Generated by Django 4.1.5 on 2023-03-02 06:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_extraworks'),
    ]

    operations = [
        migrations.CreateModel(
            name='StartTotal',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.FloatField(blank=True, default=0, verbose_name='Начальная цена')),
            ],
            options={
                'verbose_name': 'Начальная цена',
                'verbose_name_plural': 'Начальная цена',
            },
        ),
    ]