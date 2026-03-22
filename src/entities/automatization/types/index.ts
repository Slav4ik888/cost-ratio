/**  */
export interface MainItem {
  siteID          : string
  title           : string
  description     : string
  price           : string
  image           : string
  project         : string
  organization    : string
  mbCostServicies : number | undefined
  mbPrice         : number
  mbTraffic       : number
  mbCostTraffic   : number
  mbCostCorrect   : string
  spTraffic       : string
  spCostTraffic   : string
  result          : number
  sumMbCost       : string
  sumSpCost       : string
}
