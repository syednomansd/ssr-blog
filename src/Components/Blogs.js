import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { getAllPosts, getAllAuthors,  } from '../APIHelpers'
import DOMPurify from 'dompurify'
import moment from 'moment';

function Blogs() {
    const [posts, setPosts] = useState({})
    const [authors, setAuthors] = useState([])
    useEffect(() => {
        getAllAuthorsFunction()
        getAllPosts()
            .then(response => response.json())
            .then(data => setPosts(data))
    }, [])
    function getAllAuthorsFunction(){
        getAllAuthors()
        .then(response => response.json())
        .then(data => setAuthors(data))
    }
    return (
        <div className="wrapper">
            <div className="hblog">
                <ul>
                    {
                        posts.length > 0 &&
                        posts.map((item, index) => {
                            return <li key={index}>
                                <div className="hblog-left">
                                    <Link to={`/blog/${item.id}`}>  <img src={item.img} alt="" /></Link>
                                </div>
                                <div className="hblog-right">
                                    <h2>{item.title}</h2>
                                    <ol>
                                        <li><i className="fa fa-user" aria-hidden="true"></i>{
                                        authors.filter(i => i.id == item.author).length > 0 &&
                                        authors.filter(i => i.id == item.author)[0].name
                                        }</li>
                                        <li><i className="fa fa-calendar" aria-hidden="true"></i>{moment(item.date).format('Do-MMM-YYYY')}</li>
                                    </ol>
                                    <div className="contentpost" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(item.description, {ALLOWED_TAGS: ['p']})}}></div>
                                    <Link to={`/blog/${item.id}`}>  <a className="readmore" href="#">Read More</a></Link>
                                </div>
                                <div className="clear"></div>
                            </li>
                        })
                    }


                </ul>
            </div>
        </div>
    )
}

export default Blogs