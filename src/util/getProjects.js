export const getProjects = async () => {
    // повертає всі проекти
    const PROJECTS_FOR_TEST = [
        {
            id: 1,
            name: 'Projects 1',
            subs: 3251,
            ftd: 10,
            rd: 10,
            buyerId: 'id1',
            leads: [
                {
                    "firstName": "LeadUserFirstName",
                    "lastName": "LeadLastName",
                    "phone": "123-456-7890",
                    "username": "johndoe",
                    "tgid": "tg12345",
                    "subid": "sub12345",
                    "status": "active",
                    "isFtd": "true",
                    "rdCount": "5",
                    "fbStatus": "good",
                    "sub1": "value1",
                    "sub2": "value2",
                    "sub3": "value3",
                    "sub4": "value4",
                    "sub5": "value5",
                    "sub6": "value6",
                    "sub7": "value7",
                    "sub8": "value8",
                    "projectId": "2cf7bc88-1098-4bf8-af92-420c75032c0f"
                },
                {
                    "firstName": "LeadUserFirstName",
                    "lastName": "LeadLastName",
                    "phone": "123-456-7890",
                    "username": "johndoe",
                    "tgid": "tg12345",
                    "subid": "sub12345",
                    "status": "active",
                    "isFtd": "true",
                    "rdCount": "5",
                    "fbStatus": "good",
                    "sub1": "value1",
                    "sub2": "value2",
                    "sub3": "value3",
                    "sub4": "value4",
                    "sub5": "value5",
                    "sub6": "value6",
                    "sub7": "value7",
                    "sub8": "value8",
                    "projectId": "2cf7bc88-1098-4bf8-af92-420c75032c0f"
                },
                {
                    "firstName": "LeadUserFirstName",
                    "lastName": "LeadLastName",
                    "phone": "123-456-7890",
                    "username": "johndoe",
                    "tgid": "tg12345",
                    "subid": "sub12345",
                    "status": "active",
                    "isFtd": "true",
                    "rdCount": "5",
                    "fbStatus": "good",
                    "sub1": "value1",
                    "sub2": "value2",
                    "sub3": "value3",
                    "sub4": "value4",
                    "sub5": "value5",
                    "sub6": "value6",
                    "sub7": "value7",
                    "sub8": "value8",
                    "projectId": "2cf7bc88-1098-4bf8-af92-420c75032c0f"
                }
            ]
        },
        {
            id: 2,
            name: 'Projects 2',
            subs: 3321,
            ftd: 10,
            rd: 10,
            buyerId: 'id2'
        },
        {
            id: 3,
            name: 'Projects 3',
            subs: 3221,
            ftd: 10,
            rd: 10,
            buyerId: 'id3'
        },
        {
            id: 4,
            name: 'Projects 4',
            subs: 3121,
            ftd: 10,
            rd: 10,
            buyerId: 'id4'
        },
    ]
    return PROJECTS_FOR_TEST;
}