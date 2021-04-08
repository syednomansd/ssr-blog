import logo from './logo.svg';
import React from 'react'
import './styles/style.css'
import './styles/component.css'
import './styles/font-awesome.min.css'
import './styles/reset.css'
import './styles/responsive.css'
import Header from './Components/Header'
import Slider from './Components/Slider'
import Blogs from './Components/Blogs'
import SingleBlog from './Components/SingleBlog'
import Footer from './Components/Footer';
import {
    MemoryRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
function App() {
    return (
        <div className="App">
            <Router>
                <Header />
                <Slider />
                <Switch>
                    <Route exact path="/blog/:id">
                        <SingleBlog />
                    </Route>
                    <Route path="/">
                        <Blogs />
                    </Route>
                </Switch>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
