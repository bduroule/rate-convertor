import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { ConvertorState } from "./convertor.state";

export const selectConvertor = (state: AppState) => state.convertor;

export const selectConvertorRate = createSelector(
    selectConvertor,
    (state: ConvertorState) => state.rate
)

export const selectConvertorFixedRate = createSelector(
    selectConvertor,
    (state: ConvertorState) => state.fixedRate
)

export const selectConvertorHistory = createSelector(
    selectConvertor,
    (state: ConvertorState) => state.history
)