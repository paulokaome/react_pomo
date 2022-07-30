import { zodResolver } from "@hookform/resolvers/zod";
import { HandPalm, Play } from "phosphor-react";
import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as zod from "zod";
import { CyclesContext } from "../../context/CycleContext";
import { CountDown } from "./components/CountDown";
import { CycleForm } from "./components/CycleForm";
import { HomeContainer, StartCountButton, StopCountdownButton } from "./styles";

const newCycloFormSchema = zod.object({
  task: zod.string().min(1, "Informe a Tarefa"),
  totalMinutes: zod.number().min(5).max(60),
});

type NewCylceFormData = zod.infer<typeof newCycloFormSchema>;

export function Home() {
  const { createNewCycle, activeCycle, interruptCurrentCycle } =
    useContext(CyclesContext);

  const newCycleForm = useForm<NewCylceFormData>({
    resolver: zodResolver(newCycloFormSchema),
    defaultValues: {
      task: "",
      totalMinutes: 0,
    },
  });

  const { watch, handleSubmit } = newCycleForm;

  const observableTask = watch("task");
  const isSubmitDisabled = !observableTask;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(createNewCycle)}>
        <FormProvider {...newCycleForm}>
          <CycleForm />
        </FormProvider>

        <CountDown />

        {activeCycle ? (
          <StopCountdownButton onClick={interruptCurrentCycle}>
            <HandPalm size={24} />
            Pausar
          </StopCountdownButton>
        ) : (
          <StartCountButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountButton>
        )}
      </form>
    </HomeContainer>
  );
}
