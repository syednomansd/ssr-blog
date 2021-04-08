import React, { useEffect, useState } from 'react'
import { postById, getAllAuthors, upVotesPost, getAllPosts } from '../APIHelpers'
import moment from 'moment'
import DOMPurify from 'dompurify'
import { useParams, Link } from "react-router-dom";
import Comments from './Comments'


function SingleBlog() {
    let { id } = useParams();
    const [post, setPost] = useState({})
    const [authors, setAuthors] = useState([])
    const [recentPosts, setRecentPosts] = useState([])
    const [hasVoted, setHasVoted] = useState(false)
    useEffect(() => {
        getAllAuthorsFunction()
        getPostById()
        checkIfAlreadyVoted()
        getRecentPosts()
    }, [id])
    function getPostById() {
        postById(id)
            .then(response => response.json())
            .then(data => setPost(data[0]))
    }
    function getRecentPosts() {
        getAllPosts()
            .then(response => response.json())
            .then(data => setRecentPosts(data.sort((a, b) => b.date - a.date)))
    }
    function getAllAuthorsFunction() {
        getAllAuthors()
            .then(response => response.json())
            .then(data => setAuthors(data))
    }
    function checkIfAlreadyVoted() {
        let votesByLocalStorage = localStorage.getItem("votes")
        if (votesByLocalStorage && JSON.parse(votesByLocalStorage).filter(i => i.postId == id).length > 0) {
            setHasVoted(true)
        } else {
            setHasVoted(false)
        }
    }
    function upVotesPostFunc() {
        let obj = { ...post }
        obj.vortes = obj.vortes + 1
        upVotesPost(obj)
            .then(res => {
                if (res.status == 200) {
                    getPostById()
                    setHasVoted(true)
                }
            })
    }
    function upVotesHandler() {
        let votesByLocalStorage = localStorage.getItem("votes")
        if (votesByLocalStorage) {
            if (!JSON.parse(votesByLocalStorage).filter(i => i.postId == id).length > 0) {
                let arr = JSON.parse(votesByLocalStorage).filter(i => i.postId == id)
                arr.push({ postId: id })
                localStorage.setItem("votes", JSON.stringify(arr))
                upVotesPostFunc()
            }
        } else {
            localStorage.setItem("votes", JSON.stringify([{ postId: id }]))
            upVotesPostFunc()
        }
    }
    return (
        <div className="wrapper">
            <div className="sblog">
                <div className="sblog-left">
                    <h2>{post.title}</h2>
                    <img src={post.img} alt="" />
                    <ol>
                        <li><i className="fa fa-user" aria-hidden="true"></i>
                            {
                                authors.filter(i => i.id == post.author).length > 0 &&
                                authors.filter(i => i.id == post.author)[0].name
                            }
                        </li>
                        <li><i className="fa fa-calendar" aria-hidden="true"></i>{moment(post.date).format('Do-MMM-YYYY')}</li>
                        <li style={{ float: 'right' }}>
                            <div className="upvote">
                                <p>Vote</p>
                                <div>
                                    <p>{post.vortes}</p>
                                    {
                                        !hasVoted &&
                                        <div id="upvote" onClick={upVotesHandler}></div>

                                    }
                                </div>
                            </div>
                        </li>
                    </ol>
                    <div className="content" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.description) }}></div>
                    <Comments />
                </div>
                <div className="sblog-right">
                    <h2>Recent Articles</h2>
                    <ul>
                        {
                            recentPosts.slice(0, 5).map(item => (
                                <li>
                                    <div className="sblog-right-left">
                                        <Link to={`/blog/${item.id}`}> <img src={item.img} alt="" /></Link>
                                    </div>
                                    <div className="sblog-right-right">
                                            <h3>{item.title}</h3>
                                            <div className="contentpost" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.description, { ALLOWED_TAGS: ['p'] }) }}></div>
                                    </div>
                                    <div className="clear"></div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="clear"></div>
            </div>
        </div>

    )
}

export default SingleBlog