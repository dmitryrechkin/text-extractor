import { type TextExtractorInterface } from './TextExtractorInterface';

export interface ImageTextExtractorOptions {
	apiKey: string;
	language?: string;
	isOverlayRequired?: boolean;
	isTable?: boolean;
	scale?: boolean;
	// eslint-disable-next-line @typescript-eslint/naming-convention
	OCREngine?: string;
}

export class ImageTextExtractor implements TextExtractorInterface
{
	private options: ImageTextExtractorOptions;

	/**
	 * Constructor.
	 *
	 * @param {ImageTextExtractorOptions} options
	 */
	constructor(options: ImageTextExtractorOptions)
	{
		this.options = options;
	}

	/**
	 * Extracts text from a buffer using the OCR.space API.
	 *
	 * @param {Uint8Array} input
	 * @returns {Promise<string>}
	 */
	public async extractText(input: Uint8Array): Promise<string>
	{
		if (!this.isImage(input))
		{
			return '';
		}

		// eslint-disable-next-line @typescript-eslint/naming-convention
		const { apiKey, language = 'eng', isOverlayRequired = false, isTable = false, scale = true, OCREngine = '2' } = this.options;

		const url = 'https://api.ocr.space/parse/image';

		// Convert Uint8Array to a Blob
		const blob = new Blob([input], { type: 'image/png' });

		const formData = new FormData();
		formData.append('apikey', apiKey);
		formData.append('language', language);
		formData.append('isOverlayRequired', isOverlayRequired.toString());
		formData.append('isTable', isTable.toString());
		formData.append('scale', scale.toString());
		formData.append('OCREngine', OCREngine);
		formData.append('file', blob, 'image.png');

		try
		{
			const response = await fetch(url, {
				method: 'POST',
				body: formData as any
			});

			// eslint-disable-next-line @typescript-eslint/naming-convention
			const data : { ParsedResults?: {ParsedText?: string}[] } = await response.json();

			return (data.ParsedResults?.[0]?.ParsedText ?? '').trim();
		}
		catch (error)
		{
			console.error(error);
			return '';
		}
	}

	/**
	 * Returns true if the input is an image file.
	 *
	 * @param {Uint8Array} input
	 * @returns {boolean}
	 */
	private isImage(input: Uint8Array): boolean
	{
		if (input.length < 4)
		{
			return false;
		}

		// Image files start with "PNG", "JPG", or "GIF" in hexadecimal
		return (
			(input[1] === 0x50 && input[2] === 0x4E && input[3] === 0x47) ||
			(input[0] === 0xFF && input[1] === 0xD8) ||
			(input[0] === 0x47 && input[1] === 0x49 && input[2] === 0x46)
		);
	}
}
