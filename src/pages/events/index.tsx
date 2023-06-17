import React from 'react'

const EventsPage = () => {
    const events = ['Event 1', 'Event 2', 'Event 3'] // Remplacer par vos propres données d'événements

    return (
        <div>
            <h1>Events</h1>
            <ul>
                {events.map((event, index) => (
                    <li key={index}>{event}</li>
                ))}
            </ul>
        </div>
    )
}

export default EventsPage
