import { HTMLInputTypeAttribute } from 'react';

type Props = {
  value: AcceptableInputType,
  labelText: string,
  type?: HTMLInputTypeAttribute,
  placeHolder?: string,
  id?: string,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onInput?: (e: React.FormEvent<HTMLInputElement>) => void
};

type AcceptableInputType = string | number;

const Input = ({
  value, labelText, type, placeHolder, id, onChange, onInput,
} : Props) => (
  <div className="grid grid-cols-1">
    <label
      className="mx-4 my-2 text-blue-300"
      htmlFor={id || labelText}
    >
      {labelText}
    </label>
    <input
      className="mx-4 my-2 p-2 border-2 border-blue-300"
      id={id || labelText}
      value={value}
      type={type}
      placeholder={placeHolder}
      onChange={onChange}
      onInput={onInput}
    />

  </div>
);

Input.defaultProps = {
  type: 'text',
  placeHolder: undefined,
  id: undefined,
  onChange: () => {},
  onInput: () => {},
};

export default Input;
