import React from 'react';
import HomeLayout from '../layouts/HomeLayout';
import BookEditor from '../components/BookEditor';

class BookEdit extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            book : null
        };
    }

    componentWillMount(){
        const bookId = this.props.match.params.id;
        fetch('http://localhost:3001/book/'+bookId)
        .then(res => res.json())
        .then(res => {
            this.setState({
                book : res
            });
        })
        .catch(err => console.error(err));
    }

    render(){
        const { book } = this.state;
        return (
            <HomeLayout title="编辑">
                {book? <BookEditor editTarget={book}/> : '加载中...'}
            </HomeLayout>
        );
    }
}

export default BookEdit;