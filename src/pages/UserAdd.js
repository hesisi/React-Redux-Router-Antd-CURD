import React from 'react';

class UserAdd extends React.Component{
    constructor(){
        super();
        this.state = {
            form : {
                name : {
                    valid : false,
                    value : "",
                    error : ""
                },
                age : {
                    valid : false,
                    value : 0,
                    error : ""
                },
                gender : {
                    valid : false,
                    value : "",
                    error : ""
                }
            }
        };
    }

    handleValueChange(field,value,type="string"){
        if(type === "number"){
            value =+ value;
        }

        const {form} = this.state;

        const newFieldObj = {valid:true,value,error:''};

        switch(field){
            case 'name' : {
                if(calue.length >= 5){
                    newFieldObj.error = "用户名最多4个字符";
                    newFeildObj.valid = false;
                }else if(value.length === 0){
                    newFieldObj.error = "请输入用户名";
                    newFieldObj.valid = false;
                }
                break;
            }
            case 'age' : {
                if(value > 150 || value <= 0){
                    newFieldObj.error = "请传入"
                }
            }
        }

        this.setState({
            [field] : value
        });
    }

    handleSubmit(e){
        e.preventDefault();
        //添加一条数据
        const {name, age, gender} = this.state;

        fetch("http://localhost:3001/user/",{
            method : "post",
            body : JSON.stringify({
                name,
                age,
                gender
            }),
            headers : {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json())
        .then((res) => {
            if(res.id){
                alert("添加成功！");
                this.setState({  //重置state
                    name : "",
                    age : 0,
                    gender : ""
                });
            }else{
                alert(JSON.stringify(res)+"添加失败!");
            }
        })
        .catch((error) => {
            console.error(error);
        });

    }

    render(){
        const {name,age,gender} = this.state;
        return (
            <div>
                <header>
                    <h1>添加用户</h1>
                </header>

                <main>
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <label>namme:</label>
                        <input type="text" value={name} onChange={(e) => this.handleValueChange('name',e.target.value)}/>
                        <br/>
                        <label>age:</label>
                        <input type="number" value={age || ''} onChange={(e) => this.handleValueChange('age',e.target.value)}/>
                        <br/>
                        <label>gender:</label>
                        <select value={gender} onChange={(e) => this.handleValueChange('gender',e.target.value)}> 
                            <option value="">choises</option>
                            <option value="male">male</option>
                            <option value="female">female</option>
                        </select>
                        <br/>
                        <input type="submit" value="submit"/>
                    </form>
                </main>
            </div>
        );
    }
}

export default UserAdd;