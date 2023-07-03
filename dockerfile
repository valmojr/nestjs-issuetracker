# Use an official Node.js runtime as a base image
FROM node
# Set the working directory inside the container
WORKDIR /app
# Copy the package.json and package-lock.json files to the container
COPY package*.json ./
# Install the application dependencies
RUN npm install
# Copy the rest of the application source code to the container
COPY . .
# Expose the port on which your Nest.js application is listening
EXPOSE 3500
# Define the command to start your Nest.js application in development mode
CMD ["npm", "run", "start:dev"]