'use client';


import StartPage from '@/component/page/StartPage';
import QuestionPage from '@/component/page/QuestionPage';
import DisplayResultPage from '@/component/page/DisplayResultPage';
import ResultPage from '@/component/page/ResultPage';
import { useState } from 'react';
import { usePsyStore } from '@/app/store/store'


export default function Croissant() {


 const psyState = usePsyStore( (state) => state );
 console.log('Current State:', psyState.state);




 const nextStep = function(){
  
   if(psyState.state >= 3) return;


   if(psyState.state == 1){
     //答題階段
     //要超過總題數才能結束答題階段


     if(psyState.questionState < psyState.totalQuestions-1){
       psyState.updateQuestionState(psyState.questionState + 1);
     }else{
       psyState.updateState(psyState.state + 1);
     }
    
   }else{
     console.log("next");
     psyState.updateState(psyState.state + 1);
   }


 }


 const prevStep = function(){
   if(psyState.state <= 0) return;
   console.log("prev");
   psyState.updateState(psyState.state - 1);
 }




 return (
   <>
     <div
       className="w-screen h-screen flex justify-center items-center"
       style={{
         backgroundImage: "url('/bgg.webp')",
         backgroundSize: "cover",
         backgroundPosition: "center",
         backgroundRepeat: "no-repeat"
       }}
     >
       { psyState.state == 0 && <StartPage nextStep={nextStep} />}
       { psyState.state == 1 && <QuestionPage nextStep={nextStep} questionIndex={psyState.questionState} />}
       { psyState.state == 2 && <DisplayResultPage nextStep={nextStep}/>}
       { psyState.state == 3 && <ResultPage/>}
     </div>
   </>
 );
}





