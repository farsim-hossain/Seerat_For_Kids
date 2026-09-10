'use client';

import { useState } from 'react';
import { X, HelpCircle, CheckCircle2, AlertCircle, Award, RotateCcw } from 'lucide-react';
import { CHAPTER_1_DATA, QuizQuestion } from '../data/chapter1Data';
import confetti from 'canvas-confetti';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQuizCompleted: (score: number) => void;
  lang: 'bn' | 'en';
}

export default function QuizModal({
  isOpen,
  onClose,
  onQuizCompleted,
  lang,
}: QuizModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isOpen) return null;

  const isBn = lang === 'bn';
  const currentQ: QuizQuestion = CHAPTER_1_DATA.quizzes[currentIndex];
  const isLastQuestion = currentIndex === CHAPTER_1_DATA.quizzes.length - 1;

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
  };

  const handleConfirmAnswer = () => {
    if (selectedOption === null) return;

    setIsAnswerSubmitted(true);
    const isCorrect = selectedOption === currentQ.correctIndex;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      setIsCompleted(true);
      onQuizCompleted(score);
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 },
      });
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-amber-50 to-orange-50 border-4 border-amber-500 rounded-3xl p-6 shadow-2xl text-slate-800">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-amber-200 hover:bg-amber-300 text-amber-900 rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>

        {!isCompleted ? (
          <div>
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-amber-600 text-white rounded-xl shadow">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-amber-950 font-bengali">
                  {isBn ? 'জ্ঞান যাচাই ও চ্যালেঞ্জ' : 'Knowledge Checkpoint Quiz'}
                </h2>
                <div className="text-xs font-semibold text-amber-700 uppercase tracking-wide">
                  {isBn
                    ? `প্রশ্ন ${currentIndex + 1} / ${CHAPTER_1_DATA.quizzes.length}`
                    : `Question ${currentIndex + 1} of ${CHAPTER_1_DATA.quizzes.length}`}
                </div>
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-white/90 border border-amber-200 p-4 rounded-2xl shadow-sm mb-4">
              <h3 className="text-base font-bold text-slate-900 leading-relaxed font-bengali">
                {isBn ? currentQ.questionBn : currentQ.questionEn}
              </h3>
            </div>

            {/* Options List */}
            <div className="space-y-2.5 mb-5">
              {(isBn ? currentQ.optionsBn : currentQ.optionsEn).map((opt, idx) => {
                let btnStyle = 'bg-white/90 border-amber-200 text-slate-800 hover:bg-amber-100/70';

                if (selectedOption === idx) {
                  btnStyle = 'bg-amber-200 border-amber-500 text-amber-950 font-bold';
                }

                if (isAnswerSubmitted) {
                  if (idx === currentQ.correctIndex) {
                    btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold';
                  } else if (selectedOption === idx) {
                    btnStyle = 'bg-rose-100 border-rose-400 text-rose-950 font-bold';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isAnswerSubmitted}
                    className={`w-full text-left p-3 rounded-xl border-2 transition flex items-center justify-between text-sm ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {isAnswerSubmitted && idx === currentQ.correctIndex && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    )}
                    {isAnswerSubmitted && selectedOption === idx && idx !== currentQ.correctIndex && (
                      <AlertCircle className="w-5 h-5 text-rose-500" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback / Explanation */}
            {isAnswerSubmitted && (
              <div className="bg-amber-100/90 border border-amber-300 p-3 rounded-xl mb-4 text-xs leading-relaxed text-amber-950">
                <span className="font-bold">{isBn ? 'ব্যাখ্যা: ' : 'Context & Explanation: '}</span>
                {isBn ? currentQ.explanationBn : currentQ.explanationEn}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              {!isAnswerSubmitted ? (
                <button
                  onClick={handleConfirmAnswer}
                  disabled={selectedOption === null}
                  className={`px-5 py-2.5 rounded-xl font-bold text-sm shadow transition ${
                    selectedOption !== null
                      ? 'bg-amber-600 hover:bg-amber-700 text-white'
                      : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  {isBn ? 'উত্তর নিশ্চিত করো' : 'Confirm Answer'}
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow transition"
                >
                  {isLastQuestion
                    ? isBn
                      ? 'ফলাফল দেখো →'
                      : 'View Results →'
                    : isBn
                    ? 'পরবর্তী প্রশ্ন →'
                    : 'Next Question →'}
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Completion Screen */
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-amber-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-bounce">
              <Award className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-amber-950 font-bengali mb-1">
              {isBn ? 'মাশাআল্লাহ! তুমি কুইজ সম্পন্ন করেছ!' : 'Masha Allah! Quiz Completed!'}
            </h3>
            <p className="text-sm text-slate-600 mb-6">
              {isBn
                ? `তুমি ${CHAPTER_1_DATA.quizzes.length} টির মধ্যে ${score} টি সঠিক উত্তর দিয়েছ।`
                : `You scored ${score} out of ${CHAPTER_1_DATA.quizzes.length} correct.`}
            </p>

            <div className="bg-white/90 border border-amber-200 p-4 rounded-2xl max-w-xs mx-auto mb-6 shadow-sm">
              <div className="text-xs text-amber-800 font-bold uppercase">
                {isBn ? 'তোমার অর্জিত স্কোর' : 'Knowledge Mastery'}
              </div>
              <div className="text-4xl font-black text-amber-600 my-1">
                {Math.round((score / CHAPTER_1_DATA.quizzes.length) * 100)}%
              </div>
              <div className="text-xs text-slate-500">
                {isBn ? 'সীরাহ জার্নালে স্কোর যুক্ত হয়েছে' : 'Score added to your Seerah Journal'}
              </div>
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={handleRestart}
                className="flex items-center gap-2 px-4 py-2 border border-amber-400 text-amber-900 rounded-xl font-bold text-sm hover:bg-amber-100 transition"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{isBn ? 'পুনরায় চেষ্টা' : 'Retry'}</span>
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow transition"
              >
                {isBn ? 'জার্নালে ফিরে যাও' : 'Return to Journal'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
