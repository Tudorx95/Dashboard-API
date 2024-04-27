 
const webpack = require('webpack'); 
module.exports = function override(config) { 
    const fallback = config.resolve.fallback || {}; 
    Object.assign(fallback, { 
      "zlib": require.resolve("browserify-zlib"),
      "crypto": require.resolve("crypto-browserify"), 
      "stream": require.resolve("stream-browserify"), 
      "assert": require.resolve("assert"), 
      "http": require.resolve("stream-http"), 
      "https": require.resolve("https-browserify"), 
      "os": require.resolve("os-browserify"), 
      "url": require.resolve("url"),
      "querystring": require.resolve("querystring-es3"),
      "path": require.resolve("path-browserify"),
      "fs": require.resolve("memory-fs"),
      "vm": require.resolve("vm-browserify"),
      "net": require.resolve("browserify-zlib")
      }) 
   config.resolve.fallback = fallback; 
   config.plugins = (config.plugins || []).concat([ 
     new webpack.ProvidePlugin({ 
      process: 'process/browser', 
      Buffer: ['buffer', 'Buffer'] 
    }) 
   ]) 
   return config; 
}