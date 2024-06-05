import {API_URL} from "./URL.js";

export const renameProject = async (id, name) => {
    const token = localStorage.getItem('token');

    const requestData = {
        "name": name
    }

    try {
        const response = await fetch(API_URL + "/projects/" + id, {
            method: 'PATCH',
            headers: {
                'Authorization': 'Bearer ' + token,
                'mode': 'no-cors',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData),
        });

        if (!response.ok) {
            return false
        }

        const responseData = await response.json();
        console.log("RESPONSE AFTER RENAMING PROJ: ", responseData)
        // console.log("RETURNED FROM ID FROM BACK", responseData.id);
    } catch (error) {
        console.error('Error:', error);
    }
}