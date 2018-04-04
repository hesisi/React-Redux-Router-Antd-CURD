import React from 'react';
import PropTypes from 'prop-types';
import style from '../styles/auto-complete.less';

function getItemValue(item){
    return item.value || item;
}

class AutoComplete extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            displayValue : '',
            activeItemIndex : -1
        };

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleLeave = this.handleLeave.bind(this);
    }

    //change事件
    handleChange(value){
        this.setState({
            activeItemIndex:-1,
            displayValue:''
        });
        this.props.onValueChange(value);
    }

    //keyDown事件:判断上下键和回车键
    handleKeyDown(e){
        const {activeItemIndex} = this.state;
        const {options} = this.props;

        switch(e.keyCode){
            //回车键
            case 13:{
                if(activeItemIndex >= 0){
                    e.preventDefault();
                    e.stopPropagation();
                    this.handleChange(getItemValue(options[activeItemIndex]));
                }
                break;
            }

            //向上键
            case 38:
            case 40:{
                e.preventDefault();
                //使用moveItem方法更新或取消选中项
                this.moveItem(e.keyCode === 38 ? 'up' : 'down');
                break;
            }
        }
    }

    moveItem(direction){
        const {activeItemIndex} = this.state;
        const {options} = this.props;
        const lastIndex = options.length -1;
        let newIndex = -1;

        //计算新的activeItemIndex
        if(direction == 'up'){
            if(activeItemIndex === -1 || activeItemIndex === 0){  //没有选中项或者选中第一项则选中最后一项
                newIndex = lastIndex -1;
            }else{
                newIndex = activeItemIndex -1;
            }
        }else{
            if(activeItemIndex === -1 || activeItemIndex === lastIndex){ //没有选中项或者选中最后一下项
                newIndex = 0;
            }else{
                newIndex = activeItemIndex + 1;
            }
        }

        //获取新的displayValue
        let newDisplayValue = '';
        if(newIndex >= 0){
            newDisplayValue = getItemValue(options[newIndex]);
        }

        //更新状态
        this.setState({
            displayValue : newDisplayValue,
            activeItemIndex : newIndex
        });
    }

    //回车事件
    handleEnter(index){
        const currentItem = this.props.options[index];
        this.setState({
            activeItemIndex : index,
            displayValue : getItemValue(currentItem)
        });
    }

    //leave事件
    handleLeave(){
        this.setState({
            activeItemIndex : -1,
            displayValue : ''
        });
    }
    

    render(){
        const {displayValue,activeItemIndex} = this.state;
        const {value,options} = this.props;

        return (
            <div className={style.wrapper}>
                <input 
                    value={displayValue || value}
                    onChange = {e => this.handleChange(e.target.value)}
                    onKeyDown = {this.handleKeyDown}
                />  
                {
                    options.length > 0 && (
                        <ul className={style.options}>
                            {
                                options.map((item,index) => {
                                    return (
                                        <li 
                                            key={index} 
                                            className={index == activeItemIndex ? style.active : ''}
                                            onMouseEnter={() => this.handleEnter(index)}
                                            onClick={() => this.handleChange(getItemValue(item))}
                                        >
                                            {item.text || item} 
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    )
                }
            </div>
        );
    }
}

AutoComplete.propTypes = {
    value : PropTypes.string.isRequired,
    options : PropTypes.array.isRequired,
    onValueChange : PropTypes.func.isRequired
};

export default AutoComplete;