FROM node
WORKDIR /app
COPY package.json .
COPY .env .
COPY src ./src
COPY yarn.lock .
RUN yarn install
RUN apt update;\
  apt install ffmpeg -y 
CMD yarn start

