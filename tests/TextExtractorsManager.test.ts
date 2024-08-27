import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { PDFTextExtractor } from '../src/PDFTextExtractor';
import { DocTextExtractor } from '../src/DocTextExtractor';
import { ImageTextExtractor } from '../src/ImageTextExtractor';
import { TextExtractorsManager } from '../src/TextExtractorsManager';

dotenv.config({path: '.dev.vars'});

const imageTextExtractorOptions = {
	apiKey: process.env.OCR_API_KEY ?? ''
};

describe('TextExtractorsManager', () =>
{
	const textExtractors = new TextExtractorsManager([
		new PDFTextExtractor(),
		new DocTextExtractor(),
		new ImageTextExtractor(imageTextExtractorOptions)
	]);

	it('should use a PDFTextExtractor for a PDF file', async () =>
	{
		// Load a PDF file as a Uint8Array
		const filePath = path.resolve(__dirname, './Test.pdf');
		const fileBuffer = fs.readFileSync(filePath);
		const fileUint8Array = new Uint8Array(fileBuffer);

		const extractedText = await textExtractors.extractText(fileUint8Array);

		expect(extractedText).toBe('Test');
	});

	it('should use a DocTextExtractor for a DOCX file', async () =>
	{
		// Load a DOCX file as a Uint8Array
		const filePath = path.resolve(__dirname, './Test.docx');
		const fileBuffer = fs.readFileSync(filePath);
		const fileUint8Array = new Uint8Array(fileBuffer);

		const extractedText = await textExtractors.extractText(fileUint8Array);

		expect(extractedText).toBe('Test');
	});

	it('should use an ImageTextExtractor for an image file', async () =>
	{
		// Load an image file as a Uint8Array
		const filePath = path.resolve(__dirname, './Test.png');
		const fileBuffer = fs.readFileSync(filePath);
		const fileUint8Array = new Uint8Array(fileBuffer);

		const extractedText = await textExtractors.extractText(fileUint8Array);

		expect(extractedText).toBe('Test');
	});
});
