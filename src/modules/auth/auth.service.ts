import { Injectable } from '@nestjs/common';
import Dysmsapi20170525, * as $Dysmsapi20170525 from '@alicloud/dysmsapi20170525';
import * as $OpenApi from '@alicloud/openapi-client';
import Util, * as $Util from '@alicloud/tea-util';
import { getRandomCode } from 'src/shared/utils';
import {
  ACCESS_KEY_ID,
  ACCESS_KEY_SECRET,
  SIGN_NAME,
  TEMPLATE_CODE,
} from 'src/common/constants/aliyun';

/**
 * 注册 AuthService服务
 *
 * @export AuthService
 * @class AuthService
 */
@Injectable()
export class AuthService {
  /**
   * 发送短信验证码
   *
   * @param {string} tel
   * @return {*}
   * @memberof AuthService
   */
  async sendCodeMsg(tel: string): Promise<string> {
    const code = getRandomCode();
    console.log(' tel', tel, code);

    const config = new $OpenApi.Config({
      accessKeyId: ACCESS_KEY_ID,
      accessKeySecret: ACCESS_KEY_SECRET,
    });
    config.endpoint = 'dysmsapi.aliyuncs.com';

    const client = new Dysmsapi20170525(config);
    const sendSmsRequest = new $Dysmsapi20170525.SendSmsRequest({
      signName: SIGN_NAME,
      templateCode: TEMPLATE_CODE,
      phoneNumbers: tel,
      templateParam: `{\"code\": \"${code}\"}`,
    });
    const runtime = new $Util.RuntimeOptions({});
    try {
      // 复制代码运行请自行打印 API 的返回值
      await client.sendSmsWithOptions(sendSmsRequest, runtime);
    } catch (error) {
      // 如有需要，请打印 error
      Util.assertAsString(error.message);
    }
    return code;
  }
}
