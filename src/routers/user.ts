import { Router, Server } from 'hyper-express';
import { buildShortUUID } from 'src/common/utils/uuid';
import { UserLoginCaptchaCachePrefix } from 'src/constants/cache';
import { redisService } from 'src/services/redis';
import * as SvgCaptcha from 'svg-captcha';

export const registerUserRouter = (server: Server) => {
  const router = new Router();

  router.get('/login/captcha', async (request, response) => {
    // Destructure request body and register an account asynchronously
    const { width, height } = request.query;
    const svg = SvgCaptcha.create({
      color: true,
      size: 4,
      noise: 4,
      width: width ? Number(width) : 100,
      height: height ? Number(height) : 40,
      charPreset: '1234567890',
    });

    const captchaId = buildShortUUID();

    await redisService.set(
      `${UserLoginCaptchaCachePrefix}${captchaId}`,
      svg.text.toLowerCase(),
      60 * 5,
    );

    // Respond with the user's account id
    return response.json({
      verifyCode: `data:image/svg+xml;base64,${Buffer.from(svg.data).toString('base64')}`,
      captchaId,
    });
  });

  server.use('/user', router);
};
