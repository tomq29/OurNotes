# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=20.14.0

FROM node:${NODE_VERSION}-alpine

# Use production node environment by default.
ENV NODE_ENV production


WORKDIR /usr/src/app

COPY package.json ./

COPY package-lock.json ./


RUN npm ci

ENV HOST=0.0.0.0

# Copy the rest of the source files into the image.
COPY . .

# Expose the port that the application listens on.
EXPOSE 80
EXPOSE 443
EXPOSE 1234

# Run the application.

RUN chmod +x app.sh

CMD [ "./app.sh"]
