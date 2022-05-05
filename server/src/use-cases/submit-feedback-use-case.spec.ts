import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();


const submitFeedback = new SubmitFeedbackUseCase(
  { sendMail: sendMailSpy },
  { create: createFeedbackSpy }
);

describe('Submit feedback', () => {


  it('should be able to submit a feedback', async () => {
    await expect(submitFeedback.execute({
      comment: 'Está bugado',
      screenshot: 'data:image/png;base64',
      type:'BUG'
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toBeCalled();
    expect(sendMailSpy).toBeCalled();
  });


  it('should not be able to submit a feedback without type', async () => {
    await expect(submitFeedback.execute({
      comment: 'Está bugado',
      screenshot: 'data:image/png;base64',
      type:''
    })).rejects.toThrow();
  });


  it('should not be able to submit a feedback without comment', async () => {
    await expect(submitFeedback.execute({
      comment: '',
      screenshot: 'data:image/png;base64',
      type:'BUG'
    })).rejects.toThrow();
  });


  it('should not be able to submit a feedback with an invalid screenshot format', async () => {
    await expect(submitFeedback.execute({
      comment: 'bugdo',
      screenshot: 'xpto',
      type:'BUG'
    })).rejects.toThrow();
  });
});