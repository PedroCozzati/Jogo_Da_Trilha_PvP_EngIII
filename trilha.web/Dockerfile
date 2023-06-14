FROM node:18.13-alpine AS build
RUN mkdir -p /trilha
WORKDIR /trilha
COPY package.json /trilha
RUN npm install
COPY . /trilha
RUN npm run build

FROM nginx:alpine
COPY --from=build /trilha/dist/trilha.web /usr/share/nginx/html