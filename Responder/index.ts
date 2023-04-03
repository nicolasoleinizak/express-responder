import { BAD_REQUEST, CREATED, NOT_FOUND, SERVER_ERROR } from './Messages'

export const respond = (res: any) => {

  const codeToMessage = <any> {
    201: CREATED,
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
    created: (data?: any) => {
      if(data){
        resolve(201, {data})
      } else {
        resolve(201)
      }
    },
    badRequest: (message?: string) => {
      console.log(message)
      if(message){
        resolve(400, {message})
      } else {
        resolve(400)
      }
    },
    notFound: () => {
      resolve(404)
    },
    serverError: () => {
      resolve(500)
    }
  }
}