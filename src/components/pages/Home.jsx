import React, { useEffect, useContext, useState } from 'react'
import storage from '../helpers/storage';
import SEO from '../layouts/partials/SEO'

const Home = () => {

    const [notifications, setNotifications] = useState([])
    const [listen, setListen] = useState(false);

    useEffect(() => {

    }, [])

    const initListen = async () => {

        if (listen === false) {

            const events = await new EventSource('http://localhost:5000/api/identity/v1/notify/events');

            events.onmessage = (e) => {

                const passed = JSON.parse(e.data);

                setNotifications(passed)
            }

            setListen(true);
        }
    }

    return (
        <>
            <SEO type="main" />
            <h1 className="text-center">Hello Todo!</h1>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th className="text-center">Id</th>
                        <th className="text-center">Body</th>
                        <th className="text-center">Sender</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        notifications.map((n, i) =>
                            <tr key={i}>
                                <td>{n.refId}</td>
                                <td>{n.body}</td>
                                <td>{n.sender ? n.sender['name'] : ''}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </>
    )
}

export default Home;
