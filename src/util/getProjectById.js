import {API_URL} from "./URL.js";

export const getProjectById = async (account) => {
    const token = localStorage.getItem('token');
    console.log("GETTING PROJ FOR : ", account)
    async function fetchProjectById() {
        try {
            const response = await fetch(API_URL + "/projects/" + account, {
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
    const data = await fetchProjectById();
    console.log(data)
    return data
}