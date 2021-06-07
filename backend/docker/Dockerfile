FROM ubuntu:18.04

ARG HOME /home/user1/workspace

RUN useradd -ms /bin/bash user1
RUN apt update && apt install -y wget \
    openjdk-8-jdk \
    npm
RUN wget http://scala-lang.org/files/archive/scala-2.12.13.deb && dpkg -i scala-2.12.13.deb && apt install scala
RUN wget https://dl.bintray.com/sbt/debian/sbt-1.4.9.deb && dpkg -i sbt-1.4.9.deb && apt install sbt

COPY . ${HOME}
USER user1
WORKDIR ${HOME}

VOLUME ["${HOME}"]

EXPOSE 9000
EXPOSE 3000