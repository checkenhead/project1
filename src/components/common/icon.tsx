import '@/styles/common/icon.scss'
import React, { CSSProperties, ReactElement } from 'react'
import AlertTriangle from '@/assets/icon/alert_triangle.svg?react'
import ArrowRight from '@/assets/icon/arrow_right_circle.svg?react'
import AtSign from '@/assets/icon/at_sign.svg?react'
import Bookmark from '@/assets/icon/bookmark.svg?react'
import CheckCircle from '@/assets/icon/check_circle.svg?react'
import CheckSquare from '@/assets/icon/check_square.svg?react'
import Check from '@/assets/icon/check.svg?react'
import ChevronDown from '@/assets/icon/chevron_down.svg?react'
import Circle from '@/assets/icon/circle.svg?react'
import Clip from '@/assets/icon/clip.svg?react'
import CloseCircle from '@/assets/icon/close_circle.svg?react'
import CloseSquare from '@/assets/icon/close_square.svg?react'
import Close from '@/assets/icon/close.svg?react'
import Copy from '@/assets/icon/copy.svg?react'
import Download from '@/assets/icon/download.svg?react'
import EditSquare from '@/assets/icon/edit_square.svg?react'
import Edit from '@/assets/icon/edit.svg?react'
import Feather from '@/assets/icon/feather.svg?react'
import FilePlus from '@/assets/icon/file_plus.svg?react'
import File from '@/assets/icon/file.svg?react'
import Filter from '@/assets/icon/filter.svg?react'
import FolderMinus from '@/assets/icon/folder_minus.svg?react'
import FolderPlus from '@/assets/icon/folder_plus.svg?react'
import Folder from '@/assets/icon/folder.svg?react'
import Grid from '@/assets/icon/grid.svg?react'
import Hash from '@/assets/icon/hash.svg?react'
import Heart from '@/assets/icon/heart.svg?react'
import HelpCircle from '@/assets/icon/help_circle.svg?react'
import Home from '@/assets/icon/home.svg?react'
import Image from '@/assets/icon/image.svg?react'
import InfoCircle from '@/assets/icon/info_circle.svg?react'
import List from '@/assets/icon/list.svg?react'
import Loading from '@/assets/icon/loading.svg?react'
import Login from '@/assets/icon/login.svg?react'
import Logout from '@/assets/icon/logout.svg?react'
import Mail from '@/assets/icon/mail.svg?react'
import MapPin from '@/assets/icon/map_pin.svg?react'
import Map from '@/assets/icon/map.svg?react'
import Menu from '@/assets/icon/menu.svg?react'
import Moon from '@/assets/icon/moon.svg?react'
import More from '@/assets/icon/more.svg?react'
import Move from '@/assets/icon/move.svg?react'
import None from '@/assets/icon/none.svg?react'
import Save from '@/assets/icon/save.svg?react'
import Search from '@/assets/icon/search.svg?react'
import Setting from '@/assets/icon/setting.svg?react'
import Share from '@/assets/icon/share.svg?react'
import SquareInSquare from '@/assets/icon/square_in_square.svg?react'
import Square from '@/assets/icon/square.svg?react'
import Star from '@/assets/icon/star.svg?react'
import Sun from '@/assets/icon/sun.svg?react'
import Tag from '@/assets/icon/tag.svg?react'
import ThumbsDown from '@/assets/icon/thumbs_down.svg?react'
import ThumbsUp from '@/assets/icon/thumbs_up.svg?react'
import Trash from '@/assets/icon/trash.svg?react'
import Upload from '@/assets/icon/upload.svg?react'
import UserCheck from '@/assets/icon/user_check.svg?react'
import UserMinus from '@/assets/icon/user_minus.svg?react'
import UserPlus from '@/assets/icon/user_plus.svg?react'
import UserUncheck from '@/assets/icon/user_uncheck.svg?react'
import User from '@/assets/icon/user.svg?react'
import Users from '@/assets/icon/users.svg?react'
import ZoomIn from '@/assets/icon/zoom_in.svg?react'
import ZoomOut from '@/assets/icon/zoom_out.svg?react'

