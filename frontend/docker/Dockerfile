FROM ubuntu:18.04

ARG USER_HOME="/home/user1"
ARG WORKING_DIR="${USER_HOME}/workspace"
ARG USER="user1"

RUN mkdir -p ${WORKING_DIR} && useradd -s /bin/bash ${USER} && chown -R ${USER} ${USER_HOME}
RUN apt update && apt install -y curl
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash - && apt install -y nodejs

COPY --chown=${USER} . ${WORKING_DIR}
WORKDIR ${WORKING_DIR}
RUN npm install
VOLUME ["${WORKING_DIR}"]

USER ${USER}

EXPOSE 3000