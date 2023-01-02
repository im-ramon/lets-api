
#  `Api do App Let's!`



## Versões das ferreamentas utilizadas:

| npm | node | type-script | docker | docker compose |
| --- | --- | --- | --- | --- |
| 8.8.0 | v16.16.0 | 4.8.4 | 20.10.17 | 2.10.2 |

   
## Configurações inciais (desenvolvimento)

#### 1. Instalações dos pacotes pelo npm:

```
npm install
```

#### 2. Docker:

```
docker compose up -d
```
```
docker compose exec -t db /bin/bash
```
```
su postgres
```
```
psql
```
```
CREATE USER letsadmin WITH ENCRYPTED PASSWORD 'password_here';
ALTER USER letsadmin WITH createdb;
ALTER DATABASE lets OWNER TO letsadmin;
```

#### 3. Configurar a JWT SECRET, no arquivo .env:
```
JWT_SECRET=<secret>
```

#### 4. Rodar as migrations em ambiente de desenvolvimento:
```
npx prisma migrate dev
```
