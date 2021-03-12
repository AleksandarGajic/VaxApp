cd..

npm install -g ts-node

cd .\manufacturer\
npm install
docker build -t nodejs-manufacturer .

cd..
cd .\authority\
npm install
docker build -t nodejs-authority .

cd..
cd .\customer\
npm install
docker build -t nodejs-customer .

cd ..\scripts\