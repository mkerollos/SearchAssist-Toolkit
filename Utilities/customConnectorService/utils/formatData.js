async function formatData(rawData, lookupFields) {
    try {
        if (!rawData || !lookupFields) throw new Error("rawData or Lookup fields are missing")
        const rootField = lookupFields?.rootField
        let raw_data = rawData[rootField] || []
        let formattedData = []

        for (let item of raw_data) {
            let data = {}
            data["id"] = item[lookupFields?.id] || ""
            data["title"] = item[lookupFields?.title] || ""
            data["content"] = item[lookupFields?.content] || ""
            data["url"] = item[lookupFields?.url] || ""
            data["type"] = item[lookupFields?.type] || ""
            data["createdOn"] = item[lookupFields?.createdOn] || ""
            data["updatedOn"] = item[lookupFields?.updatedOn] || ""
            data["rawData"] = item || {}
            data["sys_racl"] = item[lookupFields?.sys_racl] || ""
            formattedData.push(data)
        }
        return { data: formattedData }
    } catch (err) {
        console.log("Error", err);
        throw new Error(err.message || "Error occured while formatting the raw data")
    }

}


module.exports = { formatData }