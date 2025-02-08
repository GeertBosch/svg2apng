# SVG to APNG Converter

This tool converts an SVG file to an animated PNG (APNG) file using Puppeteer and `apngasm`.

## Installation

### Prerequisites

- Node.js (https://nodejs.org/)
- `apngasm` (https://github.com/apngasm/apngasm)

### Install Node.js Modules

    npm install puppeteer commander

## Usage

    ./svg2apng [options] <filePath>

### Options

* `-o, --output <output>`: Output file name (default: derived from input file name)
* `-d, --delay <delay>`: Delay between frames in milliseconds (default: 100)
* `-c, --count <count>`: Number of frames to capture (default: 10)
* `-l, --loops <loops>`: Number of repeats, 0 means repeat indefinitely (default: 1)
* `-k, --keep`: Keep the frame files after assembling the APNG
* `-v, --version`: Display the version number
* `-h, --help`: Display help for command

### Examples

Convert [example.svg](example.svg) to an animated PNG file with default settings:

    ./svg2apng example.svg

Convert [example.svg](example.svg) to an animated PNG file with custom output name and delay:

    ./svg2apng -o custom_output.apng -d 200 example.svg

Convert [example.svg](example.svg) to an animated PNG file with 20 frames and 3 loops:

    ./svg2apng -c 20 -l 3 example.svg

## Note

This tool was mostly created by GitHub Copilot based on prompts by Geert Bosch. The reason for
creating this tool is that there didn't seem to be an existing command line utility.


## License

MIT License
