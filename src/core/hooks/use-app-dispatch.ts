import {useDispatch} from "react-redux";
import {AppDispatch} from "@/core/stores/store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()