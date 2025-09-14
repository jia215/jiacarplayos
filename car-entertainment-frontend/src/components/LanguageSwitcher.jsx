import React from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Globe } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage.js'
import { LANGUAGES } from '../utils/language.js'

const LanguageSwitcher = () => {
  const { currentLanguage, changeLanguage, t } = useLanguage()
  
  const toggleLanguage = () => {
    const newLanguage = currentLanguage === LANGUAGES.zh ? LANGUAGES.en : LANGUAGES.zh
    changeLanguage(newLanguage)
  }
  
  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={toggleLanguage}
      className="ios-button-secondary flex items-center space-x-2"
      title={t('language')}
    >
      <Globe className="h-4 w-4" />
      <span className="hidden sm:inline">
        {currentLanguage === LANGUAGES.zh ? 'EN' : '中'}
      </span>
    </Button>
  )
}

export default LanguageSwitcher

