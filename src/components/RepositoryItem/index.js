// Write your code here
import './index.css'

const RepositoryItems = props => {
  const {details} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = details

  return (
    <div className="repo-container">
      <img src={avatarUrl} alt={name} className="image-dimen" />
      <h1 className="repo-heading">{name}</h1>
      <div className="val-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="mini-img"
        />
        <p className="para">{starsCount}</p>
      </div>

      <div className="val-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          className="mini-img"
          alt="forks"
        />
        <p className="para">{forksCount}</p>
      </div>

      <div className="val-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          className="mini-img"
          alt="open issues"
        />
        <p className="para">{issuesCount}</p>
      </div>
    </div>
  )
}

export default RepositoryItems
