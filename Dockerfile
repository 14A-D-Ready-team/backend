FROM node:18
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build
EXPOSE 3000
CMD ["./node_modules/.bin/mikro-orm", "schema:fresh --seed -r", "&&" ,  "npm", "run", "start:prod" ]