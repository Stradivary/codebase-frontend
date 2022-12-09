FROM telkomindonesia/alpine:nodejs-8.9.3

ENV BABEL_DISABLE_CACHE=1
WORKDIR /usr/src/app
COPY . .
RUN npm install && npm run build
EXPOSE 4000
USER user

CMD ["npm", "start"]

