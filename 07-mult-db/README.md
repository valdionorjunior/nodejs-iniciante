
## --- CONFIGURAÇÕES PARA PARA INSTALAR IMAGENS NO DOCKER VIA TERMINAL
## - POSTGRES

docker run \
    --name postgres \                 ## nome do serviço docker imagem
    -e POSTGRES_USER=junior \         ## cria variavel de ambiente para configura use do banco
    -e POSTGRES_PASSWORD=Bwi280281* \ ## cria variavel de ambiente para configura senha do banco
    -e POSTGRES_DB=heroes \           ## cria variavel de ambiente para configura nome  do banco
    -p 5432:5432 \                    ## configura a porta inter:externa(expoe)
    -d \                              ## coloca para roda em segundo plano  
    postgres                          ## Passa o nome da imagem para baixar                  

    docker ps                         ##  lista o que esta rodando no docker(processos)
    docker exec -it postgre/bin/bash  ## entra na bash do container imagem postgres para rodar comandos

    ## rode o "psql" na bash para verificarse está funcionando - No minimo deve dizer que o o usuario "root" nao existe

## - interface para se trabalhar com o postgres - imagem concorrente - saia do outro container "exit" e rode comando abaixo

    docker run \
        --name adminer \             ## nome do seriço docker imagem
        -p 8080:8080 \               ## porta expor e rodar
        --link postgres:postgres \   ## Séra lincada, terá premissão para acessar a imagem postgres
        -d \                         ## rodando em segundo plano
        adminer                     ## Passa o nome da imagem para baixar  
                                    ## acesse a interface http://localhost:8080
                                        ## selecione o tipo de banco, no caso o postgre
                                        ## server : nome do serviço (ex: postgres)  
                                        ## user:  junior(definida na outra imagen que esta rodando)    
                                        ## password: Bwi280281*(definida na outra imagen que esta rodando)
                                        ## base de dado: heroes(nome do banco de dado definido anterior mente)
                                        ## -Logar

## - MONGODB

docker run \
    --name mongodb \                      ## nome do serviço docker imagem
    -e MONGO_INITDB_ROOT_USERNAME=admin \ ## cria variavel de ambiente para configura use do banco
    -e MONGO_INITDB_ROOT_PASSWORD=admin \ ## cria variavel de ambiente para configura senha do banco
    -p 27017:27017 \                      ## configura a porta inter:externa(expoe)
    -d \                                  ## coloca para roda em segundo plano  
    mongo:4                               ## Passa o nome da imagem para baixar  : versão   

## verifique se as 3 imagens estão rodando pelo comando (docker ps)

## - install client para mongoDB
    docker run \
        --name mongoclient \             ## nome do seriço docker imagem
        -p 3000:3000 \              ## porta expor e rodar
        --link mongodb:mongodb \    ## Séra lincada, terá premissão para acessar a imagem mongodb
        -d  \                       ## rodando em segundo plano
        mongoclient/mongoclient     ## Passa o nome da imagem para baixar  
                                    ## acesse a interface http://localhost:3000
                                        ## canto superior direito - Connect
                                        ## Create new -> abrira add Connection
                                        ## Host/port: 27017    
                                        ## Database: admin(por default)
                                        ## Aba Authentication: Scram-sha-1
                                        ## username: admin (definido na config acima)
                                        ## passaword: admin (definido na config acima)
                                        ## Authentication DB: admin
                                            ## save
                                        ## Selecione a connection -> click em Connect
## --Criar usuario de acesso a usuario

docker -it mongodb \
    mongo --host localhost -u admin -p admin --authenticationDatabase admin \ ## logue no mongo db
    --eval "db.db.getSiblingDB('heroi').createUser((user:'junior', pwd: 'Bwi280281*', rules: [{role: 'readwrite', db: herois}])) " \ 
                                        ## exeutar o eval para que o eval rode um comando dentro do mongo
                                        ## "db.db.getSiblingDB('heroi')" criando o BD
                                        ## .createUser((user:'junior', pwd: 'Bwi280281*',, rules: [{role: 'readwrite', db: herois}])) criando usuario de aplicação com permissão de leitura e escrita na tabela herois

