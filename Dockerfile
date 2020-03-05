FROM node:latest

ADD package.json /tmp/package.json
ADD package-lock.json /tmp/package-lock.json

RUN cd /tmp && npm install -s && \
    mkdir -p /code && cp -a /tmp/node_modules /code/

COPY . /code
WORKDIR /code

CMD ["npm", "start"]

EXPOSE 3000
