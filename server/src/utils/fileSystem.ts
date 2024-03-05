import fs from 'fs';
import { PostData } from './types';
import { FILE_PATH } from './tools';


const readAllFromFile = (fileName: string) => {
    const data: string = fs.readFileSync(FILE_PATH + fileName, 'utf-8');
    if(!data.length) return []
    return  JSON.parse(data)
}

const addToFile = (post: PostData, fileName: string) => {
    const allPosts = readAllFromFile(fileName);
    allPosts.push(post)
    fs.writeFileSync( FILE_PATH + fileName, JSON.stringify(allPosts))
}

const removeFromFileById = (id: number, fileName: string) => {
    const allPosts = readAllFromFile(fileName);
    const filteredPosts = allPosts.filter((p: PostData)=>p.id !== id)

    fs.writeFileSync(FILE_PATH + fileName, JSON.stringify(filteredPosts))
}

const editItemFromFile = (post: PostData , id: number, fileName: string) => {
    const allPosts = readAllFromFile(fileName);
    const filteredPosts = allPosts.filter((p: PostData)=>p.id !== id)
    filteredPosts.push(post)

    fs.writeFileSync(FILE_PATH + fileName, JSON.stringify(filteredPosts))
}

export {
    readAllFromFile,
    addToFile,
    removeFromFileById,
    editItemFromFile
}
