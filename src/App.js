import {Route, Switch} from 'react-router-dom'

import LoginPage from './components/LoginPage'

import Home from './components/Home'

import NotFound from './components/NotFound'

import './App.css'

// Replace your code here
const App = () => (
  <div>
    <Switch>
      <Route exact path="/ebank/login" component={LoginPage} />
      <Route exact path="/" component={Home} />
      <NotFound component={NotFound} />
    </Switch>
  </div>
)
export default App
