import { loader } from 'webpack'
import parseSfc from './parseSfc'
import compileTemplateFromDescriptor from './compileTemplateFromDescriptor'
import { uniq, map, kebabCase } from 'lodash'
import { PluginOptions } from '../types'

export default function extractTagsFromSfc (this : loader.LoaderContext, options : PluginOptions) : Array<string> | undefined {

  // parse the SFC component and get a descriptor
  const sfcDescriptor = parseSfc.call(this, options.compiler)

  // compile the template content from the descriptor
  const compiled = compileTemplateFromDescriptor.call(this, sfcDescriptor, options.compiler)

  if (compiled && compiled.tags) {
    // return all unique tags as kebab case
    return uniq(map(compiled.tags, tag => kebabCase(tag)))
  }

  return
}
