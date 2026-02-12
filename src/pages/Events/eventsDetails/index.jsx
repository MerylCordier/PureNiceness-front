/* eslint-disable react/prop-types */
function EventsDetails({ eventsDetails }) {
  // Le backend renvoie { upcoming: [], past: { label: string, events: [] } }
  const upcomingEvents = eventsDetails.upcoming || [];
  const pastEvents = (eventsDetails.past?.events || []).sort(
    (a, b) => new Date(b.starting_date) - new Date(a.starting_date),
  );

  const renderEvent = (event, index, isPast = false) => (
    <div
      className={`event_container ${index % 2 === 0 ? "" : "is_active"} ${isPast ? "past_event" : ""}`}
      key={event.id}
    >
      <div className="img_container">
        <img className="event_image" src={event.url_image} alt={event.name} />
      </div>
      <div className="text_containeur">
        <h2 className="event_h2">{event.name}</h2>
        <p className="event_date_debut">
          Début:{" "}
          {new Date(event.starting_date).toLocaleString("fr-FR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </p>
        <p className="event_date_fin">
          Fin:{" "}
          {new Date(event.ending_date).toLocaleString("fr-FR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </p>
        <p className="event_description">{event.description}</p>
        <p className="event_ville">{event.city}</p>
        <p className="event_pays">{event.country}</p>
        <p className="event_lieu">{event.location}</p>
      </div>
    </div>
  );

  return (
    <>
      {/* Section des événements à venir */}
      <div className="event_section">
        <h2 className="section_title upcoming_title">Événements à venir</h2>
        <div className="section_content">
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event, index) =>
              renderEvent(event, index, false),
            )
          ) : (
            <p className="no_event_message">
              Aucun événement à venir pour le moment
            </p>
          )}
        </div>
      </div>

      {/* Section des événements passés */}
      {pastEvents.length > 0 && (
        <div className="event_section past_section">
          <h2 className="section_title past_title">
            {eventsDetails.past?.label || "Événements passés"}
          </h2>
          <div className="section_content">
            {pastEvents.map((event, index) => renderEvent(event, index, true))}
          </div>
        </div>
      )}
    </>
  );
}

export default EventsDetails;
