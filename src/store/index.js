import useUserDataStore from './userData'
import useSidebarStore from './sidebar  '

// 统一导出useStore方法
export default function useStore() {
  return {
    user: useUserDataStore(),
    sidebar: useSidebarStore(),
  }
}