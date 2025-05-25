# Use a base image (e.g., Node.js, Python, etc.)
FROM node:18 

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if using Node.js)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application
COPY . .

# Expose the port your app runs on
EXPOSE 3000 

# Define the command to start your app
CMD yarn start  # Modify based on your app's start command
