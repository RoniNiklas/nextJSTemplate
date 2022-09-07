type Props = {
  elIf: boolean
  children: React.ReactNode
};

const ElseIf = ({ children, elIf } : Props) => (
  <>
    {children}
  </>
);

export default ElseIf;
