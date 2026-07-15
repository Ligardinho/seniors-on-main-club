"use client";

import { createClient } from "@/src/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

interface DeleteActivityButtonProps {
  id: string;
}

export default function DeleteActivityButton({
  id,
}: DeleteActivityButtonProps) {
  const supabase = createClient();
  const router = useRouter();

  async function deleteActivity() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this activity?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("activities")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    router.refresh();
  }

  return (
    <button
      onClick={deleteActivity}
      className="inline-flex items-center gap-2 rounded-full border border-destructive/40 px-4 py-2 text-sm font-semibold text-destructive transition hover:bg-destructive/10"
    >
      <Trash2 className="size-4" />
      Delete
    </button>
  );
}