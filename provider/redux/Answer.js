import { createSlice,nanoid } from "@reduxjs/toolkit";

export const QuestionAnswerJson = createSlice({
    name : "qna",
    initialState : {
        content : []
    },
    reducers : {
        addAnswer(state,action){
            if(action.payload.id){
                state.content.map(question => {
                    if(question.id == action.payload.id){
                        question.answer = action.payload.answer;
                        question.sources = action.payload.sources;
                        question.youtube = action.payload.youtube;
                        return;
                    }
                })
            }
            let id = nanoid()
            if(action.payload.answer == ''){
                state.content.push({
                    id:id,
                    notebookId : action.payload.notebookId,
                    question : action.payload.question,
                    answer : action.payload.answer,
                    sources : [],
                    youtube : []
                })
            }
            action.payload = id;
        },
        showAnswer(state, action) {
            const questionExists = state.content.some(item => item.id === action.payload.id);
        
            if (!questionExists) {
                state.content.push({
                    notebookId: action.payload.notebookId,
                    id: action.payload.id,
                    question: action.payload.question,
                    answer: action.payload.answer,
                    sources: action.payload.sources,
                    youtube: action.payload.youtube
                });
            }
        }
        
    }
})

export const {addAnswer,showAnswer} = QuestionAnswerJson.actions

