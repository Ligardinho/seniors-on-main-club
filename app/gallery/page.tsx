import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteShell } from "@/src/components/site-shell";
import { PageHero } from "@/src/components/Hero";
import { createClient } from "@/src/lib/supabase/server";


export const metadata: Metadata = {
  title: "Gallery | Seniors on Main Club",
  description:
    "A glimpse of the friendship, laughter, and activities at Seniors on Main Club.",
};


export default async function GalleryPage() {

  const supabase = await createClient();


  const { data: photos, error } = await supabase
    .from("gallery_images")
    .select("*")
    .order("created_at", {
      ascending: false,
    });


  if (error) {
    console.error(error);
  }



  return (
    <SiteShell>

      <PageHero
        eyebrow="Gallery"
        title="Moments that make us smile"
        description="There is always something happening at the club. Here are a few of our favourite moments captured throughout the year."
      />


      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">


        {photos?.length === 0 ? (

          <p className="text-center text-lg text-muted-foreground">
            Our gallery is being updated. Check back soon!
          </p>

        ) : (

          <div className="grid auto-rows-55 grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">

            {photos?.map((photo, index) => (

              <figure
                key={photo.id}
                className={`group relative overflow-hidden rounded-2xl border border-border shadow-sm ${
                  index === 0
                    ? "col-span-2 row-span-2"
                    : ""
                }`}
              >

                <Image
                  src={photo.image_url}
                  alt={
                    photo.title ||
                    "Seniors on Main Club activity"
                  }
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width:768px) 100vw, 33vw"
                />


                <figcaption className="sr-only">
                  {photo.description ||
                    photo.title}
                </figcaption>


              </figure>

            ))}

          </div>

        )}



        <div className="mt-16 text-center">

          <h2 className="font-serif text-2xl font-semibold text-balance text-accent md:text-3xl">
            Come and make some memories of your own
          </h2>


          <Link
            href="/contact"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-lg font-bold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Visit the club
            <ArrowRight
              className="size-5"
              aria-hidden="true"
            />
          </Link>


        </div>


      </section>

    </SiteShell>
  );
}