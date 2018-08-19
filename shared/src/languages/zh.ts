import {Translation} from '../translation';

export const zh: Translation = {
  INVALID_ARGUMENTS: '无效参数',

  VALIDATION_FAILED: '验证失败',
  USERNAME_LENGTH_EXCEPTION: '用户名长度应为4-20位',
  PASSWORD_LENGTH_EXCEPTION: '密码长度应为8-48位',
  INVALID_EMAIL_EXCEPTION: '请输入有效的邮箱地址',
  INVALID_PAGE_NUMBER: '请提交有效的页数',
  EMAIL_ISEMAIL_EXCEPTION: '请输入有效的邮箱地址',
  AFTER_ORDER_ID_MIN_EXCEPTION: '已经到顶啦',
  TITLE_LENGTH_EXCEPTION: '标题应为1-20位',
  CONTENT_MINLENGTH_EXCEPTION: '内容不能为空',

  AUTHENTICATION_FAILED: '授权失败',
  USERNAME_PASSWORD_MISMATCH: '用户名或密码错误',
  NO_ACCESS_TO_CURRENT_COMMENT: '没有权限修改当前评论',

  RESOURCE_NOT_FOUND: '资源不存在',
  USER_NOT_FOUND: '用户不存在',
  CONVENTION_NOT_FOUND: '规范不存在',
  PARENT_CATEGORY_NOT_FOUND: '父级类别不存在',
  CATEGORY_NOT_FOUND: '类别不存在',
  CONVENTION_ITEM_NOT_FOUND: '规范条目不存在',
  CONVENTION_ITEM_VERSION_NOT_FOUND: '不存在该规范条目版本',
  COMMENT_NOT_FOUND: '评论不存在',

  RESOURCE_CONFLICTING: '资源冲突',
  USERNAME_ALREADY_EXISTS: '用户名已经被占用',
  EMAIL_ALREADY_EXISTS: '邮箱已经注册过',
  BASE_VERSION_OUT_DATED: '修改所基于的版本已过期',

  UNNECESSARY_REQUEST: '无用访问',
  CANNOT_ROLLBACK_TO_CURRENT_VERSION: '不能回滚到当前版本',
  ITEM_VERSION_ALREADY_LIKED: '已点赞过该版本',
  ITEM_VERSION_NOT_LIKED_YET: '还未点赞过该版本',

  REGISTER_SUCCESS: '注册成功！',
  LOGIN_SUCCESS: (username: string) => `欢迎回来, ${username}`,
  LOGOUT_SUCCESS: '退出账号成功',
  PASSWORDS_NOT_CONSISTENT: '两次输入密码不一致',

  TIMEAGO_JUST_NOW: '刚刚',
  TIMEAGO_A_WHILE: '片刻后',
  TIMEAGO_SECONDS_AGO: '%s 秒前',
  TIMEAGO_IN_SECONDS: '%s 秒后',
  TIMEAGO_1_MINUTE_AGO: '1 分钟前',
  TIMEAGO_IN_1_MINUTE: '1 分钟后',
  TIMEAGO_MINUTES_AGO: '%s 分钟前',
  TIMEAGO_IN_MINUTES: '%s 分钟后',
  TIMEAGO_1_HOUR_AGO: '1 小时前',
  TIMEAGO_IN_1_HOUR: '1 小时后',
  TIMEAGO_HOURS_AGO: '%s 小时前',
  TIMEAGO_IN_HOURS: '%s 小时后',
  TIMEAGO_1_DAY_AGO: '1 天前',
  TIMEAGO_IN_1_DAY: '1 天后',
  TIMEAGO_DAYS_AGO: '%s 天前',
  TIMEAGO_IN_DAYS: '%s 天后',
  TIMEAGO_1_WEEK_AGO: '1 周前',
  TIMEAGO_IN_1_WEEK: '1 周后',
  TIMEAGO_WEEKS_AGO: '%s 周前',
  TIMEAGO_IN_WEEKS: '%s 周后',
  TIMEAGO_1_MONTH_AGO: '1 月前',
  TIMEAGO_IN_1_MONTH: '1 月后',
  TIMEAGO_MONTHS_AGO: '%s 月前',
  TIMEAGO_IN_MONTHS: '%s 月后',
  TIMEAGO_1_YEAR_AGO: '1 年前',
  TIMEAGO_IN_1_YEAR: '1 年后',
  TIMEAGO_YEARS_AGO: '%s 年前',
  TIMEAGO_IN_YEARS: '%s 年后',
};
