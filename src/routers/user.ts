import { Router, Server } from 'hyper-express';
import { buildShortUUID } from 'src/common/utils/uuid';
import { UserLoginCaptchaCachePrefix } from 'src/constants/cache';
import { redisService } from 'src/services/redis';
import * as SvgCaptcha from 'svg-captcha';
import { ErrorEnum } from 'src/constants/errorx';
import { body, checkSchema, validationResult } from 'express-validator';

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

  router.post(
    '/login',
    checkSchema({
      captchaId: { notEmpty: true },
      verifyCode: { notEmpty: true },
    }),
    async (request, response) => {
      const result = validationResult(request);
      // console.log(result.array());
      response.json({ errors: result.array() });
      // const { captchaId, verifyCode, account, password } = request.body;
      // const captchaKey = `${UserLoginCaptchaCachePrefix}${captchaId}`;
      // const captcha = await redisService.get(captchaKey);
      // if (isEmpty(captcha) || verifyCode !== captcha) {
      //   throw new Error(ErrorEnum.CODE_1022);
      // }

      // // 查找用户账户
      // const user = await this.entityManager.findOne(SysUserEntity, {
      //   select: ['account', 'password', 'id', 'status', 'deptId'],
      //   where: { account: account },
      // });

      // if (isEmpty(user)) {
      //   throw new ApiFailedException(ErrorEnum.CODE_1022);
      // }

      // // 检查密码
      // const encryPwd = this.generalService.generateUserPassword(dto.password);
      // if (user.password !== encryPwd) {
      //   throw new ApiFailedException(ErrorEnum.CODE_1022);
      // }

      // // 非超管判断用户禁用情况
      // if (!this.generalService.isRootUser(user.id)) {
      //   // 判断用户是否被禁用
      //   if (user.status === StatusTypeEnum.Disable) {
      //     throw new ApiFailedException(ErrorEnum.CODE_1024);
      //   }

      //   // 部门被禁用时无法使用
      //   const deptEnable = await this.sysDeptRepo.findDeptEnableByid(user.deptId);

      //   if (!deptEnable) {
      //     throw new ApiFailedException(ErrorEnum.CODE_1024);
      //   }
      // }

      // // 生成JWT Token
      // const payload: IAuthUser = { uid: user.id };
      // const token = this.jwtService.sign(payload);
      // const onlineKey = `${UserOnlineCachePrefix}${user.id}`;

      // // 设置Redis过期时间
      // await this.redisService.set(
      //   onlineKey,
      //   token,
      //   this.configService.jwtConfig.expires,
      // );

      // // 保存登录日志
      // await this.entityManager.insert(SysLogEntity, {
      //   userId: user.id,
      //   status: StatusTypeEnum.Successful,
      //   type: SysLogTypeEnum.Login,
      //   ip,
      //   uri,
      //   request: JSON.stringify(omit(dto, 'password')),
      // });

      // return new UserLoginRespDto(token);
    },
  );

  server.use('/user', router);
};
