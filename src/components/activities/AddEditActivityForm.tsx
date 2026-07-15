"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/src/lib/supabase/client";
import { useRouter } from "next/navigation";
import { ACTIVITY_OPTIONS } from "@/src/lib/activity-options";
import { Activity } from "./ActivitiesManager";
import { todaySAST } from "@/src/lib/utils";

interface Props {
  editingActivity: Activity | null;
  setEditingActivity: React.Dispatch<
    React.SetStateAction<Activity | null>
  >;
}

export default function AddEditActivityForm({
  editingActivity,
  setEditingActivity,
}: Props) {
  const supabase = createClient();
  const router = useRouter();

  const [meetupDate, setMeetupDate] = useState("");

  const [startTime, setStartTime] =
    useState("10:00");

  const [endTime, setEndTime] =
    useState("14:00");

  const [location, setLocation] =
    useState("Community Hall");

  const [description, setDescription] =
    useState("");

  const [customActivity, setCustomActivity] =
    useState("");

  const [selectedActivities, setSelectedActivities] =
    useState<string[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [dateError, setDateError] =
    useState("");

  const today = useMemo(() => todaySAST(), []);

  // Fill the form whenever an activity is selected
  useEffect(() => {
    if (!editingActivity) return;

    setMeetupDate(
      editingActivity.meetup_date
    );

    setStartTime(
      editingActivity.start_time
    );

    setEndTime(
      editingActivity.end_time
    );

    setLocation(
      editingActivity.location
    );

    setDescription(
      editingActivity.description
    );

    setCustomActivity(
      editingActivity.custom_activity || ""
    );

    setSelectedActivities(
      editingActivity.activities || []
    );

    setDateError("");
  }, [editingActivity]);

    function toggleActivity(activity: string) {
    setSelectedActivities((prev) =>
      prev.includes(activity)
        ? prev.filter((a) => a !== activity)
        : [...prev, activity]
    );
  }

  async function handleSubmit() {
    if (meetupDate && meetupDate < today) {
      setDateError("Activity date cannot be in the past.");
      return;
    }
    setDateError("");

    setLoading(true);

    const payload = {
      meetup_date: meetupDate,
      start_time: startTime,
      end_time: endTime,
      location,
      activities: selectedActivities,
      custom_activity: customActivity,
      description,
    };

    if (editingActivity) {
      const { error } = await supabase
        .from("activities")
        .update(payload)
        .eq("id", editingActivity.id);

      if (error) {
        alert(error.message);
        setLoading(false);
        return;
      }
    } else {
      const { error } = await supabase
        .from("activities")
        .insert(payload);

      if (error) {
        alert(error.message);
        setLoading(false);
        return;
      }
    }

    setEditingActivity(null);

    setMeetupDate("");
    setSelectedActivities([]);
    setDescription("");
    setStartTime("10:00");
    setEndTime("14:00");
    setLocation("Community Hall");
    setCustomActivity("");
    setDateError("");

    setLoading(false);

    router.refresh();
  }

  function clearForm() {
    setDescription("");
    setMeetupDate("");
    setStartTime("");
    setEndTime("");
    setLocation("");
    setSelectedActivities([]);
    setCustomActivity("");
    setDateError("");
  }

  return (

    <div>


      <h2 className="mb-6 font-serif text-2xl font-semibold text-accent">
        {editingActivity
          ? "Edit Activity"
          : "Add Activity"}
      </h2>




      <div className="space-y-4">



        <input
          type="date"
          value={meetupDate}
          min={today}
          onChange={(e) => {
            setMeetupDate(e.target.value);
            setDateError("");
          }}
          className="w-full rounded-xl border border-border bg-card p-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
        />
        {dateError && (
          <p className="text-sm text-destructive">{dateError}</p>
        )}





        <div className="grid gap-4 md:grid-cols-2">


          <div>

            <label className="mb-1 block text-sm font-semibold text-accent">
              Start Time
            </label>


            <input
              type="time"
              value={startTime}
              onChange={(e) =>
                setStartTime(e.target.value)
              }
              className="w-full rounded-xl border border-border bg-card p-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
            />

          </div>




          <div>

            <label className="mb-1 block text-sm font-semibold text-accent">
              End Time
            </label>


            <input
              type="time"
              value={endTime}
              onChange={(e) =>
                setEndTime(e.target.value)
              }
              className="w-full rounded-xl border border-border bg-card p-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
            />

          </div>


        </div>






        <input
          placeholder="Location"
          value={location}
          onChange={(e) =>
            setLocation(e.target.value)
          }
          className="w-full rounded-xl border border-border bg-card p-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
        />






        <div>


          <label className="mb-3 block font-semibold text-accent">
            Activities
          </label>



          <div className="grid gap-2 sm:grid-cols-2">


            {ACTIVITY_OPTIONS.map((activity) => (

              <label
                key={activity}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition ${
                  selectedActivities.includes(activity)
                    ? "border-primary bg-primary/10"
                    : "border-border bg-card hover:bg-secondary/40"
                }`}
              >


                <input
                  type="checkbox"
                  checked={selectedActivities.includes(activity)}
                  onChange={() =>
                    toggleActivity(activity)
                  }
                  className="size-4 accent-primary"
                />


                <span className="text-sm font-medium text-foreground">
                  {activity}
                </span>


              </label>


            ))}


          </div>


        </div>







        <input
          placeholder="Other activity"
          value={customActivity}
          onChange={(e) =>
            setCustomActivity(e.target.value)
          }
          className="w-full rounded-xl border border-border bg-card p-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
        />







        <textarea
          className="min-h-32 w-full rounded-xl border border-border bg-card p-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />







        <button
          onClick={handleSubmit}
          disabled={loading}
          className="rounded-full bg-primary px-7 py-3 font-bold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50"
        >

          {loading
            ? "Saving..."
            : editingActivity
            ? "Update Activity"
            : "Add Activity"}

        </button>



      </div>


    </div>

  );
}