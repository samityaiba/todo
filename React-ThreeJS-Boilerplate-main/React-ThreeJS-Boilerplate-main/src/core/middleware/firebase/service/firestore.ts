import { FirebaseApp } from 'firebase/app';
import {
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  getFirestore,
} from 'firebase/firestore';

let firestore: Firestore | undefined;

/**
 * ต้องเรียกฟังก์ชันนี้ 1 ครั้งหลังจาก initialize FirebaseApp แล้วเท่านั้น
 */
export const FirestoreInit = (app: FirebaseApp) => {
  console.log('Init Firestore Service');
  firestore = getFirestore(app, '(default)');
};

/**
 * ใช้สำหรับดึง Firestore instance ที่ถูก initialize แล้ว
 */
export const GetFirestore = (): Firestore => {
  if (!firestore) {
    throw new Error('Firestore has not been initialized. Call FirestoreInit(app) first.');
  }
  return firestore;
};
