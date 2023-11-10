# #
# FROM ubuntu:22.04

# RUN sudo apt install -y nodejs
# RUN sudo npm imstall -g yarn


FROM node:16

COPY ./package.json /myfolder/
COPY ./yarn.lock /myfolder/
WORKDIR /myfolder/
RUN yarn install

COPY . /myfolder/

RUN yarn build

CMD yarn start

