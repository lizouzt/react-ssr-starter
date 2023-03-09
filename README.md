<h1 align="center">react-ssr-starter</h1>

## Prerequisites

- [Node.js](https://nodejs.org/en/download/): `^14.17.0` or `>=16.0.0`

## Getting Started

```sh
npm install -g commitizen

yarn install # or npm install

yarn dev # or npm run dev
```

## Scripts

| Script              | Description                                                                       |
| ------------------- | --------------------------------------------------------------------------------- |
| `dev`               | Runs your app on the development server at `localhost:9090`. HMR will be enabled. |
| `build`             | Bundles both server-side and client-side files.                                   |
| `build:server`      | Bundles server-side files in production mode and put it to the `build`.           |
| `build:client`      | Bundles client-side files in production mode and put it to the `public`.          |
| `start`             | Runs your app after bundled.                                                      |
| `test`              | Runs testing.                                                                     |
| `docker`            | Builds then run docker.                                                           |
| `docker:build`      | Builds docker.                                                                    |
| `docker:run`        | Runs docker.                                                                      |
| `gen` or `generate` | Generate React component automatic based on template.                             |

## Environment Variables

Your project can consume variables declared in your environment as if they were declared locally in your JS files. By default you will have `NODE_ENV` defined for you, and you can define any other variables that you want but for the React app, your variables name must be have `REACT_APP_` prefix.

> WARNING: Do not store any secrets (such as private API keys) in your React app!
>
> Environment variables are embedded into the build, meaning anyone can view them by inspecting your app's files.

To define permanent environment variables, create a file called .env in the root of your project:

```
# For node
PRIVATE_CODE=123456

# For React app
REACT_APP_NOT_SECRET_CODE=abcdef
```

> NOTE: You need to restart the development server after changing `.env` files.

### What other `.env` files can be used?

- `.env`: Default.
- `.env.local`: Local overrides. This file is loaded for all environments except test.
- `.env.development`, `.env.test`, `.env.production`: Environment-specific settings.
- `.env.development.local`, `.env.test.local`, `.env.production.local`: Local overrides of environment-specific settings.

Or you can add custom `.env` path in `webpack/webpack.config.base.js`:

```js
const DotenvWebpackPlugin = require('./plugins/dotenv-webpack-plugin');

// webpack config
{
  ...,
  plugins: [
    ...,
    new DotenvWebpackPlugin({
      path: './custom-env',
      isWeb: true|false,
    }),
  ],
}
```

Please refer to the [dotenv](https://github.com/motdotla/dotenv) documentation for more details.

### Expanding Environment Variables In .env

Expand variables already on your machine for use in your .env file (using [dotenv-expand](https://github.com/motdotla/dotenv-expand)).

For example, to get the environment variable npm_package_version:

```
REACT_APP_VERSION=$npm_package_version
# also works:
# REACT_APP_VERSION=${npm_package_version}
```

Or expand variables local to the current .env file:

```
DOMAIN=www.example.com
REACT_APP_FOO=$DOMAIN/foo
REACT_APP_BAR=$DOMAIN/bar
```

> **NOTE:** Support [Google Search Console verification code](https://www.youtube.com/watch?v=RktlwdM3k1s) with `GOOGLE_SITE_VERIFICATION` environment variable.

## Configurations

### Basic

You can store your configurations in `src/configs/client.js` for client-side, `src/configs/server.js` for server-side. `src/configs/constants.js` is for constants.

You can access the correct configuration with:

```js
import configs from 'configs/client'; // for client-side
import configs from 'configs/server'; // for server-side
import constants from 'configs/constants';

// ...
```

### Advanced

You can adjust various development and production settings by setting environment variables in your shell or with [.env](#environment-variables).

> Note: You do not need to declare `REACT_APP_` before the below variables as you would with custom environment variables.

| Variable                  | Development | Production | Usage                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ------------------------- | ----------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `BROWSER`                 | ✅ Used     | 🚫 Ignored | By default, Create React App will open the default system browser, favoring Chrome on macOS. Specify a [browser](https://github.com/sindresorhus/open#app) to override this behavior, or set it to `none` to disable it completely. If you need to customize the way the browser is launched, you can specify a node script instead. Any arguments passed to `npm start` will also be passed to this script, and the url where your app is served will be the last argument. Your script's file name must have the `.js` extension. |
| `BROWSER_ARGS`            | ✅ Used     | 🚫 Ignored | When the `BROWSER` environment variable is specified, any arguments that you set to this environment variable will be passed to the browser instance. Multiple arguments are supported as a space separated list. By default, no arguments are passed through to browsers.                                                                                                                                                                                                                                                          |
| `PORT`                    | ✅ Used     | 🚫 Ignored | By default, the development web server will attempt to listen on port 9090 or prompt you to attempt the next available port. You may use this variable to specify a different port.                                                                                                                                                                                                                                                                                                                                                 |
| `IMAGE_INLINE_SIZE_LIMIT` | ✅ Used     | ✅ Used    | By default, images smaller than 10,000 bytes are encoded as a data URI in base64 and inlined in the CSS or JS build artifact. Set this to control the size limit in bytes. Setting it to `0` will disable the inlining of images.                                                                                                                                                                                                                                                                                                   |
| `ESLINT_NO_DEV_ERRORS`    | ✅ Used     | 🚫 Ignored | When set to `true`, ESLint errors are converted to warnings during development. As a result, ESLint output will no longer appear in the error overlay.                                                                                                                                                                                                                                                                                                                                                                              |
| `DISABLE_ESLINT_PLUGIN`   | ✅ Used     | ✅ Used    | When set to `true`, [eslint-webpack-plugin](https://github.com/webpack-contrib/eslint-webpack-plugin) will be completely disabled.                                                                                                                                                                                                                                                                                                                                                                                                  |

## Adding Styles

The starter supports CSS, SASS and [CSS modules](https://github.com/css-Modules/css-Modules) is auto enabled for all files the `[name].module.*` naming convention. I use [PostCSS](https://github.com/webpack-contrib/postcss-loader) plugin to parse CSS and add autoprefixer to your stylesheet. You can access your stylesheet with two ways.

```css
/* custom button style */

.Button {
  padding: 20px;
}
```

### With CSS modules

```jsx
import styles from './styles.module.scss';

function Button() {
  return <div className={styles.Button} />;
}
```

### Without CSS modules

```jsx
import './styles.scss';

function Button() {
  return <div className='Button' />;
}
```

You can also add the vendor CSS frameworks or global styles, just import it through the `src/client/app/index.jsx` file (app root component). For example:

```jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import '<your-global-styles>.css';

function App() {
  // ...
}
```

## Adding Images, Fonts, and Files

With webpack, using static assets like images and fonts works similarly to CSS.

You can **`import`** **a file right in a JavaScript module**. This tells webpack to include that file in the bundle. Unlike CSS imports, importing a file gives you a string value. This value is the final path you can reference in your code, e.g. as the `src` attribute of an image or the `href` of a link to a PDF.

To reduce the number of requests to the server, importing images that are less than 10,000 bytes returns a [data URI](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs) instead of a path. This applies to the following file extensions: bmp, gif, jpg, jpeg, and png. SVG files are excluded for sprite. You can control the 10,000 byte threshold by setting the `IMAGE_INLINE_SIZE_LIMIT` environment variable.

Here is an example:

```js
import React from 'react';
import logo from './logo.png'; // Tell webpack this JS file uses this image

console.log(logo); // /70a4f6b392fa19ff6912.png

function Header() {
  // Import result is the URL of your image
  return <img src={logo} alt='Logo' />;
}

export default Header;
```

This ensures that when the project is built, webpack will correctly move the images into the build folder, and provide us with correct paths.

This works in CSS too:

```css
.Logo {
  background-image: url(./logo.png);
}
```

### Adding SVGs

One way to add SVG files was described in the section above. You can also import SVGs directly as React components. You can use either of the two approaches. In your code it would look like this:

```js
import { ReactComponent as Logo } from './logo.svg';

function App() {
  return (
    <div>
      {/* Logo is an actual React component */}
      <Logo />
    </div>
  );
}
```

## Generators

### Usage

- npm

  ```sh
  npm run gen component "<component_name>"

  npm run generate component "<component_name>"
  ```

- Yarn

  ```sh
  yarn gen component "<component_name>"

  yarn generate component "<component_name>"
  ```

### Example

```sh
yarn gen component "hello world"

# or npm run gen component "hello world"
```

Output: `/src/client/components/HelloWorld/index.jsx` will be generated. `/src/client/components/HelloWorld/__tests__/index.test.jsx` will be generated if you want add the unit testing.

### Custom

You can add template in `generators` directory.
