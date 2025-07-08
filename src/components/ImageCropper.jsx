import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const ImageCropper = ({ src, onCropComplete, onCancel, isOpen }) => {
  const [crop, setCrop] = useState({
    unit: '%',
    width: 90,
    height: 90,
    x: 5,
    y: 5
  });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [modalPosition, setModalPosition] = useState('center');
  const imgRef = useRef(null);

  const onLoad = useCallback((img) => {
    imgRef.current = img.currentTarget;
    setImgLoaded(true);
  }, []);

  const getCroppedImg = useCallback((image, crop, fileName) => {
    if (!image || !crop.width || !crop.height) {
      return Promise.reject('Invalid image or crop dimensions');
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    
    canvas.width = crop.width;
    canvas.height = crop.height;

    try {
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error('Canvas is empty'));
            return;
          }
          blob.name = fileName;
          const fileUrl = window.URL.createObjectURL(blob);
          resolve({ blob, url: fileUrl });
        }, 'image/jpeg', 0.9);
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }, []);

  const makeClientCrop = useCallback(async (crop) => {
    if (imgRef.current && crop.width && crop.height && imgLoaded) {
      try {
        const croppedImageUrl = await getCroppedImg(
          imgRef.current,
          crop,
          'cropped-image.jpeg'
        );
        return croppedImageUrl;
      } catch (error) {
        console.error('Error cropping image:', error);
        return null;
      }
    }
    return null;
  }, [getCroppedImg, imgLoaded]);

  const handleCropComplete = async () => {
    if (completedCrop && imgRef.current && imgLoaded) {
      try {
        const croppedImage = await makeClientCrop(completedCrop);
        if (croppedImage) {
          onCropComplete(croppedImage);
        }
      } catch (error) {
        console.error('Error completing crop:', error);
      }
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setImgLoaded(false);
    onCancel();
  };

  const handleApply = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await handleCropComplete();
  };

  // Reset image loaded state when modal opens/closes
  React.useEffect(() => {
    if (!isOpen) {
      setImgLoaded(false);
    }
  }, [isOpen]);

  // Calculate modal position based on screen size
  useEffect(() => {
    if (isOpen) {
      const updatePosition = () => {
        const isMobile = window.innerWidth < 768;
        if (isMobile) {
          // On mobile, always position at bottom like user image
          setModalPosition('bottom');
        } else {
          // On desktop, always center
          setModalPosition('center');
        }
      };

      updatePosition();
      window.addEventListener('resize', updatePosition);
      return () => window.removeEventListener('resize', updatePosition);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Get positioning classes based on modal position
  const getPositionClasses = () => {
    switch (modalPosition) {
      case 'top':
        return 'items-start pt-8';
      case 'bottom':
        return 'items-end pb-8';
      default:
        return 'items-center';
    }
  };

  return (
    <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex ${getPositionClasses()} justify-center p-4`}>
      <div className="bg-white/10 backdrop-blur-xl border border-white/30 rounded-2xl p-4 md:p-6 max-h-[90vh] overflow-auto w-full max-w-md md:max-w-2xl relative mx-4">
        <h2 className="text-lg md:text-xl font-bold text-white mb-4">Crop Image</h2>
        
        <div className="mb-4 max-h-96 overflow-auto">
          <ReactCrop
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={1} // Square crop
            className="max-w-full"
          >
            <img
              ref={imgRef}
              alt="Crop"
              src={src}
              style={{ maxWidth: '100%' }}
              onLoad={onLoad}
              crossOrigin="anonymous"
            />
          </ReactCrop>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end">
          <button
            type="button"
            onClick={handleCancel}
            className="w-full sm:w-auto px-4 py-3 sm:py-2 rounded-md bg-gray-600 hover:bg-gray-500 text-white font-medium"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleApply}
            disabled={!imgLoaded || !completedCrop}
            className="w-full sm:w-auto px-4 py-3 sm:py-2 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-medium disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            Apply Crop
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;
