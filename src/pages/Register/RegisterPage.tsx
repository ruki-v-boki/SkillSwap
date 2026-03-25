// import { selectCurrentUser } from '@/services/slices/userSlice';
import { StepsCounter } from '@/components/features/StepsCounter';
import type { TCity, WantToLearnSkill } from '@/types/types';
import schoolBoardIcon from '@/assets/icons/schoolBoard.svg';
import { useDispatch, useSelector } from '@/services/store';
import userInfoIcon from '@/assets/icons/userInfo.svg';
import { FormHintUI } from '@/components/ui/FormHint';
import lampIcon from '@/assets/icons/light-bulb.svg';
import { Step1Form } from './steps/step1/Step1Form';
import { Step2Form } from './steps/step2/Step2Form';
import { Loader } from '@/components/ui/Loader';
// import { useNavigate } from 'react-router-dom';
import styles from './RegisterPage.module.css';
import type { TGender } from '@/types/types';
import { Step3Form } from './steps/step3';
import { useEffect, useState } from 'react';
import {
  selectRegisterIsLoading,
  selectRegisterError,
  selectRegisterStep1,
  selectRegisterStep2,
  selectRegisterStep3,
  selectCurrentStep,
  setCurrentStep,
  registerUser,
  updateStep1,
  updateStep2,
  updateStep3,
  nextStep,
  prevStep
} from '@/services/slices/registerSlice';
import { ModalUI } from '@/components/ui/Modal';
import { UserOfferModal } from '@/components/ui/Modal/UserOfferModal';
import type { RegisterData } from '@/types/auth';
// import { selectUserId } from '@/services/slices/authSlice';

// ---------------------------------------------------------------

const STEP_HINTS = {
  1: {
    image: lampIcon,
    title: 'Добро пожаловать в SkillSwap!',
    text: 'Присоединяйтесь к SkillSwap и обменивайтесь знаниями и навыками с другими людьми'
  },
  2: {
    image: userInfoIcon,
    title: 'Расскажите немного о себе',
    text: 'Это поможет другим людям лучше вас узнать, чтобы выбрать для обмена'
  },
  3: {
    image: schoolBoardIcon,
    title: 'Укажите, чем вы готовы поделиться',
    text: 'Так другие люди смогут увидеть ваши предложения и предложить вам обмен!'
  }
};

// ---------------------------------------------------------------

export function RegisterPage() {

  const dispatch = useDispatch();
  const currentStep = useSelector(selectCurrentStep);
  const step1Data = useSelector(selectRegisterStep1);
  const step2Data = useSelector(selectRegisterStep2);
  const step3Data = useSelector(selectRegisterStep3);
  const isLoading = useSelector(selectRegisterIsLoading);
  const error = useSelector(selectRegisterError);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewData, setPreviewData] = useState<RegisterData | null>(null);
  // const authUser = useSelector(selectCurrentUser);
  // const userId = useSelector(selectUserId);
  // const navigate = useNavigate();

// ---------------------------------------------------------------

  useEffect(() => {
    dispatch(setCurrentStep(1));
  }, [dispatch]);

// ---------------------------------------------------------------

  // useEffect(() => {
  //   if (!isLoading && !error && userId) {
  //     navigate(`/offer/${userId}/modal`, {
  //       state: { background: location.pathname }
  //     });
  //   }
  // }, [isLoading, error, userId, navigate]);

// ---------------------------------------------------------------

  const handleStep1Submit = (data: {
    email: string;
    password: string
  }) => {
    dispatch(updateStep1(data));
    dispatch(nextStep());
  };

// ---------------------------------------------------------------

  const handleStep2Submit = (data: {
    avatar?: { file: File; preview: string } | null;
    name: string;
    age: number;
    gender: TGender;
    location: TCity;
    about: string;
    wantToLearn: Omit<WantToLearnSkill, 'id'>[];
  }) => {
    dispatch(updateStep2(data));
    dispatch(nextStep());
  };

// ---------------------------------------------------------------

  const handleStep3Submit = (data: {
    customName: string;
    categoryId: string;
    subcategoryId: string;
    description: string;
    images: File[];
  }) => {
    dispatch(updateStep3(data));
    // Собираем previewData из существующих данных
    const preview: RegisterData = {
      email: step1Data.email,
      password: step1Data.password,
      name: step2Data.name,
      location: step2Data.location,
      age: step2Data.age,
      about: step2Data.about,
      gender: step2Data.gender,
      avatar: step2Data.avatar,
      canTeach: {
        categoryId: data.categoryId,
        subcategoryId: data.subcategoryId,
        customName: data.customName,
        description: data.description,
        images: data.images,  // ← File[]
      },
      wantToLearn: step2Data.wantToLearn,
    };

    setPreviewData(preview);
    setIsModalOpen(true);
  };

// ---------------------------------------------------------------

  const handleBack = () => {
    dispatch(prevStep());
  };

// ---------------------------------------------------------------

  const handleEdit = () => {
    // Закрываем модалку
    setIsModalOpen(false);
    // Возвращаемся на шаг 3 (данные уже в store)
    // dispatch(setCurrentStep(3)); // если нужно принудительно установить шаг
  };

  const handleConfirm = () => {
    // Реальная регистрация с теми же данными
    dispatch(registerUser());
    setIsModalOpen(false);
  };
// ---------------------------------------------------------------

  if (isLoading) {
    return (
      <>
        <Loader />
        <div className={styles.loader}>Отправка данных...</div>
      </>
    );
  }

  if (error) {
    return <div className={styles.error}>Ошибка: {error}</div>;
  }

// ---------------------------------------------------------------

  return (
    <div className={styles.registerPage}>
      <StepsCounter currentStep={currentStep} allSteps={3} />

      <main className={styles.registerPageMain}>
        <div className={styles.pageFormContainer}>
          {currentStep === 1 && (
            <Step1Form
              initialData={step1Data}
              onSubmit={handleStep1Submit}
            />
          )}
          {currentStep === 2 && (
            <Step2Form
              initialData={step2Data}
              onSubmit={handleStep2Submit}
              onBack={handleBack}
            />
          )}
          {currentStep === 3 && (
            <Step3Form
              initialData={step3Data}
              onSubmit={handleStep3Submit}
              onBack={handleBack}
            />
          )}
        </div>

        <FormHintUI
          image={STEP_HINTS[currentStep as keyof typeof STEP_HINTS].image}
          title={STEP_HINTS[currentStep as keyof typeof STEP_HINTS].title}
          text={STEP_HINTS[currentStep as keyof typeof STEP_HINTS].text}
        />
        {isModalOpen && previewData && (
          <ModalUI onClose={() => setIsModalOpen(false)}>
            <UserOfferModal
              previewData={previewData}
              onConfirm={handleConfirm}
              onEdit={handleEdit}
            />
          </ModalUI>
        )}
      </main>
    </div>
  );
}