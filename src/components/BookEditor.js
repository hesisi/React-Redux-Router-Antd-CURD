import React from 'react';
import formProvider from '../utils/formProvider';
import { withRouter } from 'react-router-dom';
import AutoComplete from './AutoComplete';

class BookEditor extends React.Component{
    //挂载前
    componentWillMount(){
        const { editTarget,setFormValues } = this.props;
        if(editTarget){
            //填充编辑信息
            setFormValues(editTarget);
        }
    }

    //点击提交
    handleSubmit(e){
        e.preventDefault();

        const {form:{name,price,owner_id}, formValid, editTarget } = this.props;  //formProvider返回的组件传过来的props
        if(!formValid){
            alert('请填写正确信息后重试!');
            return;
        }

        //添加
        let editType = '添加';
        let apiUrl = 'http://localhost:3001/book';
        let method = 'post';

        //编辑
        if(editTarget){
            editType = '编辑';
            apiUrl += '/' + editTarget.id;
            method = 'put';
        }

        fetch(apiUrl,{
            method,
            body:JSON.stringify({
                name : name.value,
                price : price.value,
                owner_id : owner_id.value
            }),
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        .then((res) => res.json())
        .then((res) => {
            if(res.id){
                alert(editType+'书籍成功');
                this.props.history.push('/book/list');
                return;
            }else{
                alert(editType+'书籍失败');
            }
        })
        .catch((err) => console.log(err));
    }

    render(){
        const { form:{name,price,owner_id}, onFormChange } = this.props;
        return (
            <form onSubmit={(e) => this.handleSubmit(e)}>
                <label>名称：</label>
                <input 
                    type="text"
                    value={name.value}
                    onChange={(e) => onFormChange("name",e.target.value)}
                />
                {!name.valid && <span>{name.error}</span>}
                <br/>

                <label>价格：</label>
                <input
                    type="number"
                    value={price.value || ""}
                    onChange={(e) => onFormChange('price',e.target.value)}
                />
                {!price.valid && <span>{price.error}</span>}
                <br/>

                <label>所属者编号</label>
                <AutoComplete
                    value={owner_id.value ? owner_id.value+'' : ''}
                    options={['10000(张三)','10001(李四)']}
                    onValueChange = {(value) => onFormChange('owner_id',value)}
                />
                {!owner_id.valid && <span>{owner_id.error}</span>}
                <br/>
                <br/>

                <input type="submit" value="提交"/>
            </form>
        );
    }
}

BookEditor = formProvider({
    name : {
        defaultValue : '',
        rules : [
            {
                pattern : function(value){
                    return value.length > 0;
                },
                error : '请输入书籍名称'
            },{
                pattern : /^.{1,20}$/,
                error : '书籍名称不能超过20个字'
            }
        ]
    },
    price : {
        defaultValue : 0,
        rules : [
            {
                pattern : function(value){
                    return value.length > 0;
                },
                error : '请输入价格'
            },
            {
                pattern : function(value){
                    return value >= 0;
                },
                error : '价格不能小于0'
            }
        ]
    },
    owner_id : {
        defaultValue : "",
        rules : [
            {
                pattern : function(value){
                    return !!value;
                },
                error:'请选择书籍所属人'
            }
        ]
    }
})(BookEditor);

export default withRouter(BookEditor);