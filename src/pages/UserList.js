import React from 'react';
import HomeLayout from '../layouts/HomeLayout';

class UserList extends React.Component{
    constructor (props){
        super(props);
        this.state = {
            userList : []
        };
    }

    //组件挂载前
    componentWillMount () {
        fetch('http://localhost:3001/user')
        .then(res => res.json())
        .then(res => {
            this.setState({
                userList: res
            });
        })
        .catch((err) => console.error(err));
    }

    //编辑
    handleEdit(user){
        //跳转到编辑页面
        this.props.history.push('/user/edit/'+user.id);
    }

    //删除
    handleDel(user){
        const confirmed = window.confirm(`确定要删除用户 ${user.name} 吗?`);
        
        if(confirmed){
            fetch('http://localhost:3001/user/'+user.id,{
                method: 'delete'
            })
            .then(res => res.json())
            .then(res => {
                this.setState({
                    userList : this.state.userList.filter(item => item.id !== user.id)
                });
                alert("删除用户成功！");
            })
            .catch(err => {
                console.error(err);
                alert("删除用户失败");
            });
        }
    }

    render(){
        const {userList} = this.state;
        return (
            <HomeLayout title="用户列表">
                <main>
                    <table>
                        <thead>
                            <tr>
                                <th>用户ID</th>
                                <th>姓名</th>
                                <th>年龄</th>
                                <th>性别</th>
                                <th>操作</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                userList.map((user) => {
                                    return (
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.age}</td>
                                            <td>{user.gender}</td>
                                            <td>
                                                <a href="javascript:void(0)" onClick={() => this.handleEdit(user)}>编辑</a>
                                                &nbsp;
                                                <a href="javascript:void(0)" onClick={() => this.handleDel(user)}>删除</a>
                                            </td> 
                                        </tr>
                                    ); 
                                })
                            }
                        </tbody>
                    </table>
                </main>
            </HomeLayout>
        );
    }
}

export default UserList;