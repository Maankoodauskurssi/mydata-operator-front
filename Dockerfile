# node:latest is needed for the latest node / npm
FROM node:latest

# Create working directory and run prerequisites
RUN mkdir /ui
WORKDIR /ui
COPY . /ui
RUN npm install
RUN npm run build:prod


# Expose port 3000
EXPOSE 3000

# Run
CMD ["npm", "run server"]