import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

import VanillaBtcIndex from './examples/vanilla'
import ContainerBtcIndex from './examples/container-view'
import HocBtcIndex from './examples/hoc'
import RenderComponentBtcIndex from './examples/render-component'
import ProviderBtcIndex from './examples/provider'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <section className="tc flex flex-wrap mw8 center">

          <div className="w-50 ba pa3">
            <h3>Vanilla</h3>
            <VanillaBtcIndex />
          </div>

          <div className="w-50 ba pa3">
            <h3>Container-view</h3>
            <ContainerBtcIndex />
          </div>

          <div className="w-50 ba pa3">
            <h3>Hoc-component</h3>
            <HocBtcIndex />
          </div>

          <div className="w-50 ba pa3">
            <h3>Render-component</h3>
            <RenderComponentBtcIndex />
          </div>

          <div className="w-50 ba pa3">
            <h3>Provider component</h3>
            <ProviderBtcIndex />
          </div>

        </section>

      </div>
    );
  }
}

export default App;
