"use client";

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { UploadError } from '../types';
import UploadLayout from '../layouts/UploadLayout';
import { BiLoaderCircle, BiSolidCloudUpload, BiX } from 'react-icons/bi';
import { AiFillX, AiOutlineCheckCircle, AiOutlineX } from 'react-icons/ai';
import { PiKnifeLight } from 'react-icons/pi';
import { useUser } from '../context/user';
import useCreatePost from '../hooks/useCreatePost';


const Upload = () => {
  const router = useRouter();
  const contextUser = useUser();

  let [fileDisplay, setFileDisplay] = useState<string>('');
  let [caption, setCaption] = useState<string>('');
  let [file, setFile] = useState<File | null>(null);
  let [error, setError] = useState<UploadError | null>(null);
  let [isUploading, setIsUploading] = useState<boolean>(false);

  useEffect(() => {
    if (!contextUser?.user) router.push('/')
  }, [contextUser]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      const fileUrl = URL.createObjectURL(file);
      setFileDisplay(fileUrl);
      setFile(file);
    }
  }

  const clearVideo = () => {
    setFileDisplay('');
    setFile(null);
    setCaption('');
  }

  const validate = () => {
    setError(null)
    let isError = false

    if (!file) {
      setError({ type: 'File', message: 'A video is required' })
      isError = true
    } else if (!caption) {
      setError({ type: 'caption', message: 'A caption is required' })
      isError = true
    }
    return isError
  }

  const createNewPost = async () => {
    let isError = validate()
    if (isError) return
    if (!file || !contextUser?.user) return
    setIsUploading(true)

    try {
      await useCreatePost(file, contextUser?.user?.id, caption)
      router.push(`/profile/${contextUser?.user?.id}`)
      setIsUploading(false)
    } catch (error) {
      console.log(error)
      setIsUploading(false)
      alert(error)
    }
  }

  const discard = () => {
    clearVideo();
    setCaption('');
  }

  return (
    <>
      <UploadLayout>
        <div className="w-full mt-[80px] mb-[40px] bg-white shadow-lg rounded-md py-6 md:px-10 px-4">
          <div>
            <h1 className='text-[23px] font-semibold'>Upload Video</h1>
            <h2 className='text-gray-400'>Post a video to your account.</h2>
          </div>
          <div className={`${fileDisplay ? 'mt-4' : 'mt-8'} md:flex gap-6`}>
            {!fileDisplay ? (
              <label
                htmlFor="fileInput"
                className='md:mx-0 mx-auto mt-4 mb-6 flex flex-col items-center justify-center w-full max-w-[260px] h-[470px] text-center p-3 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer'
              >
                <BiSolidCloudUpload size={40} color='#B3B3B1' />
                <p className='mt-4 text-[17px]'>Select video to upload</p>
                <p className='mt-1.5 text-[13px] text-gray-500'>Or drag and drop a file</p>
                <p className='mt-12 text-sm text-gray-400'>MP4</p>
                <p className='mt-2 text-[13px] text-gray-400'>Up to 30 minutes</p>
                <p className='mt-2 text-[13px] text-gray-400'>Less than 2 GB</p>
                <label htmlFor="fileInput" className='px-2 py-1.5 text-white text-[15px] w-[80%] bg-[#F02C56] rounded-sm cursor-pointer mt-8'>
                  Select file
                </label>
                <input type="file" id='fileInput' onChange={onChange} hidden accept='.mp4' />
              </label>
            ) : (
              <div className='md:mx-0 mx-auto mt-4 md:mb-12 mb-16 flex items-center justify-center w-full max-w-[260px] h-[540px] p-3 rounded-2xl cursor-pointer relative'>
                {isUploading ? (
                  <div className='absolute flex items-center justify-center z-20 h-full w-full rounded-[50px] bg-transparent'>
                    <div className="mx-auto flex items-center justify-center gap-1">
                      <BiLoaderCircle className='animate-spin' color='#F12B56' size={30} />
                      <div className='text-white font-bold'>Uploading xxx...</div>
                    </div>
                  </div>
                ) : null}

                <img src="/images/iphone-16.png" className='absolute z-20 pointer-events-none' />
                <img src="/images/tiktok-logo-white.png" width='90' className='absolute right-6 bottom-8 z-20' />
                <video autoPlay loop muted className='absolute rounded-[50px] object-cover z-10 px-[13px] py-[25px] w-full h-full' src={fileDisplay} />
                <div className="absolute -bottom-12 flex items-center justify-between z-50 rounded-xl border border-gray-300 w-full p-2">
                  <div className="flex items-center truncate">
                    <AiOutlineCheckCircle size={16} className='min-w-[16px]' />
                    <p className='text-[11px] pl-1 truncate text-elipsis'>
                      {file ? file?.name : ''}
                    </p>
                  </div>
                  <button type='button' onClick={() => clearVideo()} className='text-[11px] ml-2 font-semibold'>
                    <BiX size={16} className='min-w-[16px]' color='#000000' />
                  </button>
                </div>
              </div>
            )}
            <div className='mt-4 mb-6'>
              <div className="flex bg-[#F8F8F8] py-4 px-6">
                <div>
                  <PiKnifeLight size={20} className='mr-4' />
                </div>

                <div>
                  <div className='text-semibold text-[15px] mb-1.5'>
                    Divide videos and edit
                  </div>

                  <div className="text-semibold text-[13px] text-gray-400">
                    You can quickly divide videos into multiple parts, remove redundant parts and turn landscape videos into potrait videos.
                  </div>
                </div>


                <div className='flex justify-end max-w-[130px] w-full h-full text-center my-auto'>
                  <button className='px-8 py-1.5 text-white text-[15px] bg-[#F02C56] rounded-sm'>
                    Edit
                  </button>
                </div>
              </div>

              <div className="mt-5">
                <div className="flex items-center justify-between">
                  <div className="mb-1 text-[15px]">Caption</div>
                  <div className="text-gray-400 text-[12px]">{caption?.length}/150</div>
                </div>
                <textarea rows={3} maxLength={150} className='text-[12px] w-full border p-2.5 rounded-md focus:outine-none' onChange={event => setCaption(event.target.value)}>{caption}</textarea>
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  disabled={isUploading}
                  onClick={() => discard()}
                  className='px-10 py-2.5 mt-8 border text-[16px] hover:bg-gray-100 rounded-sm'
                >
                  Discard
                </button>

                <button
                  disabled={isUploading}
                  onClick={() => createNewPost()}
                  className='px-10 py-2.5 mt-8 border text-[16px] text-white bg-[#F02C56] rounded-sm'
                >
                  {isUploading ? <BiLoaderCircle size={25} className='animate-spin' color='#FFFFFF' /> : 'Post'}
                </button>
              </div>

              {error ? (
                <div className="text-red-600 mt-4">
                  {error.message}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </UploadLayout>
    </>
  )
}

export default Upload