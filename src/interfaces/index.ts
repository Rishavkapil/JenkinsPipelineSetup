import { reducers } from "@/lib/redux/Reducers/reducers";


export type SectionName = Array<Record<string, string>>[number]["name"];

export type TRootReducer = ReturnType<typeof reducers>;
