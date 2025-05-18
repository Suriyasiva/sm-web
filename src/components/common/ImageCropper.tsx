/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useRef, useState } from 'react';
import ReactCrop, { centerCrop, Crop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface ImageCropperProps {
  imageToCrop: string;
  setCroppedImage: (data: { croppedImageUrl: string; blob: Blob }) => void;
  aspectRatio: number;
}

export function ImageCropper({
  imageToCrop,
  setCroppedImage,
  aspectRatio,
}: ImageCropperProps) {
  const [cropConfig, setCropConfig] = useState<Crop | undefined>(undefined);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const onImageLoad = (e: any) => {
    const { naturalWidth: width, naturalHeight: height } = e.currentTarget;

    const crop = centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 90,
        },
        aspectRatio,
        width,
        height,
      ),
      width,
      height,
    );

    setCropConfig(crop);
  };

  const cropImage = useCallback(
    async (crop: Crop) => {
      if (imgRef.current && crop.width && crop.height) {
        const croppedImage = await getCroppedImage(
          imgRef.current,
          crop,
          'croppedImage.jpeg',
        );
        setCroppedImage(croppedImage);
      }
    },
    [setCroppedImage],
  );

  const getCroppedImage = (
    sourceImage: HTMLImageElement,
    cropConfig: Crop,
    fileName: string,
  ) => {
    const canvas = document.createElement('canvas');
    const scaleX = sourceImage.naturalWidth / sourceImage.width;
    const scaleY = sourceImage.naturalHeight / sourceImage.height;

    const pixelRatio = window.devicePixelRatio || 1;

    let canvasWidth = cropConfig.width! * scaleX * pixelRatio;
    let canvasHeight = cropConfig.height! * scaleY * pixelRatio;

    // Limit canvas size
    const MAX_WIDTH = 1000;
    const MAX_HEIGHT = 1000;

    if (canvasWidth > MAX_WIDTH || canvasHeight > MAX_HEIGHT) {
      const scale = Math.min(
        MAX_WIDTH / canvasWidth,
        MAX_HEIGHT / canvasHeight,
      );
      canvasWidth *= scale;
      canvasHeight *= scale;
    }

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return Promise.reject('Canvas context is null');
    }

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      sourceImage,
      cropConfig.x! * scaleX,
      cropConfig.y! * scaleY,
      cropConfig.width! * scaleX,
      cropConfig.height! * scaleY,
      0,
      0,
      canvasWidth / pixelRatio,
      canvasHeight / pixelRatio,
    );

    return new Promise<{ croppedImageUrl: string; blob: Blob }>(
      (resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              console.error('Canvas is empty');
              reject(new Error('Canvas is empty'));
              return;
            }
            const file = new File([blob], fileName, { type: blob.type });
            const croppedImageUrl = window.URL.createObjectURL(blob);
            resolve({ croppedImageUrl, blob: file });
          },
          'image/png',
          1,
        );
      },
    );
  };

  return (
    <ReactCrop
      crop={cropConfig}
      ruleOfThirds
      aspect={aspectRatio}
      onComplete={cropImage}
      onChange={(newCropConfig: Crop) => setCropConfig(newCropConfig)}
      className='h-full max-h-[300px] w-auto object-contain'
      locked={false}
    >
      <img
        ref={imgRef}
        src={imageToCrop}
        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
        onLoad={onImageLoad}
        alt='cropped-img'
      />
    </ReactCrop>
  );
}
