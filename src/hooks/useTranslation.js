import enStrings from '@/i18n/en.json'
import rwStrings from '@/i18n/rw.json'
import { useAppStore } from '@/store/useAppStore'

const translations = { en: enStrings, rw: rwStrings }

export const useTranslation = () => {
  const language = useAppStore((s) => s.language)
  const t = (key) => {
    const keys = key.split('.')
    let result = translations[language]
    for (const k of keys) {
      if (!result) return key
      result = result[k]
    }
    return result || key
  }
  return { t, language }
}
