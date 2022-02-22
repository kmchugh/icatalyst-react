import {createDateRangeConstraint} from './createDateRangeConstraint';

const now = 1645502313515;
const before = 1645102313515;
const after = 1645702313515;

describe('Field Validations: DateRange Constraint', ()=>{

  it('requires startFieldID and endFieldID parameters', ()=>{
    // startFieldName and endFieldName are required
    expect(()=>createDateRangeConstraint({}))
      .toThrow('startFieldID and endFieldID must be specified');

    expect(()=>createDateRangeConstraint({
      startFieldID : 'test'
    })).toThrow('startFieldID and endFieldID must be specified');

    expect(()=>createDateRangeConstraint({
      endFieldID : 'test'
    })).toThrow('startFieldID and endFieldID must be specified');
  });

  it('creates a function', ()=>{
    const sut = createDateRangeConstraint({
      startFieldID : 'test',
      endFieldID : 'test'
    });
    expect(typeof sut).toBe('function');
  });

  it('will pass on a null value provided', ()=>{
    const sut = createDateRangeConstraint({
      startFieldID : 'start',
      endFieldID : 'end',
    });

    expect(sut({}, {
      id: 'start'
    }, null)).toBe(null);

    expect(sut({}, {
      id: 'end'
    }, null)).toBe(null);
  });

  it('will fail on a null value provided when not allowed', ()=>{
    const sut = createDateRangeConstraint({
      startFieldID : 'start',
      endFieldID : 'end',
      requireStart : true,
      requireEnd : true
    });

    expect(sut({}, {
      id: 'start'
    }, null)).toBe('start is required');

    expect(sut({}, {
      id: 'end'
    }, null)).toBe('end is required');
  });


  it('will pass if a start date is passed and an end date is not required and not set', ()=>{
    const sut = createDateRangeConstraint({
      startFieldID : 'start',
      endFieldID : 'end',
      requireStart : true,
      requireEnd : false
    });

    expect(sut({}, {
      id: 'start'
    }, now)).toBe(null);
  });

  it('will pass if an end date is passed and an start date is not required and not set', ()=>{
    const sut = createDateRangeConstraint({
      startFieldID : 'start',
      endFieldID : 'end',
      requireStart : false,
      requireEnd : true
    });

    expect(sut({}, {
      id: 'end'
    }, now)).toBe(null);
  });

  it('will fail if a start date is passed and an end date is set to before the start', ()=>{
    const sut = createDateRangeConstraint({
      startFieldID : 'start',
      endFieldID : 'end',
      requireStart : true,
      requireEnd : false
    });

    expect(sut({
      start : before,
      end : after,
    }, {
      id: 'start'
    }, after)).toBe('start must be before end');
  });

  it('will display the display labels appropriately on failure', ()=>{
    const sut = createDateRangeConstraint({
      startFieldID : 'start',
      endFieldID : 'end',
      requireStart : true,
      requireEnd : false,
      startFieldLabel : '[start]',
      endFieldLabel : '[end]',
    });

    expect(sut({
      start : before,
      end : after,
    }, {
      id: 'end'
    }, before)).toBe('end must be after [start]');

    expect(sut({
      start : before,
      end : after,
    }, {
      id: 'start'
    }, after)).toBe('start must be before [end]');
  });

  it('will fail if an end date is passed and a start date is set to before the start', ()=>{
    const sut = createDateRangeConstraint({
      startFieldID : 'start',
      endFieldID : 'end',
      requireStart : true,
      requireEnd : false
    });

    expect(sut({
      start : before,
      end : after,
    }, {
      id: 'end'
    }, before)).toBe('end must be after start');
  });


  it('will pass if dates are in a correct range', ()=>{
    const sut = createDateRangeConstraint({
      startFieldID : 'start',
      endFieldID : 'end',
      requireStart : true,
      requireEnd : true
    });

    expect(sut({
      start : before,
      end : after,
    }, {
      id: 'end'
    }, now)).toBe(null);

    expect(sut({
      start : before,
      end : after,
    }, {
      id: 'start'
    }, now)).toBe(null);
  });

});
