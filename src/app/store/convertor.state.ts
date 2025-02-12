export interface ConvertorState {
    rate: number;
    fixedRate: number | null;
    history: { from: number, to: number, amount: number, converted: number, rate: number, fixed: number | null }[];
}

export const initialConvertorState: ConvertorState = {
    rate: 1.1,
    fixedRate: null,
    history: []
}