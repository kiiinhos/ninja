from django.db import models

# Create your models here.

#vai cadastrar uma pessoa
class Cadastro(models.Model):

    GENEROS = (
        ('MA', 'Masculino'),
        ('FE', 'Feminino'),
        ('OU', 'Outros'),
    )
    
    nome = models.CharField(
        max_length = 255,
        verbose_name = 'Nome',
    )

    Sobrenome = models.CharField(
        max_length = 255,
        verbose_name = 'Sobrenome',
    )

    genero = models.CharField(
        max_length = 25,
        verbose_name = 'Gênero',
        choices=GENEROS,
        default=""
    )

    email = models.EmailField(
        max_length = 255,
        verbose_name = 'E-mail'
    )
    
    senha = models.CharField(
        max_length = 10,
        verbose_name = 'Senha'
    )

    confirmar_senha = models.CharField(
        max_length = 10,
        verbose_name = 'Confirmar Senha'
    )

    criacao = models.DateTimeField(auto_now=True)
    ativado = models.BooleanField(default=True)