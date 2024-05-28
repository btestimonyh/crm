import {API_URL} from "./URL.js";

export const getProjects = async () => {
    // повертає всі проекти
    const token = localStorage.getItem('token');

    async function fetchAllProjects() {
        try {
            const response = await fetch(API_URL + "/projects", {
                method: 'GET',
                headers: new Headers({
                    'Authorization': 'Bearer ' + token,
                    'mode': 'no-cors',
                    'Content-Type': 'application/json'
                })
            });

            return await response.json()
        } catch (error) {
            console.error('Error fetching data:', error);
            return false;
        }
    }

    console.log("PROJ RETURNED HELLO: ")
    const responseArray = await fetchAllProjects();
    console.log("PROJ RETURNED: ", responseArray)
    return responseArray

    // const PROJECTS_FOR_TEST = [
    //     {
    //         id: 1,
    //         name: 'Projects 1',
    //         subs: 3251,
    //         ftd: 10,
    //         rd: 10,
    //         buyerId: 'id1',
    //         pixelId:'123',
    //         leads: [
    //             {
    //                 "firstName": "Lead1",
    //                 "lastName": "LeadLastName",
    //                 "phone": "123-456-7890",
    //                 "username": "johndoe",
    //                 "tgid": "tg12345",
    //                 "subid": "sub12345",
    //                 "status": "active",
    //                 "isFtd": "true",
    //                 "rdCount": "5",
    //                 "fbStatus": "good",
    //                 "sub1": "value1",
    //                 "sub2": "value2",
    //                 "sub3": "value3",
    //                 "sub4": "value4",
    //                 "sub5": "value5",
    //                 "sub6": "value6",
    //                 "sub7": "value7",
    //                 "sub8": "value8",
    //                 // "projectId": "2cf7bc88-1098-4bf8-af92-420c75032c0f"
    //             },
    //             {
    //                 "firstName": "Lead2",
    //                 "lastName": "LeadLastName",
    //                 "phone": "123-456-7890",
    //                 "username": "johndoe",
    //                 "tgid": "tg12345",
    //                 "subid": "sub12345",
    //                 "status": "active",
    //                 "isFtd": "false",
    //                 "rdCount": "5",
    //                 "fbStatus": "good",
    //                 "sub1": "value1",
    //                 "sub2": "value2",
    //                 "sub3": "value3",
    //                 "sub4": "value4",
    //                 "sub5": "value5",
    //                 "sub6": "value6",
    //                 "sub7": "value7",
    //                 "sub8": "value8",
    //                 // "projectId": "2cf7bc88-1098-4bf8-af92-420c75032c0f"
    //             },
    //             {
    //                 "firstName": "Lead3",
    //                 "lastName": "LeadLastNamasde",
    //                 "phone": "123-456-7890",
    //                 "username": "johndoe",
    //                 "tgid": "tg12345",
    //                 "subid": "sub12345",
    //                 "status": "active",
    //                 "isFtd": "false",
    //                 "rdCount": "5",
    //                 "fbStatus": "good",
    //                 "sub1": "value2",
    //                 "sub2": "value2",
    //                 "sub3": "value3",
    //                 "sub4": "value4",
    //                 "sub5": "value5",
    //                 "sub6": "value6",
    //                 "sub7": "value7",
    //                 "sub8": "value8",
    //                 // "projectId": "2cf7bc88-1098-4bf8-af92-420c75032c0f"
    //             },
    //             {
    //                 "firstName": "Lead4",
    //                 "lastName": "LeadLastName",
    //                 "phone": "123-456-7890",
    //                 "username": "johndoe",
    //                 "tgid": "tg12345",
    //                 "subid": "sub12345",
    //                 "status": "active",
    //                 "isFtd": "true",
    //                 "rdCount": "5",
    //                 "fbStatus": "good",
    //                 "sub1": "value1",
    //                 "sub2": "value2",
    //                 "sub3": "value3",
    //                 "sub4": "value4",
    //                 "sub5": "value5",
    //                 "sub6": "value6",
    //                 "sub7": "value7",
    //                 "sub8": "value8",
    //                 // "projectId": "2cf7bc88-1098-4bf8-af92-420c75032c0f"
    //             },
    //             {
    //                 "firstName": "Lead5",
    //                 "lastName": "LeadLastName",
    //                 "phone": "123-456-7890",
    //                 "username": "johndoe",
    //                 "tgid": "tg12345",
    //                 "subid": "sub12345",
    //                 "status": "inactive",
    //                 "isFtd": "true",
    //                 "rdCount": "5",
    //                 "fbStatus": "bad",
    //                 "sub1": "value1",
    //                 "sub2": "value2",
    //                 "sub3": "value3",
    //                 "sub4": "value4",
    //                 "sub5": "value5",
    //                 "sub6": "value6",
    //                 "sub7": "value7",
    //                 "sub8": "value8",
    //                 // "projectId": "2cf7bc88-1098-4bf8-af92-420c75032c0f"
    //             },
    //             {
    //                 "firstName": "Lead6",
    //                 "lastName": "LeadLastName",
    //                 "phone": "123-456-7890",
    //                 "username": "johndoe",
    //                 "tgid": "tg12345",
    //                 "subid": "sub12345",
    //                 "status": "inactive",
    //                 "isFtd": "true",
    //                 "rdCount": "5",
    //                 "fbStatus": "bad",
    //                 "sub1": "value1",
    //                 "sub2": "value2",
    //                 "sub3": "value3",
    //                 "sub4": "value4",
    //                 "sub5": "value5",
    //                 "sub6": "value6",
    //                 "sub7": "value7",
    //                 "sub8": "value8",
    //                 // "projectId": "2cf7bc88-1098-4bf8-af92-420c75032c0f"
    //             },
    //             {
    //                 "firstName": "Lead7",
    //                 "lastName": "LeadLastName",
    //                 "phone": "123-456-7890",
    //                 "username": "johndoe",
    //                 "tgid": "tg12345",
    //                 "subid": "sub12345",
    //                 "status": "active",
    //                 "isFtd": "true",
    //                 "rdCount": "5",
    //                 "fbStatus": "good",
    //                 "sub1": "value1",
    //                 "sub2": "value2",
    //                 "sub3": "value3",
    //                 "sub4": "value4",
    //                 "sub5": "value5",
    //                 "sub6": "value6",
    //                 "sub7": "value7",
    //                 "sub8": "value8",
    //                 // "projectId": "2cf7bc88-1098-4bf8-af92-420c75032c0f"
    //             },
    //             {
    //                 "firstName": "Lead7",
    //                 "lastName": "LeadLastName",
    //                 "phone": "123-456-7890",
    //                 "username": "johndoe",
    //                 "tgid": "tg12345",
    //                 "subid": "sub12345",
    //                 "status": "active",
    //                 "isFtd": "true",
    //                 "rdCount": "5",
    //                 "fbStatus": "good",
    //                 "sub1": "value1",
    //                 "sub2": "value2",
    //                 "sub3": "value3",
    //                 "sub4": "value4",
    //                 "sub5": "value5",
    //                 "sub6": "value6",
    //                 "sub7": "value7",
    //                 "sub8": "value8",
    //                 // "projectId": "2cf7bc88-1098-4bf8-af92-420c75032c0f"
    //             },
    //             {
    //                 "firstName": "Lead7",
    //                 "lastName": "LeadLastName",
    //                 "phone": "123-456-7890",
    //                 "username": "johndoe",
    //                 "tgid": "tg12345",
    //                 "subid": "sub12345",
    //                 "status": "active",
    //                 "isFtd": "true",
    //                 "rdCount": "5",
    //                 "fbStatus": "good",
    //                 "sub1": "value1",
    //                 "sub2": "value2",
    //                 "sub3": "value3",
    //                 "sub4": "value4",
    //                 "sub5": "value5",
    //                 "sub6": "value6",
    //                 "sub7": "value7",
    //                 "sub8": "value8",
    //                 // "projectId": "2cf7bc88-1098-4bf8-af92-420c75032c0f"
    //             },
    //             {
    //                 "firstName": "Lead7",
    //                 "lastName": "LeadLastName",
    //                 "phone": "123-456-7890",
    //                 "username": "johndoe",
    //                 "tgid": "tg12345",
    //                 "subid": "sub12345",
    //                 "status": "active",
    //                 "isFtd": "true",
    //                 "rdCount": "5",
    //                 "fbStatus": "good",
    //                 "sub1": "value1",
    //                 "sub2": "value2",
    //                 "sub3": "value3",
    //                 "sub4": "value4",
    //                 "sub5": "value5",
    //                 "sub6": "value6",
    //                 "sub7": "value7",
    //                 "sub8": "value8",
    //                 // "projectId": "2cf7bc88-1098-4bf8-af92-420c75032c0f"
    //             },
    //             {
    //                 "firstName": "Lead7",
    //                 "lastName": "LeadLastName",
    //                 "phone": "123-456-7890",
    //                 "username": "johndoe",
    //                 "tgid": "tg12345",
    //                 "subid": "sub12345",
    //                 "status": "active",
    //                 "isFtd": "true",
    //                 "rdCount": "5",
    //                 "fbStatus": "good",
    //                 "sub1": "value1",
    //                 "sub2": "value2",
    //                 "sub3": "value3",
    //                 "sub4": "value4",
    //                 "sub5": "value5",
    //                 "sub6": "value6",
    //                 "sub7": "value7",
    //                 "sub8": "value8",
    //                 // "projectId": "2cf7bc88-1098-4bf8-af92-420c75032c0f"
    //             },  {
    //                 "firstName": "Lead7",
    //                 "lastName": "LeadLastName",
    //                 "phone": "123-456-7890",
    //                 "username": "johndoe",
    //                 "tgid": "tg12345",
    //                 "subid": "sub12345",
    //                 "status": "active",
    //                 "isFtd": "true",
    //                 "rdCount": "5",
    //                 "fbStatus": "good",
    //                 "sub1": "value1",
    //                 "sub2": "value2",
    //                 "sub3": "value3",
    //                 "sub4": "value4",
    //                 "sub5": "value5",
    //                 "sub6": "value6",
    //                 "sub7": "value7",
    //                 "sub8": "value8",
    //                 // "projectId": "2cf7bc88-1098-4bf8-af92-420c75032c0f"
    //             },
    //         ]
    //     },
    //     {
    //         id: 2,
    //         name: 'Projects 2',
    //         subs: 3321,
    //         ftd: 10,
    //         rd: 10,
    //         buyerId: 'id2'
    //     },
    //     {
    //         id: 3,
    //         name: 'Projects 3',
    //         subs: 3221,
    //         ftd: 10,
    //         rd: 10,
    //         buyerId: 'id3'
    //     },
    //     {
    //         id: 4,
    //         name: 'Projects 4',
    //         subs: 3121,
    //         ftd: 10,
    //         rd: 10,
    //         buyerId: 'user-id'
    //     },
    // ]
    // return PROJECTS_FOR_TEST;
}