import dotenv from 'dotenv'
import fs from 'fs'

import { getConfig } from './config'
import Deployer from './deployer'
import { parseCsv } from './parseCsv'
import TonWeb from 'tonweb'
import { Buffer } from 'buffer'
import { Cell } from 'ton'
const { NftItem } = TonWeb.token.nft

dotenv.config()
;(async function () {
  const config = await getConfig()

  const nftsString = fs.readFileSync('nfts.csv', { encoding: 'utf8' })
  const nfts = parseCsv(nftsString)
  const nftItemHex = TonWeb.utils.bytesToHex(fs.readFileSync('src/build/nft-item-editable.cell'))
  const deployer = new Deployer(config, nfts, nftItemHex)
  deployer.start()
})()
