import { MouseEvent } from 'react';
import create from 'zustand';

interface ContextMenuStore {
  anchorPoint: { x: number; y: number };
  showContextMenu: boolean;
  handleContextMenu: (e: MouseEvent) => void;
  closeContextMenu: () => void;
}

export const useContextMenuStore = create<ContextMenuStore>((set) => ({
  anchorPoint: { x: 0, y: 0 },
  showContextMenu: false,

  handleContextMenu: (e: MouseEvent) => {
    e.preventDefault();
    set(() => ({
      anchorPoint: { x: e.pageX, y: e.pageY },
      showContextMenu: true,
    }));
  },

  closeContextMenu: () => {
    set((state) => ({
      ...state,
      showContextMenu: state.showContextMenu && false,
    }));
  },
}));
