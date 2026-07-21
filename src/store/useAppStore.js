import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAppStore = create(
  persist(
    (set) => ({
      // Theme
      isDarkMode: false,
      toggleDarkMode: () =>
        set((state) => {
          const next = !state.isDarkMode
          if (next) document.documentElement.classList.add('dark')
          else document.documentElement.classList.remove('dark')
          return { isDarkMode: next }
        }),
      initTheme: (isDark) => {
        if (isDark) document.documentElement.classList.add('dark')
        else document.documentElement.classList.remove('dark')
      },

      // Language
      language: 'en',
      setLanguage: (lang) => set({ language: lang }),

      // Search
      searchQuery: '',
      searchCategory: '',
      searchCity: '',
      setSearchQuery: (q) => set({ searchQuery: q }),
      setSearchCategory: (c) => set({ searchCategory: c }),
      setSearchCity: (c) => set({ searchCity: c }),
      clearSearch: () => set({ searchQuery: '', searchCategory: '', searchCity: '' }),

      // Notifications
      notifications: [],
      addNotification: (n) =>
        set((state) => ({ notifications: [n, ...state.notifications] })),
      markNotificationRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        })),
      clearNotifications: () => set({ notifications: [] }),
    }),
    {
      name: 'rbc-app-store',
      partialize: (state) => ({ isDarkMode: state.isDarkMode, language: state.language }),
    }
  )
)
