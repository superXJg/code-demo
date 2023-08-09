import React, { useEffect, useMemo, useRef, useState } from 'react';
import moment from 'moment';
import styles from './index.less';
import { useIntl } from 'react-intl';
import Custom from './msgTypes';

const MessageContent = ({ message, isFirst, ...rest }) => {
  const intl = useIntl();
  if (!message) return null;
  const { messageContent, prevTimestamp, timestamp, custom, status, direction } = message;
  return (
    <>
      {(prevTimestamp === 0 || timestamp - prevTimestamp > 30 * 60000 || isFirst) && (
        <div className={styles.time}>{timeFormat(timestamp, undefined, undefined, intl)}</div>
      )}
      <Custom message={message} {...rest} />
    </>
  );
};

export default MessageContent;
/**
 * 消息会话时间显示
 */
const timeFormat = (timestamp, noYesterDay, showToday, intl) => {
  // 当天时间起始
  const DAY_START = moment().startOf('day').valueOf();
  // 昨天起始时间
  const YESTERDAY_START = DAY_START - 24 * 60 * 60 * 1000;
  const CURRENT_YEAR = moment().year();
  // 聊天记录年份
  const YEAR = moment(timestamp).year();
  // 昨天显示
  if (timestamp >= YESTERDAY_START && timestamp < DAY_START && !noYesterDay) {
    return `${intl.formatMessage({ id: 'yesterday.at' })}  ${moment(timestamp).format('HH:mm')}`;
  }
  // 当天时间显示
  if (timestamp >= DAY_START) {
    if (showToday) {
      return `${intl.formatMessage({ id: 'today.at' })}  ${moment(timestamp).format('HH:mm')}`;
    }
    return moment(timestamp).format('HH:mm');
  }
  // 过去年
  if (CURRENT_YEAR > YEAR) {
    return moment(timestamp).format('YYYY/M/D HH:mm');
  }
  return moment(timestamp).format('M/D HH:mm');
};
