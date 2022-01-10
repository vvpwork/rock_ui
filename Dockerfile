# FROM node:16.13 AS builder

# WORKDIR /home/node
# COPY --chown=node:node . .

# RUN npm i -g yarn
# USER node

# # ARG BASE_URL='https://burency.com'
# # ENV REACT_APP_BASE_URL=$BASE_URL

# RUN yarn install
# RUN yarn build

FROM nginx:mainline-alpine

COPY build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
ENTRYPOINT ["nginx","-g","daemon off;"]