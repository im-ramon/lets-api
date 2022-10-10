
#  `Api do App Let's!`



## Versões das ferreamentas utilizadas:

| npm | node | type-script |
| --- | --- | --- |
| 8.8.0 | v16.16.0 | 4.8.4 |

   
## Configurações inciais

#### 1. Instalações dos pacotes pelo npm:

```
npm install
```

#### 2. Instalando o MySQL:

```
sudo apt update
```
```
sudo apt install mysql-server
```

#### 3. Configurando o MySQL:
Para concluir a configuração, seguir o tutorial a seguir: https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04-pt

#### 4. Configurar as variáveis de ambiente do Prisma:

```
DATABASE_URL="mysql://<usuário>:<senha>@localhost:<porta_mysql>/<nome_do_banco_de_dados>"
```
- Para ver a porta do MySQL:
```
SHOW GLOBAL VARIABLES LIKE 'PORT';
```

#### 5. Configurar a JWT SECRET, no arquivo .env:
```
JWT_SECRET=<secret>
```

#### 6. Rodar as migrations em ambiente de desenvolvimento:
```
npx prisma migrate dev
```
