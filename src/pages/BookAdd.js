import React from 'react';
import HomeLayout from '../layouts/HomeLayout';
import BookEditor from '../components/BookEditor';

class BookAdd extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <HomeLayout title="添加图书">
                <BookEditor/>
            </HomeLayout>
        );
    }
}

export default BookAdd;