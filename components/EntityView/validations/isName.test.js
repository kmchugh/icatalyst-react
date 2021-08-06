import {isName} from './isName';

describe('Field Validations: Name', () => {

  it('fails for invalid types', () => {
    const expectedInvalidType = expect.stringContaining('Field Name must be a text value');
    const expectedLengthError = expect.stringContaining('Field Name must be at least 4 characters');

    expect(isName({}, {label : 'Field Name'})).toEqual(expectedLengthError);
    expect(isName({}, {label : 'Field Name'}, undefined)).toEqual(expectedLengthError);
    expect(isName({}, {label : 'Field Name'}, null)).toEqual(expectedLengthError);
    expect(isName({}, {label : 'Field Name'}, 1234567890)).toEqual(expectedInvalidType);
  });

  it('passes for valid inputs', () => {

    expect(isName({}, {label : 'Field Name'}, 'aaaa')).toBe(null);
    expect(isName({}, {label : 'Field Name'}, 'test')).toBe(null);
    expect(isName({}, {label : 'Field Name'}, 'test_test')).toBe(null);
    expect(isName({}, {label : 'Field Name'}, 't_-_t')).toBe(null);
    expect(isName({}, {label : 'Field Name'}, 'a test name')).toBe(null);
    expect(isName({}, {label : 'Field Name'}, 'abcdefghijklmnopqrstuvwxyz')).toBe(null);
    expect(isName({}, {label : 'Field Name'}, 'éèëáàåäöčśžłíżńęøáýąóæšćôı')).toBe(null);
    expect(isName({}, {label : 'Field Name'}, 'τσιαιγολοχβςανنيرحبالтераб')).toBe(null);
    expect(isName({}, {label : 'Field Name'}, 'иневоаслкłјиневоцедањеволс')).toBe(null);
    expect(isName({}, {label : 'Field Name'}, 'рглсывызтоμςόκιναςόγο')).toBe(null);
    expect(isName({}, {label : 'Field Name'}, 'Иванов Василий Аксёнович')).toBe(null);
    expect(isName({}, {label : 'Field Name'}, 'అఆఇఈఉఊఋఌఎఏఐఒఓఔౠౡ')).toBe(null);
    expect(isName({}, {label : 'Field Name'}, 'కఖగఘఙచఛజఝఞటఠడఢణతథదధనపఫబభమయరఱలళవశషసహ')).toBe(null);
    expect(isName({}, {label : 'Field Name'}, 'ABC導字會')).toBe(null);
    
  });

  it('fails for invalid inputs', () => {
    const expectedInvalidCharError = expect.stringContaining('Field Name can contain only letters');
    const expectedInvalidCapsError = expect.stringContaining('Field Name must start and end with letters or numbers');
    const expectedLengthError = expect.stringContaining('Field Name must be at least 4 characters');

    expect(isName({}, {label : 'Field Name'}, '')).toEqual(expectedLengthError);
    expect(isName({}, {label : 'Field Name'}, ' ')).toEqual(expectedLengthError);
    expect(isName({}, {label : 'Field Name'}, '  ')).toEqual(expectedLengthError);
    expect(isName({}, {label : 'Field Name'}, '   ')).toEqual(expectedLengthError);

    expect(isName({}, {label : 'Field Name'}, 'a')).toEqual(expectedLengthError);
    expect(isName({}, {label : 'Field Name'}, 'aa')).toEqual(expectedLengthError);
    expect(isName({}, {label : 'Field Name'}, 'aaa')).toEqual(expectedLengthError);

    expect(isName({}, {label : 'Field Name'}, '_test_')).toEqual(expectedInvalidCapsError);
    expect(isName({}, {label : 'Field Name'}, '_test')).toEqual(expectedInvalidCapsError);
    expect(isName({}, {label : 'Field Name'}, 'test_')).toEqual(expectedInvalidCapsError);
    expect(isName({}, {label : 'Field Name'}, '_test_')).toEqual(expectedInvalidCapsError);
    expect(isName({}, {label : 'Field Name'}, ' test ')).toEqual(expectedInvalidCapsError);
    expect(isName({}, {label : 'Field Name'}, ' test')).toEqual(expectedInvalidCapsError);
    expect(isName({}, {label : 'Field Name'}, 'test ')).toEqual(expectedInvalidCapsError);
    expect(isName({}, {label : 'Field Name'}, '-test-')).toEqual(expectedInvalidCapsError);
    expect(isName({}, {label : 'Field Name'}, 'test-')).toEqual(expectedInvalidCapsError);
    expect(isName({}, {label : 'Field Name'}, '-test')).toEqual(expectedInvalidCapsError);

    expect(isName({}, {label : 'Field Name'}, 'te!@#$%^&*()_+st')).toEqual(expectedInvalidCharError);
    expect(isName({}, {label : 'Field Name'}, '!@#$%^&*()_+')).toEqual(expectedInvalidCapsError);
  });

});
