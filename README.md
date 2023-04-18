# webpack

## Webpack Starter

This boilerplate is primarily an assignment from [the Odin Project](https://www.theodinproject.com/). It is basically familiarization on how to install webpack,understanding the concept behind webpack and how useful it is for web development workflow.

The Assignment also focuses on how to work around webpack and npm library and how the two works. It focuses also on the understanding behind the webpacks plugins and loaders.

LIVE SITE [HERE:](https://hello-damiro.github.io/webpack/)

</br>

## Installation procedure

---

1. Initialize npm

    ```bash
    npm init -y
    ```

    This will generate `package.json` file that wiill contain dependencies of the project. All other js library dependencies will be configured here.

2. Install webpack dev dependencies: `i` means install. `d` means dev dependency

    ```bash
    npm i -D webpack webpack-cli webpack-dev-server
    ```

3. Structure directories. Create `src` that will house source codes and `dist` that will house bundled codes of the entire project that will automatically generate by webpack.

    ```bash
    mkdir dist src src/styles src/assets src/assets/images src/assets/fonts && touch src/index.js src/template.html src/styles/style.css webpack.config.js .gitignore
    ```

    Structure:

    ```js
    dist
    src
      ┝--- assets
      |     ┝--- images
      |     |     ┕--- favicon.png
      |     ┕--- styles
      |           ┝--- reset.css
      |           ┕--- style.css
      ┝--- index.js
      ┕--- template.html
    .gitignore
    README.md
    webpack.config.js
    ```

4. Open the newly created `webpack.config.js` file. This will house configurations of webpack. Put the following onto this file.

    ```js
    const path = require('path');

    module.exports = {
        mode: 'production', // environment: use 'development' if necessary. // use 'development' if necessary. Production mode will make the output files minified/uglified. Development mode, will not.
        entry: {
            bundle: path.resolve(__dirname, 'src/index.js'),  // main source file
        },
        output: {
            filename: '[name].js',  // '[name]-[contenthash].js', // will inherit the name from the entry
            path: path.resolve(__dirname, 'dist'),
            clean: true, // delete exess files every issues of build command
        },
        devtool: 'source-map', // filename.map.js files use for debugging
        devServer: {
            static: {
                directory: path.resolve(__dirname, 'dist'),
            },
            port: 8080,
            open: true, // open browser
            hot: true, // hot reload
            compress: true, // enable gzip compression
            historyApiFallback: true, // enable browser history fallback
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

    a. Add `source` *key:value* pair, since webpack will replace the `main` with its file

    ```json
    "source": "./src/template.html",
    ```

    where:

    ```json
    "main": "webpack.config.js",
    ```

    b. The following are suggested scripts inside `scripts` array contains keywords to be used for workflow automation in development.

    ```json
    "scripts": {
        "dev": "webpack-dev-server --open",
        "deploy": "webpack",
        "clean": "rm -rf dist/*",
        "build": "npm run clean && npm run deploy",
    },
    ```

    c. to use the scripts

    ```bash
    npm run dev
    npm run build
    ```

6. By default, only JS files are being taken care of webpack. We need plugins to take care of HTML, CSS, images and other files for our project to work synchronously. To handle HTML files, we need to install a plugin called `html-webpack-plugin`

    ```bash
    npm i -D html-webpack-plugin
    ```

    Configure `html-webpack-plugin` on `webpack.config.js`

    ```js
    const path = require('path');
    const HtmlWebpackPlugin = require('html-webpack-plugin'); // Dont forget this!

    module.exports = {
        ...
        plugins: [
            new HtmlWebpackPlugin({
                title: 'Webpack Boilerplate', // Title that will reflect of HTML file
                filename: 'index.html', // dist/index.html
                template: 'src/template.html', // src/template.html
                favicon: 'src/assets/images/favicon.png', // favicon
            }),
        ],
    };
    ```

    By default `html-webpack-plugin` doesnt support fetching the images inside the html file itself. There are 3 options to tackle this issue:

    a. `html-webpack-plugin` is using the a loader with lodash template syntax - to make the loader aware of the image you can use this syntax: `<img src="<%= require('./logo.png' %>">`

    b. Another option is to use a different webpack loader which supports automatic html parsing and resource loading - one example for that is the `html-loader`

    c. The third option is to use the `copy-webpack-plugin` to copy the files to the dist folder

    _We choose #2, Install `html-loader`_

    ```bash
    npm i -D html-loader
    ```

    Configure `html-loader` on `webpack.config.js`

    ```js
    module.exports = {
        ...
        module: {
            rules: [
                {
                    // HTML LOADER THAT CAN FETCH IMG IN ITS FILE
                    test: /\.html$/,
                    use: ['html-loader'],
                },
                ...
            ],
        },
    }
    ```

7. To enable hot relaod for HTML files while developing on `src` directory, configure `liveReload: true` on `webpack.config.js` devServer parameter. Notice that live reload will only work when `hot` is `false`

    ```js
    module.exports = {
        ...
        devServer: {
            ...
            hot: false, // hot reload
            liveReload: true, // if this is true, hot should be false.
            ...
        },
        ...
    }
    ```

8. **Jest** for Test Driven Development

    ```bash
    npm i -D jest jest-cli
    ```

    This requires babel. Also, script on `package.json`

    ```json
    "scripts": {
        ...
        "test": "jest --verbose ./src/js/",
    },
    ```

9. **CSS loaders**

    ```bash
    npm i -D style-loader css-loader
    ```

    Confiigure CSS loader at `webpack.config.js`

    ```js
    module.exports = {
        ...
        module: {
            rules: [
                {
                    // IMAGE LOADERS
                    test: /\.(png|jpg|jpeg|gif|svg)$/i,
                    type: 'asset/resource',
                },
                {
                    // CSS LOADERS WITH MODULES
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1, // applies CSS modules on @imported resources
                                modules: true, // enable CSS modules
                            },
                        },
                    ],
                    include: /\.module\.css$/,
                },
                {
                    // CSS LOADERS ONLY
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
                    exclude: /\.module\.css$/,
                },
            ],
        },
    ]
    ```

    Import on `index.js` file the `style.css`

    ```js
    import './styles/style.css';
    ...
    ```

10. **SCSS loader**

    ```bach
    npm i -D sass sass-loader
    ```

    Confiigure SCSS loader at `webpack.config.js`, replace both `test` from CSS LOADERS WITH MODULES and CSS LOADERS ONLY

    ```js
    test: /\.scss$/,
    ```

11. Install **Babel** for backwards compatibility of some JS new features for    older browsers such as `type='module'` in `<script type='module' src='/' defer>` script tag

    ```bash
    npm i -D babel-loader @babel/core @babel/preset-env
    ```

    Confiigure Babel loader at `webpack.config.js`

    ```js
    module.exports = {
        ...
        module: {
            rules: [
                ...
                {
                    // BABEL LOADERS
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        },
                    },
                },
            ]
        },
    },
    ```

12. On main index file `index.js` include the following line to use hot reload much like how the _live server_ extension of vs code is doing

    ```js
    import { tripler } from './module';
    if (module.hot) module.hot.accept(); // for hot reloading
    console.log('Hello damiro ' + tripler(5));
    ```

    a. Create a `module.js` to simulate imports of JS files

    ```js
    export function tripler(x) {
        return x * 3;
    }
    ```

13. House the files that you dont want to be on github, such as the `node_modules` or maybe the `dist` directory if youo you dont plan to make a preview website on github.io

    ```text
    node_modules
    ```

From here it is optional if we may continue to use tailwind CSS. Check out `tailwind` branch on this repo.

</br>

## Deploying to gIthub.io pages

---

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

OPTIONAL: Add a script in `package.json` to automate deployment to github pages

```json
"scripts": {
    ...
    "push": "git subtree push --prefix dist origin gh-pages"
},
```
