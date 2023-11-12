import { DestroyRef, inject } from '@angular/core';

export const cleanUpUser = () => {
  const destroyRef = inject(DestroyRef);
  destroyRef.onDestroy(() => {
    console.log('cleaning up user');
  });
};
