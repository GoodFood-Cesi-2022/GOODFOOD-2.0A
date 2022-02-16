# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:latest as builder

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app/

# Install all the dependencies
RUN npm install && npm run build && npm cache clean --force 

COPY . .

# Generate the build of the application
RUN npm run build 

# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:alpine

# Copy the build output to replace the default nginx contents.
# ng config for find correct way
COPY --from=builder /usr/local/app/dist/goodfood /usr/share/nginx/html

# Expose port 4200
EXPOSE 4200

ENTRYPOINT ["nginx", "-g", "daemon off;"]