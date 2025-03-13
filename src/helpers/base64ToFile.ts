export const base64ToFile = (base64String: string, fileName = 'image.png') => {
  try {
    if (!base64String || typeof base64String !== 'string') {
      throw new Error('Invalid Base64 input: not a string.');
    }

    if (!base64String.includes(',')) {
      throw new Error('Invalid Base64 format: missing comma separator.');
    }

    const [metadata, base64Data] = base64String.split(',');

    if (!metadata.startsWith('data:image/') || !base64Data) {
      throw new Error('Invalid Base64 format: missing image data.');
    }

    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    const mimeType = metadata.match(/data:(.*);base64/)?.[1] || 'image/png';

    return new File([byteArray], fileName, { type: mimeType });
  } catch (error) {
    console.error('Error converting Base64 to File:', error);
    return null;
  }
};
