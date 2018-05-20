set -e

#https://github.com/reactivestack/parcel-react-ssr/blob/master/package.json

#build client
./node_modules/.bin/cross-env BABEL_ENV=client parcel build src/index.html -d dist/static --public-url /static

#build server
./node_modules/.bin/cross-env BABEL_ENV=server parcel build src/server.js -d dist/static --public-url /static --target=node10

mv dist/static/server.js dist/
mv dist/static/server.map dist/

