import { createAction, props } from "@ngrx/store";

export const updateRate = createAction('[convertor] Update rate', props<{change: number}>());
export const setFixedRate = createAction('[convertor] Set fixed rate', props<{rate: number}>());
export const resetFixedRate = createAction('[convertor] Reset fixed change');
export const setHistory = createAction('[convertor] Set history', props<{value: any}>());