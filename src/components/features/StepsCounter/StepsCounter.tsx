import styles from './StepsCounter.module.css';
import type { StepsCounterProps } from './type';


export function StepsCounter({
  currentStep,
  allSteps
}: StepsCounterProps) {
  const steps = Array.from({ length: allSteps }, (_, index) => index + 1);

  return (
    <div className={styles.counterBox}>
      <span className={`${styles.text} h-2`}>
        Шаг {currentStep} из {allSteps}
      </span>
      
      <div className={styles.tagsBox}>
        {steps.map((step) => (
          <span
            key={step}
            className={`${styles.tag} ${step <= currentStep ? styles.active : ''}`}
          />
        ))}
      </div>
    </div>
  );
}