import config from "../../../config"

const url = config.snsBaseurl + '/name'
const init = {
  headers: {
    "content-type": "application/json",
    "api-key": config.snsApiKey
  }
}

export async function onRequestGet(context) {
  const name = context.params.name
  const response = await fetch(url + `/${name}`, init)
  return Response.json(await response.json())
}