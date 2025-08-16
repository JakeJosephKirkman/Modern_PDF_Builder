import React, { useCallback, useState } from 'react';
import { Upload, X, ChevronUp, ChevronDown, Image as ImageIcon } from 'lucide-react';
import { fileToDataUrl, formatFileSize, isValidImageType, isValidFileSize } from '../utils/file';

interface ImagePickerProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
}

interface ImageInfo {
  dataUrl: string;
  name: string;
  size: string;
}

const ImagePicker: React.FC<ImagePickerProps> = ({ images, onImagesChange }) => {
  const [imageInfos, setImageInfos] = useState<ImageInfo[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processFiles = useCallback(async (files: FileList) => {
    setError(null);
    const newImages: string[] = [];
    const newInfos: ImageInfo[] = [];
    
    for (let i = 0; i < files.length && images.length + newImages.length < 10; i++) {
      const file = files[i];
      
      if (!isValidImageType(file)) {
        setError(`"${file.name}" is not a valid image type. Please use PNG, JPG, JPEG, or WebP.`);
        continue;
      }
      
      if (!isValidFileSize(file, 10)) {
        setError(`"${file.name}" is too large. Maximum file size is 10MB.`);
        continue;
      }
      
      try {
        const dataUrl = await fileToDataUrl(file);
        newImages.push(dataUrl);
        newInfos.push({
          dataUrl,
          name: file.name,
          size: formatFileSize(file.size),
        });
      } catch (err) {
        setError(`Failed to process "${file.name}"`);
      }
    }
    
    if (images.length + newImages.length >= 10) {
      setError('Maximum 10 images allowed');
    }
    
    const updatedImages = [...images, ...newImages];
    const updatedInfos = [...imageInfos, ...newInfos];
    
    onImagesChange(updatedImages);
    setImageInfos(updatedInfos);
  }, [images, imageInfos, onImagesChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  }, [processFiles]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  }, [processFiles]);

  const removeImage = useCallback((index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    const newInfos = imageInfos.filter((_, i) => i !== index);
    onImagesChange(newImages);
    setImageInfos(newInfos);
  }, [images, imageInfos, onImagesChange]);

  const moveImage = useCallback((index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= images.length) return;

    const newImages = [...images];
    const newInfos = [...imageInfos];
    
    [newImages[index], newImages[newIndex]] = [newImages[newIndex], newImages[index]];
    [newInfos[index], newInfos[newIndex]] = [newInfos[newIndex], newInfos[index]];
    
    onImagesChange(newImages);
    setImageInfos(newInfos);
  }, [images, imageInfos, onImagesChange]);

  return (
    <div className="space-y-4">
      <label className="block text-sm font-semibold text-[#E0E0E0]">
        Images (Optional)
      </label>
      
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer ${
          dragActive
            ? 'border-[#00E5FF] bg-[#00E5FF]/5 shadow-[0_0_20px_rgba(0,229,255,0.3)]'
            : 'border-[#FF00A0]/40 hover:border-[#FF00A0] bg-[#151515]/60 hover:bg-[#151515]/80'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => document.getElementById('file-input')?.click()}
      >
        <Upload className={`mx-auto h-12 w-12 mb-4 ${dragActive ? 'text-[#00E5FF]' : 'text-[#FF00A0]'}`} />
        <p className="text-[#E0E0E0] font-medium mb-2">
          {dragActive ? 'Drop images here' : 'Click to select or drag & drop images'}
        </p>
        <p className="text-sm text-[#8A8A8A]">
          PNG, JPG, JPEG, WebP • Max 10MB each • Up to 10 images
        </p>
      </div>
      
      <input
        id="file-input"
        type="file"
        multiple
        accept="image/png,image/jpg,image/jpeg,image/webp"
        className="hidden"
        onChange={handleFileInput}
      />
      
      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}
      
      {images.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm text-[#8A8A8A]">
            {images.length} image{images.length !== 1 ? 's' : ''} selected
          </p>
          
          <div className="space-y-2">
            {imageInfos.map((info, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-[#151515]/80 rounded-lg border border-white/5"
              >
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#0D0D0D] flex-shrink-0">
                  <img
                    src={info.dataUrl}
                    alt={info.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="h-4 w-4 text-[#00E5FF] flex-shrink-0" />
                    <p className="text-sm font-medium text-[#E0E0E0] truncate">
                      {info.name}
                    </p>
                  </div>
                  <p className="text-xs text-[#8A8A8A]">{info.size}</p>
                </div>
                
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => moveImage(index, 'up')}
                    disabled={index === 0}
                    className="p-1 text-[#8A8A8A] hover:text-[#00E5FF] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Move up"
                  >
                    <ChevronUp className="h-4 w-4" />
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => moveImage(index, 'down')}
                    disabled={index === images.length - 1}
                    className="p-1 text-[#8A8A8A] hover:text-[#00E5FF] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Move down"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="p-1 text-[#8A8A8A] hover:text-[#FF00A0] transition-colors ml-1"
                    title="Remove image"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagePicker;