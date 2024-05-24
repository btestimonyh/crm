export const accountActive = async (account) => {
    console.log(account);

    if (account.status == 'active') {
        const accountToChange = { ...account,status: 'inactive' };
        // цей accountToChange треба поміняти замість account в базі
    }
    else {
        const accountToChange = { ...account,status: 'active' };
    }
}