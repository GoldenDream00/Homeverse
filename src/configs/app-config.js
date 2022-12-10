export const PUBLIC_PREFIX = '/p';
export const USER_PREFIX = '/user';
export const DATA_PREFIX = '/data';
export const MSG_PREFIX = '/msg';
export const BLOG_PREFIX = '/blog';

export const CONNECT_PREFIX = '/connect';
export const COURSE_PREFIX = '/*';
export const MYLIST_PREFIX = '/profile';
export const MOVIE_LIST_PREFIX = '/movie-list';
export const VIEW_COURSE_PREFIX = '/view';
export const UPLOAD_PREFIX = '/upload';
export const UPGRADE_PREFIX = '/upgrade-plan';
export const VIEW_NOTIFY = '/notify';
export const REWARD_PREFIX = '/reward';
export const COMING_SOON_PREFIX = '/comming-soon';
export const NOT_FOUND_PREFIX = '/*';
export const DETAIL_VIEW = '/detail';
export const GET_USER_BY_ADDRESS = '/get-user-by-address';
export const GET_DATA_BY_ADDRESS = '/get-data-by-address';
export const GET_ALL_TYPES = '/get-all-types';
export const GET_ALL_VIDEOS = '/get-all-videos';
export const PURCHASE_COURSE_PREFIX = '/purchase-video';
export const GET_SEARCH = '/get-search';
export const ADD_TRANSACTION = '/add-transaction';
export const UPDATE_VIEWS = '/update-views';
export const FOLLOW_VIDEO = '/follow-video';
export const GET_UNREAD_MSGS = '/get-unread-msgs';
export const CLEAR_MSGS = '/clear-msgs';
export const GET_ALL_MSGS = '/get-all-msgs';
export const ADD_BLOG = '/add-blog';
export const VIEW_USER_PROFILE = '/*';

export const GET_VIDEO_BLOGS = '/get-video-blogs';
export const GET_VIDEO_INFO = '/get-video-info';

export const CONTRACT_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"balanceReceived","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"businessCost","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feeAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"funCost","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"}],"name":"getAccessOfBusiness","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getAccessOfFireAccount","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"}],"name":"getAccessOfFun","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getAccessOfLitAccount","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"}],"name":"getAccessOfMovie","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"}],"name":"getAccessOfNews","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getAccessOfProAccount","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"}],"name":"getAccessOfTech","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getAccessOfTopAccount","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"cost","type":"uint256"}],"name":"getFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"movieCost","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"newsCost","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"val","type":"uint256"}],"name":"setEthOfBusiness","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"val","type":"uint256"}],"name":"setEthOfMovie","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"val","type":"uint256"}],"name":"setEthOfNews","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"percent","type":"uint256"}],"name":"setFeeAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"techCost","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"widthDrawAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"_to","type":"address"},{"internalType":"uint256","name":"funds","type":"uint256"}],"name":"withdrawMoneyTo","outputs":[],"stateMutability":"nonpayable","type":"function"}];