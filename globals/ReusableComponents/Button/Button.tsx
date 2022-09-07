import Styles from './Button.module.css';

type Props = {
  active?: boolean,
  className?: string | undefined,
  children?: React.ReactNode,
  disabled?: boolean,
  onClick: React.MouseEventHandler<HTMLButtonElement>
};

const Button = ({
  active, className, children, onClick, disabled,
}: Props) => (
  <button
    type="button"
    className={`${className} ${Styles.button} ${active ? 'active' : ''} element-popping-out`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>

);

Button.defaultProps = {
  active: false,
  className: '',
  children: null,
  disabled: false,
};

export default Button;
