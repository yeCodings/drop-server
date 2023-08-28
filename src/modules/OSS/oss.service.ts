import * as dayjs from 'dayjs';
import * as OSS from 'ali-oss';
import { Injectable } from '@nestjs/common';
import { OSSType } from './dto/oss.type';
import { ACCESS_KEY_ID, ACCESS_KEY_SECRET } from '@/common/constants/aliyun';

/**
 * 注册 OSSService服务
 *
 * @export OSSService
 * @class OSSService
 */
@Injectable()
export class OSSService {
  /**
   * @description 获取 OSS 上传签名
   * @see https://help.aliyun.com/document_detail/31926.html
   * @return {*}  {Promise<OSSType>}
   * @memberof OSSService
   */
  async getSignature(): Promise<OSSType> {
    // 定义一个配置对象，包含OSS的访问密钥、存储桶
    const config = {
      accessKeyId: ACCESS_KEY_ID, // 是用于标识用户身份的密钥ID
      accessKeySecret: ACCESS_KEY_SECRET, // 是对应的密钥密码，用于验证用户身份
      bucket: 'drop-server-assets', // bucket是用户在OSS上创建的存储空间，这里命名为'drop-server-assets'
      dir: 'images /', // dir是存储路径，这里设置为'images/'，即上传的文件将被存储在以'images/'为前缀的路径下
    };

    // 使用配置对象创建一个OSS客户端实例
    const client = new OSS(config);

    const date = new Date();
    date.setDate(date.getDate() + 1);

    // 定义一个策略对象，设置请求有效期和文件大小限制条件等属性
    const policy = {
      expiration: date.toISOString(), // 请求有效期
      conditions: [
        ['content-length-range', 0, 1048576000], // 设置上传文件的大小限制
        // { bucket: client.options.bucket } // 限制可上传的bucket
      ],
    };

    //bucket域名
    const host = `http://${config.bucket}.${
      (await client.getBucketLocation()).location
    }.aliyuncs.com`.toString();

    //签名
    const formData = await client.calculatePostSignature(policy);

    //返回参数
    const params = {
      expire: dayjs().add(1, 'days').unix().toString(), // 过期时间
      policy: formData.policy, // 策略
      signature: formData.Signature, // 签名
      accessId: formData.OSSAccessKeyId, // KEY
      host,
    };

    return params;
  }
}
