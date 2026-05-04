export function SegmentedControl({ ariaLabel, className = '', onChange, options, value }) {
  const controlClassName = ['segmented-control', className].filter(Boolean).join(' ');

  return (
    <div className={controlClassName} role="radiogroup" aria-label={ariaLabel}>
      {options.map((option) => (
        <button
          aria-pressed={value === option.value}
          className="segmented-control-button"
          key={option.value}
          onClick={() => onChange(option.value)}
          type="button"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
