"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/src/lib/supabase/client";
import { useRouter } from "next/navigation";
import { GalleryImage } from "./GalleryManager";


interface Props {
  editingImage: GalleryImage | null;
  setEditingImage: React.Dispatch<
    React.SetStateAction<GalleryImage | null>
  >;
}


export default function AddEditGalleryForm({
  editingImage,
  setEditingImage,
}: Props) {

  const supabase = createClient();
  const router = useRouter();


  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [file, setFile] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);
  
  const fileInputRef = useRef<HTMLInputElement | null>(null);



  useEffect(() => {

    if (!editingImage) {
      setTitle("");
      setDescription("");
      setFile(null);
      return;
    }


    setTitle(
      editingImage.title || ""
    );

    setDescription(
      editingImage.description || ""
    );

    setFile(null);


  }, [editingImage]);




  async function handleSubmit() {

    setLoading(true);



    let imageUrl =
      editingImage?.image_url || "";

    let filePath =
      editingImage?.file_path || "";



    // Upload new image if selected
    if (file) {

      const fileName =
        `${Date.now()}-${file.name}`;



      const { error: uploadError } =
        await supabase.storage
          .from("gallery")
          .upload(
            fileName,
            file
          );


      if (uploadError) {

        alert(uploadError.message);
        setLoading(false);
        return;

      }



      const { data } =
        supabase.storage
          .from("gallery")
          .getPublicUrl(fileName);



      imageUrl = data.publicUrl;
      filePath = fileName;


      // Remove old image when replacing
      if (editingImage?.file_path) {

        await supabase.storage
          .from("gallery")
          .remove([
            editingImage.file_path
          ]);

      }

    }



    const payload = {
      title,
      description,
      image_url: imageUrl,
      file_path: filePath,
    };




    if (editingImage) {


      const { error } =
        await supabase
          .from("gallery_images")
          .update(payload)
          .eq(
            "id",
            editingImage.id
          );


      if (error) {

        alert(error.message);
        setLoading(false);
        return;

      }



    } else {


      const { error } =
        await supabase
          .from("gallery_images")
          .insert(payload);



      if (error) {

        alert(error.message);
        setLoading(false);
        return;

      }

    }



    // Reset form
    setTitle("");
    setDescription("");
    setFile(null);
    setEditingImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }


    setLoading(false);


    // Reload server data
    router.refresh();

  }





  return (

      <div>


        <h2 className="mb-5 font-serif text-2xl font-semibold text-accent">
          {editingImage
            ? "Edit Image"
            : "Upload Image"}
        </h2>




        <div className="space-y-4">


          <input
            className="w-full rounded-xl border border-border bg-card p-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
            placeholder="Image title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />





          <textarea
            className="min-h-32 w-full rounded-xl border border-border bg-card p-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />





          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="block w-full rounded-xl border border-border bg-card p-3 text-sm"
            onChange={(e) =>
              setFile(
                e.target.files?.[0] || null
              )
            }
          />





          {file && (

            <p className="rounded-xl bg-secondary px-4 py-2 text-sm text-muted-foreground">
              Selected: {file.name}
            </p>

          )}





          <button
            onClick={handleSubmit}
            disabled={loading}
            className="rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50"
          >

            {loading
              ? "Saving..."
              : editingImage
              ? "Update Image"
              : "Upload Image"}

          </button>



        </div>


      </div>

    );

}