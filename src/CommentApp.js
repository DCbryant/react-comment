import React,{Component} from 'react'
// import ReactDom from 'react-dom'
import CommentList from './CommentList'
import CommentInput from './CommentInput'
import wrapWithLoadData from './wrapWithLoadData'
import PropTypes from 'prop-types'
class CommentApp extends Component{
    static propTypes = {
        data: PropTypes.any,
        saveData: PropTypes.func.isRequired
    }

    constructor(props){
        super(props)
        this.state = {
            comments:props.data || []
        }
    }

    
    handleSubmitComment(comment){
        // 简单的数据检查
        if (!comment) return
        if (!comment.username) return alert('请输入用户名')
        if (!comment.content) return alert('请输入评论内容')
        //这个comment是CommentInput传过来的
        // 此时将comment保存到父组件的state
        const comments = this.state.comments
        comments.push(comment)
        // 将comments通过props传给CommentList
        this.setState({
            comments:comments
        })
        this.props.saveData(comments)
    }

    handleDeleteComment (index) {
        const comments = this.state.comments
        comments.splice(index, 1)
        this.setState({ comments })
        this.props.saveData(comments)
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

CommentApp = wrapWithLoadData(CommentApp, 'comments')
export default CommentApp



 