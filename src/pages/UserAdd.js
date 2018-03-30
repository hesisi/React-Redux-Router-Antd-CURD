import React from 'react';
import formProvider from '../utils/formProvider';

class UserAdd extends React.Component{
    //点击提交
    handleSubmit(e){
        e.preventDefault();

        const {form:{name,age,gender}, formValid} = this.props;  //formProvider返回的组件传过来的props
        if(!formValid){
            alert('请填写正确信息后重试!');
            return;
        }

        //请求
        fetch('http://localhost:3001/user',{
            method : 'post',
            body : JSON.stringify({
                name : name.value,
                age : age.value,
                gender : gender.value
            }),
            headers : {
                'Content-Type':'application/json'
            }
        })
        .then((res) => res.json())
        .then((res) => {
            if(res.id){
                alert("添加成功!");
            }else{
                alert("添加失败！");
            }
        }).catch((err) => {
            console.error(err);
        });
    }

    //render返回的组件格式
    render(){
        const { form :{name ,age ,gender} ,onFormChange} = this.props;
        return (
            <div>
                <header>
                    <h1>添加用户</h1>
                </header>

                <main>
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <label>用户名：</label>
                        <input 
                            type="text"
                            value={name.value}
                            onChange={(e) => onFormChange("name",e.target.value)}
                        />
                        {!name.valid && <span>{name.error}</span>}
                        <br/>

                        <label>年龄：</label>
                        <input
                            type="number"
                            value={age.value || ""}
                            onChange={(e) => onFormChange('age',e.target.value)}
                        />
                        {!age.valid && <span>{age.error}</span>}
                        <br/>

                        <label>性别</label>
                        <select
                            value={gender.value}
                            onChange={(e) => onFormChange('gender',e.target.value)}
                        >
                            <option value="">请选择</option>
                            <option value="male">男</option>
                            <option value="female">女</option>
                        </select>
                        {!gender.valid && <span>{gender.error}</span>}
                        <br/>
                        <br/>

                        <input type="submit" value="提交"/>
                    </form>
                </main>
            </div>
        );
    }

}


//formProvider
UserAdd = formProvider({
    name : {
        defaultValue : '',
        rules : [
            {
                pattern : function(value){
                    return value.length > 0;
                },
                error : '请输入姓名'
            },{
                pattern : /^.{1,6}$/,
                error : '用户名不能超过6个字'
            }
        ]
    },
    age : {
        defaultValue : 0,
        rules : [
            {
                pattern : function(value){
                    return value.length > 0;
                },
                error : '请输入年龄'
            },
            {
                pattern : function(value){
                    return value >=1 && value <= 150;
                },
                error : '请输入1~150之间的数字'
            }
        ]
    },
    gender : {
        defaultValue : "",
        rules : [
            {
                pattern : function(value){
                    return !!value;
                },
                error:'请选择性别'
            }
        ]
    }
})(UserAdd);
export default UserAdd;