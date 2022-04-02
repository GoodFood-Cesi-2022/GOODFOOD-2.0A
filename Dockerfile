# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:latest as builder

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app/

# Install all the dependencies
RUN npm install

# Generate the build of the application
RUN npm run build

COPY . .

# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

# Copy the build output to replace the default nginx contents.
# ng config for find correct way
COPY --from=builder /usr/local/app/dist/goodfood /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]

# Expose port 80
EXPOSE 80
