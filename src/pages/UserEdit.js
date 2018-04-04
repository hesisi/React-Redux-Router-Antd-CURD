import React from 'react';
import HomeLayout from '../layouts/HomeLayout';
import UserEditor from '../components/UserEditor';

class UserEdit extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user : null
        };
    }

    componentWillMount(){
        const userId = this.props.match.params.id; //从路由上获取参数
        fetch('http://localhost:3001/user/'+userId)  //带ID查询出该条记录
        .then(res => res.json())
        .then(res => {
            this.setState({
                user : res
            });
        })
        .catch(err => console.error(err));;
    }

    render(){
        const {user} = this.state;
        return (
            <HomeLayout title="编辑用户">
                {
                    user?<UserEditor editTarget={user}/> : '加载中...'
                }
            </HomeLayout>
        );
    };
}

export default UserEdit;

