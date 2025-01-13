'use client';

import Image from "next/image";
import MainLayout from "./layouts/MainLayout";
import ClientOnly from "./components/ClientOnly";
import PostMain from "./components/PostMain";
import { usePostStore } from "./stores/post";
import { useEffect } from "react";

export default function Home() {
  let { allPosts, setAllPosts } = usePostStore();
  useEffect(() => { setAllPosts() }, [])

  return (
    <>
      <MainLayout>
        <div className="mt-[80px] w-[calc(100%-90px)] max-w-[835px] ml-auto">
          <ClientOnly>
            {allPosts.length > 0 && allPosts.map((post, index) => (
              <PostMain post={post} key={index} />
            ))}
          </ClientOnly>
        </div>
      </MainLayout>
    </>
  );
}
