"use client";

import { Edit} from "lucide-react";

interface EditActivityButtonProps {
  activity: {
    id: string;
    meetup_date: string;
    start_time: string;
    end_time: string;
    location: string;
    activities: string[];
    custom_activity: string;
    description: string;
  };
  onEdit: (activity: EditActivityButtonProps["activity"]) => void;
}

export default function EditActivityButton({
  activity,
  onEdit,
}: EditActivityButtonProps) {
  return (
  <button
    onClick={() => onEdit(activity)}
    className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
  >
    <Edit className="size-4" />
    Edit
  </button>
  );
}