import React, {Component} from 'react'
import Layout from './hoc/Layout/Layout'
import Quiz from './containers/Quiz/Quiz'

class App extends Component {
  render() {
    const test1 = []
    return (
      <Layout>
        <Quiz test={test1}/>
      </Layout>
    )
  }
}

export default App
