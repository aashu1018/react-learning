export default {
    testEnvironment: 'jsdom',
    testMatch: ['<rootDir>/food-ordering-app/tests/components/**/*.spec.js'],
    setupFiles: ['<rootDir>/food-ordering-app/tests/components/setup.js'],
    transform: {
        '\\.js$': [
            'babel-jest',
            {
                babelrc: false,
                configFile: false,
                presets: [
                    ['@babel/preset-env', { targets: { node: 'current' } }],
                    ['@babel/preset-react', { runtime: 'automatic' }],
                ],
            },
        ],
    },
    // Parcel-only `url:` imports (e.g. the logo) don't exist outside Parcel.
    moduleNameMapper: { '^url:.*$': '<rootDir>/food-ordering-app/tests/components/fileStub.js' },
};
