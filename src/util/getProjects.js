import {API_URL} from "./URL.js";

export const getProjects = async () => {
    // повертає всі проекти
    const token = localStorage.getItem('token');

    async function fetchAllProjects() {
        try {
            const response = await fetch(API_URL + "/projects", {
                method: 'GET',
                headers: new Headers({
                    'Authorization': 'Bearer ' + token,
                    'mode': 'no-cors',
                    'Content-Type': 'application/json'
                })
            });

            return await response.json()
        } catch (error) {
            console.error('Error fetching data:', error);
            return false;
        }
    }

    console.log("PROJ RETURNED HELLO: ")
    const responseArray = await fetchAllProjects();
    console.log("PROJ RETURNED: ", responseArray)
    return responseArray
}