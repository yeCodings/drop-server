import Dysmsapi20170525 from '@alicloud/dysmsapi20170525';
import * as OpenApi from '@alicloud/openapi-client';
import { ACCESS_KEY_ID, ACCESS_KEY_SECRET } from '@/common/constants/aliyun';

const config = new OpenApi.Config({
  accessKeyId: ACCESS_KEY_ID,
  accessKeySecret: ACCESS_KEY_SECRET,
});
config.endpoint = 'dysmsapi.aliyuncs.com';

export const msgClient = new Dysmsapi20170525(config);
