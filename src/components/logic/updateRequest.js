import { useDataContexts } from '../../../ContextProviders/DataContexts';

export function updateRequest({tableName, data}) {
    const {
        employee,
        token, postUrl,
        isLoading,
        setIsLoading,
        showPopupMsg, setShowPopupMsg,
        popupContent, setPopupContent,
    } = useDataContexts();

    setIsLoading(true)

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
            setIsLoading(false);
        })
        .catch(error => {
            setShowPopupMsg(true);
            setPopupContent(error.message);
            setIsLoading(false);
        });


}