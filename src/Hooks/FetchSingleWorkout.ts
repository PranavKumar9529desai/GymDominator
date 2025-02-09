import {
  type ExerciseWithMuscle,
  SingleWorkoutSelectorsFamily,
} from '@state/Selectors/SingleWorkoutSelectorsFamily';
import { useEffect, useState } from 'react';
import { type Loadable, useRecoilValueLoadable } from 'recoil';

interface FetchSingleWorkoutResult {
  isLoading: boolean;
  exercise: ExerciseWithMuscle | null;
  error: Error | null;
}

interface FetchSingleWorkoutParams {
  workoutname: string;
  muscle: string;
}

export const FetchSingleWorkout = ({
  workoutname,
  muscle,
}: FetchSingleWorkoutParams): FetchSingleWorkoutResult => {
  const exerciseLoadable: Loadable<ExerciseWithMuscle[] | null> = useRecoilValueLoadable(
    SingleWorkoutSelectorsFamily(`${muscle}|${workoutname}`)
  );

  const [state, setState] = useState<FetchSingleWorkoutResult>({
    isLoading: true,
    exercise: null,
    error: null,
  });

  useEffect(() => {
    switch (exerciseLoadable.state) {
      case 'hasValue':
        if (!exerciseLoadable.contents || exerciseLoadable.contents.length === 0) {
          setState({
            isLoading: false,
            exercise: null,
            error: new Error('Exercise not found'),
          });
        } else {
          setState({
            isLoading: false,
            exercise: exerciseLoadable.contents[0],
            error: null,
          });
        }
        break;
      case 'loading':
        setState((prev) => ({ ...prev, isLoading: true, error: null }));
        break;
      case 'hasError':
        setState({
          isLoading: false,
          exercise: null,
          error: exerciseLoadable.contents,
        });
        break;
    }
  }, [exerciseLoadable]);

  return state;
};
