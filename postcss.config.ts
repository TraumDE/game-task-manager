import pxToRem from 'postcss-pxtorem'
import type { Config } from 'postcss-load-config'

const config: Config = {
  plugins: [
    pxToRem({
      propList: ['*'],
      mediaQuery: true,
    }),
  ],
}

export default config
