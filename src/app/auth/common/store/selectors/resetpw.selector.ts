import { createFeatureSelector, createSelector } from "@ngrx/store";
import { User } from "../../models/user";

export const identityFeatureSelector = createFeatureSelector<User>('identity');

export const isSubmittingSelector = createSelector(
    identityFeatureSelector,
    (identityState: User) => identityState["isSubmitting"]
  );