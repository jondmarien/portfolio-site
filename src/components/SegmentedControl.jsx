export function SegmentedControl({ ariaLabel, className = '', onChange, options, value }) {
  const controlClassName = ['segmented-control', className].filter(Boolean).join(' ');
  const selectedIndex = options.findIndex((option) => option.value === value);
  const focusableIndex = selectedIndex >= 0 ? selectedIndex : 0;

  const handleKeyDown = (event, index) => {
    const nextIndex = getNextOptionIndex(event.key, index, options.length);

    if (nextIndex === null) {
      return;
    }

    event.preventDefault();
    onChange(options[nextIndex].value);
    event.currentTarget.parentElement?.querySelectorAll('[role="radio"]')[nextIndex]?.focus();
  };

  return (
    <div className={controlClassName} role="radiogroup" aria-label={ariaLabel}>
      {options.map((option, index) => {
        const isSelected = value === option.value;

        return (
          <button
            aria-checked={isSelected}
            className="segmented-control-button"
            key={option.value}
            onClick={() => onChange(option.value)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            role="radio"
            tabIndex={index === focusableIndex ? 0 : -1}
            type="button"
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

function getNextOptionIndex(key, index, optionCount) {
  if (optionCount === 0) {
    return null;
  }

  switch (key) {
    case 'ArrowDown':
    case 'ArrowRight':
      return (index + 1) % optionCount;
    case 'ArrowLeft':
    case 'ArrowUp':
      return (index - 1 + optionCount) % optionCount;
    case 'End':
      return optionCount - 1;
    case 'Home':
      return 0;
    default:
      return null;
  }
}
