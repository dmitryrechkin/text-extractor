import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { DocTextExtractor } from '../src/DocTextExtractor';

describe('DocTextExtractor with Static .docx Data', () =>
{
	const docTextExtractor = new DocTextExtractor();

	it('should extract text from static .docx buffer', async () =>
	{
		// Load the .docx file as a Uint8Array
		const filePath = path.resolve(__dirname, './Test.docx');
		const fileBuffer = fs.readFileSync(filePath);
		const fileUint8Array = new Uint8Array(fileBuffer);

		// Call the extractText method
		const extractedText = await docTextExtractor.extractText(fileUint8Array);

		// Verify the extracted text
		expect(extractedText).toContain('Test');
	});
});
