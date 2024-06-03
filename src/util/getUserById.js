import {API_URL} from "./URL.js";

export const getUserById = async (id) =>{
    const token = localStorage.getItem('token');
    console.log("GETTING USER BY ID : ", id)
    async function fetchProjectById() {
        try {
            const response = await fetch(API_URL + "/users/" + id, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': 'Bearer ' + token,
                    'mode': 'no-cors',
                    'Content-Type': 'application/json'
                })
            });

            const data = await response.json()
            console.log(data)
            return data
        } catch (error) {
            console.error('Error fetching data:', error);
            return false;
        }
    }

    const responseJson = await fetchProjectById();
    // responseJson.date = formatDateTime(responseJson.date);
    console.log(responseJson)
    return responseJson
}