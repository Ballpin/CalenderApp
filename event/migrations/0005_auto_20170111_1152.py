# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-01-11 10:52
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0004_auto_20170111_1044'),
    ]

    operations = [
        migrations.RenameField(
            model_name='event',
            old_name='StartTime',
            new_name='Start_Time',
        ),
    ]
