import { createClient } from "@/src/lib/supabase/server";
import { redirect } from "next/navigation";
import ActivitiesManager from "@/src/components/activities/ActivitiesManager";

export default async function ActivitiesPage() {
  const supabase = await createClient();

  const { data: activities } = await supabase
    .from("activities")
    .select("*")
    .order("meetup_date", { ascending: true });

    const {
      data: { user },
    } = await supabase.auth.getUser();
  
    if (!user) {
      redirect("/login");
    }

  return <ActivitiesManager initialActivities={activities ?? []} />;
}