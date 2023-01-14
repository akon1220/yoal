import { useFirestore } from "react-redux-firebase";

import { Post } from "src/types";

export const usePostService = () => {
  const firestore = useFirestore();

  return {
    createPost: (boardId: string, post: Post) => {
      return firestore
        .collection("boards")
        .doc(boardId)
        .collection("posts")
        .add(post);
    },

    updatePost: (boardId: string, postId: string, post: Post) => {
      return firestore
        .collection("boards")
        .doc(boardId)
        .collection("posts")
        .doc(postId)
        .update(post);
    },
  };
};
