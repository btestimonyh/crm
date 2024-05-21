export const getUsers = async () => {
    // implementing some test functionality here
    // testing how PR will work

    // запит на всіх юзерів, повертає масив з юзерами
    const USERS_FOR_TEST = [
        {
            id: '1',
            userId: 'uuidUserID',
            name: 'Бtest1',
            email: 'test1@gmail.com',
            telegram: 'test1telegram',
            job: 'owner',
            status: 'active'
        },
        {
            id: '2',
            userId: 'uuidUserID',
            name: 'test',
            email: 'test1@gmail.com',
            telegram: 'test1telegram',
            job: 'buyer',
            status: 'active'
        },
        {
            id: '3',
            userId: 'uuidUserID',
            name: 'test1',
            email: 'test1@gmail.com',
            telegram: 'test1telegram',
            job: 'owner',
            status: 'inactive'
        },
        {
            id: '4',
            userId: 'uuidUserID',
            name: 'Бtest1',
            email: 'test1@gmail.com',
            telegram: 'test1telegram',
            job: 'owner',
            status: 'active'
        },
        {
            id: '5',
            userId: 'uuidUserID',
            name: 'test',
            email: 'test1@gmail.com',
            telegram: 'test1telegram',
            job: 'admin',
            status: 'active'
        },
        
    ]

    return USERS_FOR_TEST;
}