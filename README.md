# webpack

## Webpack Assignment Submission for Odin

This assignment is basically familiarization on how to install webpack, the concept behind webpack and how useful it is for web development.

LIVE SITE [HERE:](https://hello-damiro.github.io/webpack/)

</br>

## Installation procedure

1. Initialize npm

    ```bash
    npm init -y
    ```

    This will generate `package.json` file that wiill contain dependencies of the project. All other js library dependencies will be configured here.

2. Install dev dependencies

    ```bash
    npm install webpack webpack-cli -D
    npm install webpack-dev-server -D
    ```

3. Structure directories. Create `src` that will house source codes and `dist` that will house bundled codes of the entire project that will automatically generate by webpack.

    ```js
    dist
      |--- bundle.js // create to test, delete after
      |--- index.html // include script tag for bundle.js
    node_modules
    src
      |--- index.js
      |--- module.js
    .gitignore
    package-lock.json
    package.json
    README.md
    webpack.config.js
    ```

4. Create `webpack.config.js` file. This will house configurations of webpack

    ```js
    const path = require('path');

    module.exports = {
        mode: 'development', // environment: use 'production' if necessary
        entry: './src/index.js', // main source file
        output: {
            filename: 'bundle.js', // bundled file
            path: path.resolve(__dirname, 'dist'),
        },
        devServer: {
            static: {
                directory: path.resolve(__dirname, 'dist'),
            },
            port: 8080,
            hot: true,
        },
    };
    ```

5. `package.json` should contain the following

    ```json
    {
        "name": "webpack",
        "version": "1.0.0",
        "description": "Webpack Assignment Submission for Odin",
        "main": "index.js",
        "scripts": {
            "dev": "webpack-dev-server",
            "build": "webpack"
        },
        "author": "",
        "license": "ISC",
        "devDependencies": {
            "webpack": "^5.77.0",
            "webpack-cli": "^5.0.1",
            "webpack-dev-server": "^4.13.2"
        }
    }
    ```

    a. Scripts inside `scripts` array contains keywords to be

    ```json
    "scripts": {
        "dev": "webpack-dev-server",
        "build": "webpack",
    },
    ```

    to use the scripts

    ```bash
    npm run dev
    npm run build
    ```

6. On main index file `index.js` include the following line to use hot reload much like how the _live server_ extension of vs code is doing

    ```js
    import { tripler } from './module';

    if (module.hot) module.hot.accept(); // include this

    console.log('Hello damiro ' + tripler(5));
    ```

</br>

## Deploying to gIthub.io pages

Original article [here:](https://gist.github.com/cobyism/4730490)

Assume that we need to publish `dist` directory to github pages

1. Make sure git knows about your subtree (the subfolder with your site).

```bach
git add dist && git commit -m "Initial dist subtree commit"
```

2. Use subtree push to send it to the `gh-pages` branch on GitHub

```bach
git subtree push --prefix dist origin gh-pages
```

Just make sure `dist` is the folder name containing the deployment files
