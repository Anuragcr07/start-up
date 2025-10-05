import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import markdownit from "markdown-it";
import { notFound } from "next/navigation";

import { formatDate } from "@/lib/utils";

import {
  STARTUP_BY_ID_QUERY,
  PLAYLIST_BY_SLUG_QUERY,
} from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";

import View from "@/components/View";
import { Skeleton } from "@/components/ui/skeleton";
import StartupCard, { StartupCardType } from "@/components/StartupCard";

const md = markdownit();
export const experimental_ppr = true;

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  const [post, editorPlaylist] = await Promise.all([
  client.fetch(STARTUP_BY_ID_QUERY, { id }),
  client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: "editor-picks" }),
]);

const editorPosts = editorPlaylist?.select || [];


  if (!post) return notFound();
  const parsedContent = md.render(post?.pitch || "");

  return (
    <>
      <section className="pink_container !min-h-[230px] animated-section">
        <p className="tag animated-text">{formatDate(post._createdAt)}</p>

        <h1 className="heading animated-heading">{post.title}</h1>
        <p className="sub-heading !max-w-5xl animated-text">{post.description}</p>
      </section>

      <section className="section_container content-section">
        <img
          src={post.image}
          alt="Startup Image"
          className="w-full h-auto rounded-xl post-image animated-item"
        />

        <div className="space-y-5 mt-10 max-w-4xl mx-auto content-details">
          <div className="flex-between gap-5 animated-item author-info">
            <Link
              href={`/user/${post.author?._id}`}
              className="flex gap-2 items-center mb-3 author-link"
            >
              <Image
                src={post.author.image}
                alt={`${post.author.name}'s profile picture`}
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg profile-pic"
              />

              <div>
                <p className="text-20-medium author-name">{post.author.name}</p>
                <p className="text-16-medium !text-black-300 author-username">
                  @{post.author.username}
                </p>
              </div>
            </Link>

            <p className="category-tag animated-item">{post.category}</p>
          </div>

          <h3 className="text-30-bold animated-item section-title">Pitch Details</h3>
          {parsedContent ? (
            <article
              className="prose max-w-4xl font-work-sans break-all animated-item pitch-content"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="no-result animated-item">No details provided</p>
          )}
        </div>

        <hr className="divider animated-item" />

        {editorPosts?.length > 0 && (
          <div className="max-w-4xl mx-auto editor-picks-section">
            <p className="text-30-semibold animated-item section-title">Editor Picks</p>

            <ul className="mt-7 card_grid-sm">
              {editorPosts.map((post: StartupCardType, index: number) => (
                <StartupCard key={index} post={post} />
              ))}
            </ul>
          </div>
        )}
      </section>

      <Suspense fallback={<Skeleton className="view_skeleton" />}>
        <View id={id} />
      </Suspense>
    </>
  );
}

export default Page;