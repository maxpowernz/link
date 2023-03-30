import React from 'react';
import classnames from 'classnames';

export function Count({ count, displayZero }: { count?: number; displayZero?: boolean }) {
  return (
    <>
      {(count || displayZero) && (
        <div className={classnames('flex justify-center items-center bg-blue-220-bg text-sm text-white font-medium rounded-1.5 w-6 h-4.5')}>
          {count}
        </div>
      )}
    </>
  );
}
