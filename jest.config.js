module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src'],
    setupFilesAfterEnv: ["<rootDir>/src/tests/setup.ts"],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testTimeout: 20000, 
    collectCoverage: true, 
    collectCoverageFrom: [
        "src/controllers/**/*.ts", 
        "src/services/**/*.ts", 
        "src/repositories/**/*.ts", 
        "!src/server.ts", 
        "!src/config/**", 
        "!src/tests/**", 
    ],
    coverageThreshold: {  
        global: {
            statements: 80,
            functions: 80,
            lines: 80,
        },
    },
    coverageReporters: ["text-summary", "json", "lcov", "clover"],
};