import React, { useEffect, useState } from 'react'
import { getcCommentsByPost, postComment } from '../APIHelpers'
import { useParams } from "react-router-dom";
import moment from 'moment'

function Comments() {
    let { id } = useParams();
    const [postComments, setPostComments] = useState({})
    const [name, setName] = useState('')
    const [comment, setComment] = useState('')
    useEffect(() => {
        getAllPostsFunction()
    }, [id])
    function getAllPostsFunction(){ 
        getcCommentsByPost(id)
        .then(response => response.json())
        .then(data => setPostComments(data))
    }
    function saveComment(data) {
        postComment({
            "name": data.name,
            "body": data.comment,
            "date": new Date(),
            "postId": id
        })
        .then( res => {
            if(res.status == 201){
                setComment("")
                setName("")
                getAllPostsFunction()
            }
        })

    }
    function submitHandler(e) {
        e.preventDefault();
        console.log(name, comment)
        saveComment({name,comment})
    }
    return (
        <>
            <h3>Comments</h3>
            <div className="comments">
                {
                    postComments.length > 0 &&
                    postComments.map(item => (
                        <div className="comment-wrap" key={item.id}>
                            <p className="name">{item.name} </p>
                            <p className="date"> {moment(item.date).format('Do-MMM-YYYY')}</p>
                            <div className="comment">
                                <p>{item.body}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div id="respond">

                <h3>Leave a Comment</h3>

                <form id="commentform" onSubmit={submitHandler}>

                    <label for="comment_author" class="required">Your name</label>
                    <input 
                        type="text" 
                        name="comment_author" 
                        id="comment_author" 
                        value={name}
                        tabindex="1" 
                        required="required" 
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label for="comment" class="required">Your message</label>
                    <textarea 
                        name="comment" 
                        id="comment" 
                        rows="10" 
                        tabindex="4" 
                        required="required"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>

                    <input name="submit" type="submit" value="Submit comment" />

                </form>

            </div>
        </>
    )
}
export default Comments