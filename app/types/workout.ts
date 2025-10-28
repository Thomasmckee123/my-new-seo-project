/**
 * TypeScript type definitions for workout tracking functionality
 * Defines all data structures for exercise logging, workout management, and progress tracking
 */

/**
 * Categories of exercises for organization and filtering
 */
export type ExerciseCategory = 
  | 'chest'
  | 'back'
  | 'shoulders'
  | 'arms'
  | 'legs'
  | 'core'
  | 'cardio'
  | 'full-body'
  | 'stretching'
  | 'powerlifting'
  | 'bodyweight';

/**
 * Types of exercise measurements
 */
export type ExerciseType = 
  | 'strength'     // Weight-based exercises with sets/reps
  | 'cardio'       // Time/distance-based exercises
  | 'bodyweight'   // Bodyweight exercises with reps only
  | 'time'         // Time-based exercises (planks, etc.)
  | 'distance';    // Distance-based exercises (running, cycling)

/**
 * Represents a single exercise definition
 * Contains metadata about an exercise type
 */
export interface Exercise {
  /** Unique identifier for the exercise */
  id: string;
  /** Display name of the exercise */
  name: string;
  /** Exercise category for filtering */
  category: ExerciseCategory;
  /** Type of exercise for appropriate input fields */
  type: ExerciseType;
  /** Optional description or instructions */
  description?: string;
  /** Primary muscles worked */
  primaryMuscles: string[];
  /** Secondary muscles worked */
  secondaryMuscles?: string[];
  /** Equipment needed */
  equipment?: string[];
  /** Difficulty level (1-5) */
  difficulty?: number;
  /** Instructions for proper form */
  instructions?: string[];
}

/**
 * Represents a single set of an exercise
 * Used for strength training exercises
 */
export interface ExerciseSet {
  /** Set number within the exercise */
  setNumber: number;
  /** Number of repetitions performed */
  reps: number;
  /** Weight used in kg or lbs */
  weight?: number;
  /** Rest time after this set in seconds */
  restTime?: number;
  /** RPE (Rate of Perceived Exertion) 1-10 */
  rpe?: number;
  /** Whether this set was completed */
  completed: boolean;
  /** Optional notes for this set */
  notes?: string;
}

/**
 * Represents cardio exercise data
 * Used for time and distance-based exercises
 */
export interface CardioData {
  /** Duration in minutes */
  duration: number;
  /** Distance covered (km or miles) */
  distance?: number;
  /** Average heart rate */
  avgHeartRate?: number;
  /** Maximum heart rate */
  maxHeartRate?: number;
  /** Calories burned */
  calories?: number;
  /** Average pace (minutes per km/mile) */
  avgPace?: number;
  /** Exercise intensity level (1-10) */
  intensity?: number;
}

/**
 * Represents time-based exercise data
 * Used for planks, holds, etc.
 */
export interface TimeBasedData {
  /** Duration in seconds */
  duration: number;
  /** Number of sets/rounds */
  sets?: number;
  /** Rest between sets in seconds */
  restBetweenSets?: number;
}

/**
 * Represents a logged exercise within a workout
 * Contains the exercise reference and performance data
 */
export interface WorkoutExercise {
  /** Unique identifier for this exercise log */
  id: string;
  /** Reference to the exercise definition */
  exercise: Exercise;
  /** Sets performed (for strength exercises) */
  sets?: ExerciseSet[];
  /** Cardio data (for cardio exercises) */
  cardioData?: CardioData;
  /** Time-based data (for time-based exercises) */
  timeBasedData?: TimeBasedData;
  /** Overall notes for this exercise */
  notes?: string;
  /** Order of this exercise in the workout */
  order: number;
  /** Whether this exercise was completed */
  completed: boolean;
}

/**
 * Represents a complete workout session
 * Contains all exercises performed and metadata
 */
