import { readFile, writeFile, unlink, mkdir } from 'node:fs/promises'
import { join, basename, extname } from 'node:path'

console.log('hola mundo antes de leer el archivo')

let content = ''

if (process.permission.has('fs.read', './file.txt')) {
  console.log('Permission granted to read the file')
  content = await readFile('./file.txt', 'utf8')
  console.log(content)
} else {
  console.log('Permission denied to read the file')
}

if (process.permission.has('fs.write', './output/files/documents')) {
  console.log('Permission granted to write to the output directory')

  // const outputDir = './output/files/documents' 
  // await mkdir(outputDir, { recursive: true }) // create the directory if it doesn't exist

  // join() method is used to join the path segments into a single path string. 
  // Recommended to use join() method instead of string concatenation to avoid issues with different operating systems.
  const outputDirJoin = join('output', 'files', 'documents' ) 
  await mkdir(outputDirJoin, { recursive: true }) 

  const uppercaseContent = content.toUpperCase()
  const outputFilePath = join(outputDirJoin, 'uppercase-file.txt')

  // console.log('The file extension is:', extname(outputFilePath)) // .txt
  // console.log('The file name is:', basename(outputFilePath)) // uppercase-file.txt

  await writeFile(outputFilePath, uppercaseContent)
  console.log(`Uppercase content written to ${outputDirJoin}/uppercase-file.txt`)

} else {
  console.log('Permission denied to write to the output directory')
}



// Node permissions
// node --permission --allow-fs-read="*" --allow-fs-write="*" manage-file.js
// node --permission --allow-fs-read="./file.txt" --allow-fs-write="*" manage-file.js
// node --permission --allow-fs-read="./file.txt" --allow-fs-write="./output/*" manage-file.js