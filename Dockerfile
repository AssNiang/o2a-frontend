# stage 1
FROM node:14 as node
WORKDIR /app
COPY . .
#RUN npm install
RUN npm install

RUN npm run build --prod

# Stage 2
FROM nginx:alpine
COPY --from=node /app/dist/o2a /usr/share/nginx/html

EXPOSE 80

# CMD [ "npm", "start" ]
