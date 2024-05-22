export const customStyles = {
    control: (provided) => ({
        ...provided,
        backgroundColor: '#131a22',
        border: 'none',
        boxShadow: 'none',
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: '#131a22',
    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'white',
    }),
    placeholder: (provided) => ({
        ...provided,
        color: 'grey',
    }),
    input: (provided) => ({
        ...provided,
        color: 'white',
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? '#3e4aeb' : state.isSelected ? '#3e4aeb' : '',
        color: state.isSelected ? 'white' : 'white',
        '&:hover': {
            backgroundColor: '#1a2349',
        },
    }),
};