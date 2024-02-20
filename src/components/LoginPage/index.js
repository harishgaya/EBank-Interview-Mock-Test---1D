import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginPage extends Component {
  state = {userId: '', password: '', showSubmitError: false, errorMsg: ''}

  handleUserIdChange = event => {
    this.setState({userId: event.target.value})
  }

  handlePinChange = event => {
    this.setState({password: event.target.value})
  }

  onSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  handleLogin = async event => {
    event.preventDefault()

    const {userId, password} = this.state
    const userDetails = {user_id: userId, pin: password}
    const url = 'https://apis.ccbp.in/ebank/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccess(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  render() {
    const {userId, password, showSubmitError, errorMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect path="/" />
    }
    return (
      <div className="bg-Container">
        <div className="login-page-Container">
          <div className="image-Container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
              className="image-size"
            />
          </div>
          <form className="form-Container" onSubmit={this.handleLogin}>
            <h1 className="heading">Welcome Back</h1>
            <div className="input-Container">
              <label htmlFor="userid" className="label-text">
                User ID
              </label>
              <input
                type="text"
                id="userid"
                value={userId}
                className="input"
                placeholder="Enter User Id"
                onChange={this.handleUserIdChange}
              />
            </div>
            <div className="input-Container">
              <label htmlFor="userPassword" className="label-text">
                PIN
              </label>
              <input
                type="password"
                id="userPassword"
                value={password}
                className="input"
                placeholder="Enter PIN"
                onChange={this.handlePinChange}
              />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
            {showSubmitError === true && (
              <p className="error-message">{errorMsg}</p>
            )}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginPage
