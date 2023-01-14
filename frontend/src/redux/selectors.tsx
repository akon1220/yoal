import { FirebaseReducer, FirestoreReducer } from "react-redux-firebase";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { Template as TemplateType } from "src/types";

type RootStateType = {
  firebase: FirebaseReducer.Reducer;
  firestore: FirestoreReducer.Reducer;
};

const firestoreDataSelector = (state: RootStateType) => state.firestore.data;

const firestoreOrderedSelector = (state: RootStateType) =>
  state.firestore.ordered;

export const useAuthSelector = () => {
  return useSelector<RootStateType, any>((state) => state.firebase.auth);
};

export const useProfileSelector = (userId: string) => {
  return useSelector<RootStateType, any>((state) => state.firebase.profile);
};

export const useBoardSelector = (boardId: string) => {
  useFirestoreConnect([
    {
      collection: "boards",
      doc: boardId,
    },
  ]);

  return useSelector(
    createSelector(firestoreDataSelector, (data) => {
      return data?.boards?.[boardId];
    })
  );
};

export const useOwnBoardsSelector = (userId: string) => {
  useFirestoreConnect([
    {
      collection: "boards",
      where: [["author", "==", userId]],
    },
  ]);

  return useSelector(
    createSelector(firestoreOrderedSelector, (data) => {
      return data?.boards;
    })
  );
};

export const usePostSelector = (boardId: string, postId: string) => {
  useFirestoreConnect([
    {
      collection: "boards",
      doc: boardId,
      subcollections: [
        {
          collection: "posts",
          doc: postId,
        },
      ],
      storeAs: "post",
    },
  ]);

  return useSelector(
    createSelector(firestoreDataSelector, (data) => {
      return data?.post;
    })
  );
};

export const useTemplateSelector = (templateId: string) => {
  useFirestoreConnect([
    {
      collection: "templates",
      doc: templateId,
    },
  ]);

  return useSelector(
    createSelector(firestoreDataSelector, (data) => {
      const template = data?.templates?.[templateId] as TemplateType;
      return template;
    })
  );
};

export const useAllTemplateSelector = () => {
  useFirestoreConnect([
    {
      collection: "templates",
      where: [["isPublished", "==", true]],
      storeAs: "allTemplates",
    },
  ]);

  return useSelector(
    createSelector(firestoreOrderedSelector, (data) => {
      return data?.allTemplates;
    })
  );
};
