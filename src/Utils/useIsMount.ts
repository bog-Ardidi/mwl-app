/* A custom hook that tracks if a given component
   is mounted or not. Returns false on first mount and 
   true on every mount after that.
*/
import { useRef, useEffect } from "react";

export const useDidMount = () => {
  const didMountRef = useRef(false);
  useEffect(() => {
    didMountRef.current = true;
  }, []);
  return didMountRef.current;
};
