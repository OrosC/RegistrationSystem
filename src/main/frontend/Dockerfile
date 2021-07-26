FROM NODE:13.0-alpine
WORKDIR /react/app

ENV PATH /react/app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

COPY . ./
RUN npm start