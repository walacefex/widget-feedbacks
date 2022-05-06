import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest{
  type:string;
  comment:string;
  screenshot?:string;
}

export class SubmitFeedbackUseCase{

  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter,
    ){}

  async execute(resquest: SubmitFeedbackUseCaseRequest){
    const { type, comment, screenshot } = resquest;

    if(!type){
      throw new Error('Type is required');
    }

    if(!comment){
      throw new Error('Comment is required');
    }

    if(screenshot && !screenshot.startsWith('data:image/png;base64')){
      throw new Error(`Invalid screenshot format: ${screenshot}`);
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    })

    await this.mailAdapter.sendMail({
      subject: 'Novo FeedBack',
      body: [
        `<div style="font-family: sans-serif; font-size:16px; color:#222222;">`,
        `<p><strong>Tipo do Feedback:</strong> ${type}</p>`,
        `<p><strong>Comentário:</strong> ${comment}</p>`,
        `</div>`
      ].join('\n')
    })
  }
}