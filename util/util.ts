
import * as pdfjs from "pdfjs-dist";

export const getHighlightColor  = (theme:string,color:string) => {
  return color==='green'?theme+'-green':theme+'-red'; 
}
export function normalizeText(input: string): string {
  // Replace multiple spaces with a single space
  let normalized = input.replace(/\s+/g, ' ');
  // Replace multiple line breaks with a single line break
  normalized = normalized.replace(/\n+/g, '\n');
  // Trim leading/trailing whitespace
  return normalized.trim();
}

// if (typeof window !== 'undefined') {
//   pdfjs.GlobalWorkerOptions.workerSrc = `${window.location.origin}/pdf.worker.min.mjs`;
// }

// // Define Promise.withResolvers if it doesn't exist
// if (typeof Promise.withResolvers === 'undefined') {
//   Promise.withResolvers = function <T>() {
//     let resolve: (value?: T | PromiseLike<T> | undefined) => void;
//     let reject: (reason?: any) => void;

//     const promise = new Promise<T>((res, rej) => {
//       resolve = res as (value?: T | PromiseLike<T>) => void;
//       reject = rej as (reason?: any) => void;
//     });

//     return { promise, resolve: resolve!, reject: reject! };
//   };
// }

// export const extractTextFromPDF = async (file: File): Promise<string> => {
//   return new Promise((resolve, reject) => {
//     const fileReader = new FileReader();

//     fileReader.onload = async (event) => {
//       const typedArray = new Uint8Array(event.target?.result as ArrayBuffer);
      
//       try {
//         const pdf = await pdfjs.getDocument(typedArray).promise;
//         let textContent = '';

//         for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
//           const page = await pdf.getPage(pageNum);
//           const content = await page.getTextContent();
//           content.items.forEach((item: any) => {
//             textContent += item.str + ' ';
//           });
//         }

//         resolve(textContent.trim());
//       } catch (error) {
//         reject('Error extracting text from PDF: ' + error);
//       }
//     };

//     fileReader.onerror = () => {
//       reject('Error reading file.');
//     };

//     fileReader.readAsArrayBuffer(file);
//   });
// };
