"use client";

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { X, ImageIcon } from 'lucide-react';
import ColorThief from 'colorthief';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';

interface PreviewCardProps {
  title: string;
  description: string;
  tags: string[];
  files: File[];
  handleRemoveTag: (tag: string) => void;
}

const PreviewCard: React.FC<PreviewCardProps> = ({ title, description, tags, files, handleRemoveTag }) => {

  const [palette, setPalette] = useState<string[]>([]);
  const ref = useRef<HTMLImageElement | null>(null);

  

  useIsomorphicLayoutEffect(() => {
    const getPalette = async () => {
      const imageElement = ref.current ?? document.createElement("img");
      imageElement.crossOrigin = "Anonymous";
      imageElement.src = URL.createObjectURL(files[0]) as string;
      (imageElement as HTMLImageElement).onload = () => {
        const colorThief = new ColorThief();
        const colors = colorThief.getPalette(imageElement, 5);
        setPalette(colors.map((color: number[]) => `rgb(${color[0]},${color[1]},${color[2]})`));
      }
    };
    
    if (files[0]) {
      getPalette();
    }

  }, [files[0]])

  useIsomorphicLayoutEffect(() => {
    console.log(palette)
  }, [palette])

  return (
    <div className="w-full p-5 bg-white rounded-md shadow">
      <h3 className="text-xl font-bold mb-4">Preview</h3>
      <div className="w-full h-64 bg-gray-300 flex justify-center items-center overflow-hidden rounded-md">
        {files.length > 0 ? (
          files[0].type.startsWith("image/") ? (
            <Image
              ref={ref}
              src={URL.createObjectURL(files[0])}
              alt="Preview"
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          ) : files[0].type.startsWith("video/") ? (
            <video
              controls
              className="w-full h-full object-cover"
            >
              <source src={URL.createObjectURL(files[0])} type={files[0].type} />
              Your browser does not support the video tag.
            </video>
          ) : null
        ) : (
          <ImageIcon className="w-10 h-10 text-gray-400" />
        )}
      </div>
      <div className="mt-4">
        <h2 className={`text-2xl font-bold text-center w-full h-10 ${title ? "line-clamp-1" : "bg-gray-300"} rounded-md`}>
          {title || "No title"}
        </h2>
        <p className={`mt-2 text-center h-20 ${description ? "" : "bg-gray-300"} rounded-md overflow-y-auto`}>
          {description || "No description"}
        </p>
        <div className="flex flex-wrap gap-2 mt-5">
          {tags.length > 0 ? (
            tags.map((tag) => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.1 }}
                className="px-2 py-1 text-sm bg-purple-500 text-white rounded-md flex gap-2 items-center font-semibold cursor-pointer"
              >
                {tag}{' '}
                <X
                  className="w-4 h-4 cursor-pointer text-red-600 bg-white rounded-full"
                  onClick={() => handleRemoveTag(tag)}
                />
              </motion.span>
            ))
          ) : (
            <span className="text-gray-400">No tags</span>
          )}
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-600">
          File: {files.length > 0 ? files[0].name : 'No file selected'}
        </p>
        <p className="text-sm text-gray-600">
          Size: {files.length > 0 ? `${(files[0].size / (1024 * 1024)).toFixed(2)} MB` : 'N/A'}
        </p>
        <p className="text-sm text-gray-600">
          Type: {files.length > 0 ? files[0].type : 'N/A'}
        </p>
      </div>
    </div>
  );
};

export default PreviewCard;