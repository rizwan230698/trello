import React from "react";
import "./Form.css";

const Form = React.forwardRef((props, ref) => {
  const {
    onSubmit,
    onKeyDown,
    value,
    onChange,
    onClick,
    placeholder,
    btnText
  } = props;
  return (
    <form onSubmit={onSubmit}>
      <textarea
        onKeyDown={onKeyDown}
        ref={ref}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <div className="action">
        <button className="action__add-button" type="submit">
          {btnText}
        </button>
        <span className="action__cross-icon" onClick={onClick}>
          &#10005;
        </span>
      </div>
    </form>
  );
});
export default Form;
