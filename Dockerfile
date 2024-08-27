#node block
FROM node:20-alpine AS build
WORKDIR /newapp
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


#ngnix block
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./* 
COPY --from=build /newapp/build .
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
