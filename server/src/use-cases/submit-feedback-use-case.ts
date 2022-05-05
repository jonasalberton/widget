import { MailAdapter } from "../adpters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest {
  type: string,
  comment: string,
  screenshot: string
}

export class SubmitFeedbackUseCase {

  constructor(
    private mailAdater: MailAdapter,
    private feedbacksRepository: FeedbacksRepository) {
  }

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { comment, screenshot, type} = request;

    if (!type) {
      throw new Error('Type is required!');
    }

    if (!comment) {
      throw new Error('Comment is required!');
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Invalid screenshot format');
    }
    
    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot
    });

    await this.mailAdater.sendMail({
      subject: 'Novo feedback',
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
        `<p>Tipo de feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        `</div>`
      ].join('\n')
    });
  }
}