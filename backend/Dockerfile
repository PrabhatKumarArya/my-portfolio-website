FROM node:22

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y \
    libnss3 \
    libnspr4 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libxkbcommon0 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libgbm1 \
    libasound2 \
    libpangocairo-1.0-0 \
    libpango-1.0-0 \
    libgtk-3-0 \
    ca-certificates \
    fonts-liberation \
    wget \
    xdg-utils


# copy only package files first
COPY backend/package*.json ./backend/

WORKDIR /usr/src/app/backend
RUN npm install

WORKDIR /usr/src/app

# copy full project (node_modules excluded by .dockerignore)
COPY . .

EXPOSE 3000

CMD ["node", "backend/server.js"]
# FROM node:22

# WORKDIR /usr/src/app

# # copy backend first
# COPY backend ./backend

# WORKDIR /usr/src/app/backend

# RUN npm install

# WORKDIR /usr/src/app

# COPY . .

# EXPOSE 3000

# CMD ["node", "backend/server.js"]

# FROM node:22

# ENV PUPPETEER_SKIP_DOWNLOAD=true

# WORKDIR /usr/src/app

# RUN apt-get update && apt-get install -y \
#     wget \
#     ca-certificates \
#     fonts-liberation \
#     libnss3 \
#     libxss1 \
#     libasound2 \
#     libatk-bridge2.0-0 \
#     libgtk-3-0 \
#     libgbm-dev
# # Copy only backend package files first

# RUN ls -R /usr/src/app/backend

# COPY backend/package*.json ./backend/

# # install inside backend folder
# WORKDIR /usr/src/app/backend
# RUN npm install

# # go back to root and copy rest of project
# WORKDIR /usr/src/app
# COPY . .

# EXPOSE 3000

# CMD ["node", "backend/server.js"]

# FROM node:22-bullseye

# ENV PUPPETEER_SKIP_DOWNLOAD=true

# WORKDIR /usr/src/app

# RUN apt-get update && apt-get install -y \
#     wget \
#     ca-certificates \
#     fonts-liberation \
#     libnss3 \
#     libxss1 \
#     libasound2 \
#     libatk-bridge2.0-0 \
#     libgtk-3-0 \
#     libgbm-dev
    
# COPY backend/package*.json ./backend/
# WORKDIR /usr/src/app/backend
# RUN npm install

# # go back and copy full project
# WORKDIR /usr/src/app
# COPY . .

# EXPOSE 3000

# CMD ["node", "backend/server.js"]