export type IconType =
  | 'alertTriangle'
  | 'arrowRight'
  | 'atSign'
  | 'bookmark'
  | 'checkCircle'
  | 'checkSquare'
  | 'check'
  | 'chevronDown'
  | 'circle'
  | 'clip'
  | 'closeCircle'
  | 'closeSquare'
  | 'close'
  | 'copy'
  | 'download'
  | 'editSquare'
  | 'edit'
  | 'feather'
  | 'filePlus'
  | 'file'
  | 'filter'
  | 'folderMinus'
  | 'folderPlus'
  | 'folder'
  | 'grid'
  | 'hash'
  | 'heart'
  | 'helpCircle'
  | 'home'
  | 'image'
  | 'infoCircle'
  | 'list'
  | 'loading'
  | 'login'
  | 'logout'
  | 'mail'
  | 'mapPin'
  | 'map'
  | 'menu'
  | 'moon'
  | 'more'
  | 'move'
  | 'none'
  | 'save'
  | 'search'
  | 'setting'
  | 'share'
  | 'squareInSquare'
  | 'square'
  | 'star'
  | 'sun'
  | 'tag'
  | 'thumbsDown'
  | 'thumbsUp'
  | 'trash'
  | 'upload'
  | 'userCheck'
  | 'userMinus'
  | 'userPlus'
  | 'userUncheck'
  | 'user'
  | 'users'
  | 'zoomIn'
  | 'zoomOut'

const ICONS: Record<IconType, ReactElement> = {
  alertTriangle: <AlertTriangle />,
  arrowRight: <ArrowRight />,
  atSign: <AtSign />,
  bookmark: <Bookmark />,
  checkCircle: <CheckCircle />,
  checkSquare: <CheckSquare />,
  check: <Check />,
  chevronDown: <ChevronDown />,
  circle: <Circle />,
  clip: <Clip />,
  closeCircle: <CloseCircle />,
  closeSquare: <CloseSquare />,
  close: <Close />,
  copy: <Copy />,
  download: <Download />,
  editSquare: <EditSquare />,
  edit: <Edit />,
  feather: <Feather />,
  filePlus: <FilePlus />,
  file: <File />,
  filter: <Filter />,
  folderMinus: <FolderMinus />,
  folderPlus: <FolderPlus />,
  folder: <Folder />,
  grid: <Grid />,
  hash: <Hash />,
  heart: <Heart />,
  helpCircle: <HelpCircle />,
  home: <Home />,
  image: <Image />,
  infoCircle: <InfoCircle />,
  list: <List />,
  loading: <Loading />,
  login: <Login />,
  logout: <Logout />,
  mail: <Mail />,
  mapPin: <MapPin />,
  map: <Map />,
  menu: <Menu />,
  moon: <Moon />,
  more: <More />,
  move: <Move />,
  none: <None />,
  save: <Save />,
  search: <Search />,
  setting: <Setting />,
  share: <Share />,
  squareInSquare: <SquareInSquare />,
  square: <Square />,
  star: <Star />,
  sun: <Sun />,
  tag: <Tag />,
  thumbsDown: <ThumbsDown />,
  thumbsUp: <ThumbsUp />,
  trash: <Trash />,
  upload: <Upload />,
  userCheck: <UserCheck />,
  userMinus: <UserMinus />,
  userPlus: <UserPlus />,
  userUncheck: <UserUncheck />,
  user: <User />,
  users: <Users />,
  zoomIn: <ZoomIn />,
  zoomOut: <ZoomOut />,
} as const

type IconProps = {
  className?: string
  type: IconType
  /** default: "100%" */
  width?: string
  /** default: "100%" */
  height?: string
  color?: string
  /** default: 1 */
  aspectRatio?: number
  strokeAnimation?: boolean
  rotateAnimation?: boolean
  onClick?: () => void
}

const Icon = (props: IconProps) => {
  const { width = '100%', height = '100%', aspectRatio = '1' } = props
  const className = !!props.className ? ` ${props.className}` : ''
  const stroke = props.strokeAnimation ? ' stroke_animation' : ''
  const rotate = props.rotateAnimation ? ' rotate_animation' : ''

  const style = {
    width: '100%',
    height: '100%',
    aspectRatio,
    stroke: props.color,
  }

  return (
    <div className={`icon_container${className}`} onClick={props.onClick} style={{ width, height }}>
      {React.cloneElement(ICONS[props.type], {
        className: `${stroke}${rotate}`,
        style,
      })}
    </div>
  )
}

export default Icon
