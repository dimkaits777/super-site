import { useSyncExternalStore } from 'react';

/**
 * Minimal dependency-free global store (useSyncExternalStore).
 * Holds cross-tree UI state so in-canvas overlay content and the
 * top-level modal/cookie overlays can talk without context bridging.
 */

let state = {
  activeModal: null, // 'privacy' | 'terms' | 'cookie' | null
};

const listeners = new Set();

function setState(patch) {
  state = { ...state, ...patch };
  listeners.forEach((l) => l());
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export const ui = {
  openModal: (name) => setState({ activeModal: name }),
  closeModal: () => setState({ activeModal: null }),
};

export function useActiveModal() {
  return useSyncExternalStore(
    subscribe,
    () => state.activeModal,
    () => null,
  );
}
