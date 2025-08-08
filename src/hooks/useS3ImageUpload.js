import { useState } from 'react';
import AWS from 'aws-sdk';
import * as FileSystem from 'expo-file-system';
import Constants from 'expo-constants';

const useS3ImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);

  // Configure AWS S3
  const s3 = new AWS.S3({
    accessKeyId: Constants.expoConfig.extra.awsAccessKeyId,
    secretAccessKey: Constants.expoConfig.extra.awsSecretAccessKey,
    region: Constants.expoConfig.extra.awsRegion,
  });

  const uploadImage = async (email, assetUri) => {
    try {
      setIsUploading(true);
      setError(null);
      setUploadProgress(0);

      // Get file info first
      const fileInfo = await FileSystem.getInfoAsync(assetUri);
      if (!fileInfo.exists) {
        throw new Error('File does not exist');
      }

      // Read the file as base64
      const base64Data = await FileSystem.readAsStringAsync(assetUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Get file extension from the original URI
      const fileExtension = assetUri.split('.').pop() || 'jpeg';
      
      // Create the S3 key with the specified folder structure
      const s3Key = `${email}/profile-picture.png`;
      
      // Convert base64 to Uint8Array (React Native compatible)
      const binaryString = atob(base64Data);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // Determine content type based on file extension
      let contentType = 'image/jpeg';
      if (fileExtension.toLowerCase() === 'png') {
        contentType = 'image/png';
      } else if (fileExtension.toLowerCase() === 'jpg' || fileExtension.toLowerCase() === 'jpeg') {
        contentType = 'image/jpeg';
      }

      const uploadParams = {
        Bucket: Constants.expoConfig.extra.s3BucketNameProfileImage,
        Key: s3Key,
        Body: bytes,
        ContentType: contentType,
        ACL: 'public-read', // Make the uploaded image publicly accessible
      };

      // Upload to S3
      const uploadResult = await s3.upload(uploadParams)
        .on('httpUploadProgress', (progress) => {
          const percentage = Math.round((progress.loaded / progress.total) * 100);
          setUploadProgress(percentage);
        })
        .promise();

      setIsUploading(false);
      setUploadProgress(100);
      
      return {
        success: true,
        url: uploadResult.Location,
        key: uploadResult.Key,
        bucket: uploadResult.Bucket,
      };

    } catch (err) {
      setIsUploading(false);
      setError(err.message || 'Upload failed');
      console.error('S3 Upload Error:', err);
      
      return {
        success: false,
        error: err.message || 'Upload failed',
      };
    }
  };

  const resetUploadState = () => {
    setIsUploading(false);
    setUploadProgress(0);
    setError(null);
  };

  return {
    uploadImage,
    isUploading,
    uploadProgress,
    error,
    resetUploadState,
  };
};

export default useS3ImageUpload;