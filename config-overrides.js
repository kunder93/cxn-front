const path = require('path')

module.exports = function override(config, env) {
    console.log('React app rewired works!')

    // Fix for "fs" module (commonly used for server-side code)
    config.resolve.fallback = { fs: false }

    // Exclude react-datepicker from source-map-loader checks
    config.module.rules.push({
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: [
            // Add other problematic packages here if needed
            path.join(__dirname, 'node_modules/react-datepicker')
        ]
    })

    return config
}
