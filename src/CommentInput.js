import React, { Component } from 'react'
import PropTypes from 'prop-types'
class CommentInput extends Component{
    static propTypes = {
        onSubmit: PropTypes.func
    }

    constructor(){
        super()
        this.state = {
            username:'',
            content:''
        }
    }

    // _loadUsername 会从 LocalStorage 加载用户名并且 setState 到组件的 state.username 中。
    // 那么组件在渲染的时候（render方法）挂载的时候就可以用上用户名了
    componentWillMount(){
        this._loadUsername()
    }

    componentDidMount(){
        this.textarea.focus()
    }

    _loadUsername(){
        const username = localStorage.getItem('username')
        if(username){
            this.setState({
                username:username
            })
        }
    }

    _saveUsername(username){
        localStorage.setItem('username',username)
    }

    // input失去焦点的时候设置 LocalStorage 中的 username 字段,值为input的值
    handleUsernameBlur(e){
        this._saveUsername(e.target.value)
    }

    

    handleUsernameChange(e){
        this.setState({
            username:e.target.value
        })
    }

    

    handleContentChange(e){
        this.setState({
            content:e.target.value
        })
    }

    handleSubmit(){
        if (this.props.onSubmit) {
            this.props.onSubmit({
              username: this.state.username,
              content: this.state.content,
              createdTime: +new Date()
            })
          }
        this.setState({ content: '' })
    }
    render(){
        return(
            <div className="comment-input">
                <div className="comment-field">
                    <span className="comment-field-name">用户名：</span>
                    <div className="comment-field-input">
                        <input value={this.state.username}
                               onChange={this.handleUsernameChange.bind(this)}
                               onBlur={this.handleUsernameBlur.bind(this)}
                         />
                    </div>
                </div>
                <div className="comment-field">
                    <span className="comment-field-name">评论内容：</span>
                    <div className="comment-field-input">
                        <textarea ref={(textarea) => {this.textarea = textarea}}
                                  value={this.state.content}
                                  onChange={this.handleContentChange.bind(this)}
                         />
                    </div>                   
                </div>
                <div className="comment-field-button">
                    <button onClick={this.handleSubmit.bind(this)}>
                        发布
                    </button>
                </div>
            </div>
        )
    }
}

export default CommentInput