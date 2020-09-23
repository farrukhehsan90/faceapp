import axios from 'axios';


export const fetchData = async (id = "") => {
    const api = `https://jsonplaceholder.typicode.com/users/${id}`
    const data = await axios(api);
    return data;
}

export const fetchPost = async (id = "") => {
    const post = await axios(`https://jsonplaceholder.typicode.com/posts${id && `?userId=${id}`}`)
    return post;
}

export const fetchComment = async (length) => {
    let allComments = []

    for (let i = 1; i <= length; i++) {
        const comments = await axios(`https://jsonplaceholder.typicode.com/posts/${i}/comments`)

        allComments.push(...comments.data)
    }

    return allComments
}