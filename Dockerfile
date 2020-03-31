FROM node:latest

ADD package.json /tmp/package.json
ADD yarn.lock /tmp/yarn.lock

RUN cd /tmp && yarn install -s && \
    mkdir -p /code && cp -a /tmp/node_modules /code/

COPY . /code
WORKDIR /code

CMD ["npm", "start"]

EXPOSE 3000
