import { createFeatureSelector } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';

import { RouterStateUrl } from './router.state';

export const selectRouterState =
    createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');