export interface Workout {
  /** Unique identifier for the workout */
  id: string;
  /** Workout name/title */
  name: string;
  /** Date and time the workout was performed */
  date: string; // ISO date string
  /** Duration of the workout in minutes */
  duration?: number;
  /** All exercises performed in this workout */
  exercises: WorkoutExercise[];
  /** Overall workout notes */
  notes?: string;
  /** Workout template used (if any) */
  templateId?: string;
  /** Body weight at time of workout */
  bodyWeight?: number;
  /** Energy level before workout (1-10) */
  energyLevel?: number;
  /** Overall workout rating (1-10) */
  rating?: number;
  /** Tags for categorizing workouts */
  tags?: string[];
  /** Whether the workout was completed */
  completed: boolean;
  /** Location where workout was performed */
  location?: string;
}

/**
 * Represents a workout template for repeated use
 * Used to quickly start common workout routines
 */
export interface WorkoutTemplate {
  /** Unique identifier for the template */
  id: string;
  /** Template name */
  name: string;
  /** Template description */
  description?: string;
  /** Exercises included in this template */
  exercises: Omit<WorkoutExercise, 'id' | 'completed'>[];
  /** Category/type of workout */
  category: string;
  /** Estimated duration in minutes */
  estimatedDuration?: number;
  /** Difficulty level (1-5) */
  difficulty?: number;
  /** Target muscle groups */
  targetMuscles: string[];
  /** Equipment required */
  equipment: string[];
  /** Times this template has been used */
  usageCount?: number;
  /** Whether this is a user-created or system template */
  isCustom: boolean;
}

/**
 * Progress tracking data for exercises
 * Used to show improvement over time
 */
export interface ExerciseProgress {
  /** Exercise identifier */
  exerciseId: string;
  /** Date of the record */
  date: string;
  /** Best set performance */
  bestSet?: {
    weight: number;
    reps: number;
    oneRepMax?: number;
  };
  /** Total volume (weight × reps) */
  totalVolume?: number;
  /** Best cardio performance */
  bestCardio?: {
    distance?: number;
    duration: number;
    pace?: number;
  };
}

/**
 * Overall progress summary
 * Aggregated data for dashboard display
 */
export interface ProgressSummary {
  /** Total workouts completed */
  totalWorkouts: number;
  /** Total time spent working out (hours) */
  totalTime: number;
  /** Current workout streak (days) */
  currentStreak: number;
  /** Longest workout streak (days) */
  longestStreak: number;
  /** Average workouts per week */
  avgWorkoutsPerWeek: number;
  /** Most worked muscle groups */
  topMuscleGroups: { muscle: string; count: number }[];
  /** Favorite exercises */
  favoriteExercises: { exerciseId: string; count: number }[];
  /** Progress trends */
  trends: {
    /** Weight progression */
    weight?: { exercise: string; improvement: number }[];
    /** Cardio improvements */
    cardio?: { exercise: string; improvement: number }[];
  };
}

/**
 * Calendar view data for workout scheduling
 * Used to display workouts in calendar format
 */
export interface WorkoutCalendarDay {
  /** Date in YYYY-MM-DD format */
  date: string;
  /** Workouts on this day */
  workouts: Pick<Workout, 'id' | 'name' | 'duration' | 'completed'>[];
  /** Whether this day has any workouts */
  hasWorkout: boolean;
  /** Planned vs completed indicator */
  status: 'completed' | 'planned' | 'missed' | 'rest';
}

/**
 * Workout statistics for analytics
 * Used for generating insights and reports
 */
export interface WorkoutStats {
  /** Date range for these stats */
  period: {
    start: string;
    end: string;
  };
  /** Number of workouts in period */
  workoutCount: number;
  /** Total time spent exercising */
  totalTime: number;
  /** Average workout duration */
  avgDuration: number;
  /** Most active day of week */
  mostActiveDay: string;
  /** Exercise breakdown by category */
  exerciseBreakdown: { category: ExerciseCategory; count: number }[];
  /** Volume progression */
  volumeProgression: { date: string; volume: number }[];
}