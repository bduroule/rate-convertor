import { Injectable } from "@angular/core";
import { createEffect } from "@ngrx/effects";
import { interval, map } from "rxjs";
import { updateRate } from "./convertor.action.";

@Injectable()
export class ConvertorEffects {
    $updateRate = createEffect(() => 
        interval(3000).pipe(
            map(() => ({change: Math.random() * 0.1 - 0.05})),
            map(change => updateRate({ change: change.change }))
        )
    )
}