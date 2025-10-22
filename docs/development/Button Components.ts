// Base Button Interface
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost' | 'danger';
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
}

// Primary Button - Main actions
export const PrimaryButton: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  ...props
}) => {
  return (
    <button
      className={cn(
        'btn',
        `btn-${variant}`,
        `btn-${size}`,
        isLoading && 'btn-loading'
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <LoadingSpinner size="sm" />}
      {children}
    </button>
  );
};

// Usage Examples
<PrimaryButton variant="primary" size="lg">
  Connect Exchange
</PrimaryButton>

<PrimaryButton variant="secondary" size="sm" isLoading>
  Processing...
</PrimaryButton>

<PrimaryButton variant="ghost" size="xs" leftIcon={<IconSync />}>
  Sync Now
</PrimaryButton>