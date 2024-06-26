export const leadsTitle = [
    {
        field: 'id',
        headerName: 'ID',
        // flex:1,
        minWidth: 100,
        disableColumnMenu: true,
    },
    {
        field: 'firstName',
        headerName: 'ИМЯ',
        minWidth: 150,
        disableColumnMenu: true,
    },
    // {
    //     field: 'lastName',
    //     headerName: 'ФАМИЛИЯ',
    //     minWidth: 150,
    //     disableColumnMenu: true,
    // },
    {
        field: 'username',
        headerName: 'Username',
        minWidth: 150,
        disableColumnMenu: true,
    },
    {
        field: 'subscribed',
        headerName: 'Подписан',
        minWidth: 150,
        disableColumnMenu: true,
        renderCell: (params) => {
            if (params.row.isGroupHeader) {
                return params.value; 
            }
            return params.value ? 'Да' : 'Нет';
        },
    },
    {
        field: 'tgid',
        headerName: 'TID',
        minWidth: 150,
        disableColumnMenu: true,
    },
    {
        field: 'status',
        headerName: 'СТАТУС',
        minWidth: 100,
        disableColumnMenu: true,
    },
    {
        field: 'isFtd',
        headerName: 'FTD',
        minWidth: 50,
        disableColumnMenu: true,
        renderCell: (params) => {
            if (params.row.isGroupHeader) {
                return params.value; 
            }
            return params.value ? 'Да' : 'Нет'; 
        },
    },
    {
        field: 'ftdAmount',
        headerName: 'Сумма FTD',
        minWidth: 100,
        disableColumnMenu: true,
        renderCell: (params) => `${params.value ? params.value : 0} $`
    },
    {
        field: 'rdCount',
        headerName: 'Кол-во RD',
        minWidth: 100,
        disableColumnMenu: true,
    },
    {
        field: 'rdAmount',
        headerName: 'Сумма RD',
        minWidth: 100,
        disableColumnMenu: true,
        renderCell: (params) => `${params.value ? params.value : 0} $`
    },
    {
        field: 'fbStatus',
        headerName: 'Статус FB',
        minWidth: 100,
        disableColumnMenu: true,
    },
    {
        field: 'sub1',
        headerName: 'link',
        minWidth: 140,
        disableColumnMenu: true,
    },
    {
        field: 'sub2',
        headerName: 'sub2',
        minWidth: 140,
        disableColumnMenu: true,
    },
    {
        field: 'sub3',
        headerName: 'sub3',
        minWidth: 140,
        disableColumnMenu: true,
    },
    {
        field: 'sub4',
        headerName: 'sub4',
        minWidth: 140,
        disableColumnMenu: true,
    },
    {
        field: 'sub5',
        headerName: 'sub5',
        minWidth: 140,
        disableColumnMenu: true,
    },
    {
        field: 'sub6',
        headerName: 'adset name',
        minWidth: 140,
        disableColumnMenu: true,
    },
    {
        field: 'sub7',
        headerName: 'sub7',
        minWidth: 120,
        disableColumnMenu: true,
    },
    {
        field: 'sub8',
        headerName: 'sub8',
        minWidth: 120,
        disableColumnMenu: true,
    },

];

// "firstName": "LeadUserFirstName",
// "lastName": "LeadLastName",
// "phone": "123-456-7890",
// "username": "johndoe",
// "tgid": "tg12345",
// "subid": "sub12345",
// "status": "active",
// "isFtd": "true",
// "rdCount": "5",
// "fbStatus": "good",
// "sub1": "value1",
// "sub2": "value2",
// "sub3": "value3",
// "sub4": "value4",
// "sub5": "value5",
// "sub6": "value6",
// "sub7": "value7",
// "sub8": "value8",
// "projectId": "2cf7bc88-1098-4bf8-af92-420c75032c0f"