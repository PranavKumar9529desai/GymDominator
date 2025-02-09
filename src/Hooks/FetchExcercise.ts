import {
  type ExerciseWithMuscle,
  SingleWorkoutSelectorsFamily,
} from '@state/Selectors/SingleWorkoutSelectorsFamily';
import { useEffect, useState } from 'react';
import { type Loadable, useRecoilValueLoadable } from 'recoil';

interface FetchExerciseResult {
  isLoading: boolean;
  Excercise: ExerciseWithMuscle[];
}

export const FetchExcercise = ({ muscle }: { muscle: string }): FetchExerciseResult => {
  const exercisesLoadable: Loadable<ExerciseWithMuscle[] | null> = useRecoilValueLoadable(
    SingleWorkoutSelectorsFamily(muscle)
  );

  const [state, setState] = useState<FetchExerciseResult>({
    isLoading: true,
    Excercise: [],
  });

  useEffect(() => {
    switch (exercisesLoadable.state) {
      case 'hasValue':
        setState({
          isLoading: false,
          Excercise: exercisesLoadable.contents || [],
        });
        break;
      case 'loading':
        setState((prev) => ({ ...prev, isLoading: true }));
        break;
      case 'hasError':
        console.error('Error loading exercises:', exercisesLoadable.contents);
        setState({
          isLoading: false,
          Excercise: [],
        });
        break;
    }
  }, [exercisesLoadable]);

  return state;
};
