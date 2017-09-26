import React,{Component} from 'react'
// import ReactDom from 'react-dom'
import CommentList from './CommentList'
import CommentInput from './CommentInput'

class CommentApp extends Component{
    constructor(){
        super()
        this.state = {
            comments:[]
        }
    }
    handleSubmitComment(comment){
        // 简单的数据检查
        if (!comment) return
        if (!comment.username) return alert('请输入用户名')
        if (!comment.content) return alert('请输入评论内容')

        //这个comment是CommentInput传过来的
        // 此时将comment保存到父组件的state
        this.state.comments.push(comment)
        // 将comments通过props传给CommentList
        this.setState({
            comments:this.state.comments
        })
    }
    render(){
        return(
            <div className="wrapper">
                <CommentInput onSubmit={this.handleSubmitComment.bind(this)} />
                <CommentList comments={this.state.comments} />
            </div>
        )
    }
}

export default CommentApp


