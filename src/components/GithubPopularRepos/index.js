import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All', isActive: false},
  {id: 'JAVASCRIPT', language: 'Javascript', isActive: false},
  {id: 'RUBY', language: 'Ruby', isActive: false},
  {id: 'JAVA', language: 'Java', isActive: false},
  {id: 'CSS', language: 'CSS', isActive: false},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    reposList: [],
    languageDetailsList: languageFiltersData,
    apiStatus: apiStatusConstants.initial,
    activeOptionId: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getRepos()
  }

  getRepos = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const {activeOptionId} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeOptionId}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.popular_repos.map(repo => ({
        name: repo.name,
        id: repo.id,
        issuesCount: repo.issues_count,
        forksCount: repo.forks_count,
        starsCount: repo.stars_count,
        avatarUrl: repo.avatar_url,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        reposList: updatedData,
      })
    } else if (response.ok === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderSuccessView = () => {
    const {reposList} = this.state
    return (
      <ul className="repos-list">
        {reposList.map(eachRepo => (
          <RepositoryItem repoDetails={eachRepo} key={eachRepo.id} />
        ))}
      </ul>
    )
  }

  renderInProgressView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="not-found-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="wrong-text">Something Went Wrong</h1>
    </div>
  )

  onFilteringLanguage = id => {
    const languageItem = languageFiltersData.find(each => each.id === id)

    this.setState(prevState => ({
      languageDetailsList: prevState.languageDetailsList.map(eachLanguage => {
        if (id === eachLanguage.id) {
          return {...eachLanguage, isActive: !eachLanguage.isActive}
        }
        return eachLanguage
      }),
      activeOptionId: languageItem.id,
    }))
  }

  render() {
    const {apiStatus} = this.state
    return (
      <div className="container">
        <h1 className="heading-style">Popular</h1>
        <ul className="languages-list">
          {languageFiltersData.map(eachLanguage => (
            <LanguageFilterItem
              languageDetails={eachLanguage}
              key={eachLanguage.id}
              onFilteringLanguage={this.onFilteringLanguage}
            />
          ))}
        </ul>
        {apiStatus === apiStatusConstants.success && this.renderSuccessView()}
        {apiStatus === apiStatusConstants.inProgress &&
          this.renderInProgressView()}
        {apiStatus === apiStatusConstants.failure && this.renderFailureView()}
      </div>
    )
  }
}

export default GithubPopularRepos
