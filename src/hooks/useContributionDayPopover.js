import { useCallback, useEffect, useMemo, useRef } from 'react';

import { formatContributionDayLabel } from '../lib/formatContributionDayLabel.js';
import { supportsInterestInvokers } from '../lib/supportsInterestInvokers.js';

export const CONTRIBUTIONS_DAY_POPOVER_ID = 'contributions-day-popover';

function readDayFromInvoker(invoker) {
  if (!(invoker instanceof HTMLElement)) {
    return null;
  }

  return {
    date: invoker.dataset.date ?? '',
    count: Number.parseInt(invoker.dataset.count ?? '0', 10) || 0,
  };
}

export function useContributionDayPopover() {
  const popoverRef = useRef(null);
  const heatmapRef = useRef(null);
  const activeCellRef = useRef(null);
  const useInterestInvokers = useMemo(() => supportsInterestInvokers(), []);

  const updatePopoverLabel = useCallback((day) => {
    const popover = popoverRef.current;
    if (!popover || !day?.date) {
      return;
    }

    popover.textContent = formatContributionDayLabel(day);
  }, []);

  const clearActiveAnchor = useCallback(() => {
    activeCellRef.current?.classList.remove('contributions-cell-anchor');
    activeCellRef.current = null;
  }, []);

  const setActiveAnchor = useCallback(
    (cell) => {
      if (activeCellRef.current === cell) {
        return;
      }

      clearActiveAnchor();
      activeCellRef.current = cell;
      cell?.classList.add('contributions-cell-anchor');
    },
    [clearActiveAnchor]
  );

  const showPopoverForCell = useCallback(
    (cell, day) => {
      const popover = popoverRef.current;
      if (!popover || !cell) {
        return;
      }

      updatePopoverLabel(day);
      setActiveAnchor(cell);

      if (typeof popover.showPopover === 'function' && !popover.matches?.(':popover-open')) {
        popover.showPopover();
      }
    },
    [setActiveAnchor, updatePopoverLabel]
  );

  const hidePopover = useCallback(() => {
    const popover = popoverRef.current;
    clearActiveAnchor();

    if (popover && typeof popover.hidePopover === 'function' && popover.matches?.(':popover-open')) {
      popover.hidePopover();
    }
  }, [clearActiveAnchor]);

  useEffect(() => {
    if (!useInterestInvokers) {
      return undefined;
    }

    const popover = popoverRef.current;
    if (!popover) {
      return undefined;
    }

    const handleInterest = (event) => {
      const invoker = event.source ?? event.target;
      const day = readDayFromInvoker(invoker);
      if (day) {
        updatePopoverLabel(day);
      }
    };

    popover.addEventListener('interest', handleInterest);
    return () => popover.removeEventListener('interest', handleInterest);
  }, [updatePopoverLabel, useInterestInvokers]);

  const handleCellPointerEnter = useCallback(
    (cell, day) => {
      if (useInterestInvokers) {
        return;
      }

      showPopoverForCell(cell, day);
    },
    [showPopoverForCell, useInterestInvokers]
  );

  const handleCellPointerLeave = useCallback(
    (event) => {
      if (useInterestInvokers) {
        return;
      }

      const nextTarget = event.relatedTarget;
      if (nextTarget instanceof Node && heatmapRef.current?.contains(nextTarget)) {
        return;
      }

      hidePopover();
    },
    [hidePopover, useInterestInvokers]
  );

  const handleCellFocus = useCallback(
    (cell, day) => {
      if (useInterestInvokers) {
        return;
      }

      showPopoverForCell(cell, day);
    },
    [showPopoverForCell, useInterestInvokers]
  );

  const handleCellBlur = useCallback(
    (event) => {
      if (useInterestInvokers) {
        return;
      }

      const nextTarget = event.relatedTarget;
      if (nextTarget instanceof Node && heatmapRef.current?.contains(nextTarget)) {
        return;
      }

      hidePopover();
    },
    [hidePopover, useInterestInvokers]
  );

  return {
    handleCellBlur,
    handleCellFocus,
    handleCellPointerEnter,
    handleCellPointerLeave,
    heatmapRef,
    popoverRef,
    useInterestInvokers,
  };
}
