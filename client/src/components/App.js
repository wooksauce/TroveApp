import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';
import Home from './Home';
import Men from './Men';
import Women from './Women';
import Login from './Login';
import Footer from './Footer';
import 'react-dates/lib/css/_datepicker.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allItems: []
    }
    this.fetch = this.fetch.bind(this);
  }

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    axios.get('/api')
    .then(items => {
      this.setState({ allItems: items.data });
      console.log('Items:', this.state.allItems);
    })
    .catch(err => {
      console.log('Fetch err:', err);
    })
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar />
          <Route exact path='/' component={() => (<Home />)} />
          <Route exact path='/men' component={() => (
            <Men passItems={this.state.allItems} />)} />
          <Route exact path='/women' component={() => (<Women />)} />
          <Route exact path='/login' component={() => (<Login />)} />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;