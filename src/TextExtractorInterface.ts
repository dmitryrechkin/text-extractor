export interface TextExtractorInterface
{
	/**
	 * Extracts text from a buffer.
	 *
	 * @param {Uint8Array} input
	 * @returns {Promise<string>}
	 */
	extractText(input: Uint8Array): Promise<string>
}
