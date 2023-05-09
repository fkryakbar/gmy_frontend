import axios from 'axios';
import React, { useEffect, useState } from 'react'

function usePost() {
    const [isLoading, setIsLoading] = useState(false);
    const [posts, setPosts] = useState<any>([]);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);

    const [isLoadMoreLoading, setIsLoadMoreLoading] = useState(false)
    const fetchData = async () => {
        try {
            const data = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/public/posts?page=${page}`, {
                headers: {
                    "Accept": "application/json"
                }
            })
            setMaxPage(data.data.data.last_page);
            setPosts(posts.concat(data.data.data.data));
        } catch (err) {
            setPosts([]);
        }
        setIsLoading(false)
        setPage(page + 1)
        setIsLoadMoreLoading(false)
    }
    useEffect(() => {
        setIsLoading(true);
        fetchData()
    }, [])

    const loadMore = () => {
        setIsLoadMoreLoading(true)
        fetchData();
    }
    const getPost = async () => {
        try {
            const data = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/public/posts?page=${page}`, {
                headers: {
                    "Accept": "application/json"
                }
            })
            setMaxPage(data.data.data.last_page);
            setPosts(posts.concat(data.data.data.data));
        } catch (err) {
            setPosts([]);
        }
        setPage(page + 1)
        return posts
    }
    return { posts, isLoading, loadMore, isLoadMoreLoading, page, maxPage, getPost }
}

export default usePost