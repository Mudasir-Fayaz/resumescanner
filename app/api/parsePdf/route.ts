import { normalizeText } from '@/util/util';
import { NextRequest } from 'next/server';
import pdfParse from 'pdf-parse';

interface PDFParseRequest {
  resumeUrl: string;
}
export const config = {
  runtime: 'edge', // Only for Edge API Routes
  unstable_allowDynamic: [
    // Allows dynamic evaluation in a specific file
    '/lib/utilities.js',
    // Allows dynamic evaluation in any files inside the specified 3rd party module
    '/node_modules/function-bind/**',
  ],
};
export async function POST(request: NextRequest) {
  const { resumeUrl } = (await request.json()) as PDFParseRequest;
  const response = await fetch(resumeUrl);
  const arrayBuffer = await response.arrayBuffer();
  const pdfData = await pdfParse(Buffer.from(arrayBuffer));
  const normalizedText = normalizeText(pdfData.text);

  return new Response(JSON.stringify(normalizedText), {
    status: 200,
  });
}