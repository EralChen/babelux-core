import {series} from 'gulp'
import path from 'path'
import glob from 'fast-glob'
import { distDir } from '@lib-env/path'
import { taskWithName } from '@lib-env/shared'
import { filePathIgnore } from '@lib-env/build-constants'
import { genTypes, rollupFile } from '@lib-env/build-utils'

const getOutputFile = (filePath: string) => path.resolve(
  distDir, 
  `composables/${
    path
      .relative(path.resolve(__dirname), filePath)
      .replace('.ts', '.js')
  }`,
)
const buildFile = '**/index.ts'

export default series(

  taskWithName('bundleComposablesJs', async () => {

    const filePaths = await glob(buildFile, {
      cwd: path.resolve(__dirname, './'),
      onlyFiles: true,
      absolute: true,
      ignore: filePathIgnore,
    })

    filePaths.forEach(item => {
      rollupFile({
        inputFile: item,
        outputFile: getOutputFile(item),
        format: 'esm',
      })
    })

  }),

  taskWithName('genComposablesTypes', async () => {
    genTypes({
      filesRoot: path.resolve(__dirname),
      source: buildFile,
    })
  }),

)
