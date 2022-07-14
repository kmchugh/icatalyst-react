'use strict';
const { formatBytes } = require('./formatBytes');
describe('formatBytes', () => {
    it('should be defined', () => {
        expect(formatBytes).toBeDefined();
    });
    it('should correctly format numbers', () => {
        expect(formatBytes(0)).toBe('0 Bytes');
        expect(formatBytes(1)).toBe('1 Bytes');
        expect(formatBytes(10)).toBe('10 Bytes');
        expect(formatBytes(100)).toBe('100 Bytes');
        expect(formatBytes(1000)).toBe('1000 Bytes');
        expect(formatBytes(10000)).toBe('9.77 KB');
        expect(formatBytes(100000)).toBe('97.66 KB');
        expect(formatBytes(1000000)).toBe('976.56 KB');
        expect(formatBytes(10000000)).toBe('9.54 MB');
        expect(formatBytes(100000000)).toBe('95.37 MB');
        expect(formatBytes(1000000000)).toBe('953.67 MB');
        expect(formatBytes(10000000000)).toBe('9.31 GB');
        expect(formatBytes(100000000000)).toBe('93.13 GB');
        expect(formatBytes(1000000000000)).toBe('931.32 GB');
        expect(formatBytes(10000000000000)).toBe('9.09 TB');
        expect(formatBytes(100000000000000)).toBe('90.95 TB');
    });
});
