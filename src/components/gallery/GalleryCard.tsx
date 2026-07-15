"use client";

import { createClient } from "@/src/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Trash2, Edit } from "lucide-react";
import { GalleryImage } from "./GalleryManager";


interface Props {
  image: GalleryImage;
  setEditingImage: React.Dispatch<
    React.SetStateAction<GalleryImage | null>
  >;
}


export default function GalleryCard({
  image,
  setEditingImage,
}: Props) {


  const supabase = createClient();
  const router = useRouter();



  async function deleteImage() {

    const confirmDelete =
      confirm(
        "Are you sure you want to delete this image?"
      );


    if (!confirmDelete) return;



    const { error: storageError } =
      await supabase.storage
        .from("gallery")
        .remove([
          image.file_path
        ]);



    if (storageError) {
      alert(storageError.message);
      return;
    }



    const { error: databaseError } =
      await supabase
        .from("gallery_images")
        .delete()
        .eq(
          "id",
          image.id
        );



    if (databaseError) {
      alert(databaseError.message);
      return;
    }



    router.refresh();

  }





  return (

    <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:shadow-md">


      <div className="relative h-60">

        <img
          src={image.image_url}
          alt={image.title || "Gallery image"}
          className="h-full w-full object-cover"
        />

      </div>





      <div className="p-5">


        <h3 className="font-serif text-xl font-semibold text-accent">
          {image.title || "Untitled image"}
        </h3>



        {image.description && (

          <p className="mt-2 line-clamp-3 text-muted-foreground">
            {image.description}
          </p>

        )}




        <div className="mt-5 flex gap-3">


          <button
            onClick={() =>
              setEditingImage(image)
            }
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >

            <Edit className="size-4" />

            Edit

          </button>





          <button
            onClick={deleteImage}
            className="inline-flex items-center gap-2 rounded-full border border-destructive/40 px-4 py-2 text-sm font-semibold text-destructive transition hover:bg-destructive/10"
          >

            <Trash2 className="size-4" />

            Delete

          </button>


        </div>


      </div>


    </article>

  );

}