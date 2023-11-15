import config from "../../../config"
import media from "../../../media"

const url = config.hiroBaseUrl + '/inscriptions'
const init = {
  headers: {
    "content-type": "application/json"
  }
}

export async function onRequestGet(context) {
  const address = context.params.address
  const { searchParams } = new URL(context.request.url)
  const limit = searchParams.get('limit') ? searchParams.get('limit') : 24
  const offset = searchParams.get('offset') ? searchParams.get('offset') : 0
  const orderby = searchParams.get('order_by') ? searchParams.get('order_by') : 'number'
  const order = searchParams.get('order') ? searchParams.get('order') : 'asc'
  const filetype = searchParams.get('filetype')
  let requestUrl = ''

  if (!Object.keys(media).includes(filetype)) {
    requestUrl = url + `?address=${address}&limit=${limit}&offset${offset}&order_by=${orderby}&order=${order}`
  } else {
    requestUrl = url + `?address=${address}&limit=${limit}&offset${offset}&order_by=${orderby}&order=${order}&mime_type=${media[filetype].join(',')}`
  }

  const response = await fetch(requestUrl, init)
  return Response.json(await response.json())
}