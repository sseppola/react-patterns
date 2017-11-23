import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { VanillaBtcIndex } from './examples/vanilla/VanillaBtcIndex'
import { ContainerBtcIndex } from './examples/container-view/ContainerBtcIndex'
import { HocBtcIndex } from './examples/hoc/HocBtcIndex'
import { RenderComponentBtcIndex } from './examples/render-component/RenderComponentBtcIndex'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <section className="tc">
          <div className="dib measure">
            <h3 className="mt5">Vanilla</h3>
            <VanillaBtcIndex />

            <h3 className="mt5">Container-view</h3>
            <ContainerBtcIndex />

            <h3 className="mt5">Hoc-component</h3>
            <RenderComponentBtcIndex />

            <h3 className="mt5">Render-component</h3>
            <RenderComponentBtcIndex />
          </div>
        </section>

      </div>
    );
  }
}

export default App;
