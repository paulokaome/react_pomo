import { Cycle } from "./reducers";


export enum ActionType {
  CREATE_NEW_CYCLE = "CREATE_NEW_CYCLE",
  FINISH_ACTUAL_CYCLE = "FINISH_ACTUAL_CYCLE",
  INTERRUPT_CYCLE = "INTERRUPT_CYCLE",
}

export function addNewCycleAction(newCycle: Cycle) {
  return {
    type: ActionType.CREATE_NEW_CYCLE,
    payload: { newCycle },
  };
}

export function markCurrentCycleAsFinishAction() {
  return {
    type: ActionType.FINISH_ACTUAL_CYCLE,
  };
}

export function markInterruptCycleAction() {
  return {
    type: ActionType.INTERRUPT_CYCLE,
  };
}
