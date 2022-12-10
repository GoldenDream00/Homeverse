import { useEffect, useState } from 'react';
import LoadingCard from './loading-card';

export default function LoadingList({size}) {

    const [list, setList] = useState([...new Array(size)]);

    return (
        <>
            {
                list.map((item, key) => {
                    return (
                        <li key={key}>
                            <LoadingCard />
                        </li>
                    )
                })
            }
        </>
    )
}