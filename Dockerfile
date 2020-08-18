FROM nginx
ENTRYPOINT []

RUN apt-get update >/dev/null
RUN apt-get install -qq -y curl xz-utils >/dev/null
RUN curl -s http://node.salsita.co/ | bash
RUN node_installer 10.15.3

RUN rm -rf /srv && useradd -md /srv -s /bin/bash foosball
USER foosball
WORKDIR /srv
ADD --chown=foosball:foosball . /srv/

RUN cp frontend/.env.docker.example frontend/.env
RUN npm install
RUN npm run install:children
RUN cd frontend && npm run build && cd ..
