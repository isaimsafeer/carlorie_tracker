
import React, { useRef, useState, useCallback, useEffect } from 'react';

interface CameraViewProps {
  onCapture: (image: string) => void;
  onClose: () => void;
}

const CameraView: React.FC<CameraViewProps> = ({ onCapture, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      setError('Could not access camera. Please check permissions.');
      console.error(err);
    }
  }, []);

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [startCamera]);

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        onCapture(dataUrl);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <div className="relative flex-1 overflow-hidden bg-black flex items-center justify-center">
        {error ? (
          <div className="text-white p-6 text-center">
            <p className="mb-4">{error}</p>
            <button 
              onClick={onClose}
              className="bg-white/10 px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        ) : (
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            className="w-full h-full object-cover"
          />
        )}
        <canvas ref={canvasRef} className="hidden" />
        
        {/* UI Overlay */}
        <div className="absolute top-0 inset-x-0 p-4 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent">
          <button 
            onClick={onClose}
            className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="px-3 py-1 bg-emerald-500 rounded-full text-white text-xs font-bold uppercase">
            Food Scanner
          </div>
          <div className="w-10"></div>
        </div>

        {/* Framing Guide */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-64 h-64 border-2 border-white/30 rounded-3xl relative">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white rounded-tl-lg"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white rounded-bl-lg"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white rounded-br-lg"></div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="h-32 bg-black flex items-center justify-center space-x-12 px-8">
        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center overflow-hidden">
           {/* Placeholder for gallery or last photo */}
        </div>
        
        <button 
          onClick={captureImage}
          className="w-16 h-16 bg-white rounded-full flex items-center justify-center border-4 border-gray-400 active:scale-95 transition-transform"
        >
          <div className="w-12 h-12 bg-white rounded-full border-2 border-black/10"></div>
        </button>

        <button 
          onClick={startCamera}
          className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CameraView;
