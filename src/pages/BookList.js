import React from 'react';
import HomeLayout from '../layouts/HomeLayout';

class BookList extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            bookList : []
        }
    }

    componentWillMount(){
        fetch('http://localhost:3001/book')
        .then((res) => res.json())
        .then((res) => {
            this.setState({
                bookList : res
            });

            console.log(res);
        })
        .catch((err) => console.error(err));
    }

    handleDel(book){
        const confirmed = window.confirm(`确定要删除用户 ${book.name} 吗?`);

        if(confirmed){
            fetch('http://localhost:3001/book/'+book.id,{
                method : 'delete'
            })
            .then((res) => res.json())
            .then((res) => {
                this.setState({
                    bookList : this.state.bookList.filter(item => item.id !== book.id)
                });
                alert("删除成功!");
            })
            .catch((err) => console.error(err));
        }
        
    }

    //点击编辑
    handleEdit(book){
        //跳转到编辑页面
        this.props.history.push('/book/edit/'+book.id);
    }

    render(){
        const { bookList } = this.state;
        return (
            <HomeLayout title="图书列表">
                <main>
                    <table>
                        <thead>
                            <tr>
                                <th>编号</th>
                                <th>名称</th>
                                <th>价格</th>
                                <th>所属人</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                bookList.map((book) => {
                                    return (
                                        <tr key={book.id}>
                                            <td>{book.id}</td>
                                            <td>{book.name}</td>
                                            <td>{book.price}</td>
                                            <td>{book.owern_id}</td>
                                            <td>
                                                <a href="javascript:void(0)" onClick={() => this.handleEdit(book)}>编辑</a>
                                                &nbsp;
                                                <a href="javascript:void(0)" onClick={() => this.handleDel(book)}>删除</a>
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

export default BookList;