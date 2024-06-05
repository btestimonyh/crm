import {API_URL} from "./URL.js";

export const addNewProject = async (project) =>{
    console.log("REGISTERING", project);
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(API_URL + "/projects", {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'mode': 'no-cors',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project),
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
    }
}