import { useState, useEffect } from 'react'
import { getStoredLanguage, setStoredLanguage, getTranslation, LANGUAGES } from '../utils/language.js'

export const useLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState(getStoredLanguage())
  
  // Listen for language changes from other components
  useEffect(() => {
    const handleLanguageChange = (event) => {
      setCurrentLanguage(event.detail.language)
    }
    
    window.addEventListener('languageChanged', handleLanguageChange)
    return () => window.removeEventListener('languageChanged', handleLanguageChange)
  }, [])
  
  const changeLanguage = (language) => {
    setCurrentLanguage(language)
    setStoredLanguage(language)
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('languageChanged', {
      detail: { language }
    }))
  }
  
  const t = (key) => getTranslation(key, currentLanguage)
  
  return {
    currentLanguage,
    changeLanguage,
    t,
    isEnglish: currentLanguage === LANGUAGES.en,
    isChinese: currentLanguage === LANGUAGES.zh
  }
}

