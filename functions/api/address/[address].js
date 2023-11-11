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
  const filetype = searchParams.get('filetype')
  let requestUrl = ''

  if (!Object.keys(media).includes(filetype)) {
    requestUrl = url + `?address=${address}&limit=${limit}&offset${offset}`
  } else {
    requestUrl = url + `?address=${address}&limit=${limit}&offset${offset}&mime_type=${media[filetype].join(',')}`
  }

  const response = await fetch(requestUrl, init)
  return Response.json(await response.json())
}