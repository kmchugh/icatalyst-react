import React, {createContext, useMemo, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {setLanguage} from '../store/actions/language.actions';
import {useDispatch} from 'react-redux';
import {languages, getPreferredLanguage} from './languages';

export const LocalizationContext = createContext();

const formatString = (str, ...parameters)=>{
  return str.replace(/{(\d+)}/g, function(match, number) {
    return typeof parameters[number] !== 'undefined'
      ? parameters[number]
      : match;
  });
};

const LocalizationProvider = ({
  children,
  loadLanguages = null,
  debug = false
})=>{
  const dispatch = useDispatch();

  const [initialised, setInitialised] = useState(loadLanguages === null);
  const [availableVocabularies, setAvailableVocabularies] = useState([]);
  const [selectedVocabCode, setSelectedVocabCode] = useState(getPreferredLanguage());
  const [selectedVocabulary, setSelectedVocabulary] = useState(null);

  useEffect(()=>{
    if (loadLanguages) {
      const {
        getAll = ()=>[],
      }  = loadLanguages;
      getAll(dispatch, (err, res)=>{
        if (!err) {
          setAvailableVocabularies(res.map(v=>{
            return {
              ...v,
              ...languages[v.code]
            };
          }));
        }
      });
    } else {
      setInitialised(true);
    }
  }, []);

  useEffect(()=>{
    if (availableVocabularies.length > 0) {
      const vocabs = availableVocabularies.filter((v)=>{
        return v.code === selectedVocabCode.toLowerCase() || v.code.startsWith(selectedVocabCode.substring(0, 2));
      }).sort((a, b)=>a.code.length - b.code.length);

      // Get the most preferential match
      if (vocabs.length > 0) {
        const {
          get = ()=>{},
        }  = loadLanguages;

        get(dispatch, vocabs[0].id, (err, res)=>{
          if (!err) {
            setSelectedVocabulary(res);
          }
          setInitialised(true);
        });
      } else {
        setInitialised(true);
      }
    } else {
      setInitialised(true);
    }
  }, [availableVocabularies, setSelectedVocabCode]);

  const setLocalisation = (name, translations)=>{
    dispatch(setLanguage({
      selected : name,
      vocabulary : translations
    }));
    // TODO: Only after response
    setInitialised(true);
  };

  const t = useMemo(()=>{
    return (value, ...parameters)=>{
      if (!value) {
        return value;
      }

      const text = selectedVocabulary?.values[value.toLowerCase()];
      if (!text && debug) {
        console.info(`'${value}' not found in lookup for ${selectedVocabCode}`);
      }
      return formatString(text || value, ...parameters);
    };
  }, [initialised, selectedVocabulary]);

  return (
    <LocalizationContext.Provider value={{
      t : t,
      setLanguage : (name, translations)=>{
        setLocalisation(name, translations);
      }
    }}>
      { initialised && children}
    </LocalizationContext.Provider>
  );
};

LocalizationProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  initialise : PropTypes.func,
  loadLanguages : PropTypes.shape({
    getAll : PropTypes.func.isRequired,
    get : PropTypes.func.isRequired
  }),
  debug : PropTypes.bool
};

export default LocalizationProvider;
