"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ExternalLink,
} from "lucide-react";

import AddEditGalleryForm from "./AddEditGalleryForm";
import GalleryCard from "./GalleryCard";


export type GalleryImage = {
  id: string;
  title: string | null;
  description: string | null;
  image_url: string;
  file_path: string;
  created_at: string;
};


interface Props {
  initialImages: GalleryImage[];
}


export default function GalleryManager({
  initialImages,
}: Props) {


  const [editingImage, setEditingImage] =
    useState<GalleryImage | null>(null);



  return (

    <div className="min-h-screen bg-secondary/30">


      {/* Header */}

      <header className="border-b border-border bg-background">

        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 md:px-6">


          <div className="flex items-center gap-3">


            <Image
              src="/logo.png"
              alt="Seniors on Main Club"
              width={40}
              height={40}
              className="size-10 rounded-full object-cover"
            />


            <div>

              <p className="font-serif text-lg font-semibold text-accent">
                Gallery Manager
              </p>


              <p className="text-xs text-muted-foreground">
                Seniors on Main Club
              </p>


            </div>


          </div>





          <div className="flex items-center gap-2">


            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-accent transition hover:bg-secondary"
            >

              <ExternalLink className="size-4" />

              View Site

            </Link>



            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition hover:bg-accent/90"
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
            Manage Gallery
          </h1>


          <p className="mt-2 text-muted-foreground">
            Upload, edit, and remove photos from the club gallery.
          </p>


        </section>






        {/* Upload / Edit Form */}

        <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-sm">

          <AddEditGalleryForm
            editingImage={editingImage}
            setEditingImage={setEditingImage}
          />

        </div>







        {/* Gallery Images */}

        <section className="mt-10">


          <div className="mb-6 flex items-center gap-4">


            <h2 className="font-serif text-2xl font-semibold text-accent">
              Gallery Images
            </h2>


            <span className="h-px flex-1 bg-border" />


            <span className="rounded-full bg-secondary px-3 py-1 text-sm font-bold text-accent">
              {initialImages.length}{" "}
              {initialImages.length === 1
                ? "photo"
                : "photos"}
            </span>


          </div>





          {initialImages.length === 0 ? (

            <div className="rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground">
              No images uploaded yet.
            </div>


          ) : (


            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">


              {initialImages.map((image) => (

                <GalleryCard
                  key={image.id}
                  image={image}
                  setEditingImage={setEditingImage}
                />

              ))}


            </div>


          )}


        </section>


      </main>


    </div>

  );

}