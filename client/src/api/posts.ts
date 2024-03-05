import { PostData } from "../types"
import { sortPostsByDate } from "../utils/tools"
import endpoints from "./endpoints"
import { httpService } from "./httpService"

const getAllPostsApi = async (setPosts: (posts: PostData[]) => void) => {
    try {
        const posts = await httpService.get(endpoints.POSTS)
        if (!posts.length) {
            throw new Error('Error: GET Posts: No posts found')
        }
        setPosts(posts.sort(sortPostsByDate))
    } catch (error: any) {
        console.log(error?.message)
    }
}

const addPostApi = async (payload: PostData) => {
    try {
        const response = await httpService.post(endpoints.POSTS, payload);
        return response;
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
}

const editPostApi = async (payload: PostData) => {
    try {
        const response = await httpService.put(`${endpoints.POSTS}/${payload.id}`, payload);
        return response;
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
}

const deletePostApi = async (id: number) => {
    try {
        const response = await httpService.delete(`${endpoints.POSTS}/${id}`);
        return response;
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
}

export { getAllPostsApi, addPostApi, deletePostApi, editPostApi }