import {API_URL} from "./URL.js";
import {formatDateTime} from "./front/formatDate.js";

export const registerUser = async (requestData) =>{
    console.log(requestData)
    requestData.login = requestData.email;
    requestData.registrationDate = formatDateTime();
    console.log("REGISTERING: ", requestData)

    const token = localStorage.getItem('token');


    try {
        const response = await fetch(API_URL + "/users/register/" + requestData.job, {
            method: 'POST',
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
