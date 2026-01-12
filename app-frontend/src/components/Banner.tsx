import landingImage from "../assets/landingImage.jpg"

const landingBanner = () => {
    return (
        <div className="pb-5 relative">
            <img
                className="w-full h-[175px] object-cover"
                src={landingImage}
                alt="Banner"
            />
            <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-4xl font-bold text-white">
                    Webshop project
                </h1>
            </div>
        </div>
    )
}

export default landingBanner