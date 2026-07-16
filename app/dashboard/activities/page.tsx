import { createClient } from "@/src/lib/supabase/server";
import { redirect } from "next/navigation";
import ActivitiesManager from "@/src/components/activities/ActivitiesManager";
import { todaySAST, nowSAST } from "@/src/lib/utils";

export default async function ActivitiesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const today = todaySAST();
  const nowTime = nowSAST();
  const twoDigit = (n: number) => n.toString().padStart(2, "0");

  const { data: all } = await supabase
    .from("activities")
    .select("id, meetup_date, end_time");

  const expiredIds =
    all?.filter((a) => {
      if (a.meetup_date < today) return true;
      if (a.meetup_date === today && a.end_time <= nowTime) return true;
      return false;
    }).map((a) => a.id) ?? [];

  if (expiredIds.length > 0) {
    await supabase.from("activities").delete().in("id", expiredIds);
  }

  const { data: activities } = await supabase
    .from("activities")
    .select("*")
    .order("meetup_date", { ascending: true });

  return <ActivitiesManager initialActivities={activities ?? []} />;
}