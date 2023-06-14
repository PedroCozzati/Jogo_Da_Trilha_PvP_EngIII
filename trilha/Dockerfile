FROM node:latest
RUN mkdir -p /usr/src/trilha
WORKDIR '/usr/src/trilha'
COPY package.json /usr/src/trilha
RUN npm install
COPY . /usr/src/trilha
CMD npm start