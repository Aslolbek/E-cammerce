/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { extname } from 'path';

export const editedFileName = (req: any, file: any, callback: any) => {
  // 1️⃣ Fayl va uning nomi borligini tekshiramiz
  if (!file || !file.originalname) {
    return callback(new Error('Fayl yoki fayl nomi noto‘g‘ri!'), '');
  }

  // 2️⃣ Unikal nom yaratamiz
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  const fileExt = extname(file.originalname); // 🔍 Fayl kengaytmasini olish

  // 3️⃣ Yangi nom bilan qaytaramiz
  callback(null, `${file.fieldname}-${uniqueSuffix}${fileExt}`);
};