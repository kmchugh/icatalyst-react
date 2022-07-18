import {createLengthConstraint} from './createLengthConstraint';

describe('Field Validations: Length Constraint', ()=>{

  it('creates a function', ()=>{
    const sut = createLengthConstraint(0, 1);
    expect(typeof sut).toBe('function');
  });

  it('will pass on a null value provided', ()=>{
    const sut = createLengthConstraint(0, 1);
    expect(sut({}, {label: 'Field Name'}, null)).toBe(null);
    expect(sut({}, {label: 'Field Name'}, undefined)).toBe(null);
    expect(sut({}, {label: 'Field Name'}, '12')).not.toBe(null);
  });

  it('will pass an appropriate error message based on min constraints', ()=>{
    let sut = createLengthConstraint(0, null);
    expect(sut({}, {label: 'Field Name'}, null)).toBe(null);
    expect(sut({}, {label: 'Field Name'}, 'alphabits')).toBe(null);
    expect(sut({}, {label: 'Field Name'}, '')).toBe(null);

    sut = createLengthConstraint(10, null);
    expect(sut({}, {label: 'Field Name'}, null)).toBe(null);
    expect(sut({}, {label: 'Field Name'}, 'a')).toBe('Field Name should be at least 10 characters. [1]');
    expect(sut({}, {label: 'Field Name'}, '')).toBe('Field Name should be at least 10 characters. [0]');
  });

  it('will pass an appropriate error message based on max constraints', ()=>{
    let sut = createLengthConstraint(null, 10);
    expect(sut({}, {label: 'Field Name'}, null)).toBe(null);
    expect(sut({}, {label: 'Field Name'}, 'alphabits')).toBe(null);
    expect(sut({}, {label: 'Field Name'}, '')).toBe(null);

    sut = createLengthConstraint(null, 10);
    expect(sut({}, {label: 'Field Name'}, null)).toBe(null);
    expect(sut({}, {label: 'Field Name'}, 'abcdefghijklmnopqrstuvwxyz')).toBe('Field Name should be at most 10 characters. [26]');
    expect(sut({}, {label: 'Field Name'}, '')).toBe(null);
  });

  it('will pass an appropriate error message based on between constraints', ()=>{
    let sut = createLengthConstraint(1, 10);
    expect(sut({}, {label: 'Field Name'}, null)).toBe(null);
    expect(sut({}, {label: 'Field Name'}, 'alphabits')).toBe(null);
    expect(sut({}, {label: 'Field Name'}, '')).toBe('Field Name should be 1 to 10 characters. [0]');

    sut = createLengthConstraint(5, 15);
    expect(sut({}, {label: 'Field Name'}, null)).toBe(null);
    expect(sut({}, {label: 'Field Name'}, 'abcdefghijklmnopqrstuvwxyz')).toBe('Field Name should be 5 to 15 characters. [26]');
    expect(sut({}, {label: 'Field Name'}, '')).toBe('Field Name should be 5 to 15 characters. [0]');
  });

});
