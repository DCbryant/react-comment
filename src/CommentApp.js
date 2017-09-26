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

    componentWillMount(){
        this._loadComments()
    }

    // 加载评论列表数据。
    _loadComments(){
        let comments = localStorage.getItem('comments')
        if(comments){
            comments = JSON.parse(comments)
            this.setState({
                comments:comments
            })
        }
    }

    // 保存评论列表数据
    _saveComments (comments) {
        localStorage.setItem('comments', JSON.stringify(comments))
    }
    handleSubmitComment(comment){
        // 简单的数据检查
        if (!comment) return
        if (!comment.username) return alert('请输入用户名')
        if (!comment.content) return alert('请输入评论内容')
        //这个comment是CommentInput传过来的
        // 此时将comment保存到父组件的state
        let comments = this.state.comments
        comments.push(comment)
        // 将comments通过props传给CommentList
        this.setState({
            comments:comments
        })
        this._saveComments(comments)
    }

    handleDeleteComment (index) {
        const comments = this.state.comments
        comments.splice(index, 1)
        this.setState({ comments })
        this._saveComments(comments)
    }
    render(){
        return(
            <div className="wrapper">
                <CommentInput onSubmit={this.handleSubmitComment.bind(this)} />
                <CommentList 
                    comments={this.state.comments} 
                    onDeleteComment={this.handleDeleteComment.bind(this)}
                />
            </div>
        )
    }
}

export default CommentApp



 