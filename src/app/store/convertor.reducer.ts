import { createReducer, on } from "@ngrx/store";
import { ConvertorState, initialConvertorState } from "./convertor.state";
import { resetFixedRate, setFixedRate, setHistory, updateRate } from "./convertor.action.";

export const convertorReducer = createReducer(
    initialConvertorState,
    on(updateRate, (state: ConvertorState, props: { change: number }) => ({
        ...state,
        rate: state.fixedRate ? state.fixedRate : Math.max(0, state.rate + props.change),
        fixedRate: state.rate > 2 ? null : state.fixedRate
    })),
    on(setFixedRate, (state: ConvertorState, props: { rate: number }) => ({ ...state, fixedRate: props.rate })),
    on(resetFixedRate, (state: ConvertorState) => ({ ...state, fixedRate: null })),
    on(setHistory, (state: ConvertorState, props: { value: any }) => ({ 
        ...state,
        history: [props.value, ...state.history.slice(0, 4)]
    }))
)