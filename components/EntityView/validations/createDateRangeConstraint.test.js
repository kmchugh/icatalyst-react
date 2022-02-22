import {createDateRangeConstraint} from './createDateRangeConstraint';

const NOW = 1645502313515;
const BEFORE = 1645102313515;
const AFTER = 1645702313515;
const DEFINITION = {
  fields : {
    'start' : {
      'id' : 'start'
    },
    'end' : {
      'id' : 'end'
    }
  }
};

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
    }, null, DEFINITION)).toBe(null);

    expect(sut({}, {
      id: 'end'
    }, null, DEFINITION)).toBe(null);
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
    }, null, DEFINITION)).toBe('start is required');

    expect(sut({}, {
      id: 'end'
    }, null, DEFINITION)).toBe('end is required');
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
    }, NOW, DEFINITION)).toBe(null);
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
    }, NOW, DEFINITION)).toBe(null);
  });

  it('will fail if a start date is passed and an end date is set to before the start', ()=>{
    const sut = createDateRangeConstraint({
      startFieldID : 'start',
      endFieldID : 'end',
      requireStart : true,
      requireEnd : false
    });

    expect(sut({
      start : BEFORE,
      end : AFTER,
    }, {
      id: 'start'
    }, AFTER, DEFINITION)).toBe('start must be before end');
  });

  it('will display the display labels appropriately on failure', ()=>{
    const sut = createDateRangeConstraint({
      startFieldID : 'start',
      endFieldID : 'end',
      requireStart : true,
      requireEnd : false
    });

    expect(sut({
      start : BEFORE,
      end : AFTER,
    }, {
      id: 'end',
      label : 'END FIELD'
    }, BEFORE, {
      fields : {
        start : {
          id : 'start',
          label : 'START FIELD'
        },
        end : {
          id : 'end',
          label : 'END FIELD'
        }
      }
    })).toBe('END FIELD must be after START FIELD');

    expect(sut({
      start : BEFORE,
      end : AFTER,
    }, {
      id: 'start',
      label : 'START FIELD'
    }, AFTER, {
      fields : {
        start : {
          id : 'start',
          label : 'START FIELD'
        },
        end : {
          id : 'end',
          label : 'END FIELD'
        }
      }
    })).toBe('START FIELD must be before END FIELD');
  });

  it('will fail if an end date is passed and a start date is set to before the start', ()=>{
    const sut = createDateRangeConstraint({
      startFieldID : 'start',
      endFieldID : 'end',
      requireStart : true,
      requireEnd : false
    });

    expect(sut({
      start : BEFORE,
      end : AFTER,
    }, {
      id: 'end'
    }, BEFORE, DEFINITION)).toBe('end must be after start');
  });


  it('will pass if dates are in a correct range', ()=>{
    const sut = createDateRangeConstraint({
      startFieldID : 'start',
      endFieldID : 'end',
      requireStart : true,
      requireEnd : true
    });

    expect(sut({
      start : BEFORE,
      end : AFTER,
    }, {
      id: 'end'
    }, NOW, DEFINITION)).toBe(null);

    expect(sut({
      start : BEFORE,
      end : AFTER,
    }, {
      id: 'start'
    }, NOW, DEFINITION)).toBe(null);
  });

});
