import { isURL } from './isURL';
describe('Validations: URL', () => {
    it('fails for invalid types', () => {
        // @ts-expect-error
        expect(isURL()).toBe(false);
        expect(isURL(undefined)).toBe(false);
        expect(isURL(null)).toBe(false);
        // @ts-expect-error
        expect(isURL(1234567890)).toBe(false);
    });
    it('passes for valid inputs', () => {
        expect(isURL('http://www.google.com')).toBe(true);
        expect(isURL('https://www.google.com')).toBe(true);
        expect(isURL('https://www.google.com?param=1')).toBe(true);
        expect(isURL('https://www.google.com?param=1&param=2')).toBe(true);
        expect(isURL('https://www.google.com?param=1&param=2#stuff')).toBe(true);
        expect(isURL('https://www.google.com/')).toBe(true);
        expect(isURL('https://www.google.com/?param=1')).toBe(true);
        expect(isURL('https://www.google.com/?param=1&param=2')).toBe(true);
        expect(isURL('https://www.google.com/?param=1&param=2#stuff')).toBe(true);
        expect(isURL('https://www.google.com/index.html')).toBe(true);
        expect(isURL('https://www.google.com/index.html?param=1')).toBe(true);
        expect(isURL('https://www.google.com/index.html?param=1&param=2')).toBe(true);
        expect(isURL('https://www.google.com/index.html?param=1&param=2#stuff')).toBe(true);
        expect(isURL('https://192.168.0.1')).toBe(true);
        expect(isURL('https://192.168.0.1:9001')).toBe(true);
        expect(isURL('http://somewhere.com/pathxyz/file(1).html')).toBe(true);
    });
    it('fails for invalid inputs', () => {
        expect(isURL('')).toBe(false);
        expect(isURL(' ')).toBe(false);
        expect(isURL('ftp://something.com')).toBe(false);
        expect(isURL('file://localhost/etc/hosts')).toBe(false);
        expect(isURL('http://президент.рф..../')).toBe(false);
    });
});
