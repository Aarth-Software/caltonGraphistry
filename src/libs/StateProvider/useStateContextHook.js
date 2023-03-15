import { useContext } from "react";
import { StateContext } from "./StateProvider";

const useStateContextHook = () => {
  const context = useContext(StateContext);

  return context;
};

export default useStateContextHook;
