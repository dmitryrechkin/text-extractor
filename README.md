
# Text Extractor

**Text Extractor is a TypeScript library designed for extracting text from various file formats including DOCX, PDF, and images.** This library provides a unified interface to handle different file types, making it easier to retrieve text content regardless of the format.

## Installation

Install the package using pnpm:

```bash
pnpm add @dmitryrechkin/text-extractor
```

## Features

- **DOCX Support**: Extracts raw text from DOCX files using \`mammoth\`.
- **PDF Support**: Extracts text from PDF files using \`pdfjs-dist\`.
- **Image OCR**: Extracts text from images using the OCR.space API.
- **Automatic Format Detection**: Automatically selects the appropriate extractor based on the input file.

## Usage

### Extracting Text from a DOCX File

```typescript
import { DocTextExtractor } from "@dmitryrechkin/text-extractor";

const docxExtractor = new DocTextExtractor();
const text = await docxExtractor.extractText(docxBuffer);

console.log(text);
// Output: "Extracted text from the DOCX file..."
```

### Extracting Text from a PDF File

```typescript
import { PDFTextExtractor } from "@dmitryrechkin/text-extractor";

const pdfExtractor = new PDFTextExtractor();
const text = await pdfExtractor.extractText(pdfBuffer);

console.log(text);
// Output: "Extracted text from the PDF file..."
```

### Extracting Text from an Image

```typescript
import { ImageTextExtractor } from "@dmitryrechkin/text-extractor";

const ocrOptions = {
    apiKey: "your-ocr-space-api-key",
    language: "eng"
};

const imageExtractor = new ImageTextExtractor(ocrOptions);
const text = await imageExtractor.extractText(imageBuffer);

console.log(text);
// Output: "Extracted text from the image..."
```

### Using the Text Extractors Manager

```typescript
import { TextExtractorsManager, DocTextExtractor, PDFTextExtractor, ImageTextExtractor } from "@dmitryrechkin/text-extractor";

const manager = new TextExtractorsManager([
    new DocTextExtractor(),
    new PDFTextExtractor(),
    new ImageTextExtractor({ apiKey: "your-ocr-space-api-key" })
]);

const text = await manager.extractText(fileBuffer);

console.log(text);
// Output: "Extracted text from the file..."
```

## When to Use

This library is ideal for projects that require text extraction from various document formats, such as:

- **Document Processing Pipelines**: Automatically extract text from documents for indexing, search, or further processing.
- **OCR Tasks**: Convert images into text using a reliable OCR service.
- **Unified Text Extraction**: Manage multiple file formats with a single, unified interface.

## Installation & Setup

Install the package using pnpm:

```bash
pnpm add @dmitryrechkin/text-extractor
```

Ensure that your project is set up to handle TypeScript and supports ES modules, as this library is built with modern JavaScript standards.

## Contributing

Contributions are welcome! Feel free to fork this project and submit pull requests. Before submitting, please ensure your code passes all linting and unit tests.

You can run unit tests using:

```bash
pnpm test
```
