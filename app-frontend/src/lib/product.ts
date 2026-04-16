const productAvailabilities = [
    { value: "IN_STOCK", label: "(1) In Stock" },
    { value: "WAITING", label: "(2) Waiting" },
    { value: "OUT_OF_STOCK", label: "(3) Out of stock" },
]

const productTimeToDeliveryValues = [
    { value: "1 to 4 days", label: "(1) 1 to 4 days" },
    { value: "5 to 10 days", label: "(2) 5 to 10 days" },
    { value: "11 to 20 days", label: "(3) 11 to 20 days" },
]

const productCategories = [
    { value: 'disabled', label: 'Category', disabled: true },
    { value: "NATURE", label: "(1) Nature" },
    { value: "SPACE", label: "(2) Space" },
    { value: "ROBOTICS", label: "(3) Robotics" },
    { value: "MODERN", label: "(4) Modern" }
]

const productPriceSortingOptions = [
    { value: 'disabled', label: 'Price', disabled: true },
    { value: "HIGHEST", label: "Highest" },
    { value: "LOWEST", label: "Lowest" },
]

const productStatuses = [
    { value: "PLACED", label: "Placed" },
    { value: "PAID", label: "Paid" },
    { value: "IN_PROGRESS", label: "Preparing Purchase" },
    { value: "OUT_FOR_DELIVERY", label: "On the Way" },
    { value: "DELIVERED", label: "Delivered" },
]

const statusToStepIndex: Record<string, number> = {
    "PLACED": 0,
    "PAID": 1,
    "IN_PROGRESS": 2,
    "OUT_FOR_DELIVERY": 3,
    "DELIVERED": 4,
};

const statusSteps = [
    {
        title: 'Purchase Placed',
        content: 'Your purchase has been placed',
    },
    {
        title: 'Payment Confirmed',
        content: 'Payment has been received',
    },
    {
        title: 'Preparing Purchase',
        content: 'Your purchase is being prepared',
    },
    {
        title: 'On the way',
        content: 'Package is on the way',
    },
    {
        title: 'Delivered',
        content: 'Package delivered successfully',
    },
];

const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    })
}

export {
    productCategories,
    productAvailabilities,
    productTimeToDeliveryValues,
    productPriceSortingOptions,
    statusSteps,
    statusToStepIndex,
    formatDate,
    productStatuses
}