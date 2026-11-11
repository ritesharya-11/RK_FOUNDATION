import ImageKit from 'imagekit';

let imagekitInstance = null;

export const isImageKitConfigured = () => {
  const pub = process.env.IMAGEKIT_PUBLIC_KEY;
  const priv = process.env.IMAGEKIT_PRIVATE_KEY;
  const endpoint = process.env.IMAGEKIT_URL_ENDPOINT;

  return (
    Boolean(pub && priv && endpoint) &&
    !pub.includes('your_imagekit') &&
    !priv.includes('your_imagekit')
  );
};

export const getImageKit = () => {
  if (!imagekitInstance && isImageKitConfigured()) {
    imagekitInstance = new ImageKit({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
    });
  }
  return imagekitInstance;
};

// Upload buffer to ImageKit
export const uploadToImageKit = async (fileBuffer, fileName, folder = '/rk-foundation') => {
  const ik = getImageKit();
  if (!ik) {
    throw new Error('ImageKit is not configured. Please supply keys in .env');
  }

  const response = await ik.upload({
    file: fileBuffer,
    fileName: fileName,
    folder: folder,
    useUniqueFileName: true,
  });

  return {
    url: response.url,
    fileId: response.fileId,
    thumbnailUrl: response.thumbnailUrl,
    name: response.name,
    size: response.size,
    height: response.height,
    width: response.width,
  };
};

// Get Client-side upload authentication parameters
export const getClientAuthParams = () => {
  const ik = getImageKit();
  if (!ik) {
    throw new Error('ImageKit is not configured.');
  }
  return ik.getAuthenticationParameters();
};

