import React, { useEffect, useState } from 'react';
import Layout from '../components/layout.component';


const Home = () => {
    const [error, setError] = useState(false)

    let fas = new Array(30).fill({a: 'a'});

    useEffect(() => {
    }, [])

    return (
        <Layout>
            <ul>
            {
                fas.map((j, i) => (
                    <li key={i}>Hola {j.a}</li>
                ))
            }
            </ul>
            
        </Layout>
    );
}

export default Home;