import React from 'react';

import NotStarted from '../../../../assets/icons/18x18/circle.svg';
import Complete from '../../../../assets/icons/18x18/check-circle.svg';
import Incomplete from '../../../../assets/icons/18x18/half-circle.svg';

export type StatusProps = {
  hasStarted?: boolean;
  hasCompleted?: boolean;
  hasError?: boolean;
};

export function Status({ hasStarted, hasCompleted, hasError }: StatusProps) {
  if (!hasStarted) return <NotStarted className="fill-black-86" />;

  if (hasError) return <Incomplete className="fill-error" />;
  if (hasCompleted) return <Complete className="fill-fmg-green" />;

  return <Incomplete className="fill-incomplete" />;
}
