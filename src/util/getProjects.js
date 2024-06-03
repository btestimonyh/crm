import {API_URL} from "./URL.js";

export const getProjects = async (timeZone = 0) => {
    // повертає всі проекти
    const token = localStorage.getItem('token');
    console.log("Projects timezone: ", timeZone)

    async function fetchAllProjects() {
        try {
            const response = await fetch(API_URL + "/projects?gmtShift=" + timeZone, {
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