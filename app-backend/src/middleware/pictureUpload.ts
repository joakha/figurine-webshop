import multer from "multer"
import DataURIParser from "datauri/parser"
import path from "path"

const storage = multer.memoryStorage()
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
})

const getDataURI = (file: Express.Multer.File) => {
    const parser = new DataURIParser()

    const fileExtension = path.extname(file.originalname)
    return parser.format(fileExtension, file.buffer).content
}

export {
    upload,
    getDataURI
}