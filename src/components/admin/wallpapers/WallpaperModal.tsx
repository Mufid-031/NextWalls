import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Eye, Heart, BookmarkPlus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Wallpaper } from "@/types/wallpaper.type";

interface WallpaperModalProps {
  wallpaper: Wallpaper;
  isOpen: boolean;
  onClose: () => void;
}

const WallpaperModal: React.FC<WallpaperModalProps> = ({ wallpaper, isOpen, onClose }) => {

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" 
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 15 }}
            className="bg-white rounded-lg p-6 max-w-3xl w-full mx-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" 
              onClick={onClose}
            >
              <X className="h-6 w-6" />
            </Button>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-2/3 relative">
                <Image 
                  src={wallpaper.imageUrl} 
                  alt={wallpaper.title} 
                  width={800} 
                  height={600} 
                  className="w-full h-auto rounded-lg object-cover" 
                />
                <span className="absolute top-2 left-2 text-sm font-semibold text-white bg-gray-700 p-2 rounded">
                  {wallpaper.width}x{wallpaper.height}
                </span>
              </div>
              <div className="w-full md:w-1/3 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{wallpaper.title}</h2>
                  {wallpaper.wallpaperTags.map((wallpaper, index) => (
                    <span key={index} className="inline-block bg-gray-200 text-gray-600 px-3 py-1 rounded-full mr-2 mb-2">
                      {wallpaper.tag.name}
                    </span>
                  ))}
                  <p className="text-gray-600 mb-4">{wallpaper.description}</p>
                  <div className="bg-purple-500 text-white px-3 py-1 rounded-full inline-block mb-4">{wallpaper.category.name}</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex gap-4">
                    <p className="flex items-center gap-1 text-gray-600">
                      <Eye className="w-5 h-5 text-blue-500" />
                      {wallpaper.views}
                    </p>
                    <p className="flex items-center gap-1 text-gray-600">
                      <Heart 
                        className={`w-5 h-5 text-pink-600`} 
                      />
                      {wallpaper.totalLikes}
                    </p>
                    <p className="flex items-center gap-1 text-gray-600">
                      <BookmarkPlus className="w-5 h-5 text-green-500" />
                      {wallpaper.totalSaves}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WallpaperModal;
