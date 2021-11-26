import React from 'react';
import Layout from '../components/layout.component';


const Home = () => {
    let fas = new Array(30).fill({a: 'a'});

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