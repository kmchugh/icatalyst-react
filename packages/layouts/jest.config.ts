import { Config } from '@jest/types';

const config: Config.InitialOptions = {
    testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    testEnvironment: 'jsdom',
    rootDir: './src',
    moduleNameMapper: {
        'src/(.*)': '<rootDir>/$1'
    },
    collectCoverageFrom: [
        '<rootDir>/**/*.(t|j)s',
        '!<rootDir>/main.ts',
        '!<rootDir>/**/test/**/*.(t|j)s',
        '!<rootDir>/**/types/**/*.(t|j)s',
        '!<rootDir>/**/*.module.(t|j)s',
        '!<rootDir>/**/_gen/**/*.(t|j)s',
    ],
    coverageDirectory: '../coverage',
};
export default config;
