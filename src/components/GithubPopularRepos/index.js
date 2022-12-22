import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItems from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]
const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
}
// Write your code here
class GithubPopularRepos extends Component {
  state = {
    currentLanguage: languageFiltersData[0].id,
    repositoriesList: [],
    apiStatus: apiStatusConstants.inProgress,
  }

  componentDidMount() {
    this.getRepositories()
  }

  getRepositories = async () => {
    const {currentLanguage} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${currentLanguage}`

    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const data = await response.json()
      const formattedData = data.popular_repos.map(each => ({
        name: each.name,
        id: each.id,
        issuesCount: each.issues_count,
        forksCount: each.forks_count,
        starsCount: each.stars_count,
        avatarUrl: each.avatar_url,
      }))
      this.setState({
        repositoriesList: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  changeLanguage = id => {
    this.setState({currentLanguage: id}, this.getRepositories)
  }

  renderLoading = () => (
    <div className="loader" testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderSuccess = () => {
    const {repositoriesList} = this.state
    return (
      <div className="Repository-container">
        {repositoriesList.map(each => (
          <RepositoryItems details={each} key={each.id} />
        ))}
      </div>
    )
  }

  renderFailure = () => (
    <div className="conta">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
    </div>
  )

  renderRepos = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoading()
      case apiStatusConstants.success:
        return this.renderSuccess()
      default:
        return this.renderFailure()
    }
  }

  render() {
    const {currentLanguage} = this.state
    return (
      <div className="git-home">
        <h1 className="home-heading">Popular</h1>

        <div className="language-container">
          <ul className="language-buttons">
            {languageFiltersData.map(each => (
              <LanguageFilterItem
                details={each}
                key={each.id}
                changeLanguage={this.changeLanguage}
                activeTab={each.id === currentLanguage}
              />
            ))}
          </ul>
        </div>

        {this.renderRepos()}
      </div>
    )
  }
}

export default GithubPopularRepos
