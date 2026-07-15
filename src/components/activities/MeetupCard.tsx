import { format } from "date-fns";
import { Clock, MapPin, CalendarDays } from "lucide-react";

type Meetup = {
  id: string;
  meetup_date: string;
  start_time: string;
  end_time: string;
  location: string;
  activities: string[];
  custom_activity: string | null;
  description: string | null;
};

interface Props {
  meetup: Meetup;
  compact?: boolean;
}

function formatTime(time: string) {
  return time.slice(0, 5);
}

export default function MeetupCard({
  meetup,
  compact = false,
}: Props) {

  const activitiesText = meetup.activities?.join(", ");

  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">

      {/* Header */}
      <div className="flex items-center justify-between gap-3">

        <span className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground">
          <CalendarDays 
            className="size-4 text-primary" 
            aria-hidden="true" 
          />

          {format(
            new Date(meetup.meetup_date),
            "EEEE, d MMMM yyyy"
          )}
        </span>

      </div>


      {/* Title */}
      <h3 className="mt-4 font-serif text-xl font-semibold text-accent">
        {[
          ...(meetup.activities || []),
          ...(meetup.custom_activity ? [meetup.custom_activity] : [])
        ]
          .slice(0, 2)
          .join(" & ") || "Senior Club Meetup"}
      </h3>


      {/* Description */}
      {meetup.description && (
        <p className="mt-2 flex-1 leading-relaxed text-muted-foreground">
          {meetup.description}
        </p>
      )}


      {/* Activities */}
      <div className="mt-5">

        <div className="flex flex-wrap gap-2">

          {(compact
            ? meetup.activities?.slice(0, 3)
            : meetup.activities
          )?.map((activity) => (
            <span
              key={activity}
              className="rounded-full bg-primary/15 px-3 py-1 text-sm font-bold text-primary"
            >
              {activity}
            </span>
          ))}


          {compact && meetup.activities.length > 3 && (
            <span className="rounded-full bg-primary/15 px-3 py-1 text-sm font-bold text-primary">
              +{meetup.activities.length - 3} more
            </span>
          )}


          {meetup.custom_activity && (
            <span className="rounded-full bg-primary/15 px-3 py-1 text-sm font-bold text-primary">
              {meetup.custom_activity}
            </span>
          )}

        </div>

      </div>


      {/* Details */}
      <dl className="mt-5 space-y-2 border-t border-border pt-4 text-base">

        <div className="flex items-center gap-2 text-foreground/80">
          <Clock 
            className="size-5 shrink-0 text-primary" 
            aria-hidden="true" 
          />

          <dt className="sr-only">
            Time
          </dt>

          <dd>
            {formatTime(meetup.start_time)} - {formatTime(meetup.end_time)}
          </dd>
        </div>


        <div className="flex items-center gap-2 text-foreground/80">
          <MapPin 
            className="size-5 shrink-0 text-primary" 
            aria-hidden="true" 
          />

          <dt className="sr-only">
            Location
          </dt>

          <dd>
            {meetup.location}
          </dd>
        </div>

      </dl>

    </article>
  );
}