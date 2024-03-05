import { UserData } from "../types"
import endpoints from "./endpoints"
import { httpService } from "./httpService"

const getAllUsersApi = async (setUsers: (users: UserData[]) => void) => {
    try {
        const users = await httpService.get(endpoints.USERS)

        if (!users.length) {
            throw new Error('Error: GET Users: No users found')
        }
        setUsers(users)

    } catch (error: any) {
        console.log(error?.message)
    }
}


export { getAllUsersApi }