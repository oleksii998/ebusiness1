FROM ubuntu:18.04

ARG USER_HOME="/home/user1"
ARG WORKING_DIR="${USER_HOME}/workspace"
ARG USER="user1"

RUN mkdir -p ${WORKING_DIR} && useradd -s /bin/bash ${USER} && chown -R ${USER} ${USER_HOME}
RUN apt update && apt install -y wget openjdk-8-jdk
RUN wget http://scala-lang.org/files/archive/scala-2.12.13.deb && dpkg -i scala-2.12.13.deb && apt install scala
RUN wget https://dl.bintray.com/sbt/debian/sbt-1.4.9.deb && dpkg -i sbt-1.4.9.deb && apt install sbt

COPY --chown=${USER} . ${WORKING_DIR}
USER ${USER}
WORKDIR ${WORKING_DIR}

VOLUME ["${WORKING_DIR}"]

EXPOSE 80