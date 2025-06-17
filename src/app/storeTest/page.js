'use client';

import { useState } from 'react';
import { usePsyStore } from '../store/store';

export default function StoreTest() {
  const state = usePsyStore((state) => state.state);
  const updateState = usePsyStore((state) => state.updateState);
  
  return (
    <div className="max-w-2xl mx-auto p-6">
      Current State: {state}
      <button onClick={() => updateState(1)}>Update State</button>
    </div>
  );
}
