import {API_URL} from "./URL.js";

export const getProjectById = async (id, timeZone) => {
    const token = localStorage.getItem('token');
    console.log("GETTING PROJ WITH ID !!! : ", id)
    async function fetchProjectById() {
        try {
            const response = await fetch(API_URL + "/projects/" + id + "?gmtShift="+timeZone, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': 'Bearer ' + token,
                    'mode': 'no-cors',
                    'Content-Type': 'application/json'
                })
            });

            const data = await response.json()
            console.log("GET PROJECT BY ID: ", data)
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