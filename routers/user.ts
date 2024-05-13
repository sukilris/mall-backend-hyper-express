import { Router, Server } from 'hyper-express';
import * as SvgCaptcha from 'svg-captcha';

export const registerUserRouter = (server: Server) => {
  const router = new Router();

  router.get('/login/captcha', async (request, response) => {
    // Destructure request body and register an account asynchronously
    console.log(request.query);
    const { width, height } = request.query;
    const svg = SvgCaptcha.create({
      color: true,
      size: 4,
      noise: 4,
      width: width ? Number(width) : 100,
      height: height ? Number(height) : 40,
      charPreset: '1234567890',
    });

    // Respond with the user's account id
    return response.json({});
  });

  server.use('/user', router);
};
