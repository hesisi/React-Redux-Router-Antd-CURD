import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import UserAddPage from './pages/UserAdd';
import UserListPage from './pages/UserList';
import UserEditPage from './pages/UserEdit';
import BookAddPage from './pages/BookAdd';
import BookListPage from './pages/BookList';
import BookEditPage from './pages/BookEdit';
import HomePage from './pages/Home';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Router>
        <div>
            <ul>
                <li><Link to="/">首页</Link></li>
                <li><Link to="/user/add">添加用户</Link></li>
                <li><Link to="/user/list">用户列表</Link></li>
                <li><Link to="/book/add">添加图书</Link></li>
                <li><Link to="/book/list">图书列表</Link></li>
            </ul>

            <hr/>

            <Route exact path="/" component={ HomePage }/>
            <Route exact path="/user/add" component={UserAddPage}/>
            <Route exact path="/user/list" component={UserListPage}/>
            <Route exact path="/user/edit/:id" component={UserEditPage}/>
            <Route exact path="/book/add" component={BookAddPage}/>
            <Route exact path="/book/list" component={BookListPage}/>
            <Route exact path="/book/edit/:id" component={BookEditPage}/>
        </div>
    </Router>
    , document.getElementById('root'));
registerServiceWorker();
