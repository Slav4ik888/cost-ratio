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
  mbCostTraffic   : number | undefined
  mbCostCorrect   : number | undefined
  spTraffic       : number | undefined
  spCostTraffic   : number | undefined
  result          : number | undefined
  sumMbCost       : number | undefined
  sumSpCost       : number | undefined
}
