import config from "../../../config"

const url = config.unisatBaseUrl + '/v1/indexer/address'
const init = {
  headers: {
    "content-type": "application/json",
    "authorization": `Bearer ${config.unisatApiKey}`
  }
}

export async function onRequestGet(context) {
  const address = context.params.address
  const { searchParams } = new URL(context.request.url)
  const cursor = searchParams.get('cursor')
  const size = searchParams.get('size')
  const response = await fetch(url + `/${address}/inscription-utxo-data?cursor=${cursor}&size=${size}`, init)
  return Response.json(await response.json())
}