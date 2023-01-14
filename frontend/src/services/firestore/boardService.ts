import { useFirestore } from "react-redux-firebase";

import { Board } from "src/types";

export const useBoardService = () => {
  const firestore = useFirestore();

  return {
    createBoard: (board: Board) => {
      return firestore.collection("boards").add(board);
    },

    updateBoard: (boardId: string, board: Board) => {
      return firestore.collection("boards").doc(boardId).update(board);
    },

    updateTo: (boardId: string, to: string) => {
      return firestore.collection("boards").doc(boardId).update({ to });
    },

    updateFrom: (boardId: string, from: string) => {
      return firestore.collection("boards").doc(boardId).update({ from });
    },

    updateTitle: (boardId: string, title: string) => {
      return firestore.collection("boards").doc(boardId).update({ title });
    },

    updateImageURL: (boardId: string, imageURL: string) => {
      return firestore.collection("boards").doc(boardId).update({ imageURL });
    },

    updateBackgroundImage: (template: string, boardId: string) => {
      return firestore.collection("boards").doc(boardId).update({
        template,
      });
    },
  };
};
