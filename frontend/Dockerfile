################### Stage 1 – build React ###################
FROM node:18-alpine AS builder
WORKDIR /src

# 1 – package files for dependency cache
COPY package*.json ./
RUN npm ci

COPY .env.production .env
COPY . .

RUN npm run build

################### Stage 2 – serve with NGINX ##############
FROM nginx:alpine

COPY nginx-spa.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /src/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
