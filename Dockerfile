# =========# 컴퓨터 만드는 설명서 # =========#

# 1. 운영체제 및 프로그램 설치
# 하나하나 입력해서 설치하는 방식~~!!
# FROM ubuntu:22.04 

# RUN sudo apt install nodejs
# RUN sudo npm install -g yarn

# 1. 운영체제 및 프로그램 설치
# 이미 리눅스, node,npm,yarn 까지 모두 깔려있는 컴퓨터를 다운받아 설치하는 방식~~!!
FROM node:16

#2. 내 원래 컴퓨터에 있는 폴더나 파일을 도커 컴퓨터 안으로 복사하기!!]

# myfolder 이름으로 폴더 만들기
# RUN mkdir myfolder 
# 이건 내 원래 컴퓨터에 있는 index.js 파일을 myfolder 폴더 안에 index.js이름으로 도커 컴퓨터 안으로 복사하기!!
# COPY ./index.js /myfolder/index.js  
# RUN mkdir myfolder. =>아래에서 복사할때 어차피 폴더 없으면 만들어서 복사하므로 이건 굳이 필요없음!!
# COPY . /myfolder/  =>지금 파일들 다 복사해서 myfolder에 넣어줌!! 
COPY ./package.json /myfolder/  
WORKDIR ./yarn.lock /myfolder/
WORKDIR /myfolder
# ==> RUN cd ./myfolder/

# doker에서 yarn install해주기!!
RUN yarn install

COPY . /myfolder/
# 3. 도커 안에서 index.js  실행시키기!
# RUN node index.js ==>실행은 안 시키고 저장하기

# 저장은 안하고 실행시키기=>CMD는 한 파일에서 한번밖에 못쓰므로 젤 마지막에 실행시킬때 씀!!
CMD yarn start:dev
