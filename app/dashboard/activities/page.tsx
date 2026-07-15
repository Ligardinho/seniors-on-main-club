import { createClient } from "@/src/lib/supabase/server";
import { redirect } from "next/navigation";
import ActivitiesManager from "@/src/components/activities/ActivitiesManager";
import { todaySAST } from "@/src/lib/utils";

export default async function ActivitiesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const today = todaySAST();
  await supabase.from("activities").delete().lt("meetup_date", today);

  const { data: activities } = await supabase
    .from("activities")
    .select("*")
    .order("meetup_date", { ascending: true });

  return <ActivitiesManager initialActivities={activities ?? []} />;
}