# Variable

VPATH=src:ops:build

webpack=node_modules/.bin/webpack

src=$(shell find src -type f -name "*.js")
#contracts=$(shell find contracts -type f -name "*.json")

$(shell mkdir -p build)

# Rules

all: dharma-api.js

clean:
	rm -rf build/*

dharma-api.js: node-modules webpack.js $(src)
	$(webpack) --config ./ops/webpack.js

node-modules: package.json
	yarn install
	touch build/node-modules
