import {API_URL} from "./URL.js";

export const getUsers = async () => {
    const token = localStorage.getItem('token');
    console.log("GET USERS IS TRIGGERED")
    async function fetchAllUsers() {
        try {
            const response = await fetch(API_URL + "/users", {
                method: 'GET',
                headers: new Headers({
                    'Authorization': 'Bearer ' + token,
                    'mode': 'no-cors',
                    'Content-Type': 'application/json'
                })
            });

            const data = await response.json()
            console.log(data)
            console.log("GET USERS IS RETURNING")
            return data
        } catch (error) {
            console.error('Error fetching data:', error);
            return false;
        }
    }

    const responseArray = await fetchAllUsers();
    // Mapping the array to rename id to userId in each object
    const formattedArray = responseArray.map((user, index) => {
        const { id, login, role, permissionStatus, ...rest } = user; // Destructure id and capture the rest of the properties
        return {id: index + 1, userId: id, email: login, job: role.toLowerCase(), status: permissionStatus.toLowerCase(), ...rest }; // Return new object with userId, auto-increment, and rest of the properties
    });
    return formattedArray;
    // // запит на всіх юзерів, повертає масив з юзерами
    // const USERS_FOR_TEST = [
    //     {
    //         userId: 'uuidUserID1',
    //         name: 'Бtest1',
    //         email: 'test1@gmail.com',
    //         telegram: 'test1telegram1',
    //         job: 'buyer',
    //         status: 'active',
    //     },
    //     {
    //         userId: 'uuidUserID2',
    //         name: 'test',
    //         email: 'test2@gmail.com',
    //         telegram: 'test1telegram2',
    //         job: 'buyer',
    //         status: 'active'
    //     },
    //     {
    //         id: '3',
    //         userId: 'uuidUserID3',
    //         name: 'test1',
    //         email: 'test3@gmail.com',
    //         telegram: 'test1telegram3',
    //         job: 'owner',
    //         status: 'inactive'
    //     },
    //     {
    //         id: '4',
    //         userId: 'uuidUserID4',
    //         name: 'Бtest1',
    //         email: 'test4@gmail.com',
    //         telegram: 'test1telegram4',
    //         job: 'owner',
    //         status: 'active'
    //     },
    //     {
    //         id: '5',
    //         userId: 'uuidUserID5',
    //         name: 'test',
    //         email: 'test5@gmail.com',
    //         telegram: 'test1telegram5',
    //         job: 'admin',
    //         status: 'active'
    //     },
    //
    // ]
}