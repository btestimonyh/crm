export const getProjects = async () => {
    // повертає всі проекти
    const PROJECTS_FOR_TEST = [
        {
            id: 1,
            name: 'Projects 1',
            subs: 3251,
            ftd: 10,
            rd: 10,
            buyers: [
                'id1', 'id2', 'id3', 'id4', 'id5'
            ]
        },
        {
            id: 2,
            name: 'Projects 2',
            subs: 3321,
            ftd: 10,
            rd: 10,
            buyers: [
                'id1', 'id2', 'id3', 'id4', 'id5'
            ]
        },
        {
            id: 3,
            name: 'Projects 3',
            subs: 3221,
            ftd: 10,
            rd: 10,
            buyers: [
                'id4', 'id2', 'id3', 'id4', 'id5'
            ]
        },
        {
            id: 4,
            name: 'Projects 4',
            subs: 3121,
            ftd: 10,
            rd: 10,
            buyers: [
                'id1', 'id2', 'id3', 'id4', 'id5'
            ]
        },
    ]
    return PROJECTS_FOR_TEST;
}