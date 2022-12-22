// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {details, changeLanguage, activeTab} = props
  const {language, id} = details

  const onChangeLanguage = () => {
    changeLanguage(id)
  }

  const btnclass = activeTab ? 'design' : 'button'

  return (
    <li className="each-language">
      <button type="button" className={btnclass} onClick={onChangeLanguage}>
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
