import React, { createElement } from 'react';
import classNames from 'classnames';
import { Button } from 'antd';
import config from './typeConfig';
import styles from './index.less';

export default ({ className, linkElement = 'a', type, ad, title, desc, img, actions, ...rest }) => {
  const pageType = type in config ? type : '404';
  const clsString = classNames(styles.exception, className);
  return (
    <div className={clsString} {...rest}>
      <div className={styles.imgBlock}>
        <div
          className={styles.imgEle}
          style={{ backgroundImage: `url(${img || config[pageType].img})` }}
        />
      </div>
      <div className={styles.content}>
        <h1>{title || config[pageType].title}</h1>
        <div className={styles.desc}>{desc || config[pageType].desc}</div>
        {
          ad!='302'?
          <div className={styles.actions}>
            {
              actions ||
                createElement(linkElement, {
                  to: '/',
                  href: '/',
                }, <Button type="primary">返回首页</Button>)
            }
          </div>
          :
          <div>服务不可用！请联系技术小哥哥</div>
        }
      </div>
    </div>
  );
};
