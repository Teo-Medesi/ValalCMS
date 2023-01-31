import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../../firebase.config';

const useAnchors = (anchorsPath) => {

    const [anchors, setAnchors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchAnchors = async () => {
        // if we don't specify orderBy("id"), the array we get returned won't be sorted, therefore all the anchors that is sections would be unsorted
        setIsLoading(true);
        const anchorsRef = query(collection(db, anchorsPath), orderBy("ID"));
        const anchorsSnap = await getDocs(anchorsRef);

        // before we set our anchors we want to make sure our anchors array is empty, if it isn't, our anchors won't be replaced, they'll just be duplicated 
        setAnchors([]);
        anchorsSnap.forEach(anchorSnap => setAnchors(current => ([...current, { ...anchorSnap.data(), id: anchorSnap.id, path: `${anchorsPath}/${anchorSnap.id}` }])));
        setIsLoading(false);
    }

    useEffect(() => {
        if (anchorsPath != "" && anchorsPath != null)
        {
            fetchAnchors();
        }
    }, [anchorsPath]);

    return { anchors, fetchAnchors, isLoading }

}

export default useAnchors