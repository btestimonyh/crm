import {API_URL} from "./URL.js";

export const accountActive = async (account) => {
    console.log(account);
    const token = localStorage.getItem('token');

    const accountStatusToSet = account.status === 'active' ? 'deactivate' : 'activate';

    try {
        const response = await fetch(API_URL + "/users/" + accountStatusToSet + "/" + account.userId, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + token,
                'mode': 'no-cors',
                'Content-Type': 'application/json'
            },
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