import {API_URL} from "./URL.js";

export const deleteProject = async (id) => {
    const token = localStorage.getItem('token');
    console.log("PROJECT TO DELETE", id);

    try {
        const response = await fetch(API_URL + "/projects/" + id, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token,
                'mode': 'no-cors',
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            return false
        }
        // NO RESPONSE HERE
        // const responseData = await response.json();
        // console.log("RESPONSE: ", responseData)
        // console.log("RETURNED FROM ID FROM BACK", responseData.id);
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}