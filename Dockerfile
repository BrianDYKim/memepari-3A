FROM node:18-alpine

WORKDIR /opt/app

COPY package*.json ./

RUN npm install

RUN npm install -g pm2

COPY . .

EXPOSE 4000

ENV PORT=4000 \
    MONGODB_URL="mongodb+srv://brian:5wesome@5wesome-mongo.b26pfrp.mongodb.net/?retryWrites=true&w=majority" \
    MODE="prod" \
    APPLICATION_NAME="밈팔이닷컴 3A 백엔드 문서" \
    APPLICATION_DESCRIPTION="밈팔이닷컴 3A(인증/인가/접근제어) 로직을 관리하는 서버 문서입니다!" \
    APPLICATION_VERSION="1.0.0" \
    SWAGGER_USER="brian" \
    SWAGGER_PASSWORD="5wesome" \
    JWT_SECRET="5wesome-secret"

RUN npm run build

CMD ["pm2-runtime", "dist/main.js"]
