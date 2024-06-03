import {API_URL} from "./URL.js";

export const roleCheck = async (id) => {
    const token = localStorage.getItem('token');
    console.log(token)

    async function fetchUserRole() {
        try {
            const response = await fetch(API_URL + "/users/" + id, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': 'Bearer ' + token,
                    // 'mode': 'no-cors',
                    // 'Content-Type': 'application/x-www-form-urlencoded'
                })
            });

            const data = await response.json()
            console.log(data)
            if (data.permissionStatus === "ACTIVE") {
                return data.role.toLowerCase();
            } else {
                // Returning false, because user permissionStatus is not ACTIVE
                return false;
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            return false;
        }
    }

    return await fetchUserRole()
    // приймає айдішку юзера, повертає user.JOB 
    // 'buyer', 'admin', 'owner'
    // якщо юзера вже видалили, то і не находить таку айдішку, то повертає false;
}