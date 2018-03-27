import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import UserAddPage from './pages/UserAdd';
import HomePage from './pages/Home';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Router>
        <div>
            <ul>
                <li><Link to="/">首页</Link></li>
                <li><Link to="/user/add">添加用户</Link></li>
            </ul>

            <hr/>

            <Route exact path="/" component={ HomePage }/>
            <Route exact path="/user/add" component={UserAddPage}/>
        </div>
    </Router>
    , document.getElementById('root'));
registerServiceWorker();
