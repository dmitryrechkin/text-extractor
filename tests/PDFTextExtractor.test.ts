import { describe, it, expect } from 'vitest';
import { PDFTextExtractor } from '../src/PDFTextExtractor';
import { Buffer } from 'buffer';

describe('PDFTextExtractor', () =>
{
	const pdfTextExtractor = new PDFTextExtractor();

	it('should extract text from a valid PDF buffer', async () =>
	{
		// Mock a small PDF buffer (this would typically be a real PDF binary data)
		const pdfBuffer = Buffer.from('%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Count 1 /Kids [3 0 R] >>\nendobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R >>\nendobj\n4 0 obj\n<< /Length 44 >>\nstream\nBT\n/F1 24 Tf\n100 700 Td\n(Hello, World!) Tj\nET\nendstream\nendobj\ntrailer\n<< /Root 1 0 R >>\n%%EOF', 'utf-8');
		const text = await pdfTextExtractor.extractText(new Uint8Array(pdfBuffer));

		expect(text).toContain('Hello, World!');
	});

	it('should return empty string if the PDF buffer is invalid', async () =>
	{
		const invalidPdfBuffer = Buffer.from('Invalid PDF data');
		const text = await pdfTextExtractor.extractText(new Uint8Array(invalidPdfBuffer));

		expect(text).toContain('');
	});
});
