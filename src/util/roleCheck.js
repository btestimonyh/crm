export const roleCheck = async (id) => {
    const token = localStorage.getItem('token');
    
    // приймає айдішку юзера, повертає user.JOB 
    // 'buyer', 'admin', 'owner'
    // якщо юзера вже видалили, то і не находить таку айдішку, то повертає false;
    return 'admin'
}