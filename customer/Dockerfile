#Author: Ajitabh Sharma
#Date:
# Use an official Node.js runtime as the base image
FROM node:21

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY ./package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the project files to the working directory
COPY . .

# Expose a port if your Node.js application listens on a specific port
EXPOSE 3000

WORKDIR /app
# Specify the command to run your Node.js application
CMD [ "node", "customer_service.js" ]
