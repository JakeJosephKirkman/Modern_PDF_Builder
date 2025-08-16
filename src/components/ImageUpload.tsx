import React, { useCallback } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { UploadedImage } from '../types';

interface ImageUploadProps {
  images: UploadedImage[];
  onImagesAdd: (images: UploadedImage[]) => void;
  onImageRemove: (imageId: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ images, onImagesAdd, onImageRemove }) => {
  const handleFileChange = useCallback(async (files: FileList) => {
    const newImages: UploadedImage[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith('image/')) {
        const preview = URL.createObjectURL(file);
        const reader = new FileReader();
        
        const base64 = await new Promise<string>((resolve) => {
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
        
        newImages.push({
          id: `${Date.now()}-${i}`,
          file,
          preview,
          base64,
        });
      }
    }
    
    onImagesAdd(newImages);
  }, [onImagesAdd]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileChange(files);
    }
  }, [handleFileChange]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  return (
    <div className="space-y-4">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        <label className="block text-sm font-semibold text-[#E0E0E0] mb-2">
          Upload Images
        </label>
      </label>
      
      <div
        className="border-2 border-dashed border-[#FF00A0]/40 rounded-lg p-8 text-center hover:border-[#FF00A0] transition-all duration-300 cursor-pointer bg-[#0D0D0D]/60 hover:bg-[#1A1A1A]/40 shadow-[0_0_15px_rgba(255,0,160,0.1)] hover:shadow-[0_0_25px_rgba(255,0,160,0.2)]"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => document.getElementById('file-input')?.click()}
      >
        <Upload className="mx-auto h-12 w-12 text-[#FF00A0] mb-4 drop-shadow-[0_0_10px_#FF00A0]" />
        <p className="text-[#E0E0E0] font-medium mb-2">
          Click to upload or drag and drop images here
        </p>
        <p className="text-sm text-[#8A8A8A]">
          Supports JPG, PNG, GIF up to 10MB each
        </p>
      </div>
      
      <input
        id="file-input"
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files) {
            handleFileChange(e.target.files);
          }
        }}
      />
      
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {images.map((image) => (
            <div key={image.id} className="relative group">
              <div className="aspect-square bg-[#1A1A1A] rounded-lg overflow-hidden border-2 border-[#00E5FF]/30 shadow-[0_0_10px_rgba(0,229,255,0.2)] hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all duration-300">
                <img
                  src={image.preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onImageRemove(image.id);
                  URL.revokeObjectURL(image.preview);
                }}
                className="absolute -top-2 -right-2 bg-[#FF00A0] hover:bg-[#FF00A0]/80 text-[#0D0D0D] rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg shadow-[0_0_10px_rgba(255,0,160,0.5)]"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-[#0D0D0D]/80 backdrop-blur-sm text-[#E0E0E0] text-xs p-1 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="flex items-center justify-center">
                  <ImageIcon className="h-3 w-3 mr-1 text-[#00E5FF]" />
                  <span className="truncate">{image.file.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;