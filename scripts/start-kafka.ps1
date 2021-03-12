
cd ..\kafka-server
Write-Host "Start up kafka"
docker-compose up -d

Write-Host "Create topics for apps"
cd .\ceate-topics\
npm i

Write-Host "Setting up topics"
Start-Sleep -s 5
node .\create-topic.js
cd..

cd ..\scripts\
Write-Host "Kafka started!"