# specify base image 
FROM node:alpine 

# set working directory to /app in the container 
WORKDIR /app

# copy over only the package.json file 
COPY package.json ./

# install dependencies
RUN npm install

# copy over all the remainin source code 
COPY ./ ./

# set the commands to run when the container starts up
CMD ["npm", "start"]