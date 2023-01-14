import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

import { TOKYO } from "./constants";

admin.initializeApp();
const FV = admin.firestore.FieldValue;

export const onBoardDelete = functions
  .region(TOKYO)
  .runWith({ timeoutSeconds: 10 })
  .firestore.document("/boards/{boardId}")
  .onDelete((snapshot, context) => {
    const { boardId } = context.params;

    functions.logger.log(`Removing all asset for board [${boardId}]`);
    return admin
      .storage()
      .bucket()
      .deleteFiles({ prefix: `boards/${boardId}` });
  });

export const onPostCreate = functions
  .region(TOKYO)
  .runWith({ timeoutSeconds: 10 })
  .firestore.document("/boards/{boardId}/posts/{postId}")
  .onCreate((snapshot, context) => {
    const data = snapshot.data();
    const { boardId, postId } = context.params;

    functions.logger.log(`Copying post [${postId}] to board [${boardId}]`);
    return admin
      .firestore()
      .collection("boards")
      .doc(boardId)
      .set({ posts: { [postId]: data } }, { merge: true });
  });

export const onPostUpdate = functions
  .region(TOKYO)
  .runWith({ timeoutSeconds: 10 })
  .firestore.document("/boards/{boardId}/posts/{postId}")
  .onUpdate((snapshot, context) => {
    const data = snapshot.after.data();
    const { boardId, postId } = context.params;

    functions.logger.log(`Copying post [${postId}] to board [${boardId}]`);
    return admin
      .firestore()
      .collection("boards")
      .doc(boardId)
      .set({ posts: { [postId]: data } }, { merge: true });
  });

export const onPostDelete = functions
  .region(TOKYO)
  .runWith({ timeoutSeconds: 10 })
  .firestore.document("/boards/{boardId}/posts/{postId}")
  .onDelete((snapshot, context) => {
    const { boardId, postId } = context.params;

    functions.logger.log(`Removing all assets for post [${postId}]`);
    admin
      .storage()
      .bucket()
      .deleteFiles({ prefix: `boards/${boardId}/${postId}` });

    functions.logger.log(`Removing post [${postId}] from board [${boardId}]`);
    return admin
      .firestore()
      .collection("boards")
      .doc(boardId)
      .set({ posts: { [postId]: FV.delete() } }, { merge: true });
  });
