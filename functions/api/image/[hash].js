import config from "../../../config"

const url = config.hashBaseUrl + '/search?hash='
const init = {
  headers: {
    "content-type": "application/json"
  }
}

export async function onRequestGet(context) {
  const hash = context.params.hash
  const response = await fetch(url + `${hash}`, init)
  return Response.json(await response.json())
}