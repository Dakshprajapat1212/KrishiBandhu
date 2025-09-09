import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ImageUploadArea = ({ onImageUpload, uploadedImage, isAnalyzing }) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === "dragenter" || e?.type === "dragover") {
      setDragActive(true);
    } else if (e?.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleFileUpload(e?.dataTransfer?.files?.[0]);
    }
  };

  const handleFileUpload = (file) => {
    if (file && file?.type?.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageUpload(e?.target?.result, file?.name);
      };
      reader?.readAsDataURL(file);
    }
  };

  const handleFileSelect = (e) => {
    if (e?.target?.files && e?.target?.files?.[0]) {
      handleFileUpload(e?.target?.files?.[0]);
    }
  };

  const handleCameraCapture = () => {
    cameraInputRef?.current?.click();
  };

  const handleGallerySelect = () => {
    fileInputRef?.current?.click();
  };

  if (uploadedImage) {
    return (
      <div className="bg-card rounded-lg border border-border p-6 shadow-morphic">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-lg text-foreground">
            Uploaded Image
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onImageUpload(null, null)}
            iconName="X"
            iconSize={16}
            disabled={isAnalyzing}
          >
            Remove
          </Button>
        </div>
        
        <div className="relative rounded-lg overflow-hidden bg-muted">
          <Image
            src={uploadedImage}
            alt="Uploaded crop image"
            className="w-full h-64 object-cover"
          />
          {isAnalyzing && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="bg-card rounded-lg p-4 flex items-center space-x-3">
                <div className="animate-spin">
                  <Icon name="Loader2" size={20} color="var(--color-primary)" />
                </div>
                <span className="font-body text-sm text-foreground">
                  Analyzing image...
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-morphic">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Camera" size={32} color="var(--color-primary)" />
        </div>
        <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
          Upload Crop Image
        </h3>
        <p className="font-body text-sm text-muted-foreground">
          Take a photo or upload an image of your crop to detect pests and diseases
        </p>
      </div>

      {/* Drag and Drop Area */}
      <div
        className={`
          border-2 border-dashed rounded-lg p-8 text-center transition-morphic
          ${dragActive 
            ? 'border-primary bg-primary/5 scale-micro' :'border-border hover:border-primary/50 hover:bg-primary/5'
          }
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Icon 
          name="Upload" 
          size={48} 
          color={dragActive ? "var(--color-primary)" : "var(--color-muted-foreground)"} 
          className="mx-auto mb-4"
        />
        <p className="font-body text-foreground mb-2">
          Drag and drop your image here
        </p>
        <p className="font-caption text-sm text-muted-foreground mb-6">
          or choose from the options below
        </p>

        {/* Upload Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button
            variant="outline"
            size="lg"
            onClick={handleCameraCapture}
            iconName="Camera"
            iconPosition="left"
            iconSize={20}
            className="transition-morphic hover:scale-micro"
          >
            Take Photo
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={handleGallerySelect}
            iconName="Image"
            iconPosition="left"
            iconSize={20}
            className="transition-morphic hover:scale-micro"
          >
            Choose from Gallery
          </Button>
        </div>

        {/* Hidden File Inputs */}
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Tips */}
      <div className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={16} color="var(--color-accent)" className="mt-0.5" />
          <div>
            <h4 className="font-body font-medium text-accent-foreground mb-2">
              Tips for better detection:
            </h4>
            <ul className="font-caption text-sm text-accent-foreground space-y-1">
              <li>• Take clear, well-lit photos</li>
              <li>• Focus on affected plant parts</li>
              <li>• Include multiple angles if possible</li>
              <li>• Avoid blurry or dark images</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadArea;