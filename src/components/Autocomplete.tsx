import { ChangeEvent, FC, KeyboardEvent, useEffect, useState } from 'react';
import { CountryType } from '../types';

type AutocompleteProps = {
  label: string;
  placeholder: string;
  suggestions: CountryType[];
  setValue: (value: CountryType) => void;
};

const Autocomplete: FC<AutocompleteProps> = ({ label, placeholder, suggestions, setValue }) => {
  const [activeSuggestion, setActiveSuggestion] = useState<number>(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState<CountryType[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>('');

  useEffect(() => {
    const filterData = async () => {
      const results = await suggestions.filter(item =>
        item.name.toLowerCase().includes(userInput.toLowerCase())
      );

      setFilteredSuggestions(results);
    };

    filterData();
  }, [userInput, suggestions]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const userInput = e.currentTarget.value;
    setActiveSuggestion(0);
    setUserInput(userInput);
    setShowSuggestions(!!userInput);
  };

  const onClick = (item: CountryType) => {
    setActiveSuggestion(0);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    setUserInput(item.name);
    setValue(item);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.keyCode === 13) { // Enter
      setActiveSuggestion(0);
      setShowSuggestions(false);
      setUserInput(filteredSuggestions[activeSuggestion].name);
      setValue(filteredSuggestions[activeSuggestion]);
      e.preventDefault();
    } else if (e.keyCode === 38) { // Up
      if (activeSuggestion === 0) {
        return;
      }
      setActiveSuggestion(activeSuggestion - 1);
    } else if (e.keyCode === 40) { // Down
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }
      setActiveSuggestion(activeSuggestion + 1);
    }
  };

  const highlightText = (text: string, highlight: string) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <b key={i}>{part}</b>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  let suggestionsList;

  if (showSuggestions && userInput) {
    if (filteredSuggestions.length > 0) {
      suggestionsList = (
        <ul className="list-group">
          {filteredSuggestions.map((suggestion, index) => {
            let className;

            if (index === activeSuggestion) {
              className = 'suggestion-active';
            }

            return (
              <li className={`list-group-item ${className}`} key={suggestion.id} onClick={() => onClick(suggestion)}>
                {highlightText(suggestion.name, userInput)}
              </li>
            );
          })}
        </ul>
      );
    } else {
      suggestionsList = (
        <div className="no-suggestions">
          <em>No suggestions available.</em>
        </div>
      );
    }
  }

  return (
    <>
      <div className="suggestions mb-3">
        <div className='form-floating'>
          <input
            type="text"
            className='suggestions--input form-control'
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={userInput}
            placeholder={placeholder}
          />
          {
            label && (
              <label className={`form-label`}>
                {label}
              </label>
            )
          }
        </div>
        <div className={`suggestions--list ${!showSuggestions ? 'no-suggestions' : 'has-suggestions'}`}>
          {suggestionsList}
        </div>
      </div>
    </>
  );
};

export default Autocomplete;
