import {API_URL} from "./URL.js";

export const updateProject = async (projectId,buyerId) =>{
    const token = localStorage.getItem('token');
    console.log(projectId, buyerId);

    const requestData = {
        "buyerId": buyerId
    }

    try {
        const response = await fetch(API_URL + "/projects/" + projectId, {
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
        console.log("RESPONSE: ", responseData)
        // console.log("RETURNED FROM ID FROM BACK", responseData.id);
    } catch (error) {
        console.error('Error:', error);
    }
}