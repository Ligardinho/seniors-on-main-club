import { redirect } from "next/navigation";
import { createClient } from "@/src/lib/supabase/server";
import GalleryManager from "@/src/components/gallery/GalleryManager";

export default async function GalleryPage() {
  const supabase = await createClient();

  const { data: images, error } = await supabase
    .from("gallery_images")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();
  
    if (!user) {
      redirect("/login");
    }

  if (error) {
    return (
      <main className="p-8">
        <p className="text-red-500">
          Failed to load gallery images.
        </p>
      </main>
    );
  }


  return (
    <main className="p-8">

      <GalleryManager
        initialImages={images || []}
      />

    </main>
  );
}