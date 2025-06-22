import React from 'react';

// Shared properties for both button and anchor styles
interface ButtonPropsShared {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  isLoading?: boolean;
  className?: string;
}

// Props for when the component is a native HTML button
interface ButtonElementProps extends ButtonPropsShared, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'> {
  href?: undefined;
}

// Props for when the component is an HTML anchor styled as a button
interface AnchorElementProps extends ButtonPropsShared, Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'className'> {
  href: string;
  disabled?: boolean; // 'disabled' is not native to <a> but useful for styling/behavior
}

// Combined type for the Button component
export type ButtonProps = ButtonElementProps | AnchorElementProps;

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  isLoading = false,
  ...allProps // Contains href (if anchor), disabled, type (if button), onClick, etc.
}) => {
  const baseStyles =
    'font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-background-dark transition-all duration-150 ease-in-out inline-flex items-center justify-center';

  const variantStyles = {
    primary:
      'bg-primary text-white hover:bg-primary-dark focus:ring-primary dark:bg-primary dark:hover:bg-primary-light',
    secondary:
      'bg-secondary text-white hover:bg-secondary-dark focus:ring-secondary dark:bg-secondary dark:hover:bg-secondary-light',
    outline:
      'border border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary dark:border-primary-light dark:text-primary-light dark:hover:bg-primary-light dark:hover:text-background-dark',
    ghost: 'text-primary hover:bg-primary/10 dark:text-primary-light dark:hover:bg-primary/20 focus:ring-primary',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  // Unified styles for loading/disabled states
  const interactiveStateStyles = (isDisabledOrLoading: boolean | undefined) =>
    isDisabledOrLoading ? 'opacity-75 cursor-not-allowed' : '';


  const content = (
    <>
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </>
  );
  
  const isDisabledEffective = ('disabled' in allProps && allProps.disabled) || isLoading;

  const combinedClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${interactiveStateStyles(isDisabledEffective)} ${className}`;

  if (allProps.href) {
    // Casting to AnchorElementProps to access specific anchor properties
    const { href, onClick, ...anchorSpecificProps } = allProps as AnchorElementProps;
    
    return (
      <a
        href={href}
        className={combinedClasses}
        aria-disabled={isDisabledEffective}
        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
          if (isDisabledEffective) {
            e.preventDefault();
          }
          if (onClick) {
            onClick(e);
          }
        }}
        // Filter out button-specific props that might have been passed if not using discriminated union strictly before spread
        {...anchorSpecificProps}
      >
        {content}
      </a>
    );
  } else {
    // Casting to ButtonElementProps
    const { type = 'button', onClick, ...buttonSpecificProps } = allProps as ButtonElementProps;
    return (
      <button
        type={type}
        className={combinedClasses}
        disabled={isDisabledEffective}
        onClick={onClick}
        {...buttonSpecificProps}
      >
        {content}
      </button>
    );
  }
};

export default Button;
