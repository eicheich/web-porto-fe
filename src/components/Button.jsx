export default function Button({ as: Element = 'button', variant = 'secondary', className = '', children, ...props }) {
  return (
    <Element
      {...(Element === 'button' && !props.type ? { type: 'button' } : {})}
      {...props}
      className={`ui-button ${variant === 'primary' ? 'ui-button-primary' : variant === 'text' ? 'ui-button-text' : 'win98-raised'} ${className}`}
    >
      {children}
    </Element>
  );
}
