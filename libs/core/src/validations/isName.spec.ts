import { isName } from './isName';

describe('Validations: Name', () => {

    it('fails for invalid types', () => {
        // @ts-expect-error
        expect(isName()).toBe(false);
        expect(isName(undefined)).toBe(false);
        expect(isName(null)).toBe(false);
        // @ts-expect-error
        expect(isName(1234567890)).toBe(false);
    });

    it('passes for valid inputs', () => {
        expect(isName('test')).toBe(true);
        expect(isName('test_test')).toBe(true);
        expect(isName('t_-_t')).toBe(true);
        expect(isName('a test name')).toBe(true);
        expect(isName('abcdefghijklmnopqrstuvwxyz')).toBe(true);
        expect(isName('éèëáàåäöčśžłíżńęøáýąóæšćôı')).toBe(true);
        expect(isName('τσιαιγολοχβςανنيرحبالтераб')).toBe(true);
        expect(isName('иневоаслкłјиневоцедањеволс')).toBe(true);
        expect(isName('рглсывызтоμςόκιναςόγο')).toBe(true);
        expect(isName('Иванов Василий Аксёнович')).toBe(true);
        expect(isName('అఆఇఈఉఊఋఌఎఏఐఒఓఔౠౡ')).toBe(true);
        expect(isName('కఖగఘఙచఛజఝఞటఠడఢణతథదధనపఫబభమయరఱలళవశషసహ')).toBe(true);
        expect(isName('ABC導字會')).toBe(true);
    });

    it('fails for invalid inputs', () => {
        expect(isName('')).toBe(false);
        expect(isName(' ')).toBe(false);
        expect(isName('  ')).toBe(false);
        expect(isName('   ')).toBe(false);
        expect(isName('_test_')).toBe(false);
        expect(isName('_test')).toBe(false);
        expect(isName('test_')).toBe(false);
        expect(isName(' test ')).toBe(false);
        expect(isName(' test')).toBe(false);
        expect(isName('test ')).toBe(false);
        expect(isName('-test-')).toBe(false);
        expect(isName('-test')).toBe(false);
        expect(isName('test-')).toBe(false);
    });

});
