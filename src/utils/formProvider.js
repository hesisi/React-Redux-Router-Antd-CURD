import React from 'react';

/**
fields是一个对象,格式如下
{
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
}} 
 */


//initialFormState格式
/*
{
    param : {
        value : 'value',
        error : ''
    },
    param : {
        value : 'value',
        error : ''
    },
    param : {
        value : 'value',
        error : ''
    }
}
*/

//sate格式
/*
{
    form : {
        param : {
            value : 'value',
            error : ''
        },
        param : {
            value : 'value',
            error : ''
        },
        param : {
            value : 'value',
            error : ''
        }
    },
    formValid : false
}
*/
function formProvider(fields){  //fields是一个对象
    return function(Comp){
        const initialFormState = {};
        for(const key in fields){
            initialFormState[key] = {
                value : fields[key].defaultValue,
                error : ''
            };
        }

        class FormComponent extends React.Component{
            constructor(props){
                super(props);
                this.state = {
                    form : initialFormState,
                    formValid : false
                };

                this.handleValueChange = this.handleValueChange.bind(this);
                this.setFormValues = this.setFormValues.bind(this);
            }

            //*********************填充字段值***********************************
            setFormValues(values){
                if(!values){
                    return;
                }

                const { form } = this.state;
                let newForm = {...form};
                for(const field in form){
                    if(form.hasOwnProperty(field)){
                        if(typeof values[field] !== "undefined"){
                            newForm[field] = {...newForm[field],value:values[field]};
                        }

                        //填充的值都是有效的
                        newForm[field].valid = true;
                    }
                }

                this.setState({form : newForm});
            }

            //*********************动态检验输入字段合法性************************
            handleValueChange (fieldName,value){
                const { form } = this.state; //把初始化的form赋值给该变量

                const newFieldState = {value, valid:true, error:""};

                const fieldRules = fields[fieldName].rules;  //某个字段对应的校验规则[{pattern1:"",error1:""},{pattern2:"",error2:""}...]

                for(let i = 0;i<fieldRules.length;i++){
                    const {pattern,error} = fieldRules[i];  //校验规则对应的格式{pattern:"",error:""}
                    let valid = false;
                    if(typeof pattern === "function"){
                        valid = pattern(value);
                    }else{
                        valid = pattern.test(value);
                    }

                    if(!valid){
                        newFieldState.valid = false;
                        newFieldState.error = error;
                        break;
                    }
                }

                const newForm = {...form,[fieldName]:newFieldState};  //信息合法则修改form的value值
                const formValid = Object.values(newForm).every(f => f.valid);  
                
                //Object返回对象所有枚举类的属性值数组
                //every遍历数组并去除数组中所有对象的valid的值

                this.setState({
                    form: newForm,
                    formValid
                });
            }

            render(){
                const {form,formValid} = this.state;
                //将form,formValid,onFormChange三个props传给组件并返回
                return <Comp 
                            {...this.props} 
                            form={form} 
                            formValid={formValid} 
                            onFormChange={this.handleValueChange}
                            setFormValues = {this.setFormValues}
                        />;
            }
        }
        return FormComponent;
    };
}

export default formProvider;