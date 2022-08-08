import { differenceInSeconds } from "date-fns";
import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState
} from "react";
import {
  addNewCycleAction,
  markCurrentCycleAsFinishAction,
  markInterruptCycleAction
} from "../reducers/cycles/actions";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducers";

interface CreateCycleData {
  task: string;
  totalMinutes: number;
}

interface CycleContextData {
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  markActualCycleFinish: () => void;
  amountSecondsPassed: number;
  setSecondsPassed: (second: number) => void;
  createNewCycle: (form: CreateCycleData) => void;
  interruptCurrentCycle: () => void;
  cycles: Cycle[];
}

interface CycleContextProviderProps {
  children: ReactNode;
}

const STORAGE_VARIABLE = "@app-react-pomo-1.0.0";

export const CyclesContext = createContext({} as CycleContextData);

export function CyclesContextProvider({ children }: CycleContextProviderProps) {
  const [cycleState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    () => {
      const storageStateAsJson = localStorage.getItem(STORAGE_VARIABLE);

      if (storageStateAsJson) {
        return JSON.parse(storageStateAsJson);
      }
    }
  );

  const { activeCycleId, cycles } = cycleState;
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate));
    }
    return 0;
  });

  useEffect(() => {
    const stateJson = JSON.stringify(cycleState);
    localStorage.setItem(STORAGE_VARIABLE, stateJson);
  }, [cycleState]);

  function createNewCycle(form: CreateCycleData) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: form.task,
      minutes: form.totalMinutes,
      startDate: new Date(),
    };

    dispatch(addNewCycleAction(newCycle));
    setAmountSecondsPassed(0);
  }

  function markActualCycleFinish() {
    dispatch(markCurrentCycleAsFinishAction());
  }

  function interruptCurrentCycle() {
    dispatch(markInterruptCycleAction());
  }

  function setSecondsPassed(second: number) {
    setAmountSecondsPassed(second);
  }

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        markActualCycleFinish,
        amountSecondsPassed,
        setSecondsPassed,
        interruptCurrentCycle,
        createNewCycle,
        cycles,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}
