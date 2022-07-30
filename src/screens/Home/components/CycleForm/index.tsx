import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { CyclesContext } from "../../../../context/CycleContext";

import { FormContainer, MinutesInput, TaskInput } from "./styles";

export function CycleForm() {
  const { activeCycle } = useContext(CyclesContext);
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="task">Vou Trabalhar em </label>
      <TaskInput
        type="text"
        id="task"
        placeholder="Nome da tarefa"
        list="taskSugestion"
        {...register("task")}
        disabled={!!activeCycle}
      />

      <datalist id="taskSugestion">
        <option value="projeto 1" />
        <option value="projeto 2" />
        <option value="projeto 3" />
      </datalist>

      <label htmlFor="howMinutes">Durante</label>
      <MinutesInput
        type="number"
        id="howMinutes"
        placeholder="00"
        step={5}
        min={5}
        max={60}
        disabled={!!activeCycle}
        {...register("totalMinutes", { valueAsNumber: true })}
      />

      <span>minutos</span>
    </FormContainer>
  );
}
