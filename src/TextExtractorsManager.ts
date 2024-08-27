import { type TextExtractorInterface } from './TextExtractorInterface';

export class TextExtractorsManager
{
	/**
	 * Constructor.
	 *
	 * @param {TextExtractorInterface[]} textExtractors
	 */
	constructor(private textExtractors: TextExtractorInterface[]) {}

	/**
	 * Extracts text from a buffer.
	 *
	 * @param {Uint8Array} input
	 * @returns {Promise<string>}
	 */
	public async extractText(input: Uint8Array): Promise<string>
	{
		let text = '';
		for (const textExtractor of this.textExtractors)
		{
			text = await textExtractor.extractText(input);
			if (text.length > 0)
			{
				break;
			}

		}

		return text;
	}
}
