module.exports = {
    transform: {
        "^.+\\.jsx?$": "babel-jest",
    },
    testEnvironment: "jsdom",
    moduleFileExtensions: ["js", "jsx", 'json'],
    globals: {
        'react': {
            version: 'detect', // Automatically detects React version
        },
    },
    testMatch: [
        "**/src/components/consumption/**/__tests__/**/*.test.jsx",
    ],
};