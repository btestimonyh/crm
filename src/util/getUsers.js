export const getUsers = async () => {
    // implementing some test functionality here
    // testing how PR will work
    const token = localStorage.getItem('token');
    //тут моя строка для тесту
    //ше одна строка

    // запит на всіх юзерів, повертає масив з юзерами
    const USERS_FOR_TEST = [
        {
            id: '1',
            userId: 'uuidUserID1',
            name: 'Бtest1',
            email: 'test1@gmail.com',
            telegram: 'test1telegram1',
            job: 'buyer',
            status: 'active',
        },
        {
            id: '2',
            userId: 'uuidUserID2',
            name: 'test',
            email: 'test2@gmail.com',
            telegram: 'test1telegram2',
            job: 'buyer',
            status: 'active'
        },
        {
            id: '3',
            userId: 'uuidUserID3',
            name: 'test1',
            email: 'test3@gmail.com',
            telegram: 'test1telegram3',
            job: 'owner',
            status: 'inactive'
        },
        {
            id: '4',
            userId: 'uuidUserID4',
            name: 'Бtest1',
            email: 'test4@gmail.com',
            telegram: 'test1telegram4',
            job: 'owner',
            status: 'active'
        },
        {
            id: '5',
            userId: 'uuidUserID5',
            name: 'test',
            email: 'test5@gmail.com',
            telegram: 'test1telegram5',
            job: 'admin',
            status: 'active'
        },
        
    ]

    return USERS_FOR_TEST;
}