cd..
docker-compose down --volumes

cd .\manufacturer\
docker build -t nodejs-manufacturer .

cd..
cd .\authority\
docker build -t nodejs-authority .

cd..
cd .\customer\
docker build -t nodejs-customer .

cd ..\scripts\