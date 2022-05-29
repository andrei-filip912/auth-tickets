FROM node:alpine

WORKDIR /app
COPY package.json .
#--only=prod # flag ignores the dev dependencies
RUN npm install --only=prod #
COPY . .

CMD ["npm", "start"]