------ Docker backend commande ligne ------

1 Crée "Dockerfile" de partie backend :

        FROM node:16-alpine

        WORKDIR /app

        COPY package.json .

        RUN npm install

        COPY . .

        EXPOSE 4000

        CMD ["node" , "server.js"]

2 Crée Network : 

    docker network create liv-app

3 Executez un container basé sur l'image mongo

    docker container run -d --name livraison-db -v livraison-db:/data/db --network liv-app mongo

4 Crée image :

    docker build -t livraison-back-test .

5_ Exécutez un container basé sur cette image que vous venez de créer :

        docker container run -d --name api -v ${pwd}:/app -v /app/node_modules --network liv-app -p 4000:4000 api
