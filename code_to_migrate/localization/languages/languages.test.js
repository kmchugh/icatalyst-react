import languages from './languages';


describe('languages', ()=>{

  it('determines which languages are rtl', ()=>{

    expect(Object.keys(languages).length).toEqual(182);

    expect(languages['en'].rtl).toEqual(false);
    expect(languages['ar'].rtl).toEqual(true);

  });

});
