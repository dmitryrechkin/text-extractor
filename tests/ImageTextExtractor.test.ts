import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { ImageTextExtractor } from '../src/ImageTextExtractor';

dotenv.config({path: '.dev.vars'});

const imageTextExtractor = new ImageTextExtractor({
	apiKey: process.env.OCR_API_KEY ?? ''
});

describe('ImageTextExtractor with Generated Image Buffer', () =>
{
	it('should extract text from a generated image buffer', async () =>
	{
		// Load the .docx file as a Uint8Array
		const filePath = path.resolve(__dirname, './Test.png');
		const fileBuffer = fs.readFileSync(filePath);
		const fileUint8Array = new Uint8Array(fileBuffer);

		// Call the extractText method with the generated image
		const extractedText = await imageTextExtractor.extractText(fileUint8Array);

		console.log(extractedText);

		// Verify that the extracted text matches what was drawn on the canvas
		expect(extractedText).toContain('Test');
	}, 300000);
});
