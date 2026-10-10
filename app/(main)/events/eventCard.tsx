import Image from "next/image";
import styles from "./events.module.css";
import type { EventItem } from "./eventsData";

interface EventCardProps {
    event: EventItem;
    onClick: () => void;
}

export default function EventCard({
    event,
    onClick,
}: EventCardProps) {
    return (
        <div
            className={`div_column ${styles.div_eventElement}`}
            onClick={onClick}
        >
            <Image
                src={event.images[0]}
                alt={event.title}
                width={600}
                height={400}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            <h2>{event.title}</h2>
            <h3>{event.dateTime}</h3>
            <p>{event.venue}</p>
        </div>
    );
}
