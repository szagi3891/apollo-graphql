set -e

#https://github.com/reactivestack/parcel-react-ssr/blob/master/package.json

#build client
./node_modules/.bin/cross-env BABEL_ENV=client parcel build src/index.html -d dist/client --public-url /dist

#build server
./node_modules/.bin/cross-env BABEL_ENV=server parcel build src/server.js -d dist/server --public-url /dist --target=node10