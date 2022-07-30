import { createContext, ReactNode, useState } from "react";

interface Cycle {
  id: string;
  task: string;
  minutes: number;
  startDate: Date;
  interruptedDate?: Date;
  finishDate?: Date;
}

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
}

interface CycleContextProviderProps {
  children: ReactNode;
}

export const CyclesContext = createContext({} as CycleContextData);

export function CyclesContextProvider({ children }: CycleContextProviderProps) {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function markActualCycleFinish() {
    setCycles((old) =>
      old.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishDate: new Date() };
        } else {
          return cycle;
        }
      })
    );
  }

  function createNewCycle(form: CreateCycleData) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: form.task,
      minutes: form.totalMinutes,
      startDate: new Date(),
    };

    setCycles((old) => [...old, newCycle]);
    setActiveCycleId(id);
    setAmountSecondsPassed(0);
    // reset();
  }

  function interruptCurrentCycle() {
    setActiveCycleId(null);

    setCycles((old) =>
      old.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() };
        } else {
          return cycle;
        }
      })
    );
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
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}
