/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import "./index.css";

import { useState, useEffect } from "react";

import EventsDetails from "./eventsDetails";
import fetchData from "../../services/api/call.api";

function Events() {
  const [eventsDetails, setEventsDetails] = useState({
    upcoming: [],
    past: { events: [] },
  });

  const fetchDetails = async () => {
    try {
      const eventsData = await fetchData("GET", "events");
      // Le call.api.js enveloppe toujours les réponses dans un tableau
      // Donc on extrait le premier élément qui contient notre objet {upcoming: [], past: {...}}
      const eventsObject = Array.isArray(eventsData)
        ? eventsData[0]
        : eventsData;
      setEventsDetails(eventsObject);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return <EventsDetails eventsDetails={eventsDetails} />;
}

export default Events;
