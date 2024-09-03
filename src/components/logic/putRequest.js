export function putRequest({ tableName, data, token, postUrl, setIsLoading, setShowPopupMsg, setPopupContent }) {
    setIsLoading(true);

    fetch(postUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ tableName: [data] })
    })
    .then(response => response.json())
    .then(data => {
        setShowPopupMsg(true);
        setPopupContent(data.message);
        console.log(data.message);
        
        setIsLoading(false);
    })
    .catch(error => {
        setShowPopupMsg(true);
        setPopupContent(error.message);
        setIsLoading(false);
    });
}