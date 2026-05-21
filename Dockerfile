FROM node:18-alpine as firststage
WORKDIR /myapp
MAINTAINER "Dudekula Karthik"
LABEL app="we are selling world costly racing bikes"
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 3000



FROM firststage as finalstage
RUN npm install --production
COPY . .
CMD ["node","index.js"]
