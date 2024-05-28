import {API_URL} from "./URL.js";

export const loginCheck = async (login, password) => {
    const loginData = {
        "login": login,
        "password": password
    }
    console.log(loginData)


    try {
        const response = await fetch(API_URL + "/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        if (!response.ok) {
            console.error(response.message);
        }

        const responseData = await response.json();
        console.log("RETURNED FROM ID AND TOKEN FROM BACK", responseData.id, responseData.token);
        localStorage.setItem('token', responseData.token);

        return responseData.id;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}