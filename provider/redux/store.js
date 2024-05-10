import {configureStore} from '@reduxjs/toolkit'
import { QuestionAnswerJson } from './Answer'

export const store = configureStore({
    reducer : {
        'qna' : QuestionAnswerJson.reducer
    }
})