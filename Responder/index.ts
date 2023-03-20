import { BAD_REQUEST, NOT_FOUND, SERVER_ERROR } from './Messages'

export const respond = (res: any) => {

  const codeToMessage = <any> {
    400: BAD_REQUEST,
    404: NOT_FOUND,
    500: SERVER_ERROR
  }

  interface ResolveOptions{
    message?: string,
    data?: any
  }

  const resolve = (code: number, options?: ResolveOptions) => {
    console.log(code)
    res.status(code).json({
      error: code >= 400,
      message: options?.message?? codeToMessage[code]?? '',
      data: options?.data
    })
  }

  return {
    ok: (data: any) => {
      resolve(200, {data})
    },
    created: () => {
      resolve(201)
    },
    badRequest: () => {
      resolve(400)
    },
    notFound: () => {
      resolve(404)
    },
    serverError: () => {
      resolve(500)
    }
  }
}