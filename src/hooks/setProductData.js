const setProductData = () => {
  const dataForCard = (rawData) => {
    let tmpObj = {}
    if (rawData) {
      tmpObj.id = rawData?.id
      tmpObj.name = rawData?.name
      tmpObj.price = rawData?.price
      tmpObj.catID = rawData?.category_id
      tmpObj.mainImage = rawData?.product_images.find((img) => img.priority === 0).path

      let summ = 0
      rawData?.comments.map((comment) => (summ += comment.rating))

      tmpObj.commentsCount = rawData?.comments.length
      tmpObj.rating = summ / rawData?.comments.length
      tmpObj.stock = rawData?.stock
      if (rawData?.to_variant_products?.length !== 0) {
        rawData?.to_variant_products?.map((varProduct) => {
          if (tmpObj.price === 0) {
            const currentPrice = Math.floor(
              varProduct.price * (1 - varProduct.discount_percent / 100) - varProduct.discount_flat
            )
            tmpObj.price = varProduct.price
            tmpObj.flat = varProduct.discount_flat
            tmpObj.percent = varProduct.discount_percent
            tmpObj.currentPrice = currentPrice
            tmpObj.stock = varProduct.stock
            tmpObj.totalDiscount = ((varProduct.price - currentPrice) / varProduct.price) * 100
          } else {
            const currentPrice = Math.floor(
              varProduct.price * (1 - varProduct.discount_percent / 100) - varProduct.discount_flat
            )
            if (currentPrice < tmpObj.currentPrice) {
              tmpObj.price = varProduct.price
              tmpObj.flat = varProduct.discount_flat
              tmpObj.percent = varProduct.discount_percent
              tmpObj.currentPrice = currentPrice
              tmpObj.stock = varProduct.stock
              tmpObj.totalDiscount = ((varProduct.price - currentPrice) / varProduct.price) * 100
            }
          }
        })
      } else {
        const currentPrice = Math.floor(
          rawData.price * (1 - rawData.discount_percent / 100) - rawData.discount_flat
        )

        tmpObj.price = rawData.price
        tmpObj.flat = rawData.discount_flat
        tmpObj.percent = rawData.discount_percent
        tmpObj.currentPrice = currentPrice
        tmpObj.stock = rawData.stock
        tmpObj.totalDiscount = ((rawData.price - currentPrice) / rawData.price) * 100
      }
      return tmpObj
    }
  }
  return { dataForCard }
}

export default setProductData
