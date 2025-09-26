'use client';

import {
  ConnectionRequestsWithLikesReturnType,
  getConnectionRequestsWithLikes,
} from '@/lib/get-connection-details-with-likes';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

type SwapUnswapContextType = {
  isOpenSwapModal: boolean;
  setIsOpenSwapModal: Dispatch<SetStateAction<boolean>>;
  onToggleSwapModal: () => void;
  isOpenUnSwapModal: boolean;
  setIsOpenUnSwapModal: Dispatch<SetStateAction<boolean>>;
  onToggleUnSwapModal: () => void;
  isFeedbackModalOpen: boolean;
  setIsFeedbackModalOpen: Dispatch<SetStateAction<boolean>>;
  onToggleFeedbackModal: () => void;
  data: ConnectionRequestsWithLikesReturnType | undefined;
  isLoading: boolean;
};

const SwapUnwsapContext = createContext({} as SwapUnswapContextType);

export default function SwapUnswapContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpenSwapModal, setIsOpenSwapModal] = useState<boolean>(false);
  const [isOpenUnSwapModal, setIsOpenUnSwapModal] = useState<boolean>(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] =
    useState<boolean>(false);
  const [data, setData] = useState<ConnectionRequestsWithLikesReturnType>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  function toggleSwapModal() {
    setIsOpenSwapModal((prev) => !prev);
  }

  function toggleUnSwapModal() {
    setIsOpenUnSwapModal((prev) => !prev);
  }

  function toggleFeedbackModal() {
    setIsFeedbackModalOpen((prev) => !prev);
  }

  useEffect(() => {
    async function getData() {
      const result = await getConnectionRequestsWithLikes();
      setData(result);
      setIsLoading(false);
    }
    getData();
  }, []);

  return (
    <SwapUnwsapContext.Provider
      value={{
        isOpenSwapModal,
        setIsOpenSwapModal,
        onToggleSwapModal: toggleSwapModal,
        isOpenUnSwapModal,
        setIsOpenUnSwapModal,
        onToggleUnSwapModal: toggleUnSwapModal,
        isFeedbackModalOpen,
        setIsFeedbackModalOpen,
        onToggleFeedbackModal: toggleFeedbackModal,
        data,
        isLoading,
      }}>
      {children}
    </SwapUnwsapContext.Provider>
  );
}

// custom hook for using the context
export function useSwapUnswapContext() {
  const context = useContext(SwapUnwsapContext);
  if (context === undefined) {
    throw new Error(
      'useSwapUnsapContext must be used within a SwapUnsapContextProvider'
    );
  }
  return context;
}
