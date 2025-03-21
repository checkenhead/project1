import '@/styles/common/io.scss'
import Label from '@/components/io/label'
// import Input from '@/components/common/io/input'
import Button from '@/components/io/button'
import Radio from '@/components/io/radio'
import CheckBox from '@/components/io/check_box'
import TextArea from '@/components/io/text_area'
import Search from '@/components/io/search'
import ToggleButton from '@/components/io/toggle_button'
import DropDown from '@/components/io/drop_down'
import { Select } from '@/components/io/select.tsx'

const Io = {
  Label,
  // Input,
  Button,
  Radio,
  CheckBox,
  TextArea,
  Select,
  Search,
  ToggleButton,
  DropDown,
} as const

export default Io
