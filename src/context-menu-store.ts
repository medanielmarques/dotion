import { MouseEvent } from 'react';
import create from 'zustand';

interface ContextMenuStore {
  anchorPoint: { x: number; y: number };
  showContextMenu: boolean;
  selectedItemId: string;
  handleContextMenu: (e: MouseEvent, selectedItemId: string) => void;
  closeContextMenu: () => void;
}

export const useContextMenuStore = create<ContextMenuStore>((set) => ({
  anchorPoint: { x: 0, y: 0 },
  showContextMenu: false,
  selectedItemId: '',

  handleContextMenu: (e: MouseEvent, selectedItemId: string) => {
    e.preventDefault();
    set(() => ({
      anchorPoint: { x: e.pageX, y: e.pageY },
      showContextMenu: true,
      selectedItemId,
    }));
  },

  closeContextMenu: () => {
    set((state) => ({
      ...state,
      showContextMenu: state.showContextMenu && false,
    }));
  },
}));
