import * as z from 'zod'


const MAX_UPLOAD_SIZE = 4*1024*1024 ;
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/jpg']

export const profileImageSchema = z.object({
    photo: z.instanceof(FileList).refine((files)=>files.length===1,'please select one image').refine((files) => files[0].size <= MAX_UPLOAD_SIZE, 'Image Size must be less than 4 MB')
    .refine((files) => ALLOWED_IMAGE_TYPES.includes(files[0].type),'Image type must be jpeg , jpg or png')
})