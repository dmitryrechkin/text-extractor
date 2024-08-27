import { getDocument } from 'pdfjs-dist';
import { type TextExtractorInterface } from './TextExtractorInterface';

export class PDFTextExtractor implements TextExtractorInterface
{
	/**
	 * Extracts text from a buffer.
	 *
	 * @param {Uint8Array} input
	 * @returns {Promise<string>}
	 */
	public async extractText(input: Uint8Array): Promise<string>
	{
		if (!this.isPDF(input))
		{
			return '';
		}

		const pdf = await getDocument({ data: input }).promise;
		let extractedText = '';

		for (let idx = 1; idx <= pdf.numPages; idx++)
		{
			const page = await pdf.getPage(idx);
			const textContent = await page.getTextContent();

			const pageText = textContent.items
				.map((item: any) => item.str)
				.join(' ');

			extractedText += `${pageText}\n`;
		}

		return extractedText.trim();
	}

	/**
	 * Returns true if the input is a PDF file.
	 *
	 * @param {Uint8Array} input
	 * @returns {boolean}
	 */
	private isPDF(input: Uint8Array): boolean
	{
		if (input.length < 4)
		{
			return false;
		}

		// PDF files start with "%PDF" which is equivalent to 0x25, 0x50, 0x44, 0x46 in hexadecimal
		return input[0] === 0x25 && input[1] === 0x50 && input[2] === 0x44 && input[3] === 0x46;
	}

}
