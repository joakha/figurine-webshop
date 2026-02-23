const productCategories = [
    { value: "FANTASY", label: "Fantasy" },
    { value: "SCIFI", label: "Sci-fi" }
]

const productAvailabilities = [
    { value: "IN_STOCK", label: "In Stock" },
    { value: "WAITING", label: "Waiting" },
    { value: "OUT_OF_STOCK", label: "Out of stock" },
]

const productTimeToDeliveryValues = [
    { value: "1 to 4 days", label: "1 to 4 days" },
    { value: "5 to 10 days", label: "5 to 10 days" },
    { value: "11 to 20 days", label: "11 to 20 days" },
]

const productPriceSortingOptions = [
    { value: 'disabled', label: 'Price', disabled: true },
    { value: "HIGHEST", label: "Highest" },
    { value: "LOWEST", label: "Lowest" },
]

export {
    productCategories,
    productAvailabilities,
    productTimeToDeliveryValues,
    productPriceSortingOptions
}