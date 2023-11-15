// Function to compress text using gzip algorithm
import pako from "pako";
export const compressText = (text) => {
  // Convert the text to a Uint8Array
  const encoder = new TextEncoder();
  const data = encoder.encode(text);

  // Compress the data using gzip
  const compressedData = pako.gzip(data, { level: 9 }); // pako is a popular JavaScript library for compression

  // Convert the compressed data to a base64 string
  const base64Data = btoa(String.fromCharCode.apply(null, compressedData));

  return base64Data;
};

// Function to decompress text using gzip algorithm
export const decompressText = (compressedText) => {
  // Convert the base64 string back to a Uint8Array
  const decodedData = atob(compressedText);
  const uint8Data = new Uint8Array(decodedData.length);

  for (let i = 0; i < decodedData.length; i++) {
    uint8Data[i] = decodedData.charCodeAt(i);
  }

  // Decompress the data using gzip
  const decompressedData = pako.ungzip(uint8Data, { to: "string" });

  // Convert the decompressed data to a string
  const decoder = new TextDecoder();
  const text = decoder.decode(decompressedData);

  return text;
};
