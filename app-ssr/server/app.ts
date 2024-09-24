import express, { ErrorRequestHandler } from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import httpErrors from 'http-errors'
import path from 'path'
import { serverRoot, appRoot } from '../path.config'
import { renderPage } from 'vike/server'
import { createServer } from 'vite'


import useTestRouter from './routes/test'
import useUsersRouter from './routes/users'


import { rCrowdinReflect } from './crowdin'
import { CrowdinFileLang } from './crowdin/output'
import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware'
import { loadSsrMetaEnv } from './utils/readSsrMetaEnv'

const isProduction = process.env.NODE_ENV === 'production'
const env = loadSsrMetaEnv()

export async function createApp () {

  const crowdinReflect = await rCrowdinReflect()

  const app = express()

  // 开启日志
  app.use(morgan('dev'))
  // 处理 application/json 格式的请求体
  app.use(express.json())
  // 处理 application/x-www-form-urlencoded 格式的请求体
  app.use(express.urlencoded({ extended: false }))
  // 解析所有传入请求的cookie，并将它们存储在req.cookies对象中
  app.use(cookieParser())

  
  useTestRouter(app)
  useUsersRouter(app)

  if (isProduction) {
    app.use(express.static(`${appRoot}/dist/client`))
  } else {
    const port = env.SERVER_HMR_PORT ?? 24678
    // Instantiate Vite's development server and integrate its middleware to our server.
    // ⚠️ We should instantiate it *only* in development. (It isn't needed in production
    // and would unnecessarily bloat our server in production.)
    const viteDevMiddleware = (
      await createServer({
        root: appRoot,
        server: { middlewareMode: true, hmr: { port } },
      })
    ).middlewares

    app.use(viteDevMiddleware)
  }


  // view engine setup
  app.set('views', path.join(serverRoot, 'views'))
  app.set('view engine', 'pug')


  if (env.VITE_PROXY_TARGET_URL) {
  // 创建代理中间件
    const proxy = createProxyMiddleware({
      target: env.VITE_PROXY_TARGET_URL, // 目标服务器的地址
      changeOrigin: true,
      pathRewrite: {
        '^/proxy': '', // 重写请求，去掉 /proxy
      },
    
      on: {
        proxyReq: fixRequestBody,
      },

    })
    app.use('/proxy', proxy)
  }







  Reflect.ownKeys(crowdinReflect).forEach((v) => {
    const lang = v as CrowdinFileLang
    const handler = createVikeHandler(lang)
    app.use(`/${lang}`, handler)
    // app.use(`/zh-CN`, createVikeHandler(CrowdinFileLang.zhCN))

  })

  app.use('/', createVikeHandler())
  app.use('/star-wars', createVikeHandler())

  /**
   * Vike route
   *
   * @link {@see https://vike.dev}
   **/
  function createVikeHandler (lang = CrowdinFileLang.zhCN) {
    
    return async function vikeHandler (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction,
    ) {
      const pageContextInit = { 
        urlOriginal: req.originalUrl,
        headersOriginal: req.headers,

        // ***************************************
        // **** Custom pageContext properties ****
        // ***************************************
        lang,
        crowdin: crowdinReflect[lang],
      }

    

      const pageContext = await renderPage(pageContextInit)

      const { httpResponse } = pageContext

      if (!httpResponse) {
        return next()
      } else {
        const { statusCode, headers } = httpResponse
        headers.forEach(([name, value]) => res.setHeader(name, value))
        res.status(statusCode)
        httpResponse.pipe(res)
      }
     
    }
  
  }


  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(httpErrors(404))
  })


  // error handler
  function errorHandler (
    err: httpErrors.HttpError,
    req: express.Request, 
    res: express.Response, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _: express.NextFunction,
  ) {
  // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
  }
  app.use(errorHandler as ErrorRequestHandler)


  return app

}


