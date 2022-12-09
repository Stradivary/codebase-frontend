import path from 'path';

export const cssDev = {
  loader: 'css-loader',
  options: {
    modules: false,
    sourceMap: true,
    url: { filter: (url) => url.charAt(0) === '.' },
  }
};

export const cssProd = {
  loader: 'css-loader',
  options: {
    modules: false,
    sourceMap: true,
    url: { filter: (url) => url.charAt(0) === '.' },
  }
};

export const cssModuleDev = {
  loader: 'css-loader',
  options: {
    modules: {
      getLocalIdent: ({ resourcePath }, localIdentName, localName) => {
        const [file, component, type] = resourcePath.split(path.sep).reverse();

        return `${type.slice(0, 2)}-${component}__${localName}`;
      },
    },
    sourceMap: true,
    url: { filter: (url) => url.charAt(0) === '.' },
  }
};

export const cssModuleProd = {
  loader: 'css-loader',
  options: {
    modules: true,
    sourceMap: true,
    url: { filter: (url) => url.charAt(0) === '.' },
  }
};

export const postCssDev = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: [
        require('autoprefixer'),
      ],
    },
    sourceMap: true,
  },
};

export const postCssProd = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: [
        require('autoprefixer'),
      ],
    },
    sourceMap: true,
  }
};

export const postCssModuleDev = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: [
        require('autoprefixer'),
      ],
    },
    sourceMap: true,
  }
};

export const postCssModuleProd = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: [
        require('autoprefixer'),
      ],
    },
    sourceMap: true,
  }
};
