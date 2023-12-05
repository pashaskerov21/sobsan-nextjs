import 'server-only'
import type { Locale } from './i18n-config'

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries = {
  az: () => import('./lang/az.json').then((module) => module.default),
  en: () => import('./lang/en.json').then((module) => module.default),
  ru: () => import('./lang/ru.json').then((module) => module.default),
}

export const getTranslate = async (locale: Locale) => dictionaries[locale]?.() ?? dictionaries.en()
