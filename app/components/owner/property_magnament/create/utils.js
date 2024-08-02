const setName = (setData, newData) => {
    setData(
        {
            name: newData.name,
            location: newData.location
        }
    );
}

export default setName