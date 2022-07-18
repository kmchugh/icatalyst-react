import {createURLConstraint} from './createURLConstraint';

describe('Field Validations: URL', ()=>{

  it('creates a function', ()=>{
    const sut = createURLConstraint(0, 1);
    expect(typeof sut).toBe('function');
  });

  it('defaults to requiring https', ()=>{
    const sut = createURLConstraint();
    expect(sut({}, {label: 'Field Name'}, 'http://www.google.com')).toBe('Field Name must be a secured url (https)');
    expect(sut({}, {label: 'Field Name'}, 'https://www.google.com')).toBe(null);
  });

  it('will pass on a null value provided', ()=>{
    const sut = createURLConstraint();
    expect(sut({}, {label: 'Field Name'}, null)).toBe(null);
    expect(sut({}, {label: 'Field Name'}, undefined)).toBe(null);
    expect(sut({}, {label: 'Field Name'}, '12')).not.toBe(null);
  });

  it('will pass an appropriate error message based requireHTTPS', ()=>{
    let sut = createURLConstraint(false);
    expect(sut({}, {label: 'Field Name'}, 'http://www.google.com')).toBe(null);
    expect(sut({}, {label: 'Field Name'}, 'https://www.google.com')).toBe(null);

    sut = createURLConstraint(true);
    expect(sut({}, {label: 'Field Name'}, 'http://www.google.com')).toBe('Field Name must be a secured url (https)');
    expect(sut({}, {label: 'Field Name'}, 'https://www.google.com')).toBe(null);
  });

});
