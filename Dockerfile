FROM nginx

RUN apt-get update >/dev/null
RUN apt-get install -qq -y curl xz-utils >/dev/null
RUN curl -s http://node.salsita.co/ | bash
RUN node_installer 10.15.3

RUN rm -rf /srv
WORKDIR /srv
COPY . /srv/
RUN cp frontend/.env.docker.example frontend/.env
RUN npm install --production
RUN npm run install:children
