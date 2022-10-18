# Generated by Django 4.0.6 on 2022-10-17 14:25

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    replaces = [('moelasware', '0001_Tag'), ('moelasware', '0002_review')]

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Quiz',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.TextField()),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='QuizAnswer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField()),
                ('correct', models.BooleanField(default=False)),
                ('justification', models.TextField()),
                ('quiz', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='moelasware.quiz')),
            ],
        ),
        migrations.CreateModel(
            name='Submission',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Test',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField()),
                ('num_quizzes', models.IntegerField(default=1, validators=[django.core.validators.MinValueValidator(1)])),
                ('allowed_tags', models.ManyToManyField(to='moelasware.tag')),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='moelasware.user')),
                ('quizzes', models.ManyToManyField(to='moelasware.quiz')),
            ],
        ),
        migrations.CreateModel(
            name='SubmissionAnswer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('answer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='moelasware.quizanswer')),
                ('submission', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='moelasware.submission')),
            ],
        ),
        migrations.AddField(
            model_name='submission',
            name='submitter',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='moelasware.user'),
        ),
        migrations.AddField(
            model_name='submission',
            name='test',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='moelasware.test'),
        ),
        migrations.AddField(
            model_name='quiz',
            name='author',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='moelasware.user'),
        ),
        migrations.AddField(
            model_name='quiz',
            name='tags',
            field=models.ManyToManyField(to='moelasware.tag'),
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('accepted', models.BooleanField(default=False)),
                ('comment', models.TextField()),
                ('quiz', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='moelasware.quiz')),
                ('reviewer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='moelasware.user')),
            ],
        ),
    ]
