import mammoth from 'mammoth';
import { Buffer } from 'buffer';
import { type TextExtractorInterface } from './TextExtractorInterface';

export class DocTextExtractor implements TextExtractorInterface
{
	/**
	 * Extracts text from a buffer.
	 *
	 * @param {Uint8Array} input
	 * @returns {Promise<string>}
	 */
	public async extractText(input: Uint8Array): Promise<string>
	{
		if (!this.isDocx(input))
		{
			return '';
		}

		const result = await mammoth.extractRawText({ buffer: Buffer.from(input) });
		return result.value.trim();
	}

	/**
	 * Returns true if the input is a DOCX file.
	 *
	 * @param {Uint8Array} input
	 * @returns {boolean}
	 */
	private isDocx(input: Uint8Array): boolean
	{
		if (input.length < 2)
		{
			return false;
		}

		// DOCX files are actually ZIP files that start with "PK" (0x50, 0x4B in hexadecimal)
		return input[0] === 0x50 && input[1] === 0x4B;
	}
}
