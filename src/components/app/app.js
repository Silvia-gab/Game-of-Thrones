import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../error';
import {CharacterPage, BooksPage, HousePage, BooksItem} from '../pages';
import gotService from '../../services/gotService';
import {BrowserRouter as Router, Route} from 'react-router-dom';


import './app.css';

export default class App extends Component {
    gotService = new gotService();

    state = {
        showRandomChar: true,
        error: false,
        selectedHouse: 20
    };

    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })
    }
    
    toggleRandomChar = () => {
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            }
        });
    };


render() {
const char = this.state.showRandomChar ? <RandomChar/> : null;

    if (this.state.error) {
        return <ErrorMessage/>
    }

    return (
        <Router> 
            <div className='app'>
            <Container>
                <Header />
            </Container>
            <Container>
                <Row>
                    <Col lg={{size: 5, offset: 0}}>
                    {char}
                   <button 
                        className="toggle-btn"
                        onClick={this.toggleRandomChar}>Toggle random character</button>
                    </Col>
                </Row>
                <Router path='/' component={() => <h1>Welcome to GOT BD</h1>} exact/>
                <Router path='/characters' component={CharacterPage}/>
                <Router path='/books' component={BooksPage} exact/>
                <Router path='/books/:id' render={({match}) => {
                    const {id} = match.params;
                    return <BooksItem bookId={id}/>}}/>
                    <Router path='/houses' component={HousePage} />                <CharacterPage/>
            </Container>
        </div>
        </Router>
    );
  }
};

