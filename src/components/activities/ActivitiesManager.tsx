"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sun,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";

import AddEditActivityForm from "./AddEditActivityForm";
import ActivityCard from "./ActivityCard";


export type Activity = {
  id: string;
  meetup_date: string;
  start_time: string;
  end_time: string;
  location: string;
  activities: string[];
  custom_activity: string;
  description: string;
};


interface Props {
  initialActivities: Activity[];
}


export default function ActivitiesManager({
  initialActivities,
}: Props) {


  const [editingActivity, setEditingActivity] =
    useState<Activity | null>(null);


  const [search, setSearch] =
    useState("");



  const filteredActivities =
    initialActivities.filter((activity) =>
      activity.meetup_date
        .toLowerCase()
        .includes(search.toLowerCase())
    );



  return (

    <div className="min-h-screen bg-secondary/30">


      {/* Header */}

      <header className="border-b border-border bg-background">

        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">


          <div className="flex items-center gap-3">


            <span className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">

              <Sun className="size-5" />

            </span>


            <div>

              <p className="font-serif text-lg font-semibold text-accent">
                Activities Manager
              </p>

              <p className="text-xs text-muted-foreground">
                Seniors on Main Club
              </p>

            </div>


          </div>




          <div className="flex gap-2">


            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-accent hover:bg-secondary"
            >

              <ExternalLink className="size-4" />

              View Site

            </Link>



            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent/90"
            >

              <ArrowLeft className="size-4" />

              Dashboard

            </Link>


          </div>


        </div>

      </header>






      <main className="mx-auto max-w-6xl px-4 py-10 md:px-6">



        <section>

          <h1 className="font-serif text-3xl font-semibold text-accent">
            Manage Activities
          </h1>


          <p className="mt-2 text-muted-foreground">
            Add, edit, and remove upcoming club activities.
          </p>


        </section>





        {/* Form */}

        <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-sm">

          <AddEditActivityForm
            editingActivity={editingActivity}
            setEditingActivity={setEditingActivity}
          />

        </div>







        {/* Table */}

        <div className="mt-10 rounded-2xl border border-border bg-card p-6 shadow-sm">


          <input
            type="text"
            placeholder="Search activities..."
            value={search}
            onChange={(e)=>
              setSearch(e.target.value)
            }
            className="mb-6 w-full rounded-xl border border-border bg-card p-3 outline-none focus:border-primary"
          />



          <div className="overflow-x-auto">


          <table className="w-full">


            <thead className="border-b border-border">


              <tr className="text-left text-sm text-muted-foreground">


                <th className="p-4">
                  Date
                </th>


                <th className="p-4">
                  Activities
                </th>


                <th className="p-4">
                  Time
                </th>


                <th className="p-4">
                  Location
                </th>


                <th className="p-4">
                  Actions
                </th>


              </tr>


            </thead>




            <tbody>


              {filteredActivities.map((activity)=>(

                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  onEdit={setEditingActivity}
                />

              ))}


            </tbody>


          </table>


          </div>


        </div>


      </main>


    </div>

  );

}