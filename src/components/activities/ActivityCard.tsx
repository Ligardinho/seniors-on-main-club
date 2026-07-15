import { format } from "date-fns";
import { CalendarDays, Clock, MapPin } from "lucide-react";

import { Activity } from "./ActivitiesManager";
import DeleteActivityButton from "./DeleteActivityButton";
import EditActivityButton from "./EditActivityButton";


interface Props {
  activity: Activity;
  onEdit: (activity: Activity) => void;
}


export default function ActivityCard({
  activity,
  onEdit,
}: Props) {

  return (

    <tr className="border-b border-border transition hover:bg-secondary/40">


      <td className="p-4">


        <div className="flex items-center gap-2 text-foreground/80">

          <CalendarDays className="size-4 text-primary" />

          {format(
            new Date(activity.meetup_date),
            "dd MMM yyyy"
          )}

        </div>


      </td>





      <td className="p-4">


        <div className="flex flex-wrap gap-2">


          {activity.activities.map((item) => (

            <span
              key={item}
              className="rounded-full bg-primary/15 px-3 py-1 text-sm font-semibold text-primary"
            >

              {item}

            </span>

          ))}



          {activity.custom_activity && (

            <span
              className="rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-accent"
            >

              {activity.custom_activity}

            </span>

          )}


        </div>


      </td>





      <td className="p-4">


        <div className="flex items-center gap-2 text-foreground/80">

          <Clock className="size-4 text-primary" />

          {activity.start_time}
          {" - "}
          {activity.end_time}

        </div>


      </td>





      <td className="p-4">


        <div className="flex items-center gap-2 text-foreground/80">

          <MapPin className="size-4 text-primary" />

          {activity.location}

        </div>


      </td>





      <td className="p-4">


        <div className="flex gap-2">


          <EditActivityButton
            activity={activity}
            onEdit={onEdit}
          />


          <DeleteActivityButton
            id={activity.id}
          />


        </div>


      </td>


    </tr>

  );

}