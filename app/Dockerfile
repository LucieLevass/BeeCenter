FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install
RUN npm install express mysql 

# Bundle app source
# COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]