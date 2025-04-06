import { PluginSimple } from 'markdown-it'

declare module 'markdown-it-mark' {
  const plugin: PluginSimple
  export default plugin
}
