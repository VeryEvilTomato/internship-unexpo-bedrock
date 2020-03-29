# Generated by Django 3.0.4 on 2020-03-10 20:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('userHome', '0002_auto_20200310_2049'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserData',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20, verbose_name='Nombre')),
                ('lastName', models.CharField(max_length=20, verbose_name='Apellido')),
                ('accesLevel', models.CharField(choices=[('NA', 'Administrador'), ('NU', 'Normal'), ('NL', 'Limitado')], default='NU', max_length=3, verbose_name='Nivel de acceso')),
                ('locks', models.BooleanField(default=False, verbose_name='Bloqueado')),
                ('home', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='userHome.UserHome')),
            ],
        ),
    ]