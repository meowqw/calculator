# Generated by Django 4.1.5 on 2023-03-02 07:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_alter_starttotal_price'),
    ]

    operations = [
        migrations.DeleteModel(
            name='StartTotal',
        ),
    ]