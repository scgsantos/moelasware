# Generated by Django 4.1.3 on 2022-11-21 00:36

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("moelasware", "0003_quiz_name"),
    ]

    operations = [
        migrations.AddField(
            model_name="quiz",
            name="approved",
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name="quiz",
            name="creation_date",
            field=models.DateField(default=datetime.date.today),
        ),
        migrations.AddField(
            model_name="quiz",
            name="finished",
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name="review",
            name="creation_date",
            field=models.DateField(default=datetime.date.today),
        ),
        migrations.AddField(
            model_name="review",
            name="pending",
            field=models.BooleanField(default=True),
        ),
    ]
