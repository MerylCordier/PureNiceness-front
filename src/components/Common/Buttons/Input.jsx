/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';

function Input({
  options, handleInputChange, handleFileChange,
}) {
  const {
    id,
    label,
    placeholder,
    value,
    // value pose un problème de changement visuel du select
    // mais est nécessaire pour mettre une valeur par défaut
    errorMessage,
    type,
    className,
    disabled,
    title,
    required,
    ariaLabel,
    format,
    pattern,
    minLength,
    maxLength,
    min,
    max,
    step,
    autoComplete,
    multiple,
    accept,
  } = options;

  const inputProps = {
    id,
    name: id,
    placeholder,
    value,
    onChange: (event) => (type === 'file' ? handleFileChange(id, event) : handleInputChange(id, event)),
    disabled,
    title,
    required,
    type: type || 'text',
    className: 'control has-icons-left has-icons-right',
    'aria-label': ariaLabel,
    ...(errorMessage && { 'aria-describedby': `${id}-help` }),
    format,
    pattern,
    minLength,
    maxLength,
    min,
    max,
    step,
    autoComplete,
    multiple,
    accept,
  };

  return (
    <div className={className}>
      {label && <label htmlFor={id} className="label">{label}</label>}
      {type === 'textarea' && (
      <textarea id={id} {...inputProps} />
      )}
      {type === 'select' && (
      <select id={id} {...inputProps}>
        {options && options.options && options.options.map((option) => (
          <option
            key={option.id}
            value={option.id}
          >
            {option.name}
          </option>
        ))}
      </select>
      )}
      {type !== 'textarea' && type !== 'select' && (
      <input type={type} id={id} {...inputProps} />
      )}
      {errorMessage && <div id={`${id}-help`} className="form-text text-danger">{errorMessage}</div>}
    </div>

  );
}

export default Input;
