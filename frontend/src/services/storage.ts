import { useFirebase } from "react-redux-firebase";

export const useStorageService = () => {
  const storageRef = useFirebase().storage().ref();

  return {
    getDownloadURL: (fullPath: string) => {
      const ref = storageRef.child(fullPath);
      return ref.getDownloadURL();
    },

    uploadBoardImage: (image: File, boardId: string) => {
      const ref = storageRef.child(
        `boards/${boardId}/image.${image.name.split(".").pop()}`
      );
      return ref.put(image);
    },

    uploadPostAvatar: (image: File, boardId: string, postId: string) => {
      const ref = storageRef.child(
        `boards/${boardId}/${postId}/avatar.${image.name.split(".").pop()}`
      );
      return ref.put(image);
    },

    uploadPostImage: (image: File, boardId: string, postId: string) => {
      const ref = storageRef.child(
        `boards/${boardId}/${postId}/image.${image.name.split(".").pop()}`
      );
      return ref.put(image);
    },
  };
};
