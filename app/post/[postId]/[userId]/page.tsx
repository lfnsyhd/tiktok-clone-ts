"use client";

import ClientOnly from 'app/components/ClientOnly';
import Comments from 'app/components/post/Comments';
import CommentsHeader from 'app/components/post/CommentsHeader';
import userCreateBucketUrl from 'app/hooks/useCreateBucketUrl';
import { useCommentStore } from 'app/stores/comment';
import { useLikeStore } from 'app/stores/like';
import { usePostStore } from 'app/stores/post';
import { KeyboardEventWithCode, ParamsDefault, PostWithProfile } from 'app/types'
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import React, { use, useEffect, useRef, useState } from 'react'
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';
import { BiChevronDown, BiChevronUp, BiPlay } from 'react-icons/bi';
import { FaPlay } from 'react-icons/fa';

const Post = ({ params }: { params: Promise<ParamsDefault> }) => {
  const router = useRouter();
  const [isShowPlayingBar, setIsShowPlayingBar] = useState<boolean>(false);
  const { userId, postId } = use(params);
  const resolvedParams = use(params);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoBgRef = useRef<HTMLVideoElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progressBar, setProgressBar] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  let { postById, postsByUser, setPostById, setPostsByUser, explorePosts, setExplorePosts } = usePostStore();
  let { setLikesByPost } = useLikeStore();
  let { setCommentsByPost } = useCommentStore()

  useEffect(() => {
    setPostById(postId);
    setCommentsByPost(postId);
    setLikesByPost(postId);
    setExplorePosts(postId);
    // setPostsByUser(userId);
  }, [])

  useEffect(() => {
    const video = videoRef.current;

    if (video) {

      video.addEventListener('timeupdate', () => {
        setDuration(video.duration);

        let progress = (video.currentTime / video.duration) * 100;
        setProgressBar(progress);
        setCurrentTime(video.currentTime);
      });
    }
  }, [videoRef.current]);

  // useEffect(() => {
  //   const handleKeyDown = (event: KeyboardEventWithCode) => {
  //     // if (event.code === 'Space') {
  //     //   playOrPause();
  //     // }

  //     // if (event.code === 'ArrowUp') {
  //     //   return loopThroughPostsUp();
  //     // }

  //     // if (event.code === 'ArrowDown') {
  //     //   return loopThroughPostsDown();
  //     // }
  //   };

  //   window.addEventListener('keydown', handleKeyDown);

  //   return () => {
  //     window.removeEventListener('keydown', handleKeyDown);
  //   };

  // }, [isPlaying]);

  const playOrPause = () => {
    const video = videoRef.current;
    const videoBg = videoBgRef.current;

    if (video && videoBg) {
      if (isPlaying) {
        video.pause();
        videoBg.pause();
      } else {
        video.play();
        videoBg.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secondsRemaining = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${secondsRemaining.toString().padStart(2, '0')}`;
  };

  const loopThroughPostsUp = () => {
    explorePosts.forEach(post => {
      router.push(`/post/${post.id}/${userId}`);
    });
  }

  const loopThroughPostsDown = () => {
    explorePosts.forEach(post => {
      router.push(`/post/${post.id}/${userId}`);
    });
  }

  return (
    <>
      <div id="PostPage" className="lg:flex justify-between w-full h-screen bg-black overflow-auto">
        <div className="lg:w-[calc(100%-540px)] h-full relative cursor-pointer">

          {/* SEARCH */}
          <div className='absolute top-4 left-1/2 -translate-x-1/2 min-w-[400px] flex justify-center z-30'>
            <div className='max-w-[400px] w-full relative'>
              <input
                type="text"
                placeholder='Temukan konten terkait'
                className='py-3.5 px-[20px] w-full bg-transparent border border-gray-300 rounded-[25px] text-gray-300 placeholder-gray-300 outline-none text-[16px] font-bold focus:caret-[#F02C56] cursor-text'
              />

              <div className='border-l border-l-gray-300 pl-2 absolute right-[15px] top-[13px]'>
                <AiOutlineSearch size={25} className='text-gray-300' />
              </div>
            </div>
          </div>

          {/* PLAY BUTTON */}
          {!isPlaying ? (
            <div className='absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 h-auto w-auto top-0 left-0 z-30'>
              <FaPlay size={60} color='#FFFFFF' />
            </div>
          ) : null}

          {/* PROGRESS BAR */}
          <div className={`
            absolute bottom-10 left-1/2 -translate-x-1/2 min-w-[400px] z-30 text-white
            transition-opacity-300 flex items-center justify-center gap-3
            ${isShowPlayingBar ? 'opacity-1' : 'opacity-0'}
          `}>
            <div className='w-full relative'>
              <div
                style={{
                  width: `${progressBar?.toFixed(0)}%`
                }}
                className='bg-white opacity-1 h-[4px] rounded-xl absolute z-[31]'
              />
              <div className='w-full bg-white opacity-[0.4] h-[4px] rounded-xl absolute z-[30]' />
            </div>
            <div className='mt-1'>
              {formatTime(currentTime)}/{formatTime(duration)}
            </div>
          </div>

          {/* ACTION */}
          <Link
            href={'#'}
            onClick={() => router.back()}
            className='absolute text-white z-20 m-5 rounded-full p-2.5 bg-[#545454] hover:bg-opacity-[0.4]'
          >
            <AiOutlineClose size={23} />
          </Link>

          <div>
            <button
              onClick={() => loopThroughPostsUp()}
              className='absolute z-20 right-4 top-[20px] flex items-center justify-center rounded-full p-1.5 bg-[#545454] hover:bg-opacity-[0.4]'
            >
              <BiChevronUp size={32} color='#FFFFFF' />
            </button>
            <button
              onClick={() => loopThroughPostsDown()}
              className='absolute z-20 right-4 top-[75px] flex items-center justify-center rounded-full p-1.5 bg-[#545454] hover:bg-opacity-[0.4]'
            >
              <BiChevronDown size={32} color='#FFFFFF' />
            </button>
          </div>

          {/* VIDEO */}
          <div
            onMouseDown={() => playOrPause()}
            onMouseEnter={() => setTimeout(() => setIsShowPlayingBar(true), 300)}
            onMouseLeave={() => setTimeout(() => setIsShowPlayingBar(false), 300)}
          >
            <ClientOnly>
              {postById && postById?.video_url ? (
                <video
                  ref={videoBgRef}
                  className='fixed object-cover w-full my-auto z-[0] h-screen blur-xl'
                  autoPlay
                  muted
                  src={userCreateBucketUrl(postById?.video_url || '')}
                />
              ) : null}

              <div className="bg-black bg-opacity-70 lg-min-w-[480px] z-10 relative">
                {
                  postById && postById?.video_url ? (
                    <video
                      autoPlay
                      loop
                      className='h-screen mx-auto'
                      id='PostVideo'
                      ref={videoRef}
                      src={userCreateBucketUrl(postById?.video_url || '')}
                    >
                    </video>
                  ) : null
                }
              </div>
            </ClientOnly>
          </div>
        </div>

        <div id="InfoSection" className="lg:max-w-[550px] relative w-full h-full bg-white">
          <div className="py-[15px]" />
          <ClientOnly>
            {postById?.video_url ? (
              <CommentsHeader post={postById} params={resolvedParams} />
            ) : null}
          </ClientOnly>
          <Comments params={resolvedParams} />
        </div>
      </div>
    </>
  )
}

export default Post