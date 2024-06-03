import {API_URL} from "./URL.js";

export const deleteAccount = async (account) => {
    const token = localStorage.getItem('token');
    console.log(account);

    try {
        const response = await fetch(API_URL + "/users/" + account.userId, {
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