FROM node:0.10.40

WORKDIR /opt

COPY ./src /opt/src
COPY ./Gruntfile.js /opt/Gruntfile.js
COPY ./package.json /opt/package.json
COPY ./config/default.js /opt/config/default.js

ENV LC_ALL en_US.UTF-8
ENV LANG en_US.UTF-8

RUN \
  echo "en_US.UTF-8 UTF-8" > /etc/locale.gen && \
  apt-get update && \
  apt-get install -y locales && \
  update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8 && \
  apt-get install -y ruby ruby-dev && \
  apt-get autoremove -y && \
  apt-get clean && \
  gem install premailer hpricot nokogiri sass && \
  npm install -g grunt-cli && \
  npm install

ENTRYPOINT ["grunt"]
CMD []
