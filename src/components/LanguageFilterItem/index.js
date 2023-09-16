// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, onFilteringLanguage} = props
  const {language, id, isActive} = languageDetails
  const languageClassName = isActive ? 'active-language' : 'inactive-language'

  const onClickingLanguage = () => {
    onFilteringLanguage(id)
  }

  return (
    <li>
      <button className={languageClassName} onClick={onClickingLanguage}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
