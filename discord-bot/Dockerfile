# Use the official Node.js image
FROM node:18

# Set the working directory
WORKDIR /Users/samippuri/Desktop/vtHax/VT-HACKS-CIT-APP/discord-bot

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN pwd
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port your bot will run on (optional)
EXPOSE 3000

# Step 7: Define the environment variable for production
ENV NODE_ENV=production

# Command to run your bot
CMD ["node", "app.js"]