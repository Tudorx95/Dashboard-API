module.exports = {
    resolve: {
        fallback: { "zlib": require.resolve("browserify-zlib") },
        
    },
    resolve: {
        fallback: { "querystring": require.resolve("querystring-es3") }
    },
    resolve: {
        fallback: { "path": require.resolve("path-browserify") }
    },
    resolve: {
        fallback: { "crypto": require.resolve("crypto-browserify") }
    },
    resolve: {
        fallback: { "stream": require.resolve("stream-browserify") }
    },
}