import { API_URL } from './Constants'


export const postById = (id) => {
    return fetch(`${API_URL}posts?id=${id}`)       
}
export const getAllPosts = () => {
    return fetch(`${API_URL}posts`)      
}

export const getAllAuthors = () => {
    return fetch(`${API_URL}authors`)
}
export const getcCommentsByPost = (id) => {
    return fetch(`${API_URL}comments?postId=${id}`)
       
}
export const postComment = (data) => {
    return fetch(`${API_URL}comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(data) 
    }) 
}
export const upVotesPost = (data) => {
    return fetch(`${API_URL}posts/${data.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(data) 
    })
       
}