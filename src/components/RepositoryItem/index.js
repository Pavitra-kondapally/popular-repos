// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repoDetails} = props
  const {name, id, issuesCount, forksCount, starsCount, avatarUrl} = repoDetails
  return (
    <li className="repo-item">
      <img src={avatarUrl} className="repo-image" />
      <h1 className="repo-name-style">{name}</h1>
      <div className="details-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          className="icon-image"
          alt="stars"
        />
        <p className="icon-text">{starsCount}</p>
      </div>
      <div className="details-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          className="icon-image"
          alt="forks"
        />
        <p className="icon-text">{forksCount}</p>
      </div>
      <div className="details-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          className="icon-image"
          alt="open issues"
        />
        <p className="icon-text">{issuesCount}</p>
      </div>
    </li>
  )
}

export default RepositoryItem
