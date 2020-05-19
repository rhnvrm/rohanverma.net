+++
title = "Self hosted Netlify using docker-compose, gitea, and drone-ci"
date = 2019-11-16T15:30:03+05:30
draft = true
tags = ["golang", "docker", "self hosted"]
categories = ["tutorials"]
type = "post"
url = "blog/2019/11/16/selfhosted-netlify"
author = "Rohan Verma"
+++

I had been using netlify to deploy a few of my static sites. The process for
deployment is seamless and all you need to do is push to master. Pushing to 
the develop branch or creating a pull request on github creates a mirror 
with a unique URL which can be used to preview the site.

It worked well, but I often feel that I will eventually be tied down or stuck
to the service. One day the pricing will change or the service will
disappear. Also, for my small static sites, the features it offers are too much. 

I also wanted to setup CI/CD for my other projects, and setting up my own CI/CD
pipeline and migrating static sites would be a good easy step to start. 

This article is derived from [Self-hosting with Docker](https://blog.ssdnodes.com/blog/self-hosting-handbook/) by [Joel Hans](https://blog.ssdnodes.com/blog/author/joel/). I might skip a few details, which are covered there.

```yaml
version: '2'

services:

  proxy:
    image: jwilder/nginx-proxy
    container_name: proxy
    restart: unless-stopped
    labels:
      com.github.jrcs.letsencrypt_nginx_proxy_companion.nginx_proxy: "true"
    volumes:
      - /var/run/docker.sock:/tmp/docker.sock:ro
      - certs:/etc/nginx/certs:rw
      - vhost.d:/etc/nginx/vhost.d
      - html:/usr/share/nginx/html
      - ./uploadsize.conf:/etc/nginx/conf.d/uploadsize.conf:ro
    ports:
      - "80:80"
      - "443:443"
    networks:
      - "default"
      - "proxy-tier"

  proxy-letsencrypt:
    image: jrcs/letsencrypt-nginx-proxy-companion
    container_name: letsencrypt
    restart: unless-stopped
    environment:
      - NGINX_PROXY_CONTAINER=proxy
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
    volumes_from:
      - "proxy"
    depends_on:
      - "proxy"
    networks:
      - "default"
      - "proxy-tier"

  portainer:
    image: portainer/portainer
    container_name: portainer
    restart: always
    environment:
      - VIRTUAL_HOST=docker.rohanverma.net
      - LETSENCRYPT_HOST=docker.rohanverma.net
      - LETSENCRYPT_EMAIL=hello@rohanverma.net
    volumes:
      - ./portainer/:/data
      - /var/run/docker.sock:/var/run/docker.sock
    privileged: true
    ports:
      - "9000:9000"

  gitea:
    image: gitea/gitea:latest
    container_name: gitea
    restart: unless-stopped
    environment:
      - VIRTUAL_HOST=gitea.rohanverma.net
      - LETSENCRYPT_HOST=gitea.rohanverma.net
      - LETSENCRYPT_EMAIL=hello@rohanverma.net
      - VIRTUAL_PORT=3000
      - ROOT_URL=https://gitea.rohanverma.net
      - DOMAIN=gitea.rohanverma.net
      - PROTOCOL=http
      - USER_UID=1000
      - USER_GID=1000
    volumes:
      - ./gitea:/data
    ports:
      - "5000:3000"
      - "222:22"
    networks:
      - proxy-tier
      - default

  drone:
    container_name: drone
    image: drone/drone:latest
    restart: always
    environment:
      - DRONE_GITEA_SERVER=https://gitea.rohanverma.net
      - DRONE_GIT_ALWAYS_AUTH=false
      - DRONE_RUNNER_CAPACITY=3
      - DRONE_SERVER_HOST=drone.rohanverma.net
      - DRONE_SERVER_PROTO=https
      - DRONE_TLS_AUTOCERT=false
      - DRONE_RPC_SECRET=xxxxxxxx
      - DRONE_GITEA_CLIENT_ID=xxxxxxxxxxxxxxxxx
      - DRONE_GITEA_CLIENT_SECRET=xxxxxxxxxxxxxxxxxx
      - VIRTUAL_HOST=drone.rohanverma.net
      - VIRTUAL_PORT=80
      - DRONE_USER_CREATE=username:rhnvrm,admin:true
      - DRONE_DEBUG=true
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ./drone:/data
    privileged: true
    ports:
      - "5151:80"
    networks:
      - default

  drone-agent:
    container_name: drone-agent
    image: drone/agent:latest
    command: agent
    restart: always
    depends_on:
      - drone
    privileged: true
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    environment:
      - DRONE_RPC_SERVER=https://drone.rohanverma.net
      - DRONE_RPC_SECRET=xxxxxxxx
      - DRONE_RUNNER_CAPACITY=3
      - DRONE_RUNNER_NAME="local"
    networks:
      - default

  rohanvermanet:
    container_name: rohanvermanet
    build:
      dockerfile: Dockerfile
      context: ../apps/rohanverma.net
    ports:
      - "8080:80"
    environment:
      - VIRTUAL_HOST=rohanverma.net
      - LETSENCRYPT_HOST=rohanverma.net
      - LETS_ENCRYPT_EMAIL=hello@rohanverma.net

 nextrohanvermanet:
    container_name: nextrohanvermanet
    build:
      dockerfile: Dockerfile
      context: ../apps/next.rohanverma.net
    ports:
      - "8079:80"
    environment:
      - VIRTUAL_HOST=next.rohanverma.net
      - LETSENCRYPT_HOST=next.rohanverma.net
      - LETS_ENCRYPT_EMAIL=hello@rohanverma.net

volumes:
  certs:
  vhost.d:
  html:

networks:
  proxy-tier:

```

The drone.yml file

```yml
---
kind: pipeline
type: docker
name: default

steps:
    - name: ssh commands for rohanverma.net
    image: appleboy/drone-ssh
    when:
        branch:
        - master
    settings:
        host: 159.89.175.2
        username: deploy
        port: 22
        key:
        from_secret: ssh_key
        script_stop: true
        script:
        - cd /home/rhnvrm/apps/rohanverma.net
        - git fetch origin
        - git checkout origin/master
        - cd /home/rhnvrm/proxy
        - docker-compose build rohanvermanet
        - docker-compose up -d rohanvermanet

    - name: ssh commands for next.rohanverma.net
    image: appleboy/drone-ssh
    when:
        branch:
        - develop
    settings:
        host: 159.89.175.2
        username: deploy
        port: 22
        key:
        from_secret: ssh_key
        script_stop: true
        script:
        - cd /home/rhnvrm/apps/next.rohanverma.net
        - git fetch origin
        - git checkout origin/develop
        - cd /home/rhnvrm/proxy
        - docker-compose build nextrohanvermanet
        - docker-compose up -d nextrohanvermanet
```