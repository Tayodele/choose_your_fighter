# Generated by Django 2.1 on 2020-07-05 16:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CandAns',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='Candidate',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('email', models.CharField(max_length=200)),
                ('position_id', models.CharField(max_length=200)),
                ('candidate_id', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='ChicagoBallot',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('position_id', models.IntegerField(default=0)),
                ('date', models.CharField(max_length=200)),
                ('name', models.CharField(max_length=200)),
                ('description', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='QuestionBank',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bank_id', models.IntegerField(default=0)),
                ('question', models.CharField(max_length=200)),
                ('choices', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('address', models.CharField(max_length=200)),
                ('email', models.CharField(max_length=200)),
                ('ballot', models.ManyToManyField(to='cyf_quiz.ChicagoBallot')),
            ],
        ),
        migrations.AddField(
            model_name='chicagoballot',
            name='banks',
            field=models.ManyToManyField(to='cyf_quiz.QuestionBank'),
        ),
        migrations.AddField(
            model_name='chicagoballot',
            name='cands',
            field=models.ManyToManyField(to='cyf_quiz.Candidate'),
        ),
        migrations.AddField(
            model_name='candans',
            name='question',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cyf_quiz.QuestionBank'),
        ),
    ]