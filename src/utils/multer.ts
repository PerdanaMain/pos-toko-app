import multer from "multer";

export const fileStorage = multer.memoryStorage();
export const fileFilter = (
  req: any,
  file: { mimetype: string },
  cb: (arg0: null, arg1: boolean) => void
) => {
  if (
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
