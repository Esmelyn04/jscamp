import { readFile, writeFile, unlink, mkdir } from 'node:fs/promises'

const content = await readFile('./file.txt', 'utf8')
console.log(content)

const outputDir = './output/files/documents'
await mkdir(outputDir, { recursive: true })

const uppercaseContent = content.toUpperCase()
await writeFile(`${outputDir}/uppercase-file.txt`, uppercaseContent, 'utf8')

console.log(`Uppercase content written to ${outputDir}/uppercase-file.txt`)