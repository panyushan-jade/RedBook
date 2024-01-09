import { create } from 'zustand'
import { createLoginStore } from './loginStore'

export const useGlobalStore = create((...a) => ({
  ...createLoginStore(...a),
}))