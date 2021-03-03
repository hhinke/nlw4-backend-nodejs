import {Request, Response} from 'express';
import { getCustomRepository } from 'typeorm';
import { AppError } from '../errors/AppError';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';

class AnswerController {
    async execute(request: Request, response: Response) {
        const { value } = request.params;
        const { surveyId } = request.query;

        const surveyUserRepository = getCustomRepository(SurveysUsersRepository);

        const surveryUser = await surveyUserRepository.findOne({
            id: String(surveyId)
        });

        if(!surveryUser) {
            throw new AppError("SurveyUser not found");
        }

        surveryUser.value = Number(value);

        await surveyUserRepository.save(surveryUser);

        return response.status(200).json(surveryUser);
    }
}

export { AnswerController }