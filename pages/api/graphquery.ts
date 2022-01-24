import type { NextApiRequest, NextApiResponse } from "next"

const graphquery = (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).redirect("https://api-ap-south-1.graphcms.com/v2/ckyijm9ji30ur01z3a6q03vk7/master")
}

export default graphquery